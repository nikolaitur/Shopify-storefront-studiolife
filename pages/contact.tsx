import {
  Box,
  Container,
  Heading,
  GridItem,
  SimpleGrid,
  Stack,
  Button,
  Textarea,
  Input,
  Text,
  Divider,
} from '@chakra-ui/react';
import Link from 'next/link';
import Head from 'next/head';
import { useState } from 'react';
import { useFormik } from 'formik';

export default function Contact() {
  return (
    <Container maxW="container.md" py={40}>
      <Head>
        <title>Contact Us | StudioLife</title>
      </Head>
      <Stack spacing={8}>
        <Heading size="2xl">Contact Us</Heading>
        <Text>
          We love (virtual) mail! Drop us a line below, and we&apos;ll get back
          to you as soon as possible.
        </Text>
        <ContactForm />
      </Stack>
    </Container>
  );
}

export function ContactForm() {
  const [formStatus, setStatus] = useState('unsubmitted');

  const formik = useFormik({
    initialValues: {
      name: '',
      phone: '',
      email: '',
      message: '',
    },
    onSubmit: async (values) => {
      const response = await fetch('/api/hello', {
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
            placeholder="Enter your name"
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
            placeholder="your message"
            rows={5}
            name="message"
            onChange={formik.handleChange}
            value={formik.values.message}
          />
        </GridItem>
        <GridItem>
          <Button
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
