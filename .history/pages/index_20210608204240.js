import Layout from '@/components/Layout';
import { Pricing } from '@/components/Pricing';
import { useAuth } from '@/context/AuthContext';
import { Subscriptionsportal } from '@/components/Subscriptionsportal';

export default function Home() {
  const { user } = useAuth();

  return (
    <Layout>
      {user?.stripeRole !== 'free' ? <Subscriptionsportal /> : <Pricing />}
    </Layout>
  );
}
