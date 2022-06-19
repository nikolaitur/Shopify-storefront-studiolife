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
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import Cart from "./Cart";
import { Search } from "./Search";
import NextLink from "next/link";
import { useRef } from "react";
import { HiChevronDown } from "react-icons/hi";

const Navbar = () => {
  const router = useRouter();

  return (
    <Box
      pos="sticky"
      top={0}
      left={0}
      zIndex={1}
      background="white"
      shadow="sm"
    >
      <Stack
        direction={"row"}
        justify="space-between"
        px={8}
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
            <MenuButton as={Link} rightIcon={<HiChevronDown />}>
              Private Events
            </MenuButton>
            <MenuList>
              <MenuItem>
                <NextLink href="/" passHref>
                  <Link>Private &amp; Corporate Events</Link>
                </NextLink>
              </MenuItem>
              <MenuItem>
                <NextLink href="/" passHref>
                  <Link>Rent The Shop</Link>
                </NextLink>
              </MenuItem>
            </MenuList>
          </Menu>
          <Divider orientation="vertical" height={"40px"} />
          <Menu>
            <MenuButton as={Link} rightIcon={<HiChevronDown />}>
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
        <Stack direction={"row"} align="center" spacing={6}>
          <Stack direction={"row"} align="center" spacing={4}>
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
      <Button
        display={["inherit", "none"]}
        variant={"ghost"}
        ref={btnRef}
        colorScheme="teal"
        onClick={onOpen}
      >
        Menu
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Create your account</DrawerHeader>

          <DrawerBody>
            <Input placeholder="Type here..." />
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue">Save</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default Navbar;
