import {
  VStack,
  Text,
  Icon,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Divider,
  Image,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { CgMenuGridR } from "react-icons/cg";
import styles from "../styles/navbar.module.scss";
import Link from "next/link";
// import getCollections from 'lib/get-collections';

const Menu = () => {
  const {
    isOpen: menuIsOpen,
    onOpen: menuOnOpen,
    onClose: menuOnClose,
  } = useDisclosure();
  const router = useRouter();
  // const [collections, setCollections] = useState<any>([]);

  useEffect(() => {
    router.events.on("routeChangeStart", menuOnClose);

    // async function run() {
    //   const result = await getCollections("homepage");

    //   setCollections(result.collections.edges);
    // }

    // run();

    return () => {
      router.events.off("routeChangeStart", menuOnClose);
    };
  }, []);

  return (
    <>
      <Icon
        as={CgMenuGridR}
        onClick={menuOnOpen}
        style={{
          cursor: "pointer",
        }}
        h={8}
        w={8}
        _hover={{
          opacity: 0.4,
        }}
        transition={"opacity 200ms ease"}
      />
      <Drawer
        isOpen={menuIsOpen}
        placement="left"
        onClose={menuOnClose}
        size="md"
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>
            <Image
              src="/studiolife_full_logo.png"
              h="80px"
              alt="StudioLife logo"
            />
          </DrawerHeader>
          <DrawerBody p={8}>
            <VStack spacing={2} alignItems={"flex-start"}>
              <MenuItem url={"/"} text="Home" />
              <>
                <Divider />
                <Text fontSize="18px" fontWeight={600}>create space</Text>
                <MenuItem url={`/collection/benefits`} text={"benefits"} />
                <MenuItem url={`/collection/live-events`} text={"live events"} />
                <MenuItem url={`/collection/on-demand-workshops`} text={"on-demand-workshops"} />
                <Divider />
              </>
              <MenuItem
                url={"/private-events"}
                text="Private + Corporate Events"
              />
              <MenuItem url={"/partner"} text="Partner with us" />
              <MenuItem url={"/about"} text="About" />
              {/* <MenuItem url={'/blog'} text="Blog" /> */}
              {/* <MenuItem url={"/help"} text="Help" /> */}
              <MenuItem url={"/contact"} text="Contact" />
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Menu;

const MenuItem = ({ url, text }: { url: string; text: string }) => {
  return (
    <Link href={url} passHref>
      <Text
        cursor={"pointer"}
        fontSize={["24px"]}
        fontWeight={300}
        textTransform="lowercase"
        className={styles.menuItem}
      >
        {text}
      </Text>
    </Link>
  );
};
