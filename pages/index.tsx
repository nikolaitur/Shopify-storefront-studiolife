import {
  Stack,
  Container,
  Heading,
  VStack,
  Box,
  Text,
  Button,
  SimpleGrid,
  GridItem,
  Icon,
  Link,
  Divider,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useRef } from "react";
import Head from "next/head";
import NextLink from "next/link";
import { groq } from "next-sanity";
import { getClient, imageBuilder } from "lib/sanity";
import { gql, GraphQLClient } from "graphql-request";
import { isMobile } from "react-device-detect";
import { HiUserGroup, HiDesktopComputer, HiOutlineFilm } from "react-icons/hi";
import dynamic from "next/dynamic";
import dayjs from "dayjs";
import MultiText from "lib/MultiText";

const EventCard = dynamic<any>(
  () => import("https://framer.com/m/Event-Card-p1O7.js@5qgLxSYGg46IfCaNup8C"!),
  { ssr: false }
);

function HomePage({
  homepageData,
  collections,
}: {
  homepageData: any;
  collections: any;
}) {
  const router = useRouter();
  const featuredEvents = useRef<any>(null);
  const featuredWorkshops = useRef<any>(null);

  const heroImageSrc = !isMobile
    ? imageBuilder(homepageData.hero.image).width(2400).format("webp").url()
    : imageBuilder(homepageData.hero.image)
        .width(600)
        .height(900)
        .format("webp")
        .url();

  const aboutImageSrc = imageBuilder(homepageData.about.image)
    .width(1800)
    .url();

  return (
    <>
      <Head>
        <title>{homepageData.pageTitle}</title>
        <meta name="description" content={homepageData.metaDescription} />
      </Head>
      <Box
        bgSize="cover"
        bgPos={["bottom center", "center"]}
        bgImage={heroImageSrc}
        py={"200px"}
        pos="relative"
      >
        <Container maxW="container.lg" centerContent textAlign={"center"}>
          <Heading as="h1" size="4xl" mt={1}>
            {homepageData.hero.title}
          </Heading>
          <Text>{homepageData?.hero.text}</Text>
          {collections.edges[0]?.node.products.edges.length > 0 && (
            <Button
              mt={6}
              onClick={() =>
                featuredEvents.current?.scrollIntoView({ behavior: "smooth" })
              }
            >
              upcoming events →
            </Button>
          )}
          {collections.edges[0]?.node.products.edges.length === 0 && (
            <Button
              mt={6}
              onClick={() =>
                featuredWorkshops.current?.scrollIntoView({
                  behavior: "smooth",
                })
              }
            >
              featured workshops →
            </Button>
          )}
        </Container>
      </Box>
      {/* product features */}
      <Container maxW="container.lg" pt={20} pb={20}>
        <Stack spacing={6} textAlign="center" alignItems={"center"}>
          <Heading size="xl" as="h2">
            {homepageData.belowTheFold.title}
          </Heading>
          <Text maxW={["full", "50%"]}>{homepageData.belowTheFold.text}</Text>
          <SimpleGrid
            templateColumns={["repeate(1, 1fr)", "repeat(3, 1fr)"]}
            gap={6}
          >
            <GridItem
              shadow="md"
              border={"1px solid"}
              borderColor={"brand.border"}
              borderRadius={"10px"}
              p={8}
            >
              <Stack spacing={2} alignItems={"center"}>
                <Icon
                  as={HiDesktopComputer}
                  boxSize={8}
                  color={"brand.secondary"}
                />
                <Heading size="lg" lineHeight={1.1}>
                  live classes
                </Heading>
                <Text>{homepageData.belowTheFold.live}</Text>
              </Stack>
            </GridItem>
            <GridItem
              shadow="md"
              border={"1px solid"}
              borderColor={"brand.border"}
              borderRadius={"10px"}
              p={8}
            >
              <Stack spacing={2} alignItems={"center"}>
                <Icon
                  as={HiOutlineFilm}
                  boxSize={8}
                  color={"brand.secondary"}
                />
                <Heading size="lg" lineHeight={1.1}>
                  recorded workshops
                </Heading>
                <Text>{homepageData.belowTheFold.workshop}</Text>
              </Stack>
            </GridItem>
            <GridItem
              shadow="md"
              border={"1px solid"}
              borderColor={"brand.border"}
              borderRadius={"10px"}
              p={8}
            >
              <Stack spacing={2} alignItems={"center"}>
                <Icon as={HiUserGroup} boxSize={8} color={"brand.secondary"} />
                <Heading size="lg" lineHeight={1.1}>
                  private events
                </Heading>
                <Text>{homepageData.belowTheFold.private}</Text>
              </Stack>
            </GridItem>
          </SimpleGrid>
        </Stack>
      </Container>
      {/* featured events */}

      {collections.edges[0]?.node.products.edges.length > 0 && (
        <Container pt={10} pb={40} maxW="container.lg" ref={featuredEvents}>
          <VStack spacing={6} alignItems={"center"} w="full">
            <Heading size="xl">upcoming live events</Heading>
            <Box
              maxW={["full", "80%"]}
              textAlign="center"
              dangerouslySetInnerHTML={{
                __html: collections.edges[0].node.descriptionHtml,
              }}
            />
            <Divider />
            <Stack
              direction={["column", "row"]}
              justify="center"
              spacing={6}
              w="full"
            >
              {collections.edges[0].node.products.edges.map(
                ({ node }: { node: any }) => (
                  <Box key={node.id}>
                    <EventCard
                      // Using default values:
                      date={dayjs(node.date?.value).format("MMMM DD, YYYY")}
                      duration={node.duration?.value}
                      eventName={node.on_page_title.value}
                      eventType={node.productType}
                      image={node.images.edges[0].node.transformedSrc}
                      shortDesc={
                        node.short_description?.value
                          ? node.short_description?.value
                          : "No description found. Click Sign Up to learn more."
                      }
                      teacher={node.teacher.value}
                      time={dayjs(node.date?.value).format("hh:mm A PST")}
                      tap={() => router.push(`/event/${node.handle}`)}
                      variant="LiveEvent"
                    />
                  </Box>
                )
              )}
            </Stack>
            <NextLink href="/collection/live-events">
              <Link>see all</Link>
            </NextLink>
          </VStack>
        </Container>
      )}

      {/* about studiolife */}
      <Box
        bgImage={aboutImageSrc}
        bgSize={"cover"}
        bgPos={"center"}
        bgAttachment={"fixed"}
      >
        <Container py={40} maxW="container.lg" pos="relative">
          <VStack
            bgColor={"whiteAlpha.900"}
            boxShadow="md"
            borderRadius={"10px"}
            border={"1px solid rgba(0,0,0,0.05)"}
            spacing={4}
            p={8}
            ml={"auto"}
            maxW={["100%", "50%"]}
            alignItems="flex-start"
          >
            <Heading as="h2" size="xl">
              we are <span className="studiolife sl-heading">StudioLife</span>
            </Heading>
            <Text textAlign="justify">{homepageData.about.text}</Text>
            <NextLink href="/about" passHref>
              <Button>about us</Button>
            </NextLink>
          </VStack>
        </Container>
      </Box>
      {/* event features */}
      <Container pt={20} pb={20} maxW="container.lg" ref={featuredWorkshops}>
        {collections.edges[1]?.node.products.edges.length > 0 && (
          <VStack spacing={6} alignItems={"center"} w="full">
            <Heading size="xl">featured workshops</Heading>
            <Box
              maxW={["full", "80%"]}
              textAlign="center"
              dangerouslySetInnerHTML={{
                __html: collections.edges[1].node.descriptionHtml,
              }}
            />
            <Stack
              direction={["column", "row"]}
              justify="center"
              spacing={6}
              w="full"
            >
              {collections.edges[1].node.products.edges.map(
                ({ node }: { node: any }) => (
                  <Box key={node.id}>
                    <EventCard
                      date={dayjs(node.date?.value).format("MMMM DD, YYYY")}
                      duration={node.duration?.value}
                      eventName={node.on_page_title?.value}
                      eventType={node.productType}
                      image={node.images.edges[0].node.transformedSrc}
                      shortDesc={
                        node.short_description?.value
                          ? node.short_description?.value
                          : "No description found. Click Sign Up to learn more."
                      }
                      teacher={node.teacher.value}
                      time={dayjs(node.date?.value).format("hh:mm A PST")}
                      tap={() => router.push(`/workshop/${node.handle}`)}
                      variant="Workshop"
                    />
                  </Box>
                )
              )}
            </Stack>
            <NextLink href="/collection/on-demand-workshops">
              <Link>see all</Link>
            </NextLink>
          </VStack>
        )}
      </Container>
      {/* partner with studiolife */}
      <Box
        bgImage={"/photos/partner-with-studiolife.jpg"}
        bgSize="cover"
        bgAttachment={["scroll", "fixed"]}
      >
        <Container maxW="container.lg" py={20}>
          <Stack
            p={10}
            spacing={4}
            alignItems={"flex-start"}
            bgColor="whiteAlpha.900"
            maxW={["full", "50%"]}
            borderRadius={"10px"}
            shadow="md"
          >
            <Box>
              <Text fontSize="sm">{homepageData.partner.supertext}</Text>
              <Heading as="h2" size="xl">
                partner with{" "}
                <span className="studiolife sl-heading">StudioLife</span>
              </Heading>
            </Box>
            <Text>{homepageData.partner.text}</Text>
            <NextLink href="/partner">
              <Button>learn more</Button>
            </NextLink>
          </Stack>
        </Container>
      </Box>
      {/* private & corp events */}
      <Container maxW="container.lg" pt={40} pb={40}>
        <SimpleGrid
          templateColumns={["repeat(1, 1fr)", "repeat(2, 1fr)"]}
          gap={6}
        >
          <GridItem
            borderRadius={"10px"}
            border="1px solid"
            borderColor="brand.border"
            shadow="md"
            p={8}
          >
            <Stack spacing={4} alignItems={"flex-start"}>
              <Heading>private events</Heading>
              <MultiText
                text={homepageData.private}
                mapKey={"private_events"}
              />
              <NextLink href="/private-events#space-rentals">
                <Button>book now</Button>
              </NextLink>
            </Stack>
          </GridItem>
          <GridItem
            borderRadius={"10px"}
            border="1px solid"
            borderColor="brand.border"
            shadow="md"
            p={8}
          >
            <Stack spacing={4} alignItems={"flex-start"}>
              <Heading>corporate events</Heading>
              <MultiText
                text={homepageData.corporate}
                mapKey={"private_events"}
              />
              <NextLink href="/private-events#corporate-events" passHref>
                <Button>learn more</Button>
              </NextLink>
            </Stack>
          </GridItem>
        </SimpleGrid>
      </Container>
    </>
  );
}

export default HomePage;

export async function getStaticProps() {
  const homepageQuery = groq`*[_type == "homepage"][0]`;

  const homepageData = await getClient(false).fetch(homepageQuery, {});

  const graphQLClient = new GraphQLClient(
    process.env.NEXT_PUBLIC_SHOPIFY_URL!,
    {
      headers: {
        "X-Shopify-Storefront-Access-Token": process.env.NEXT_PUBLIC_TOKEN!,
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
            descriptionHtml
            products(first: 6) {
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
    throw Error("Unable to retrieve Shopify Products. Please check logs");
  }

  return {
    props: {
      homepageData,
      collections: res.collections,
    },
    revalidate: 3600,
  };
}
