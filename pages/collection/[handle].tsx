import Head from 'next/head';
import { gql, GraphQLClient } from 'graphql-request';
import {
  Container,
  Heading,
  Text,
  Stack,
  Flex,
  Box,
  Input,
} from '@chakra-ui/react';
import getCollections from 'lib/get-collections';
import EventFeature from '../../components/EventFeature';
import { useState } from 'react';
import { GetStaticPropsContext } from 'next';
const Search = require("@smakss/search");

export default function CollectionPage({ handle, data }: { handle: string, data: any}) {
  const [searchTerm, setTerm] = useState('');

  if (!data) return null;

  return (
    <>
      <Box bgImage={data.image.url} bgSize="cover" bgPos="bottom">
        <Head>
          <title>{data.title} | StudioLife</title>
        </Head>
        <Container pt={40} pb={20} maxW="container.md">
          <Stack spacing={4} bgColor="whiteAlpha.900" p={8} borderRadius={10}>
            <Heading fontSize="5xl">{data.title}</Heading>
            <Box
              className="class_desc_outer_box"
              dangerouslySetInnerHTML={{
                __html: data.descriptionHtml,
              }}
            />
          </Stack>
        </Container>
      </Box>
      <Container py={20} maxW="container.md">
        <Stack direction={['column']} spacing={8}>
          {data.products.edges.length > 5 && (
            <Input
              value={searchTerm}
              onChange={(e) => setTerm(e.target.value)}
              placeholder="Search..."
            />
          )}
          <Flex w="full" gap={8} flexDir="column">
            {data.products.edges
              .filter((p:any) => p.node.title.toLowerCase().includes(searchTerm.toLowerCase()) )
              .map((p:any) => (
                <EventFeature node={p.node} key={p.node.id} />
              ))}
            {data.products.edges.length === 0 && (
              <Stack textAlign={'center'} spacing={6}>
                <Heading fontSize="4xl">More events are in the works!</Heading>
                <Text>
                  👇 Join our mailing list below to get updated when more events
                  arrive! 👇
                </Text>
              </Stack>
            )}
          </Flex>
        </Stack>
      </Container>
    </>
  );
}

export async function getStaticPaths() {
  const result = await getCollections("");

  return {
    paths: result.collections.edges.map((edge: any) => ({
      params: { handle: edge.node.handle },
    })),
    fallback: true,
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
        collection(handle: "${handle}"){
        title
        descriptionHtml
        image {
          url
        }
        products(first: 100) {
                edges{
                    node {
                      id
                      title
                      description
                      handle
                      productType
                      teacher: metafield(namespace: "my_fields", key: "teacher") {
                        value
                      }
                      duration: metafield(namespace: "my_fields", key: "duration") {
                        value
                      }
                      date: metafield(namespace: "my_fields", key: "date") {
                        value
                      }
                      variants(first: 1) {
                        edges {
                          node {
                            id
                          }
                        }
                      }
                      images(first: 2) {
                        edges {
                          node {
                            altText
                            transformedSrc
                          }
                        }
                      }
                      priceRange {
                        maxVariantPrice {
                          amount
                        }
                      }
                      compareAtPriceRange {
                        maxVariantPrice {
                          amount
                        }
                      }
                    } 
                }
            }
      }
    }`;

  const res = await graphQLClient.request(query);

  if (res.errors) {
    console.log(JSON.stringify(res.errors, null, 2));
    throw Error('Unable to retrieve Shopify Products. Please check logs');
  }

  return {
    props: {
      handle: handle,
      data: res.collection,
    },
    revalidate: 60,
  };
}
