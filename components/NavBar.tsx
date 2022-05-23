import { Flex, Box, Image, Icon, useColorMode, Stack } from "@chakra-ui/react";
import Link from "next/link";
import { useState, useRef, useEffect, useContext } from "react";
import { FaUser, FaSearch, FaQuestionCircle } from "react-icons/fa";
import { HiOutlineInformationCircle, HiUserCircle } from "react-icons/hi";
import { useRouter } from "next/router";
import { isMobile, BrowserView, MobileView } from "react-device-detect";
import dynamic from "next/dynamic";
import ShopContext from "lib/ShopContext";
import { Search } from "./Search";
import Menu from "./Menu";
import Cart from "./Cart";

const NavBar = () => {
  const [showSearch, setSearch] = useState(false);
  const [auth, setAuth] = useState(false);
  const router = useRouter();
  const { shop } = useContext(ShopContext);
  const { colorMode } = useColorMode();

  const searchRef = useRef<any>();

  useEffect(() => {
    async function checkToken() {
      const token = JSON.parse(
        window.localStorage.getItem(
          `${process.env.NEXT_PUBLIC_SHOP_NAME}:supershops:accessToken`
        )!
      );
      if (token) setAuth(true);
    }

    checkToken();
  }, []);

  function handleLoginOrAccount() {
    if (auth) router.push("/account");
    else router.push("/login");
  }

  return (
    <Flex
      justifyContent="space-between"
      alignItems={["center"]}
      px={[4, 10]}
      py={[2, 4]}
      pos={["fixed"]}
      zIndex={1}
      top={0}
      left={0}
      flexDir={["row", "column"]}
      w={["100%", 20]}
      h={["auto", "100vh"]}
      bg={["white", "whiteAlpha.800"]}
      shadow={["md", "none"]}
    >
      <Box py={0}>
        <Menu />
      </Box>
        <Image
          display={["inherit", "none"]}
          src={"/studiolife_full_logo.png"}
          alt="studiolife logo"
          height={"70px"}
          onClick={() => router.push("/")}
          cursor="pointer"
        />
        <Image
          display={["none", "inherit"]}
          src={"/studiolife_logo_rotated_270.png"}
          alt="studiolife logo"
          w={["120px", "70px"]}
          h={""}
          maxW="none"
          onClick={() => router.push("/")}
          cursor="pointer"
        />
      <Stack
        direction={["row", "column"]}
        justifyContent={"center"}
        spacing={4}
        py={4}
      >
        <Icon
          as={HiUserCircle}
          color={colorMode === "dark" ? "white" : "black"}
          h={7}
          w={7}
          onClick={handleLoginOrAccount}
          _hover={{
            opacity: 0.4,
          }}
          transition={"opacity 200ms ease"}
        />
        <Link href="/help" passHref>
          <Icon
            as={HiOutlineInformationCircle}
            color={colorMode === "dark" ? "white" : "black"}
            mr={4}
            h={7}
            w={7}
            _hover={{
              opacity: 0.4,
            }}
            transition={"opacity 200ms ease"}
          />
        </Link>
        <Stack
          direction="row"
          spacing={3}
          pos={["static", "fixed"]}
          top={[4, 4, 0]}
          right={8}
          zIndex={1}
        >
          <Search router={router} />
          <Cart />
        </Stack>
      </Stack>
    </Flex>
  );
};

export default NavBar;
