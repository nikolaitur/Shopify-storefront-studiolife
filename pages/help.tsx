import {
  Box,
  Stack,
  Heading,
  Text,
  Container,
  Button,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from '@chakra-ui/react';
import { groq } from 'next-sanity';
import { getClient } from 'lib/sanity';
import Head from 'next/head';
import ContactForm from 'components/Contact';
import { useRef } from 'react';

export default function FAQ({ data }: { data: any }) {
  const form = useRef<HTMLDivElement>(null)

  return (
    <>
      <Head>
        <title>Help | StudioLife</title>
      </Head>
      <Box pt={[10, 20]} bg="brand.accent1" w="full">
        <Container maxW="container.lg" py={20} centerContent>
          <Heading size="2xl">{data.heading}</Heading>
          <Text my={4}>{data.subheading}</Text>
          <Stack direction="row">
              <Button
                onClick={() => form.current?.scrollIntoView({behavior: 'smooth'})}
                variant="outline"
                _hover={{ color: 'gray.700', background: 'White' }}
              >
                Contact Us
              </Button>
            <Button variant={"outline"} onClick={() => typeof window !== 'undefined' && window.Tawk_API.maximize()}>
              Chat Now
            </Button>
          </Stack>
        </Container>
      </Box>
      <Box w="full" pt={20} pb={0}>
        <Container maxW="container.lg">
          <Stack direction={['column', 'row']} spacing={20}>
            <Text>{data.paragraphOne}</Text>
            <FaqAccordion faqs={data.faqs} />
          </Stack>
        </Container>
      </Box>
      <Container py={20} ref={form}>
        <Stack spacing={6}>
          <Heading textAlign={"center"}>Send us a Message</Heading>
          <ContactForm />
        </Stack>
      </Container>
    </>
  );
}

function FaqAccordion({ faqs }: { faqs: any}) {
  return (
    <Accordion allowMultiple allowToggle minW="50%">
      {faqs?.map((faq:any) => (
        <AccordionItem key={faq._id}>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                {faq.question}
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>{faq.answer}</AccordionPanel>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

export async function getStaticProps() {
  const helpPageQuery = groq`*[_type == "help"]
  {...,
    faqs[]->
  }[0]`;

  const helpPageData = await getClient(false).fetch(helpPageQuery, {});

  return {
    props: {
      data: helpPageData,
    },
  };
}
