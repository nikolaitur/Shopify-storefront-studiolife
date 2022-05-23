import {
  Container,
  Heading,
  Box,
  Stack,
  Text,
  Divider,
  Icon,
  Button,
  GridItem,
  SimpleGrid,
  Textarea,
  Input,
} from '@chakra-ui/react';
import { useRef, useState } from 'react';
import {
  HiOutlineCollection,
  HiOutlineDesktopComputer,
  HiOutlineGift,
  HiOutlineUserAdd,
  HiOutlineVideoCamera,
} from 'react-icons/hi';
import { useFormik } from 'formik';
import MailingList from '../components/MailingList';
import Head from 'next/head';

export default function Partner() {
  const workForm = useRef<HTMLDivElement | null>(null);

  return (
    <>
      <Head>
        <title>Partner With Us | StudioLife</title>
      </Head>
      <Box
        bgImage={'/photos/sarah-book-celebration.jpg'}
        bgSize="cover"
        bgPos="center bottom"
      >
        <Container py={80}>
          <Stack textAlign={'center'} align="center">
            <Text>share your craft with a new audience</Text>
            <Heading>creating space and opportunity</Heading>
            <Button
              onClick={() =>
                workForm.current?.scrollIntoView({ behavior: 'smooth' })
              }
            >
              Work With Us!
            </Button>
          </Stack>
        </Container>
      </Box>
      <Container maxW="container.lg" py={20}>
        <Stack textAlign={'center'} align="center" spacing={8}>
          <Box>
            <Text>new audiences, brought to you</Text>
            <Heading>
              partner with <span className="studiolife">StudioLife</span>
            </Heading>
          </Box>
          <Divider w="200px" />
          <Text>
            We are always looking for new, talented artists to share their craft
            with our community.
          </Text>
          <Text>
            We enable artists to come and teach without having to manage all the
            nitty gritty that takes place from start to finish.Our hope is that
            artists-instructors are free to show up and share their gifts with
            eager learners.
          </Text>
        </Stack>
      </Container>
      <Box
        bgImage={'/photos/partner-with-us.jpg'}
        bgSize="cover"
        bgPos="center"
        pt={20}
        pb={40}
      >
        <Container
          centerContent
          maxW="container.lg"
          p={10}
          bgColor="whiteAlpha.900"
          borderRadius={10}
        >
          <Stack spacing={8} align="center">
            <Box textAlign={'center'}>
              <Text fontSize={'sm'}>how it works</Text>
              <Heading size={'xl'}>
                events at <span className="studiolife">StudioLife</span>
              </Heading>
            </Box>
            <Stack direction={['column', 'row']} textAlign="center" spacing={8}>
              <Box maxW={["full", "20%"]}>
                <Icon as={HiOutlineUserAdd} boxSize={8} />
                <Text>event marketing &amp; registration</Text>
              </Box>
              <Box maxW={["full", "20%"]}>
                <Icon as={HiOutlineCollection} boxSize={8} />
                <Text>promotional materials &amp; cross-promotion</Text>
              </Box>
              <Box maxW={["full", "20%"]}>
                <Icon as={HiOutlineGift} boxSize={8} />
                <Text>class supply kits packaged and shipped for you</Text>
              </Box>
              <Box maxW={["full", "20%"]}>
                <Icon as={HiOutlineDesktopComputer} boxSize={8} />
                <Text>virtual and in-person event options</Text>
              </Box>
              <Box maxW={["full", "20%"]}>
                <Icon as={HiOutlineVideoCamera} boxSize={8} />
                <Text>recurring revenue with on-demand recordings</Text>
              </Box>
            </Stack>
          </Stack>
        </Container>
      </Box>
      <Container maxW="container.lg" centerContent py={20}>
        <Stack spacing={8} align="center">
          <Heading>pricing &amp; fee</Heading>
          <Divider w="200px" />
          <Stack direction={['column', 'row']} spacing={8} justify="center">
            <Box
              textAlign="center"
              p={8}
              shadow="md"
              border="1px solid"
              borderColor="rgba(0, 0, 0, 0.05)"
              borderRadius={10}
            >
              <Stack spacing={4}>
                <Text fontWeight={600} fontSize="xl">
                  class pricing
                </Text>
                <Text>
                  Class prices vary and are determined by the artist and include
                  supply costs for each participant.
                </Text>
                <Text>
                  We work together to find a price that works for you, and keeps
                  the opporutnity open to attend for as many as possible
                </Text>
              </Stack>
            </Box>
            <Box
              textAlign="center"
              p={8}
              shadow="md"
              border="1px solid"
              borderColor="rgba(0, 0, 0, 0.05)"
              borderRadius={10}
            >
              <Stack spacing={4}>
                <Text fontWeight={600} fontSize="xl">
                  StudioLife fee
                </Text>
                <Text>
                  StudioLife takes a flat fee per head amount on top of the
                  artist set price to determine the total class price.
                </Text>
                <Text>
                  This structure encourages mutual motivation for class
                  promotion...the bigger the class the better we all do!
                </Text>
              </Stack>
            </Box>
          </Stack>
        </Stack>
      </Container>
      <Container py={40} ref={workForm}>
        <Heading mb={8}>Let&apos;s Create Something</Heading>
        <PartnerContactForm />
      </Container>
      <Container pt={20} pb={40} maxW="container.lg">
        <MailingList />
      </Container>
    </>
  );
}

