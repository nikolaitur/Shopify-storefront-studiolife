import {
  Heading,
  Text,
  Container,
  Divider,
  VStack,
  Link,
  Stack,
  Image,
  Box,
  SimpleGrid,
  GridItem,
  Flex,
  Button,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
} from "@chakra-ui/react";
import NextLink from "next/link";
import Head from "next/head";
import { useEffect, useState } from "react";
import formatter from "lib/formatter";
import { groq } from "next-sanity";
import { getClient } from "lib/sanity";

export default function ThankYou({ data, faqs }: any) {
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    async function checkToken() {
      const token = JSON.parse(
        //@ts-ignore
        window.localStorage.getItem(
          `${process.env.NEXT_PUBLIC_SHOP_NAME}:supershops:accessToken`
        )
      );
      if (token) setAuth(true);
    }

    checkToken();
  }, []);

  if (!data) return null;

  return (
    <>
      <Head>
        <title>Thank You!</title>
      </Head>
      <Container py={20} maxW="container.xl">
        <SimpleGrid templateColumns={"repeat(3, 1fr)"} gap={10}>
          <GridItem colSpan={2}>
            <Stack spacing={8} align="flex-start">
              <Box>
                <Text fontSize="2xl" fontWeight={600}>
                  Thank you, {data.displayAddress?.firstName}!
                </Text>
                <Text>
                  We appreciate your business, and look forward to creating
                  space together.
                </Text>
              </Box>
              <Divider />
              <Box py={2}>
                <Text>
                  If you purchased a virtual class, you will receive an email
                  shortly with your shipping and tracking details.
                </Text>
              </Box>
              <Divider />
              <Stack
                spacing={16}
                justify="flex-start"
                direction={["column", "row"]}
              >
                {data.billingAddress && (
                  <BillingDetails billingAddress={data.billingAddress} />
                )}
                {data.displayAddress && (
                  <ShippingDetails displayAddress={data.displayAddress} />
                )}
              </Stack>
            </Stack>
          </GridItem>
          <GridItem
            colSpan={1}
            bg={"gray.200"}
            p={6}
            borderRadius={6}
            pos="sticky"
          >
            <Stack w="full" spacing={4}>
              <Text fontSize="2xl" fontWeight={600}>
                Order Summary
              </Text>
              <Divider borderColor={"black"} />
              {data.lineItems.edges.map((product: any) => (
                <LineItem key={product.node.id} product={product} />
              ))}
              <Divider borderColor={"black"} />
              <PurchaseDetails data={data} />
            </Stack>
          </GridItem>
        </SimpleGrid>
        {!auth && (
          <>
            <Divider />
            <VStack py={[5, 10]}>
              <Text fontWeight={600}>Want to track your order?</Text>
              <Text>
                <NextLink href="/login" passHref>
                  <Link>Create an account</Link>
                </NextLink>{" "}
                with the same email you used for your purchase. Or{" "}
                <NextLink href="/login" passHref>
                  <Link>login</Link>
                </NextLink>
              </Text>
            </VStack>
          </>
        )}
      </Container>
      <Container maxW="container.md" py={20}>
        <FaqAccordion faqs={faqs} />
      </Container>
    </>
  );
}

function FaqAccordion({ faqs }: { faqs: any }) {
  return (
    <Accordion allowMultiple allowToggle minW="50%">
      {faqs?.map((faq: any) => (
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

function BillingDetails({ billingAddress }: { billingAddress?: any }) {
  return (
    <>
      <VStack spacing={1} alignItems={"flex-start"}>
        <Text fontSize={"xl"} fontWeight={600}>
          Billing Address
        </Text>
        <Text>{billingAddress?.name}</Text>
        <Text>{billingAddress?.address1}</Text>
        {billingAddress?.address2 !== "" && (
          <Text>{billingAddress?.address2}</Text>
        )}
        <Text>
          {billingAddress?.city}, {billingAddress?.province}
        </Text>
        <Text>
          {billingAddress?.zip}, {billingAddress?.country}
        </Text>
      </VStack>
    </>
  );
}

function PurchaseDetails({ data }: any) {
  return (
    <SimpleGrid templateColumns={"repeat(2, 1fr)"}>
      <GridItem>Subtotal:</GridItem>
      <GridItem textAlign={"right"}>
        {formatter.format(data.currentSubtotalPriceSet.shopMoney.amount)}
      </GridItem>
      <GridItem>Shipping:</GridItem>
      <GridItem textAlign={"right"}>
        {formatter.format(data.totalShippingPriceSet.shopMoney.amount)}
      </GridItem>
      <GridItem>Tax:</GridItem>
      <GridItem textAlign={"right"}>
        {formatter.format(data.currentTotalTaxSet.shopMoney.amount)}
      </GridItem>
      <GridItem fontWeight={600} fontSize={18} mt={2}>
        Total:
      </GridItem>
      <GridItem textAlign={"right"} fontWeight={600} fontSize={18} mt={2}>
        {formatter.format(data.currentTotalPriceSet.shopMoney.amount)}
      </GridItem>
    </SimpleGrid>
  );
}

function ShippingDetails({ displayAddress }: { displayAddress?: any }) {
  return (
    <>
      <VStack spacing={1} alignItems={"flex-start"}>
        <Text fontSize={"xl"} fontWeight={600}>
          Shipping Address
        </Text>
        <Text>{displayAddress?.name}</Text>
        <Text>{displayAddress?.address1}</Text>
        {displayAddress?.address2 !== "" && (
          <Text>{displayAddress?.address2}</Text>
        )}
        <Text>
          {displayAddress?.city}, {displayAddress?.province}
        </Text>
        <Text>
          {displayAddress?.zip}, {displayAddress?.country}
        </Text>
      </VStack>
    </>
  );
}

function LineItem({ product }: any) {
  return (
    <Stack direction={["column", "row"]} alignItems={"flex-start"} py={4}>
      <Image
        boxSize={20}
        src={product.node.image?.url}
        alt={product.node.name}
      />
      <Box>
        <Text fontWeight={600}>{product.node.name}</Text>
        <Text>Qty: {product.node.currentQuantity}</Text>
      </Box>
    </Stack>
  );
}

export async function getServerSideProps(context: any) {
  const base_url =
    process.env.NODE_ENV === "production"
      ? process.env.NEXT_PUBLIC_SHOP_URL
      : "http://localhost:3000";

  const result = await fetch(
    `${base_url}/api/get-order?orderId=${context.params.id}`
  ).then((res) => res.json());

  const faqQuery = groq`*[_type == "faq"]`;

  const faqs = await getClient(false).fetch(faqQuery, {});

  return {
    props: {
      data: result.response.order,
      faqs,
    },
  };
}
