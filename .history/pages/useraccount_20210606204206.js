import { useAuth } from '@/context/AuthContext';
import Layout from '@/components/Layout';

import {
  HomeIcon,
  KeyIcon,
  UserIcon,
  CogIcon,
  LogoutIcon,
  UserCircleIcon
} from '@heroicons/react/solid';

export default function Useraccount() {
  const { user, signOut } = useAuth();

  const signout = () => {
    signOut();
  };
  return (
    <Layout>
      <div className="flex w-full h-screen overflow-hidden">
        <nav className="flex flex-col w-64 px-12 pt-4 pb-6 bg-gray-200">
          <div className="flex flex-col items-center justify-center mt-8">
            <UserCircleIcon className="object-cover w-12 h-12 rounded-full" />
            <div className="mt-4 text-sm font-semibold capitalize">
              {user?.email}
            </div>
          </div>

          <ul className="mt-2 text-gray-600">
            <li className="mt-8">
              <a href="#home" className="flex ">
                <HomeIcon className="w-5 h-5 fill-current " />

                <span className="ml-2 font-medium text-black capitalize ">
                  Parent Report
                </span>
              </a>
            </li>

            <li className="mt-8">
              <a href="#home" className="flex">
                <KeyIcon className="w-5 h-5 fill-current " />
                <span className="ml-2 font-medium text-black capitalize ">
                  Start Guide
                </span>
              </a>
            </li>

            <li className="py-2 mt-8 -ml-4 bg-white rounded-lg shadow">
              <a href="#home" className="flex pl-4">
                <UserIcon className="w-5 h-5 fill-current" />

                <span className="ml-2 font-medium capitalize">
                  Manage Profiles
                </span>
              </a>
            </li>

            <li className="mt-8">
              <a href="#home" className="flex">
                <CogIcon className="w-5 h-5 fill-current " />

                <span className="ml-2 font-medium text-black capitalize ">
                  Memberships & accounts
                </span>
              </a>
            </li>
          </ul>

          <div
            className="flex items-center text-red-700 cursor-pointer mt-28"
            onClick={signout}
          >
            <a href="#home" className="flex items-center">
              <LogoutIcon className="w-5 h-5 fill-current" />
              <span className="ml-2 font-medium capitalize">log out</span>
            </a>
          </div>
        </nav>
        <main className="flex flex-col flex-1 bg-gray-100">
          <div className="flex items-center justify-center mt-8 text-2xl font-bold uppercase ">
            Membership
          </div>
          <>{user && <UserData />}</>
        </main>
      </div>
    </Layout>
  );
}

function UserData() {
  return (
    <>
      <div className="flex items-center justify-center h-screen my-auto overflow-x-hidden overflow-y-auto outline-none min-w-screen focus:outline-none">
        <div className="relative w-full max-w-lg p-5 mx-auto my-auto bg-white shadow-lg rounded-xl ">
          <div className="justify-center flex-auto p-5 text-center">
            <h2 className="py-4 text-xl font-bold ">No active subscriptions</h2>

            <div className="p-3 mt-2 space-x-4 text-center md:block">
              <div>
                <p className="px-8 text-sm text-gray-500 ">
                  Next payment of due date here
                </p>
                <button className="block px-3 py-2 mt-2 font-semibold text-center text-white transition-colors duration-200 transform bg-indigo-600 border rounded-md shadow-sm md:inline border-transparentrounded-full mt-2inline-flex whitespace-nowrap hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  Cancel membership
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
