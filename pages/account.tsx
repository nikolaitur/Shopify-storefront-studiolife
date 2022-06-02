import {
  Box,
  Heading,
  Text,
  Container,
  Divider,
  Stack,
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  Button,
  Link
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import formatter from "lib/formatter";
import NextLink from 'next/link'
import Head from 'next/head'

export default function Account() {
  const [authenticated, setAuth] = useState(false);
  const router = useRouter();
  const [userData, setUserData] = useState(null);
  const [userAccess, setUserAccess] = useState({})

  useEffect(() => {
    async function checkToken() {
      const token = JSON.parse(
        window.localStorage.getItem(
          `${process.env.NEXT_PUBLIC_SHOP_NAME}:supershops:accessToken`
        )!
      );

      if (token) setAuth(true);

      if (token === null) router.push("/login");
    }

    checkToken();
  }, []);

  function logout() {
    window.localStorage.removeItem(
      `${process.env.NEXT_PUBLIC_SHOP_NAME}:supershops:accessToken`
    );

    router.push("/");
  }

  useEffect(() => {

    if (authenticated) {
      console.log("fired");

      const token = JSON.parse(
        window.localStorage.getItem(
          `${process.env.NEXT_PUBLIC_SHOP_NAME}:supershops:accessToken`
        )!
      );

      const getUser = async () => {
        const user = await fetch(`/api/get-customer?accessToken=${token.customerAccessToken.accessToken}`).then((res) => res.json());

        console.log(user)

        setUserData({ ...user.data.customer });
      }

      getUser();
    }
  }, [authenticated]);

  if (!authenticated) return <Text>loading your account data...</Text>;

  if (userData)
    return (
      <Box pt={40} pb={20}>
        <Head>
          <title>{process.env.NEXT_PUBLIC_SHOP_NAME} | Your Account</title>
        </Head>
        <Container centerContent>
          <Stack spacing={10} w="full">
            <Flex justify={"space-between"}>
              <Heading size="2xl">Account</Heading>
              <Button onClick={logout}>Logout</Button>
            </Flex>
            <Orders userData={userData} />
          </Stack>
        </Container>
      </Box>
    );

  if (!userData)
    return (
      <Box pt={40} pb={20}>
        <Container maxW="container.sm" centerContent>
          <Text>loading your account data...</Text>
        </Container>
      </Box>
    );
}

function Name({ firstName }: { firstName: string }) {
  const [name, setName] = useState(firstName || "");

  useEffect(() => {
    console.log(name);
  }, [name]);

  return (
    <Box>
      <Text>Welcome!</Text>
      <Editable
        placeholder="Enter your first name"
        value={name}
        onChange={(value) => setName(value)}
      >
        <EditablePreview />
        <EditableInput />
      </Editable>
    </Box>
  );
}

function Orders({ userData }: { userData: any}) {
  if(!userData) return null

  if (userData.orders.edges.length === 0)
    return <Box>You haven&apos;t made any purchases yet.</Box>;

  if (userData.orders.edges.length > 0)
    return (
      <Box>
        <Heading mb={8} size="xl">
          Orders
        </Heading>
        <Stack spacing={4}>
          {userData.orders.edges.map((o:any) => (
            <>
              <Box key={o._id}>
                <Flex justifyContent={"space-between"} mb={4}>
                  <Text>
                    {new Date(o.node.processedAt).toLocaleDateString()}
                  </Text>
                  <Text>
                    {formatter.format(o.node.currentTotalPrice.amount)}
                  </Text>
                </Flex>
                {o.node.lineItems.edges.map((l:any, i: number) => (
                  <Flex
                    justifyContent={"flex-start"}
                    key={i}
                    gap={2}
                    alignItems={"center"}
                  >
                    <Text fontWeight={"bold"}>{l.node.title}</Text>
                    <Text>Qty: {l.node.quantity}</Text>
                  </Flex>
                ))}
              </Box>
              <NextLink href={`/order/${Buffer.from(o.node.id).toString('base64')}`}>
                <Link>
                  <Text>View Order</Text>
                </Link>
              </NextLink>
              <Divider />
            </>
          ))}
        </Stack>
      </Box>
    );
  else return <Box>Something&apos;s wrong.</Box>;
}
