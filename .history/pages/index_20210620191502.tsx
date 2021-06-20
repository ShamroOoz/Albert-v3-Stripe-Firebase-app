import Layout from '@/components/Layout';
import { Pricing } from '@/components/Pricing';
import { useAuth } from '@/context/AuthContext';
import Subscriptionsportal from '@/components/Subscriptionsportal';

const Home: React.FC = (): JSX.Element => {
  const { user } = useAuth();
  return (
    <Layout>
      {user && user?.stripeRole !== 'free' ? (
        <Subscriptionsportal />
      ) : (
        <Pricing />
      )}
    </Layout>
  );
};
export default Home;
