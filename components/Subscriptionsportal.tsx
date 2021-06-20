import { useAuth, useProvideAuthResult } from '@/context/AuthContext';

const Subscriptionsportal: React.FC = (): JSX.Element => {
  const { user, goToBillingPortal } = useAuth() as useProvideAuthResult;
  return (
    <>
      <div className="flex items-center justify-center h-screen my-auto overflow-x-hidden overflow-y-auto outline-none min-w-screen focus:outline-none">
        <div className="relative w-full max-w-lg p-5 mx-auto my-auto bg-white shadow-lg rounded-xl ">
          <div className="justify-center flex-auto p-5 text-center">
            <h2 className="py-4 text-xl font-bold ">Current Plan</h2>

            <div className="p-3 mt-2 space-x-4 text-center md:block">
              <div>
                <p className="px-8 text-sm text-gray-500 ">
                  {user?.stripeRole}
                </p>

                <button
                  type="button"
                  onClick={() => goToBillingPortal()}
                  className="block px-3 py-2 mt-2 font-semibold text-center text-white transition-colors duration-200 transform bg-indigo-600 border rounded-md shadow-sm md:inline border-transparentrounded-full mt-2inline-flex whitespace-nowrap hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Manage subscription
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Subscriptionsportal;
