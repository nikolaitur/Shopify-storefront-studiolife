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
  useToast,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import {
  HiOutlineCollection,
  HiOutlineDesktopComputer,
  HiOutlineGift,
  HiOutlineUserAdd,
  HiOutlineVideoCamera,
} from "react-icons/hi";
import { useFormik } from "formik";
import Head from "next/head";
import { GetStaticPropsContext } from "next";
import { groq } from "next-sanity";
import { getClient, imageBuilder } from "lib/sanity";
import MultiText from "lib/MultiText";

export default function Partner({ page }: any) {
  const workForm = useRef<HTMLDivElement | null>(null);

  return (
    <>
      <Head>
        <title>{page.pageTitle} | StudioLife</title>
        <meta name="description" content={page.metaDescription} />
      </Head>
      <Box
        bgImage={imageBuilder(page.hero.image).url()}
        bgSize="cover"
        bgPos="center bottom"
      >
        <Container py={80}>
          <Stack textAlign={"center"} align="center">
            <Text>{page.hero.supertext}</Text>
            <Heading>{page.hero.title}</Heading>
            <Button
              onClick={() =>
                workForm.current?.scrollIntoView({ behavior: "smooth" })
              }
            >
              {page.hero.button.text}
            </Button>
          </Stack>
        </Container>
      </Box>
      <Container maxW="container.lg" py={20}>
        <Stack textAlign={"center"} align="center" spacing={8}>
          <Box>
            <Text>{page.belowTheFold.supertext}</Text>
            <Heading>{page.belowTheFold.title}</Heading>
          </Box>
          <Divider w="200px" />
          <MultiText text={page.belowTheFold.text} mapKey={"belowTheFold"} />
        </Stack>
      </Container>
      <Box
        bgImage={imageBuilder(page.features.image).url()}
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
            <Box textAlign={"center"}>
              <Text fontSize={"sm"}>{page.features.supertext}</Text>
              <Heading size={"xl"}>{page.features.title}</Heading>
            </Box>
            <Stack direction={["column", "row"]} textAlign="center" spacing={8}>
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
          <Heading>{page.pricingAndFee.title}</Heading>
          <Divider w="200px" />
          <Stack direction={["column", "row"]} spacing={8} justify="center">
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
                <MultiText
                  text={page.pricingAndFee.classPricing}
                  mapKey={"pricing"}
                />
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
                <MultiText
                  text={page.pricingAndFee.studiolifeFee}
                  mapKey={"fee"}
                />
              </Stack>
            </Box>
          </Stack>
        </Stack>
      </Container>
      <Container py={40} ref={workForm}>
        <Heading mb={8}>Let&apos;s Create Space Together</Heading>
        <PartnerContactForm />
      </Container>
    </>
  );
}

function PartnerContactForm() {
  const [formStatus, setStatus] = useState("unsubmitted");

  const toast = useToast();

  const formik = useFormik({
    initialValues: {
      name: "",
      phone: "",
      email: "",
      message: "",
    },
    onSubmit: async (values) => {
      await fetch("https://submit-form.com/VsIEICRe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(values),
      });

      toast({
        title: "Form Submitted!",
        description:
          "We've received your response and will respond as soon as possible!",
      });
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
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
        <GridItem placeItems={"center"}>
          <Button
            textAlign={"center"}
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

export async function getStaticProps({ params }: GetStaticPropsContext) {
  const eventQuery = groq`*[_type == "partner"][0]{..., venueUses[]->}`;

  const result = await getClient(false).fetch(eventQuery, {});

  return {
    props: { page: result },
    revalidate: 10,
  };
}
