import Head from 'next/head';
import { useRouter } from 'next/router';
import { useAuth } from '@/context/AuthContext';
import Footer from './Footer';
import Header from './Header';
import Showcase from './Showcase';
import Loading from './Loading';

export default function Layout({ title, keywords, description, children }) {
  const router = useRouter();
  const { loading } = useAuth();
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
      </Head>

      <Header />
      {loading && <Loading />}

      {router.pathname === '/' && <Showcase />}
      <div>{children}</div>
      {router.pathname === '/' && <Footer />}
    </div>
  );
}

Layout.defaultProps = {
  title: 'Albert | e Education ',
  description:
    'Albert is a digital maths teacher for children. Developed to teach maths in a smart, fun and educational way',
  keywords: 'E Education, children, study, math'
};
