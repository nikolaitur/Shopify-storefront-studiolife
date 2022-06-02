import {
  Box,
  Flex,
  Text,
  Container,
  Stack,
  Heading,
  AspectRatio,
  Image,
  SimpleGrid,
  GridItem,
  Button,
  Code,
} from "@chakra-ui/react";
import Head from "next/head";
import NextLink from "next/link";

const About = () => {
  return (
    <>
      <Head>
        <title>about | StudioLife</title>
      </Head>
      <Container pt={40} maxW="container.lg">
        <Stack>
          <Heading size="3xl">what if...</Heading>
          <Text fontSize={"xl"}>
            we could create more space for ourselves in our daily lives?
          </Text>
        </Stack>
        <Flex
          py={40}
          align={"center"}
          flexDir={["column", "row"]}
          pos="relative"
        >
          <AspectRatio ratio={2 / 2.5} w={["95%", "500px"]} flexShrink={0}>
            <Image
              borderRadius={"10px"}
              shadow="md"
              src="/photos/shelf-plants.jpg"
              alt="curated plants on shelves in the StudioLife shop"
            />
          </AspectRatio>
          <Box
            shadow={"md"}
            p={10}
            border={"1px solid rgba(0,0,0,0.05)"}
            borderRadius={"10px"}
            ml={[0, -10]}
            pos={["static", "absolute"]}
            right={0}
            mt={[-10, 0]}
            bg="white"
            zIndex={1}
            maxW={["full", "60%"]}
          >
            <Text fontSize="3xl">
              StudioLife was started with the idea of <em>creating space</em>
            </Text>
            <Text fontSize={"lg"}>
              creating space is a choice and takes practice. we believe that the
              discipline of creating space in our lives enriches us.
            </Text>
          </Box>
        </Flex>
      </Container>
      <Box bg="brand.accent1" py={20}>
        <Container>
          <Text textAlign={"center"} fontSize="2xl">
            what would it look like to invite more time and space for ourselves
            in our day to day life?
          </Text>
        </Container>
      </Box>
      <Container py={40} centerContent>
        <Stack spacing={6} align={"center"}>
          <AspectRatio ratio={3 / 2} w={["95%", "700px"]}>
            <Image
              borderRadius={"10px"}
              shadow="md"
              src="/photos/brooke-kristi-table.jpg"
              alt="StudioLife owners Brooke Anderson and Kristi Brumbaugh"
            />
          </AspectRatio>
          <Heading as="h2" fontSize="3xl">
            Meet Brooke &amp; Kristi
          </Heading>
          <Text>
            We have been friends for a long time and found ourselves circling
            around the idea of wanting to start a new chapter, a new adventure,
            a new way to relate to our greater community. We decided to open a
            plant shop in our beloved University District neighborhood in
            Seattle.
          </Text>
        </Stack>
      </Container>
      <Box
        bgImage={"/photos/welcome-to-the-shop.jpg"}
        bgPos="center"
        bgSize={"cover"}
        bgAttachment={"fixed"}
        h={800}
        pos="relative"
      >
        <Box p={8} pos="absolute" top={60} right={[0, -28]}>
          <Heading
            textAlign={"right"}
            as="h2"
            fontSize="144"
            fontWeight={300}
            color="blackAlpha.700"
            transform={["none", "rotate(90deg);"]}
          >
            the shop
          </Heading>
        </Box>
      </Box>
      <Container py={40} maxW="container.lg">
        <Stack spacing={6} maxW={["full", "60%"]}>
          <Heading>about our U-District location</Heading>
          <Text>
            Just a short walk from University of Washington and University
            Village, our amazing space is always filled with light, and makes a
            great place to dive into creativity, or reverie with friends, family
            or coworkers. Our pub tables and large countertops are perfect for
            hosting our events, or yours.
          </Text>
          <Stack direction="row">
            <NextLink
              href="https://www.peerspace.com/pages/listings/5cc0e38ffa938c000cb50982"
              target="_blank"
            >
              <Button>Rent The Shop</Button>
            </NextLink>
            <NextLink
              href="/private-events"
            >
              <Button>About Private Events</Button>
            </NextLink>
          </Stack>
        </Stack>
      </Container>
      <Box bg="brand.accent1" py={20}>
        <Container>
          <Text textAlign={"center"} fontSize="2xl">
            how could we find more beauty in the reality of life?
          </Text>
        </Container>
      </Box>
      <Container maxW="container.lg" py={40}>
        <Heading as="h2" size="2xl" mb={40}>
          our journey creating space
        </Heading>
        <SimpleGrid
          templateColumns={["repeat(1, 1fr) ", "repeat(2, 1fr)"]}
          rowGap={20}
          columnGap={20}
        >
          <GridItem>
            <Stack spacing={4}>
              <Heading as="h3">beginnings...</Heading>
              <Text>
                We started there and then quickly added classes with local
                artists. We started using our beautiful space during the day as
                a shop and the evening for creative workshops and a venue rental
                space.
              </Text>
              <Text>
                We have had many a beautiful party at StudioLife (birthday
                parties, bridal showers, baby showers, weddings and graduation
                gatherings) - those events add to the magic of what has happened
                in our physical space on University Way. And it’s also been the
                place that we have found space for ourselves to retreat, learn
                and grow.
              </Text>
            </Stack>
          </GridItem>

          <GridItem>
            <AspectRatio ratio={1 / 1} boxSize={["full", 450]} flexShrink={0}>
              <Image
                borderRadius={"10px"}
                shadow="md"
                src="/photos/shop-sign-street.jpg"
                alt="StudioLife shop street view"
              />
            </AspectRatio>
          </GridItem>

          <GridItem>
            <AspectRatio ratio={1 / 1} boxSize={["full", 450]} flexShrink={0}>
              <Image
                src="/photos/virtual-event-sarah.jpg"
                alt="StudioLife shop street view"
                borderRadius={"10px"}
                shadow="md"
              />
            </AspectRatio>
          </GridItem>

          <GridItem>
            <Stack spacing={4}>
              <Heading as="h3">enter virtual events</Heading>
              <Text>
                But then Covid...we thought we were sunk for awhile there and
                then the idea of virtual workshops became a reality.
              </Text>
              <Text>
                We have loved the experience of connecting artists and learners
                from all over the country and world. It has broadened our reach
                and made many unique experiences possible. The creativity of
                people continues to astound us - from learners arranging classes
                with friends and family across the miles to artist-instructors
                strategizing how best to teach and connect with their growing
                communities. We are both wired to look for and enjoy the
                creativity in others, so we gain a lot of joy from this business
                of ours.
              </Text>
            </Stack>
          </GridItem>
        </SimpleGrid>
      </Container>
      <Container pt={0} pb={40}>
        <Stack spacing={6}>
          <Heading>our journey forward</Heading>
          <Text>
            As we exit the pandemic-era, our focus has renewed on creating space
            for others. We&apos;re estatic to be working more with local
            charitable organizations to raise money, awareness, and bring
            together artists and learners for amazing causes.
          </Text>
          <Text>
            As a thank you for spending your time learning about us, use code{" "}
            <Code>imadespace</Code> at checkout for 10% off your next event. 🤍
          </Text>
        </Stack>
      </Container>
    </>
  );
};

// export async function getStaticProps() {
//   const aboutPageQuery = groq`*[_type == "about"][0]`;

//   const aboutPageData = await getClient(false).fetch(aboutPageQuery, {});

//   return {
//     props: {
//       data: aboutPageData,
//     },
//   };
// }

export default About;
