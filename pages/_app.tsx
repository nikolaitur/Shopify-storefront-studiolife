import type { AppProps } from 'next/app';
import {
  extendTheme,
  ChakraProvider,
  ColorModeScript,
  ThemeComponents,
  ThemeConfig,
  Box,
} from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';
import NavBar from '../components/Navbar';
import Footer from '../components/Footer';
import Head from 'next/head';
import CartContext from 'lib/CartContext';
import { useState, useEffect } from 'react';
import ShopContext from 'lib/ShopContext';
import '../styles/globals.css';
import Tawk from 'lib/tawk';
import MailingList from 'components/MailingList';

const customTheme: ThemeConfig = extendTheme({
  useSystemColorMode: false,
  initialColorMode: 'light',
  colors: {
    brand: {
      black: '#333333',
      light: '#FFFFFF',
      border: 'rgba(0,0,0,0.05)',
      primary: '#c7d5c3',
      secondary: '#c7d5c3',
      accent1: '#c3d5ce',
      accent2: '#d1d5c3',
      dark: '#929588',
    },
  },
  styles: {
    global: (props: ThemeComponents) => ({
      body: {
        bg: mode('brand.light', 'brand.black')(props),
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
          bg: 'brand.primary',
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
    name: 'StudioLife',
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
          <meta name="theme-color" content="rgba(36,36,36)" />
          <link rel="icon" href="/favicon-32x32.png" type="image/x-icon" />
        </Head>
        <CartContext.Provider value={{ cart, setCart }}>
          <NavBar />
          <Box>
            <Component {...pageProps} />
            <Box
              py={40}
              px={['18px', 0]}
              bgImage={'/photos/upcoming-classes.jpg'}
              bgAttachment={['scroll', 'fixed']}
            >
              <MailingList />
            </Box>
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
