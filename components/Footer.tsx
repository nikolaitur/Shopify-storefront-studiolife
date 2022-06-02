import {
  Container,
  Text,
  Link,
  Stack,
  Image,
  Box
} from "@chakra-ui/react";
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
                <Image cursor={"pointer"} src="/studiolife_full_logo.png" alt="StudioLife logo" h="80px" />
              </NextLink>
            <Stack>
              <Text fontSize="lg">Create Space</Text>
              <NextLink href="/collection/benefits">
                <Link fontSize="sm">Benefits</Link>
              </NextLink>
              <NextLink href="/collection/live-events">
                <Link fontSize="sm">Live Events</Link>
              </NextLink>
              <NextLink href="/collection/on-demand-workshops">
                <Link fontSize="sm">On-Demand Workshops</Link>
              </NextLink>
              <NextLink href="/private-events">
                <Link fontSize="sm">Private Events</Link>
              </NextLink>
            </Stack>
            <Stack>
              <Text fontSize="lg">Learn</Text>
              <NextLink href="/about" passHref>
                <Link fontSize="sm">About Us</Link>
              </NextLink>
              <NextLink href="/partner" passHref>
                <Link fontSize="sm">Partner With Us</Link>
              </NextLink>
              {/* <Link fontSize="sm">Blog</Link> */}
            </Stack>
            <Stack>
              <Text fontSize="lg">Communicate</Text>
              <NextLink href="/help" passHref>
                <Link fontSize="sm">Help &amp; FAQ</Link>
              </NextLink>
              <NextLink href='/contact' passHref>
                <Link fontSize="sm">Contact Us</Link>
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
