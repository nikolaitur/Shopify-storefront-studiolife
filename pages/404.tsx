import {
  Container,
  Heading,
  Text,
  Button,
  SimpleGrid,
  VStack,
  GridItem,
  Divider,
} from '@chakra-ui/react';
import EventFeature from '../components/EventFeature';
import { GraphQLClient, gql } from 'graphql-request';

export default function Custom404({ collections }: {collections: any}) {
  return (
    <>
      <Container pt={40} pb={10} maxW="container.lg">
        <VStack spacing={4} w="full" align={'flex-start'}>
          <Heading as="h1" size="4xl">
            hmm...
          </Heading>
          <Text fontSize="2xl">We couldn&apos;t find that page :(</Text>
          <Text>
            What you&apos;re looking for may have moved. We can help you find
            it!
          </Text>
          {/* @ts-ignore */}
          <Button onClick={() => process.browser && window.Tawk_API.maximize()}>Chat Now</Button>
        </VStack>
      </Container>
      {/* <Container py={20} maxW="container.lg">
        <Divider />
      </Container>
      <Container pt={10} pb={40} maxW="container.lg">
        {collections.edges[0]?.node.products.edges.length > 0 && (
          <VStack spacing={6} alignItems={'center'} w="full">
            <Heading size="xl">check out our upcoming events</Heading>
            <SimpleGrid templateColumns={'repeat(2, 1fr)'} gap={6} w="full">
              {collections.edges[0].node.products.edges.map(({ node }: {node: any}) => (
                <GridItem colSpan={2} key={node.id}>
                  <EventFeature node={node} />
                </GridItem>
              ))}
            </SimpleGrid>
            <Button>see all events</Button>
          </VStack>
        )}
      </Container> */}
    </>
  );
}

export async function getStaticProps() {
  const graphQLClient = new GraphQLClient(
    process.env.NEXT_PUBLIC_SHOPIFY_URL!,
    {
      headers: {
        'X-Shopify-Storefront-Access-Token': process.env.NEXT_PUBLIC_TOKEN!,
      },
    }
  );

  // Shopify Request
  const query = gql`
    {
      collections(first: 100, query: "homepage", sortKey: TITLE) {
        edges {
          node {
            id
            title
            products(first: 4) {
              edges {
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
      collections: res.collections,
    },
    revalidate: 3600,
  };
}
