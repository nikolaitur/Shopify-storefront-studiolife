import {
  Box,
  Stack,
  Text,
  Link,
  useDisclosure,
  Button,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Input,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Divider,
  IconButton,
  Heading,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import Cart from "./Cart";
import { Search } from "./Search";
import NextLink from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  HiChevronDown,
  HiMenuAlt2,
  HiOutlineUser,
  HiUser,
} from "react-icons/hi";

const Navbar = () => {
  const router = useRouter();
  const [auth, setAuth] = useState(false);

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
  }, [window]);

  function handleLoginOrAccount() {
    if (auth) router.push("/account");
    else router.push("/login");
  }

  return (
    <Box
      pos="sticky"
      top={0}
      left={0}
      zIndex={2}
      background="white"
      shadow="sm"
    >
      <Stack
        direction={"row"}
        justify="space-between"
        px={[2, 8]}
        py={3}
        align="center"
      >
        <Stack direction="row" align="center" spacing={6}>
          <MobileMenu />
          <NextLink href="/" passHref>
            <Link fontFamily="Julietta" fontSize="4xl" pb={2}>
              StudioLife
            </Link>
          </NextLink>
          <Stack
            display={["none", "inherit"]}
            direction={"row"}
            align="center"
            spacing={6}
          >
            <Menu>
              <MenuButton as={Link} rightIcon={<HiChevronDown />}>
                Events &amp; Workshops
              </MenuButton>
              <MenuList>
                <MenuItem>
                  <NextLink href="/collection/live-events" passHref>
                    <Link>Live Events</Link>
                  </NextLink>
                </MenuItem>
                <MenuItem>
                  <NextLink href="/collection/recorded-workshops" passHref>
                    <Link>Recorded Workshops</Link>
                  </NextLink>
                </MenuItem>
              </MenuList>
            </Menu>
            <Divider orientation="vertical" height={"40px"} />
            <Menu>
              <MenuButton as={Link} rightIcon={HiChevronDown}>
                Private Events
              </MenuButton>
              <MenuList>
                <MenuItem>
                  <NextLink href="/private-events" passHref>
                    <Link>Private &amp; Corporate Events</Link>
                  </NextLink>
                </MenuItem>
                <MenuItem>
                  <NextLink href="/private-events#space-rentals" passHref>
                    <Link>Venue Rentals</Link>
                  </NextLink>
                </MenuItem>
              </MenuList>
            </Menu>
            <Divider orientation="vertical" height={"40px"} />
            <Menu>
              <MenuButton as={Link} rightIcon={HiChevronDown}>
                More
              </MenuButton>
              <MenuList>
                <MenuItem>
                  <NextLink href="/partner" passHref>
                    <Link>Partner with Us</Link>
                  </NextLink>
                </MenuItem>
                <MenuItem>
                  <NextLink href="/about" passHref>
                    <Link>About Us</Link>
                  </NextLink>
                </MenuItem>
                <MenuItem>
                  <NextLink href="/help" passHref>
                    <Link>Help &amp; Contact</Link>
                  </NextLink>
                </MenuItem>
              </MenuList>
            </Menu>
          </Stack>
        </Stack>
        <Stack direction={"row"} align="center" spacing={6}>
          <Stack direction={"row"} align="center" spacing={[2, 4]}>
            <IconButton
              aria-label={"Account Login"}
              onClick={handleLoginOrAccount}
              as={HiOutlineUser}
              boxSize={7}
              variant={"ghost"}
            />
            <Search router={router} />
            <Cart />
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
};

function MobileMenu() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef<any>();

  return (
    <>
      <IconButton
        as={HiMenuAlt2}
        aria-label="Menu Button"
        display={["inherit", "none"]}
        variant={"ghost"}
        ref={btnRef}
        onClick={onOpen}
        boxSize={7}
      />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>
            <Heading>menu</Heading>
          </DrawerHeader>

          <DrawerBody>
            <Stack spacing={4}>
              <NextLink href="/collection/live-events" passHref>
                <Link fontSize="lg">Live Events</Link>
              </NextLink>
              <NextLink href="/collection/recorded-workshops" passHref>
                <Link fontSize="lg">Recorded Workshops</Link>
              </NextLink>
              <Divider />
              <NextLink href="/private-events" passHref>
                <Link fontSize="lg">Private &amp; Corporate Events</Link>
              </NextLink>
              <NextLink href="/private-events#space-rentals" passHref>
                <Link fontSize="lg">Venue Rentals</Link>
              </NextLink>
              <Divider />
              <NextLink href="/partner" passHref>
                <Link fontSize="lg">Partner with Us</Link>
              </NextLink>
              <NextLink href="/about" passHref>
                <Link fontSize="lg">About Us</Link>
              </NextLink>
              <NextLink href="/help" passHref>
                <Link fontSize="lg">Help &amp; Contact</Link>
              </NextLink>
            </Stack>
          </DrawerBody>
          <DrawerFooter></DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default Navbar;
