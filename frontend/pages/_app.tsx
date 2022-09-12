import '../styles/globals.css';
import '@rainbow-me/rainbowkit/styles.css';
import type { AppProps } from 'next/app';
import { RainbowKitProvider, getDefaultWallets, lightTheme, Chain } from '@rainbow-me/rainbowkit';
import { chain, configureChains, createClient, WagmiConfig } from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';

const mumbaiChain: Chain = {
  id: 77,
  network: 'sokol',
  name: 'Gnosis Testnet (Sokol)',
  nativeCurrency: {
    decimals: 18,
    name: 'SPOA',
    symbol: 'SPOA',
  },
  rpcUrls: {
    default: 'https://sokol.poa.network/',
  },
  blockExplorers: {
    default: { name: 'Blockscout', url: 'https://blockscout.com/poa/sokol' },
  },
  testnet: true,
  iconUrl: '/img/gnosis.png',
};

const { chains, provider, webSocketProvider } = configureChains(
  [
  chain.polygonMumbai
  ],
  [
    alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_ID }),
    publicProvider()
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'HackerHouse',
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains} 
            theme={lightTheme({
              accentColor: '#4f45e4',
              accentColorForeground: 'white',
              borderRadius: 'medium',
            })}>
        <Component {...pageProps} />
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;
