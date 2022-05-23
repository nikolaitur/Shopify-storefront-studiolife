import {
  Heading,
  Box,
  Container,
  Flex,
  Stack,
  Text,
  AspectRatio,
  Image,
  Select,
  Button,
  Tag,
  Divider,
  TagLeftIcon,
  TagLabel,
  HStack
} from '@chakra-ui/react';
import Head from 'next/head';
import { gql, GraphQLClient } from 'graphql-request';
import { useState, useContext } from 'react';
import CartContext from 'lib/CartContext';
import formatter from 'lib/formatter';
import { FaClock, FaUserGraduate } from 'react-icons/fa';
import { GetStaticPropsContext } from 'next';

//to-do: add "associated products" so that they can add additional kits like with Lettering for Light

const Product = ({ handle, product } : { handle:string, product:any }) => {
  const { cart, setCart } = useContext(CartContext);
  const [variantId, setVariantId] = useState(() => {
    if (!product) return null;

    return product.variants.edges[0].node.id;
  });

  const variants = product?.variants.edges;

  async function addToCart() {
    const response = await fetch('/api/addtocart', {
      method: 'POST',
      body: JSON.stringify({
        variantId: variantId,
        cartId: cart.id,
      }),
    }).then((res) => res.json());

    setCart({
      ...cart,
      status: 'dirty',
      lines: response.response.cartLinesAdd.cart.lines,
    });
  }

  function checkPrice(id:string) {
    const cv = variants.filter((v:any) => v.node.id === id);
    return formatter.format(cv[0].node.priceV2.amount);
  }

  if (!product) return null;

  return (
    <>
      <Head>
        <title>
          {product.title} | {process.env.NEXT_PUBLIC_SHOP_NAME!}
        </title>
      </Head>
      <Flex flexDirection={['column', 'row']}>
      <AspectRatio ratio={1/1} w={["full", "50%"]} pos={["static", "sticky"]} top={0}>
          <Image
            src={product.images.edges[0].node.src}
            alt={``}
            maxH={["400px", "100vh"]}
          />
        </AspectRatio>
        <Container centerContent pt={20} pb={20}>
          <Stack direction={['column']} spacing={8} w="full">
            <Stack direction={'column'} spacing={2} alignItems={"flex-start"}>
              <Heading>{product.title}</Heading>
              {/* <Text>with {product.metafields?.edges[0]?.node.value}</Text> */}
              <HStack spacing={2}>
                <Tag size="lg">
                    <TagLeftIcon boxSize={4} as={FaUserGraduate} />
                    <TagLabel>{product.teacher?.value}</TagLabel>
                </Tag>
                {/* <Text>{product.metafields?.edges[1]?.node.value}</Text> */}
                <Tag size="lg">
                    <TagLeftIcon boxSize={4} as={FaClock} />
                    <TagLabel>{product.duration?.value}</TagLabel>
                </Tag>
              </HStack>
            </Stack>
            <Divider />
            <Stack spacing={4}>
              <Text fontSize={24} fontWeight={600}>
                {checkPrice(variantId)}
              </Text>
              <Select
                value={variantId}
                onChange={(e) => {
                  setVariantId(e.target.value);
                  checkPrice(e.target.value);
                }}
              >
                {variants.map((v:any, i:number) => (
                  <option key={v.node.id} value={v.node.id}>
                    {v.node.title}
                  </option>
                ))}
              </Select>
              <Button alignSelf={'flex-start'} onClick={addToCart}>
                Add To Cart
              </Button>
            </Stack>
            <Text
              dangerouslySetInnerHTML={{
                __html: product.descriptionHtml,
              }}
            ></Text>
          </Stack>
        </Container>
      </Flex>
    </>
  );
};

export default Product;

export async function getStaticPaths() {
  const graphQLClient = new GraphQLClient(
    process.env.NEXT_PUBLIC_SHOPIFY_URL!,
    {
      headers: {
        'X-Shopify-Storefront-Access-Token': process.env.NEXT_PUBLIC_TOKEN!,
      },
    }
  );

  const query = gql`
    {
      products(first: 200) {
        edges {
          node {
            id
            title
            handle
            description
            tags
            teacher: metafield(namespace: "my_fields", key: "teacher") {
              value
            }
            duration: metafield(namespace: "my_fields", key: "duration") {
              value
            }
            date: metafield(namespace: "my_fields", key: "date") {
              value
            }
            variants(first: 100) {
              edges {
                node {
                  id
                  title
                  priceV2 {
                    amount
                  }
                }
              }
            }
            images(first: 10) {
              edges {
                node {
                  src
                }
              }
            }
            priceRange {
              maxVariantPrice {
                amount
              }
            }
          }
        }
      }
    }
  `;

  const res = await graphQLClient.request(query);

  if (res.errors) {
    console.log(JSON.stringify(res.errors, null, 2));
    throw Error('Unable to retrieve Shopify Products. Please check logs');
  }

  return {
    paths: res.products.edges.map((edge: any) => ({
      params: { handle: edge.node.handle },
    })),
    fallback: false,
  };
}

export async function getStaticProps(context:GetStaticPropsContext) {
  const handle = context.params?.handle;

  const graphQLClient = new GraphQLClient(
    process.env.NEXT_PUBLIC_SHOPIFY_URL!,
    {
      headers: {
        'X-Shopify-Storefront-Access-Token': process.env.NEXT_PUBLIC_TOKEN!,
      },
    }
  );

  // Shopify Request
  const query = gql`{
    product(handle: "${handle}") {
      id
      title
      descriptionHtml
      tags
      teacher: metafield(namespace: "my_fields", key: "teacher") {
        value
      }
      duration: metafield(namespace: "my_fields", key: "duration") {
        value
      }
      date: metafield(namespace: "my_fields", key: "date") {
        value
      }
      variants(first: 100) {
        edges {
          node {
            id
            title
            priceV2 {
              amount
            }
          }
        }
      }
      images(first: 10) {
        edges {
          node {
            src
          }
        }
      }
      priceRange {
        maxVariantPrice {
          amount
        }
      }
    }
  }
  `;

  const res = await graphQLClient.request(query);

  if (res.errors) {
    console.log(JSON.stringify(res.errors, null, 2));
    throw Error('Unable to retrieve Shopify Products. Please check logs');
  }

  return {
    props: {
      handle: handle,
      product: res.product,
    },
    revalidate: 60,
  };
}
