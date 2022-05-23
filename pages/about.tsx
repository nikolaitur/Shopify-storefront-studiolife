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
} from '@chakra-ui/react';
// import { groq } from 'next-sanity';
// import { getClient, imageBuilder } from 'lib/sanity';
import Head from 'next/head';
const About = () => {
  return (
    <>
      <Head>
        <title>about | StudioLife</title>
      </Head>
      <Container pt={40} maxW="container.lg">
        <Stack>
          <Heading size="3xl">what if...</Heading>
          <Text fontSize={'xl'}>
            we could create more space for ourselves in our daily lives?
          </Text>
        </Stack>
        <Flex
          py={40}
          align={'center'}
          flexDir={['column', 'row']}
          pos="relative"
        >
          <AspectRatio ratio={2 / 2.5} w={['95%', '500px']} flexShrink={0}>
            <Image
              borderRadius={'10px'}
              shadow="md"
              src="/photos/shelf-plants.jpg"
              alt="curated plants on shelves in the StudioLife shop"
            />
          </AspectRatio>
          <Box
            shadow={'md'}
            p={10}
            border={'1px solid rgba(0,0,0,0.05)'}
            borderRadius={'10px'}
            ml={[0, -10]}
            pos={['static', 'absolute']}
            right={0}
            mt={[-10, 0]}
            bg="white"
            zIndex={1}
            maxW={['full', '60%']}
          >
            <Text fontSize="3xl">
              StudioLife was started with the idea of <em>creating space</em>
            </Text>
            <Text fontSize={'lg'}>
              creating space is a choice and takes practice. we believe that the
              discipline of creating space in our lives enriches us.
            </Text>
          </Box>
        </Flex>
      </Container>
      <Box bg="brand.accent1" py={20}>
        <Container>
          <Text textAlign={'center'} fontSize="2xl">
            what would it look like to invite more time and space for ourselves
            in our day to day life?
          </Text>
        </Container>
      </Box>
      <Container py={40} centerContent>
        <Stack spacing={6} align={'center'}>
          <AspectRatio ratio={3 / 2} w={['95%', '700px']}>
            <Image
              borderRadius={'10px'}
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
        bgImage={'/photos/welcome-to-the-shop.jpg'}
        bgPos="center"
        bgSize={'cover'}
        bgAttachment={'fixed'}
        h={800}
        pos="relative"
      >
          <Box
            p={8}
            pos="absolute"
            top={60}
            right={-28}
          >
            <Heading
              textAlign={'right'}
              as="h2"
              fontSize="144"
              fontWeight={600}
              transform={"rotate(90deg);"}
            >
              the shop
            </Heading>
          </Box>
      </Box>
      <Container py={40} maxW="container.lg">
        <Stack spacing={6} maxW={['full', '60%']}>
          <Heading>about our U-District location</Heading>
          <Text>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas
            exercitationem excepturi similique. Magnam quaerat totam culpa
            facere officiis? Magni, explicabo atque. Dignissimos dolore nostrum
            tempora. Recusandae harum voluptates corporis amet!
          </Text>
          <Stack direction="row">
            <Button>Rent The Shop</Button>
            <Button>About Private Events</Button>
          </Stack>
        </Stack>
      </Container>
      <Box bg="brand.accent1" py={20}>
        <Container>
          <Text textAlign={'center'} fontSize="2xl">
            how could we find more beauty in the reality of life?
          </Text>
        </Container>
      </Box>
      <Container maxW="container.lg" py={40}>
        <Heading as="h2" size="2xl" mb={40}>
          our journey creating space
        </Heading>
        <SimpleGrid
          templateColumns={['repeat(1, 1fr) ', 'repeat(2, 1fr)']}
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
            <AspectRatio ratio={1 / 1} boxSize={['full', 450]} flexShrink={0}>
              <Image
                borderRadius={'10px'}
                shadow="md"
                src="/photos/shop-sign-street.jpg"
                alt="StudioLife shop street view"
              />
            </AspectRatio>
          </GridItem>

          <GridItem>
            <AspectRatio ratio={1 / 1} boxSize={['full', 450]} flexShrink={0}>
              <Image
                src="/photos/virtual-event-sarah.jpg"
                alt="StudioLife shop street view"
                borderRadius={'10px'}
                shadow="md"
              />
            </AspectRatio>
          </GridItem>

          <GridItem>
            <Stack spacing={4}>
              <Heading as="h3">enter virtual events</Heading>
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
        </SimpleGrid>
      </Container>
      <Container pt={0} pb={40}>
        <Stack spacing={6}>
          <Heading>our journey forward</Heading>
          <Text>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem
            laborum quam deleniti voluptatibus doloribus rem, excepturi earum ex
            fugiat repudiandae labore repellendus sint a in! Animi, ad! Officia,
            facilis blanditiis!
          </Text>
          <Text>
            As a thank you for spending your time learning about us, use code{' '}
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
