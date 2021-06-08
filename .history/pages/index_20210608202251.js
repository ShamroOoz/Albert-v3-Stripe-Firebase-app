import Layout from '@/components/Layout';
import { Pricing } from '@/components/Pricing';
import { plans } from '@/helpers/Data';
import { Subscriptionsportal } from '@/components/Subscriptionsportal';

export default function Home() {
  return (
    <Layout>
      <main className="mx-4 my-16">
        <div className="text-center">
          <h1 className="mb-4 text-2xl font-normal md:text-3xl lg:text-4xl">
            Our <span className="font-semibold">plans</span> for your{' '}
            <span className="font-semibold">strategies</span>
          </h1>
          <p className="text-sm font-normal text-gray-400">
            See below our main two plans for your startup.
          </p>
          <p className="text-sm font-normal text-gray-400">
            It start from here! You can teach yourself what you really like.
          </p>
        </div>
        <Subscriptionsportal />
        {/* plans */}
        <div className="flex flex-col items-center justify-center mt-16 space-y-8 lg:flex-row lg:items-stretch lg:space-x-8 lg:space-y-0">
          {plans?.map((plan) => (
            <Pricing key={plan.id} plan={plan} />
          ))}
        </div>
      </main>
    </Layout>
  );
}
