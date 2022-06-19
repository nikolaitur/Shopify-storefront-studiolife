import { Heading, Container, Box, Flex } from "@chakra-ui/react";
import { gql, GraphQLClient } from "graphql-request";
import Head from "next/head";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import dayjs from "dayjs";

const EventCard = dynamic<any>(
  () => import("https://framer.com/m/Event-Card-p1O7.js@F53hafdoFG1aEjOUUOLg"!),
  { ssr: false }
);

const Search = ({
  results,
  searchTerm,
}: {
  results: any;
  searchTerm: string;
}) => {
  const router = useRouter();

  return (
    <Box mt={20}>
      <Head>
        <title>Search results for &quot;{searchTerm}&quot;</title>
      </Head>
      <Container py={6} maxW="container.xl">
        <Heading>Search results for &quot;{searchTerm}&quot;</Heading>
      </Container>
      <Container maxW="container.xl" pt={10} pb={20}>
        <Flex w="full" gap={8} justify="center" flexDir="row" flexWrap={"wrap"}>
          {results.edges.map((p: any) => {
            if (dayjs().isAfter(dayjs(p.node.cut_off_date?.value))) return null;

            return (
              <Box key={p.node.id}>
                <EventCard
                  // Using default values:
                  date={dayjs(p.node.date?.value).format("MMMM DD, YYYY")}
                  duration={p.node.duration?.value}
                  eventName={p.node.on_page_title?.value}
                  eventType={p.node.productType}
                  image={p.node.images.edges[0].node.transformedSrc}
                  shortDesc={
                    p.node.short_description?.value
                      ? p.node.short_description?.value
                      : `No description found. Click ${
                          p.node.productType === "On-Demand Workshop"
                            ? "buy now"
                            : "sign up"
                        } to learn more.`
                  }
                  teacher={p.node.teacher.value}
                  time={dayjs(p.node.date?.value).format("hh:mm A PST")}
                  tap={() =>
                    router.push(
                      `/${
                        p.node.productType === "On-Demand Workshop"
                          ? "/workshop"
                          : "event"
                      }/${p.node.handle}`
                    )
                  }
                  variant={
                    p.node.productType === "On-Demand Workshop"
                      ? "Workshop"
                      : "LiveEvent"
                  }
                  cta={
                    p.node.productType === "On-Demand Workshop"
                      ? "buy now"
                      : "sign up"
                  }
                />
              </Box>
            );
          })}
        </Flex>
      </Container>
    </Box>
  );
};

export default Search;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const searchQuery = context.params?.query;

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
        products(query: "${searchQuery} ", first: 100) {
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
      }`;

  const res = await graphQLClient.request(query);

  if (res.errors) {
    console.log(JSON.stringify(res.errors, null, 2));
    throw Error("Unable to retrieve Shopify Products. Please check logs");
  }

  return {
    props: {
      results: res.products,
      searchTerm: searchQuery,
    },
  };
};
