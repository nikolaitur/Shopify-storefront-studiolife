import type { AppProps } from "next/app";
import {
  extendTheme,
  ChakraProvider,
  ColorModeScript,
  ThemeComponents,
  ThemeConfig,
  Box,
  Container,
} from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";
import Footer from "components/Footer";
import Head from "next/head";
import CartContext from "lib/CartContext";
import { useState, useEffect } from "react";
import ShopContext from "lib/ShopContext";
import MailingList from "components/MailingList";
import Tawk from "lib/tawk";
import Script from "next/script";
import dynamic from "next/dynamic";
import "../styles/globals.css";

const DynNav = dynamic(() => import("../components/Navbar"), { ssr: false });

const customTheme: ThemeConfig = extendTheme({
  useSystemColorMode: false,
  initialColorMode: "light",
  colors: {
    brand: {
      black: "#333333",
      light: "#FFFFFF",
      border: "rgba(0,0,0,0.05)",
      primary: "#c7d5c3",
      secondary: "#c7d5c3",
      accent1: "#c3d5ce",
      accent2: "#d1d5c3",
      dark: "#929588",
    },
  },
  styles: {
    global: (props: ThemeComponents) => ({
      body: {
        bg: mode("brand.light", "brand.black")(props),
      },
    }),
  },
  components: {
    Heading: {
      baseStyle: {
        fontWeight: 300,
      },
    },
    Button: {
      variants: {
        solid: {
          bg: "brand.primary",
        },
      },
    },
  },
});

declare global {
  interface Window {
    Tawk_API: any;
  }
}

function MyApp({ Component, pageProps }: AppProps) {
  const [cart, setCart] = useState<any>({ id: null, lines: [] });
  const shop = {
    name: "StudioLife",
  };

  useEffect(() => {
    if (process.browser) {
      window.Tawk_API = window.Tawk_API || {};
      window.Tawk_API.customStyle = {
        zIndex: 1000,
      };
    }
  }, []);

  return (
    <ChakraProvider theme={customTheme}>
      <ShopContext.Provider value={{ shop }}>
        <Head>
          <meta name="theme-color" content="rgba(255,255,255)" />
          <link rel="icon" href="/favicon-32x32.png" type="image/x-icon" />
        </Head>
        <CartContext.Provider value={{ cart, setCart }}>
          <DynNav />
          <Box>
            <Component {...pageProps} />
            <Box
              py={20}
              px={["18px", 0]}
              bgImage={'/photos/upcoming-classes.jpg'}
              bgAttachment={["scroll", "fixed"]}
              bgSize={"cover"}
            >
              <MailingList />
            </Box>
            <Container maxW={"container.xl"} py={20}>
              <div
                style={{maxWidth: 1024, margin: '0px auto'}}
                className="embedsocial-hashtag"
                data-ref="bdd887c7d997110fa17eec92f3f237996262c6aa"
              ></div>
              <Script
                id="embed_outer"
                dangerouslySetInnerHTML={{
                  __html: `(function(d, s, id){var js; if (d.getElementById(id)) {return;} js = d.createElement(s); js.id = id; js.src = "https://embedsocial.com/cdn/ht.js"; d.getElementsByTagName("head")[0].appendChild(js);}(document, "script", "EmbedSocialHashtagScript"));`,
                }}
              />
            </Container>
            <Footer />
          </Box>
        </CartContext.Provider>
      </ShopContext.Provider>
      <ColorModeScript initialColorMode={customTheme.initialColorMode} />
      <Tawk src="https://embed.tawk.to/62266409a34c24564129e82e/1ftivdi1s" />
    </ChakraProvider>
  );
}

export default MyApp;
