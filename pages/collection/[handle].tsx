import Head from "next/head";
import { gql, GraphQLClient } from "graphql-request";
import {
  Container,
  Heading,
  Text,
  Stack,
  Flex,
  Box,
  Input,
  AspectRatio,
  Image,
  Button,
} from "@chakra-ui/react";
import getCollections from "lib/get-collections";
import { useState } from "react";
import { GetStaticPropsContext } from "next";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import dayjs from "dayjs";
import NextLink from 'next/link'

const EventCard = dynamic<any>(
  () => import("https://framer.com/m/Event-Card-p1O7.js@F53hafdoFG1aEjOUUOLg"!),
  { ssr: false }
);

export default function CollectionPage({
  handle,
  data,
}: {
  handle: string;
  data: any;
}) {
  const [searchTerm, setTerm] = useState("");
  const router = useRouter();

  if (!data) return null;

  return (
    <>
      <Head>
        <title>{data.title} | StudioLife</title>
        <meta name="description" content={data.description} />
      </Head>
      <Stack
        direction={["column-reverse", "row"]}
        align="center"
        bgColor={"#eae6e1"}
      >
        <Stack spacing={4} p={[8, 20]}>
          <Heading fontSize="5xl">{data.title}</Heading>
          <Box
            className="class_desc_outer_box"
            dangerouslySetInnerHTML={{
              __html: data.descriptionHtml,
            }}
          />
        </Stack>
        <AspectRatio ratio={3 / 2} minW={["100%", "50%"]}>
          <Image src={data.image.url} alt={data.title} />
        </AspectRatio>
      </Stack>
      <Container py={20} maxW="container.lg" centerContent>
        <Stack direction={["column"]} spacing={8}>
          {data.products.edges.length > 6 && (
            <Input
              value={searchTerm}
              onChange={(e) => setTerm(e.target.value)}
              placeholder="Search..."
              maxW={360}
            />
          )}
          <Flex
            w="full"
            gap={8}
            justify="center"
            flexDir="row"
            flexWrap={"wrap"}
          >
            {data.products.edges
              .filter((p: any) =>
                p.node.title.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((p: any) => {
                if (dayjs().isAfter(dayjs(p.node.cut_off_date?.value)))
                  return null;

                return (
                  <Box key={p.node.id}>
                    <EventCard
                      // Using default values:
                      date={dayjs(p.node.date?.value).format("MMMM DD, YYYY")}
                      duration={p.node.duration?.value}
                      eventName={p.node.on_page_title?.value}
                      eventType={
                        p.node.productType === "On-Demand Workshop"
                          ? "Recorded Workshop"
                          : p.node.productType
                      }
                      image={p.node.images.edges[0].node.transformedSrc}
                      shortDesc={
                        p.node.short_description?.value
                          ? p.node.short_description?.value
                          : "No description found. Click Sign Up to learn more."
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
                          ? "learn more"
                          : "sign up"
                      }
                    />
                  </Box>
                );
              })}
            {data.products.edges.length === 0 && (
              <Stack textAlign={"center"} spacing={6}>
                <Heading fontSize="4xl">More events are in the works!</Heading>
                <Text>
                  👇 Join our mailing list below to get updated when more events
                  arrive! 👇
                </Text>
                <NextLink href={"/collection/recorded-workshops"}>
                  <Button alignSelf={"center"}>See Our Recorded Workshops</Button>
                </NextLink>
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

export async function getStaticProps(context: GetStaticPropsContext) {
  const handle = context.params?.handle;

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
                      cut_off_date: metafield(namespace: "custom", key: "last_day_to_sign_up") {
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
    throw Error("Unable to retrieve Shopify Products. Please check logs");
  }

  return {
    props: {
      handle: handle,
      data: res.collection,
    },
    revalidate: 60,
  };
}
