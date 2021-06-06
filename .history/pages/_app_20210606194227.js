import 'tailwindcss/tailwind.css';
import '../styles/globals.css';
import { ProvideAuth } from '@/context/AuthContext';

function MyApp({ Component, pageProps }) {
  return;
  <ProvideAuth>
    <Component {...pageProps} />;
  </ProvideAuth>;
}

export default MyApp;
