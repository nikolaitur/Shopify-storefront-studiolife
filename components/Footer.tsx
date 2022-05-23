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
              <Image src="/studiolife_full_logo.png" alt="StudioLife logo" h="80px" />
            <Stack>
              <Text fontSize="lg">Create Space</Text>
              <NextLink href="/collection/benefits">
                <Link fontSize="sm">Benefits</Link>
              </NextLink>
              <NextLink href="/collection/live-events">
                <Link fontSize="sm">Live Events</Link>
              </NextLink>
              <NextLink href="/collections/on-demand-workshops">
                <Link fontSize="sm">On-Demand Workshops</Link>
              </NextLink>
            </Stack>
            <Stack>
              <Text fontSize="lg">Learn</Text>
              <Link fontSize="sm">About Us</Link>
              <Link fontSize="sm">Our Space</Link>
              {/* <Link fontSize="sm">Blog</Link> */}
            </Stack>
            <Stack>
              <Text fontSize="lg">Communicate</Text>
              <NextLink href="/help" passHref>
                <Link fontSize="sm">Help &amp; FAQ</Link>
              </NextLink>
              <Link fontSize="sm">Contact Us</Link>
              {/* <Link fontSize="sm">Our Friends</Link> */}
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
