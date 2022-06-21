import {
  Button,
  Container,
  Heading,
  Text,
  Stack,
  Image,
  AspectRatio,
  Box,
  List,
  ListItem,
  ListIcon,
  Link
} from "@chakra-ui/react";
import { PortableText } from "@portabletext/react";
import { getClient, imageBuilder } from "lib/sanity";
import { GetStaticPropsContext } from "next";
import { groq } from "next-sanity";
import Head from "next/head";
import { RatingStar } from "rating-star";
import { useRef } from "react";
import { AiOutlineCheckCircle } from "react-icons/ai";
const pluralize = require('pluralize');

declare interface VenueProps {
  heading: string;
  name: string;
  subheading: string;
  image: {
    _type: string;
    asset: {
      _ref: string;
      _type: string;
    };
  };
  reviews: any
  additional: any
}

export default function Venue({
  heading,
  name,
  subheading,
  image,
  reviews,
  additional
}: VenueProps) {
  const ctaAction = useRef<HTMLDivElement | null>(null)

  return (
    <>
      <Head>
        <title>{heading} | StudioLife Seattle</title>
        <meta name="description" content={subheading} />
      </Head>
      <Container py={40} maxW="container.lg">
        <Stack spacing={4} align="flex-start">
          <Heading>{heading}</Heading>
          <Text maxW={["full", "80%", "60%"]}>{subheading}</Text>
          <Link href="https://www.peerspace.com/pages/listings/5cc0e38ffa938c000cb50982" target={"_blank"}><Button>Book now!</Button></Link>
        </Stack>
      </Container>
      <Container maxW="container.lg" py={20} pos="relative">
        <Stack direction={["column", "row"]} spacing={10}>
          <AspectRatio ratio={9 / 12} w={["full", "50%"]} flexShrink={0}>
            <Image src={imageBuilder(image)?.height(600).url()} alt="" />
          </AspectRatio>
          <Stack
            pos={["static", "absolute"]}
            top={-10}
            right={0}
            maxW={["full", "45%"]}
            spacing={[4, 40]}
          >
            <Stack shadow="md" p={6} align="flex-start" borderRadius={10} border={"1px solid"} borderColor="rgba(0 ,0 ,0 , 0.05)" >
              <RatingStar id="rating" rating={reviews[0].rating} />
              <Text px={3}>{reviews[0].review}</Text>
              <Text>
                <em>- {reviews[0].name}</em>
              </Text>
            </Stack>
            <Stack>
              <Heading as="h2" size="lg">
                Venue Details
              </Heading>
              <List>
                <ListItem>
                  <ListIcon as={AiOutlineCheckCircle} />
                  15 cocktail tables available on site
                </ListItem>
                <ListItem>
                  <ListIcon as={AiOutlineCheckCircle} />
                  Comfortably accomodate 32 sitting, 56 standing
                </ListItem>
                <ListItem>
                  <ListIcon as={AiOutlineCheckCircle} />
                  Another thing
                </ListItem>
                <ListItem>
                  <ListIcon as={AiOutlineCheckCircle} />A final thing
                </ListItem>
              </List>
            </Stack>
          </Stack>
        </Stack>
      </Container>
      <Container maxW="container.lg" pt={20} pb={40}>
        <Stack spacing={4}>
            <Heading as="h2">{name} Considerations</Heading>
            <Box maxW={["full", "80%", "60%"]}>
                <PortableText value={additional} />
            </Box>
        </Stack>
      </Container>
      <Container maxW="container.lg" pb={40} centerContent ref={ctaAction}>
          <Stack spacing={4} align="center">
              <Heading>Ready for your <span style={{textTransform: 'lowercase'}}>{pluralize.singular(name)}?</span></Heading>
              <Text>Join hunders of other happy StudioLife customers!</Text>
              <Link href="https://www.peerspace.com/pages/listings/5cc0e38ffa938c000cb50982" target="_blank"><Button >Book today</Button></Link>
          </Stack>
      </Container>
    </>
  );
}

export async function getStaticPaths() {
  const eventQuery = groq`*[_type == "eventType"]`;

  const result = await getClient(false).fetch(eventQuery, {});

  return {
    paths: result.map((e: any) => ({
      params: { eventType: e.slug.current },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }: GetStaticPropsContext) {
  const pageSlug = params?.eventType;

  const eventQuery = groq`*[_type == "eventType" && slug.current == "${pageSlug}"]{ ..., reviews[]->}`;

  const result = await getClient(false).fetch(eventQuery, {});

  return {
    props: result[0],
    revalidate: 10
  };
}
