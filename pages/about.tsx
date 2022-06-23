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
import MultiText from "lib/MultiText";
import { getClient, imageBuilder } from "lib/sanity";
import { groq } from "next-sanity";
import Head from "next/head";
import NextLink from "next/link";

const About = ({ page }: any) => {
  return (
    <>
      <Head>
        <title>{page.pageTitle} | StudioLife</title>
        <meta name="description" content={page.metaDescription} />
      </Head>
      <Container pt={40} maxW="container.lg">
        <Stack>
          <Heading size="3xl">{page.largeText}</Heading>
          <Text fontSize={"xl"}>{page.secondText}</Text>
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
              src={imageBuilder(page.imageSection1.image).url()}
              alt={page.imageSection1.imageAlt}
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
            <Text fontSize="3xl">{page.imageSection1.heading}</Text>
            <Text fontSize={"lg"}>{page.imageSection1.text}</Text>
          </Box>
        </Flex>
      </Container>
      <Box bg="brand.accent1" py={20}>
        <Container>
          <Text textAlign={"center"} fontSize="2xl">
            {page.accentText}
          </Text>
        </Container>
      </Box>
      <Container py={40} centerContent>
        <Stack spacing={6} align={"center"}>
          <AspectRatio ratio={3 / 2} w={["95%", "700px"]}>
            <Image
              borderRadius={"10px"}
              shadow="md"
              src={imageBuilder(page.meet.image).url()}
              alt={page.meet.imageAlt}
            />
          </AspectRatio>
          <Heading as="h2" fontSize="3xl">
            {page.meet.heading}
          </Heading>
          <Text>{page.meet.text}</Text>
        </Stack>
      </Container>
      <Box
        bgImage={imageBuilder(page.shop.image).url()}
        bgPos="center"
        bgSize={"cover"}
        bgAttachment={"fixed"}
        h={800}
        pos="relative"
        overflow={"hidden"}
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
          <Heading>{page.shop.heading}</Heading>
          <Text>{page.shop.text}</Text>
          <Stack direction="row">
            <NextLink href={page.shop.buttons.button1.url} target="_blank">
              <Button>{page.shop.buttons.button1.text}</Button>
            </NextLink>
            <NextLink href={page.shop.buttons.button2.url}>
              <Button>{page.shop.buttons.button2.text}</Button>
            </NextLink>
          </Stack>
        </Stack>
      </Container>
      <Box bg="brand.accent1" py={20}>
        <Container>
          <Text textAlign={"center"} fontSize="2xl">
            {page.accentText2}
          </Text>
        </Container>
      </Box>
      <Container maxW="container.lg" py={40}>
        <Heading as="h2" size="2xl" mb={40}>
          {page.story.mainHeading}
        </Heading>
        <SimpleGrid
          templateColumns={["repeat(1, 1fr) ", "repeat(2, 1fr)"]}
          rowGap={20}
          columnGap={20}
        >
          <GridItem>
            <Stack spacing={4}>
              <Heading as="h3">{page.story.part1.heading}</Heading>
              <MultiText text={page.story.part1.text} mapKey={"story_p1"} />
            </Stack>
          </GridItem>

          <GridItem>
            <AspectRatio ratio={1 / 1} boxSize={["full", 450]} flexShrink={0}>
              <Image
                borderRadius={"10px"}
                shadow="md"
                src={imageBuilder(page.story.part1.image).url()}
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
              <Heading as="h3">{page.story.part2.heading}</Heading>
              <MultiText text={page.story.part2.text} mapKey={"story_p2"} />
            </Stack>
          </GridItem>
        </SimpleGrid>
      </Container>
      <Container pt={0} pb={40}>
        <Stack spacing={6}>
          <Heading as="h3">{page.story.part3.heading}</Heading>
          <MultiText text={page.story.part3.text} mapKey={"story_p3"} />
        </Stack>
      </Container>
    </>
  );
};

export async function getStaticProps() {
  const aboutPageQuery = groq`*[_type == "about"][0]`;

  const aboutPageData = await getClient(false).fetch(aboutPageQuery, {});

  return {
    props: {
      page: aboutPageData,
    },
  };
}

export default About;
