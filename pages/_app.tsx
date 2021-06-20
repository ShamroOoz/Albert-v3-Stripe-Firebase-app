/* eslint-disable react/jsx-props-no-spreading */
/* eslint import/no-extraneous-dependencies: ["error", {"peerDependencies": true}] */
import type { AppProps } from 'next/app';
import '../styles/globals.css';
import 'tailwindcss/tailwind.css';
import { ProvideAuth } from '@/context/AuthContext';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ProvideAuth>
      <Component {...pageProps} />;
    </ProvideAuth>
  );
}

export default MyApp;
