import { Container, Text, Link, Stack, Image, Box } from "@chakra-ui/react";
import NextLink from "next/link";
import { useContext } from "react";
import ShopContext from "lib/ShopContext";

const Footer = () => {
  const { shop } = useContext(ShopContext);

  return (
    <Container maxW="container.lg" py={20} bg="white">
      <Stack spacing={8}>
        <Stack direction={["column", "row"]} spacing={20} align={"flex-start"}>
          <NextLink href="/">
            <Image
              cursor={"pointer"}
              src="/studiolife_full_logo.png"
              alt="StudioLife logo"
              h="80px"
            />
          </NextLink>
          <Stack>
            <Text fontSize="lg">Create Space</Text>
            <NextLink href="/collection/live-events">
              <Link fontSize="sm">Live Events</Link>
            </NextLink>
            <NextLink href="/collection/recorded-workshops">
              <Link fontSize="sm">Recorded Workshops</Link>
            </NextLink>
            <NextLink href="/private-events">
              <Link fontSize="sm">Private &amp; Corporate Events</Link>
            </NextLink>
            <NextLink href="/private-events#venue-rental">
              <Link fontSize="sm">Venue Rentals</Link>
            </NextLink>
          </Stack>
          <Stack>
            <Text fontSize="lg">Learn &amp; Communicate</Text>
            <NextLink href="/partner" passHref>
              <Link fontSize="sm">Partner With Us</Link>
            </NextLink>
            <NextLink href="/about" passHref>
              <Link fontSize="sm">About Us</Link>
            </NextLink>
            {/* <Link fontSize="sm">Blog</Link> */}
            <NextLink href="/help" passHref>
              <Link fontSize="sm">Help &amp; FAQ</Link>
            </NextLink>
          </Stack>
        </Stack>
        <Text w="full" textAlign={"center"}>
          © {shop.name}. 2022. Crafted by{" "}
          <NextLink href="https://webprism.co" passHref>
            <Link>WEBPRISM</Link>
          </NextLink>
        </Text>
      </Stack>
    </Container>
  );
};

export default Footer;
