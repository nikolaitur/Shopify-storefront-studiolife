import {
  Heading,
  Box,
  Flex,
  Stack,
  Text,
  AspectRatio,
  Image,
  Select,
  Button,
  Tag,
  TagLeftIcon,
  TagLabel,
  HStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import Head from "next/head";
import { gql, GraphQLClient } from "graphql-request";
import { useState, useContext } from "react";
import CartContext from "lib/CartContext";
import formatter from "lib/formatter";
import { FaBox, FaClock, FaUserGraduate, FaUsers } from "react-icons/fa";
import dayjs from "dayjs";
import PhotoCarousel from "components/PhotoCarousel";

//to-do: add "associated products" so that they can add additional kits like with Lettering for Light

const Product = ({ handle, product }: { handle: string; product: any }) => {
  const { cart, setCart } = useContext(CartContext);
  const [variantId, setVariantId] = useState(() => {
    if (!product) return null;

    return product.variants.edges[0].node.id;
  });

  const { isOpen, onOpen, onClose } = useDisclosure();

  const variants = product?.variants.edges;

  async function addToCart() {
    const response = await fetch("/api/addtocart", {
      method: "POST",
      body: JSON.stringify({
        variantId: variantId,
        cartId: cart.id,
      }),
    }).then((res) => res.json());

    setCart({
      ...cart,
      status: "dirty",
      lines: response.response.cartLinesAdd.cart.lines,
    });
  }

  function checkPrice(id: string) {
    const cv = variants.filter((v: any) => v.node.id === id);
    return formatter.format(cv[0].node.priceV2.amount);
  }

  if (!product) return null;

  return (
    <>
      <Head>
        <title>{product.title} | StudioLife</title>
      </Head>
      <Flex flexDirection={["column", "row"]} alignItems="flex-start">
        <Box flexGrow={1} maxW={["full", "50%"]}>
          <PhotoCarousel images={product.images.edges} />
        </Box>
        <Stack direction={["column"]} spacing={8} p={20}  maxW={["full", "50%"]}>
          <Stack
            pt={[20]}
            direction={"column"}
            spacing={6}
            alignItems={"flex-start"}
            pos={["static", "sticky"]}
            top={-52}
            bg={"white"}
            px={[2, 10]}
            pb={6}
          >
            <Box>
              <Text>
                {dayjs(product.date?.value).format("dddd, MMMM DD, YYYY")}
              </Text>
              <Heading>{product.title}</Heading>
            </Box>
            <HStack spacing={2}>
              <Tag size="lg">
                <TagLeftIcon boxSize={4} as={FaUserGraduate} />
                <TagLabel>{product.teacher?.value}</TagLabel>
              </Tag>
              <Tag size="lg">
                <TagLeftIcon boxSize={4} as={FaClock} />
                <TagLabel>{product.duration?.value}</TagLabel>
              </Tag>
              {product.is_virtual?.value === "false" ? (
                <>
                  <Tag size="lg">
                    <TagLeftIcon boxSize={4} as={FaUsers} />
                    <TagLabel>In Studio</TagLabel>
                  </Tag>
                </>
              ) : (
                <>
                  <Tag size="lg">
                    <TagLeftIcon boxSize={4} as={FaBox} />
                    <TagLabel>Virtual</TagLabel>
                  </Tag>
                </>
              )}
            </HStack>
            <Stack spacing={4}>
              {variants.length > 1 && (
                <Select
                  value={variantId}
                  onChange={(e) => {
                    setVariantId(e.target.value);
                    checkPrice(e.target.value);
                  }}
                >
                  {variants.map((v: any) => (
                    <option key={v.node.id} value={v.node.id}>
                      {v.node.title}
                    </option>
                  ))}
                </Select>
              )}
              <Stack w="full" justify={"space-between"}>
                <Text fontSize={24} fontWeight={600}>
                  {checkPrice(variantId)}
                </Text>
                <Button alignSelf={"flex-start"} onClick={addToCart}>
                  Add To Cart
                </Button>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Flex>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Full Description</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box
              className="class_desc_outer_box"
              dangerouslySetInnerHTML={{
                __html: product.descriptionHtml,
              }}
            />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Add To Cart
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Product;

export async function getStaticPaths() {
  const graphQLClient = new GraphQLClient(
    process.env.NEXT_PUBLIC_SHOPIFY_URL!,
    {
      headers: {
        "X-Shopify-Storefront-Access-Token": process.env.NEXT_PUBLIC_TOKEN!,
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
    throw Error("Unable to retrieve Shopify Products. Please check logs");
  }

  return {
    paths: res.products.edges.map((edge: any) => ({
      params: { handle: edge.node.handle },
    })),
    fallback: false,
  };
}

export async function getStaticProps(context: any) {
  const handle = context.params.handle;

  const graphQLClient = new GraphQLClient(
    process.env.NEXT_PUBLIC_SHOPIFY_URL!,
    {
      headers: {
        "X-Shopify-Storefront-Access-Token": process.env.NEXT_PUBLIC_TOKEN!,
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
      is_virtual: metafield(namespace: "product", key: "is_virtual") {
        value
      }
      short_description: metafield(
        namespace: "product"
        key: "short_description"
      ) {
        value
      }
      on_page_title: metafield(
        namespace: "product"
        key: "on_page_title"
      ) {
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
    throw Error("Unable to retrieve Shopify Products. Please check logs");
  }

  return {
    props: {
      handle: handle,
      product: res.product,
    },
    revalidate: 60,
  };
}
