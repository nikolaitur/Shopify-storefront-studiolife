import {
  Button,
  Container,
  Heading,
  Text,
  Stack,
  Divider,
  Icon,
  Box,
  Link,
  Flex,
} from "@chakra-ui/react";
import { getClient, imageBuilder } from "lib/sanity";
import { GetStaticPropsContext } from "next";
import { groq } from "next-sanity";
import Head from "next/head";
import {
  HiArrowsExpand,
  HiGift,
  HiOutlineCollection,
  HiOutlineDesktopComputer,
  HiUserAdd,
} from "react-icons/hi";
import NextLink from "next/link";
import MultiText from "lib/MultiText";

export default function PrivateEvents({ page }: any) {
  return (
    <>
      <Head>
        <title>{page.pageTitle} | StudioLife</title>
        <meta name="description" content={page.metaDescription} />
      </Head>
      <Box
        bgImage={imageBuilder(page.hero.image).url()}
        bgSize="cover"
        bgPos="center"
        bgAttachment={["scroll", "fixed"]}
      >
        <Container py={60} maxW="container.lg">
          <Stack spacing={8} align={"center"} textAlign="center">
            <Box>
              <Text fontSize="md">{page.hero.supertext}</Text>
              <Heading size="2xl" mb={4}>
                {page.hero.title}
              </Heading>
              <Link
                href={page.hero.button?.link}
                target="_blank"
              >
                <Button>{page.hero.button?.text}</Button>
              </Link>
            </Box>
          </Stack>
        </Container>
      </Box>
      <Container centerContent maxW="container.lg" pt={20} pb={20}>
        <Stack spacing={8} align="center">
          <Box textAlign={"center"}>
            <Text fontSize={"sm"}>{page.features.supertext}</Text>
            <Heading size={"xl"}>{page.features.title}</Heading>
          </Box>
          <Stack direction={["column", "row"]} textAlign="center" spacing={8}>
            <Box maxW={["full", "20%"]}>
              <Icon as={HiOutlineCollection} boxSize={8} />
              <Text>a variety of creative experiences to choose from</Text>
            </Box>
            <Box maxW={["full", "20%"]}>
              <Icon as={HiUserAdd} boxSize={8} />
              <Text>facilitation of a creative instructor</Text>
            </Box>
            <Box maxW={["full", "20%"]}>
              <Icon as={HiGift} boxSize={8} />
              <Text>class supply kits shipped directly to participants</Text>
            </Box>
            <Box maxW={["full", "20%"]}>
              <Icon as={HiOutlineDesktopComputer} boxSize={8} />
              <Text>virtual event hosting and platform</Text>
            </Box>
            <Box maxW={["full", "20%"]}>
              <Icon as={HiArrowsExpand} boxSize={8} />
              <Text>ability to meet all skill levels</Text>
            </Box>
          </Stack>
        </Stack>
      </Container>
      <Container centerContent pt={10} pb={20} id="corporate-events">
        <Stack spacing={8} align="center">
          <Heading size="xl">{page.corporateEvents.title}</Heading>
          <Divider w="200px" />
          <Box textAlign={"center"}>
            <MultiText text={page.corporateEvents.text} mapKey={"corp_events"} />
          </Box>
          <Link
            href={page.corporateEvents.button.link}
            target="_blank"
          >
            <Button>{page.corporateEvents.button.text}</Button>
          </Link>
        </Stack>
      </Container>

      <Box
        py={40}
        bgImage={imageBuilder(page.spaceRentals.image).url()}
        bgPos="center"
        bgSize="cover"
        bgAttachment={["scroll", "fixed"]}
        id="space-rentals"
      >
        <Container
          bgColor={"whiteAlpha.900"}
          pt={10}
          pb={20}
          maxW="container.md"
        >
          <Stack spacing={4} align={"center"} textAlign="center">
            <Heading size="xl">{page.spaceRentals.title}</Heading>
            <Divider w="200px" />
            <MultiText text={page.spaceRentals.text} mapKey={"space_rentals"} />
            <Link
              href={page.spaceRentals.button.link}
              target="_blank"
            >
              <Button>{page.spaceRentals.button.text}</Button>
            </Link>
          </Stack>
        </Container>
      </Box>
      <Container maxW="container.lg" py={20}>
          <Heading textAlign={"center"} mb={8}>{page.venueUseTitle}</Heading>
          <Flex>
            {page.venueUses?.map((e: any) => (
              <NextLink href={`/private-events/${e.slug.current}`} key={e._id}>
                <Stack
                  cursor={"pointer"}
                  bgColor="white"
                  shadow="md"
                  outline={"1px solid rgba(0, 0, 0, 0.05)"}
                  borderRadius={5}
                  p={8}
                >
                  <Text fontWeight={600}>{e.name}</Text>
                </Stack>
              </NextLink>
            ))}
          </Flex>
        </Container>
    </>
  );
}

export async function getStaticProps({ params }: GetStaticPropsContext) {
  const eventQuery = groq`*[_type == "privateEvents"][0]{..., venueUses[]->}`;

  const result = await getClient(false).fetch(eventQuery, {});

  return {
    props: { page: result },
    revalidate: 10,
  };
}
