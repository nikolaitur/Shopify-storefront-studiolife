import { Stack, Container, Flex, Heading, Text, Box, SimpleGrid, GridItem } from "@chakra-ui/react";
import EventFeature from "../components/EventFeature";
import Head from "next/head";
import getProducts from 'lib/get-products'

const Catalog = ({ collections }: { collections: any}) => {
  //to do - add filters

  return (
    <>
      <Head>
        <title>Browse All | StudioLife</title>
      </Head>
      {collections.edges.map((collection:any) => (
        <Container key={collection.node.id} maxW="container.md" py={20}>
          <Stack spacing={8}>
            <Heading>{collection.node.title}</Heading>
            <Text textAlign="justify" >{collection.node.description}</Text>
            <SimpleGrid templateColumns={["repeat(1, 1fr)", "repeat(1, 1fr)"]} gap={8} templateRows="repeat(1, 1fr)">
            {process.browser && collection.node.products.edges.map((product:any) => (
              <GridItem key={product.node.id}>
                <EventFeature node={product.node} />
              </GridItem>
            ))}
            </SimpleGrid>
          </Stack>
        </Container>
      ))}
    </>
  );
};

export default Catalog;

export async function getStaticProps() {
  const res = await getProducts();

  return {
    props: {
      collections: res.collections,
    },
    revalidate: 60,
  };
}
