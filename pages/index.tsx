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
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useRef } from 'react';
import Head from 'next/head';
import NextLink from 'next/link';
import { groq } from 'next-sanity';
import { getClient, imageBuilder } from 'lib/sanity';
import { gql, GraphQLClient } from 'graphql-request';
import { isMobile } from 'react-device-detect';
import { HiUserGroup, HiDesktopComputer, HiOutlineFilm } from 'react-icons/hi';
import EventFeature from '../components/EventFeature';

function HomePage({ homepageData, collections }: { homepageData: any, collections: any}) {
  const router = useRouter();
  const featuredEvents = useRef<any>(null);

  const heroImageSrc = !isMobile
    ? imageBuilder(homepageData.heroImage).width(2400).format('webp').url()
    : imageBuilder(homepageData.heroImage)
        .width(600)
        .height(900)
        .format('webp')
        .url();

  const aboutImageSrc = imageBuilder(homepageData.aboutImage).width(1800).url();

  return (
    <>
      <Head>
        <title>StudioLife | Creating Space</title>
      </Head>

      <Box
        bgSize="cover"
        bgPos={['top center', 'center']}
        bgAttachment={['scroll', 'fixed']}
        bgImage={heroImageSrc}
        py={'300px'}
        pos="relative"
      >
        <Container maxW="container.lg" centerContent textAlign={'center'}>
          <Heading as="h2" size="lg" fontWeight={300} color="black">
            we are <span className="studiolife sl-heading">StudioLife</span>
          </Heading>
          <Heading as="h1" size="3xl" color="black" mt={1}>
            {homepageData.heroTitle}
          </Heading>
          {/* <Text color="black">{homepageData.heroSubtext}</Text> */}
          <Button
            mt={6}
            onClick={() =>
              featuredEvents.current?.scrollIntoView({ behavior: 'smooth' })
            }
          >
            upcoming events →
          </Button>
        </Container>
      </Box>
      {/* product features */}
      <Container maxW="container.lg" pt={40} pb={20}>
        <Stack spacing={6} textAlign="center" alignItems={'center'}>
          <Heading size="xl" as="h2">
            creating space for artists &amp; learners
          </Heading>
          <Text maxW={['full', '50%']}>
            At StudioLife we strive to be a platform to connect artists with
            anyone who wants to learn or practice a craft, and to help create
            space in the lives of those we encounter.
          </Text>
          <SimpleGrid
            templateColumns={['repeate(1, 1fr)', 'repeat(3, 1fr)']}
            gap={6}
          >
            <GridItem
              shadow="md"
              border={'1px solid'}
              borderColor={'brand.border'}
              borderRadius={'10px'}
              p={8}
            >
              <Stack spacing={2} alignItems={'center'}>
                <Icon
                  as={HiDesktopComputer}
                  boxSize={8}
                  color={'brand.secondary'}
                />
                <Heading size="lg" lineHeight={1.1}>
                  live classes
                </Heading>
                <Text>
                  live instruction for any and all skill levels. join us
                  in-person in Seattle, or virtually.
                </Text>
              </Stack>
            </GridItem>
            <GridItem
              shadow="md"
              border={'1px solid'}
              borderColor={'brand.border'}
              borderRadius={'10px'}
              p={8}
            >
              <Stack spacing={2} alignItems={'center'}>
                <Icon
                  as={HiOutlineFilm}
                  boxSize={8}
                  color={'brand.secondary'}
                />
                <Heading size="lg" lineHeight={1.1}>
                  on-demand workshops
                </Heading>
                <Text>
                  create space on your own time with recorded workshops
                </Text>
              </Stack>
            </GridItem>
            <GridItem
              shadow="md"
              border={'1px solid'}
              borderColor={'brand.border'}
              borderRadius={'10px'}
              p={8}
            >
              <Stack spacing={2} alignItems={'center'}>
                <Icon as={HiUserGroup} boxSize={8} color={'brand.secondary'} />
                <Heading size="lg" lineHeight={1.1}>
                  private events
                </Heading>
                <Text>
                  come rent our University District space, or host a virtual
                  event for your remote team
                </Text>
              </Stack>
            </GridItem>
          </SimpleGrid>
        </Stack>
      </Container>
      {/* featured events */}
      <Container pt={10} pb={40} maxW="container.lg" ref={featuredEvents}>
        {collections.edges[0]?.node.products.edges.length > 0 && (
          <VStack spacing={6} alignItems={'center'} w="full">
            <Heading size="xl">upcoming events</Heading>
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
      </Container>
      {/* about studiolife */}
      <Box
        bgImage={aboutImageSrc}
        bgSize={'cover'}
        bgPos={'center'}
        bgAttachment={'fixed'}
      >
        <Container py={40} maxW="container.lg" pos="relative">
          <VStack
            bgColor={'whiteAlpha.900'}
            boxShadow="md"
            borderRadius={'10px'}
            border={'1px solid rgba(0,0,0,0.05)'}
            spacing={4}
            p={8}
            ml={'auto'}
            maxW={['100%', '50%']}
            alignItems="flex-start"
          >
            <Heading as="h2" size="xl">
              we are <span className="studiolife sl-heading">StudioLife</span>
            </Heading>
            <Text textAlign="justify">{homepageData.aboutSubtext}</Text>
            <NextLink href="/about" passHref>
              <Button>about us</Button>
            </NextLink>
          </VStack>
        </Container>
      </Box>
      {/* event features */}
      <Container pt={40} pb={20} maxW="container.lg">
        {collections.edges[1]?.node.products.edges.length > 0 && (
          <VStack spacing={6} alignItems={'center'} w="full">
            <Heading size="xl">featured workshops</Heading>
            <Text maxW={['full', '80%']} textAlign="center">
              Create space in your own schedule to learn with us on your own
              time! Our recorded workshops are a great way to take a workshop
              outside of our live schedule. Register for a workshop and we will
              mail your supply kit to your door.
            </Text>
            <Text>Watch, rewind, pause and enjoy.</Text>
            <SimpleGrid templateColumns={'repeat(2, 1fr)'} gap={6}>
              {collections.edges[1].node.products.edges.map(({ node }: {node: any}) => (
                <GridItem
                  colSpan={2}
                  key={node.id}
                  cursor={'pointer'}
                  onClick={() => router.push(`/event/${node.handle}`)}
                >
                  <EventFeature node={node} />
                </GridItem>
              ))}
            </SimpleGrid>
            <Button>see more</Button>
          </VStack>
        )}
      </Container>
      {/* partner with studiolife */}
      <Box
        bgImage={'/photos/partner-with-studiolife.jpg'}
        bgSize="cover"
        bgAttachment={['scroll', 'fixed']}
      >
        <Container maxW="container.lg" py={20}>
          <Stack
            p={10}
            spacing={4}
            alignItems={'flex-start'}
            bgColor="whiteAlpha.900"
            maxW={['full', '50%']}
            borderRadius={'10px'}
            shadow="md"
          >
            <Box>
              <Text fontSize="sm">share your craft with the world</Text>
              <Heading as="h2" size="xl">
                partner with{' '}
                <span className="studiolife sl-heading">StudioLife</span>
              </Heading>
            </Box>
            <Text>
              We enable artists to come and teach without having to manage all
              the nitty gritty that takes place from start to finish. Our hope
              is that artists-instructors are free to show up and share their
              gifts with eager learners.
            </Text>
            <Button>learn more</Button>
          </Stack>
        </Container>
      </Box>
      {/* private & corp events */}
      <Container maxW="container.lg" pt={40} pb={40}>
        <SimpleGrid
          templateColumns={['repeat(1, 1fr)', 'repeat(2, 1fr)']}
          gap={6}
        >
          <GridItem
            borderRadius={'10px'}
            border="1px solid"
            borderColor="brand.border"
            shadow="md"
            p={8}
          >
            <Stack spacing={4} alignItems={'flex-start'}>
              <Heading>private events</Heading>
              <Text>
                Virtual girls night with friends from across the country?
                birthday party for the creative in your life? Book club wanting
                to learn something new together?
              </Text>
              <Text>
                We love connecting you with the perfect private event tailored
                to your specific interests and offered exclusively to your
                group.
              </Text>
              <NextLink href="/private-events#space-rentals">
                <Button>book now</Button>
              </NextLink>
            </Stack>
          </GridItem>
          <GridItem
            borderRadius={'10px'}
            border="1px solid"
            borderColor="brand.border"
            shadow="md"
            p={8}
          >
            <Stack spacing={4} alignItems={'flex-start'}>
              <Heading>corporate events</Heading>
              <Text>
                We connect artists with corporate events for team building,
                morale boosting and shared experiences for all skill levels and
                personality types!
              </Text>
              <Text>
                Creativity fosters productivity while providing a fun change of
                pace for your team. Let us coordinate an experience that is just
                right for your group.
              </Text>
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
      homepageData,
      collections: res.collections,
    },
    revalidate: 3600,
  };
}
