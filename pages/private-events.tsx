import {
  Button,
  Container,
  Heading,
  Text,
  Stack,
  Divider,
  Icon,
  Box,
  Link
} from '@chakra-ui/react';
import Head from 'next/head';
import {
  HiArrowsExpand,
  HiGift,
  HiOutlineCollection,
  HiOutlineDesktopComputer,
  HiUserAdd,
} from 'react-icons/hi';
import MailingList from '../components/MailingList';

export default function PrivateEvents() {
  return (
    <>
      <Head>
        <title>Private Events | StudioLife</title>
      </Head>
      <Box
        bgImage={'/photos/studiolife-shop-min-transparent.jpg'}
        bgSize="cover"
        bgPos="center"
        bgAttachment={['scroll', 'fixed']}
      >
        <Container py={60} maxW="container.lg">
          <Stack spacing={8} align={'center'} textAlign="center">
            <Box>
              <Text fontSize="md">all skills welcome, all groups welcome</Text>
              <Heading size="2xl">
                tailored workshops and private events
              </Heading>
            </Box>
            <Button>get in touch</Button>
          </Stack>
        </Container>
      </Box>
      <Container centerContent maxW="container.lg" pt={20} pb={20}>
        <Stack spacing={8} align="center">
          <Box textAlign={'center'}>
            <Text fontSize={'sm'}>what we offer</Text>
            <Heading size={'xl'}>
              events at <span className="studiolife">StudioLife</span>
            </Heading>
          </Box>
          <Stack direction={['column', 'row']} textAlign="center" spacing={8}>
            <Box maxW={['full', '20%']}>
              <Icon as={HiOutlineCollection} boxSize={8} />
              <Text>a variety of creative experiences to choose from</Text>
            </Box>
            <Box maxW={['full', '20%']}>
              <Icon as={HiUserAdd} boxSize={8} />
              <Text>facilitation of a creative instructor</Text>
            </Box>
            <Box maxW={['full', '20%']}>
              <Icon as={HiGift} boxSize={8} />
              <Text>class supply kits shipped directly to participants</Text>
            </Box>
            <Box maxW={['full', '20%']}>
              <Icon as={HiOutlineDesktopComputer} boxSize={8} />
              <Text>virtual event hosting and platform</Text>
            </Box>
            <Box maxW={['full', '20%']}>
              <Icon as={HiArrowsExpand} boxSize={8} />
              <Text>ability to meet all skill levels</Text>
            </Box>
          </Stack>
        </Stack>
      </Container>
      <Box
        py={40}
        bgImage={'/photos/desk-balloons.jpg'}
        bgPos="center"
        bgSize="cover"
        bgAttachment={['scroll', 'fixed']}
        id="space-rentals"
      >
        <Container bgColor={'whiteAlpha.900'} p={10} maxW="container.md">
          <Stack spacing={4} align={'center'} textAlign="center">
            <Heading size="xl">space rentals</Heading>
            <Divider w="200px" />
            <Text>
              Consider using our space as a beautiful space for your meeting,
              party or event. The space is light, airy, open and with plants as
              the primary decor.
            </Text>
            <Text>
              24 guests seated and 35 mingling. We have an open area in the
              front of the space and 4 high pub tables with stools in the back.
            </Text>
            <Button>rent on peerspace</Button>
          </Stack>
        </Container>
      </Box>
      <Container centerContent pt={40} pb={20} id="corporate-events">
        <Stack spacing={8} align="center">
          <Heading size="xl">corporate events</Heading>
          <Divider w="200px" />
          <Text textAlign={'center'}>
            We connect artists with corporate events for team building, morale
            boosting and shared experiences for all skill levels and personality
            types! Creativity fosters productivity while providing a fun change
            of pace for your team. Let us coordinate an experience that is just
            right for your group.
          </Text>
          <Link href="https://www.peerspace.com/pages/listings/5cc0e38ffa938c000cb50982" target="_blank">
            <Button>book now</Button>
          </Link>
        </Stack>
      </Container>
    </>
  );
}