function PartnerContactForm() {
  const [formStatus, setStatus] = useState('unsubmitted');

  const formik = useFormik({
    initialValues: {
      name: '',
      phone: '',
      email: '',
      message: '',
    },
    onSubmit: async (values) => {
      const response = await fetch('/api/artistform', {
        method: 'POST',
        body: JSON.stringify(values),
      });

      console.log(response);

      if (response.status === 200) {
        formik.resetForm();
        formik.setSubmitting(false);
        setStatus('submitted');
      } else if (response.status === 500) {
        formik.setSubmitting(false);
        setStatus('error');
      }
    },
  });

  if (formStatus === 'submitted')
    return (
      <Box p={0}>
        <Divider mb={4} />
        <Stack spacing={4}>
          <Heading>Thank You!</Heading>
          <Text>
            We look forward to connecting with you and creating something
            amazing!
          </Text>
        </Stack>
      </Box>
    );

  return (
    <form onSubmit={formik.handleSubmit}>
      {formStatus === 'error' && (
        <Text py={4}>
          Something went wrong last time. Chat us with the icon in the bottom
          corner!
        </Text>
      )}
      <SimpleGrid templateColumns={`repeat(2, 1fr)`} gap={6} w="full">
        <GridItem colSpan={[2, 1]}>
          <Input
            placeholder="your name"
            name="name"
            onChange={formik.handleChange}
            value={formik.values.name}
          />
        </GridItem>
        <GridItem colSpan={[2, 1]}>
          <Input
            placeholder="phone number"
            name="phone"
            onChange={formik.handleChange}
            value={formik.values.phone}
          />
        </GridItem>
        <GridItem colSpan={[2]}>
          <Input
            name="email"
            type="email"
            placeholder="email address"
            onChange={formik.handleChange}
            value={formik.values.email}
          />
        </GridItem>
        <GridItem colSpan={[2]}>
          <Textarea
            placeholder="tell us about yourself! What's your medium? Who do you like to work with? Any teaching experience?"
            rows={5}
            name="message"
            onChange={formik.handleChange}
            value={formik.values.message}
          />
        </GridItem>
        <GridItem placeItems={'center'}>
          <Button
            textAlign={'center'}
            isLoading={formik.isSubmitting}
            type="submit"
            loadingText="Submitting..."
          >
            Submit ✓
          </Button>
        </GridItem>
      </SimpleGrid>
    </form>
  );
}
