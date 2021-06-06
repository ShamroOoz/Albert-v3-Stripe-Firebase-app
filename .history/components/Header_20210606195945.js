import Link from 'next/link';
import { useRouter } from 'next/router';
import { MenuAlt3Icon, XIcon, UserIcon } from '@heroicons/react/solid';
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';

export default function Header() {
  const [isOpen, setisOpen] = useState(false);
  const [dropopen, setdropopen] = useState(false);
  const { user, signOut } = useAuth();
  const router = useRouter();

  const signout = () => {
    signOut();
    router.push('/');
  };

  return (
    <div className="antialiased bg-gray-100 dark-mode:bg-gray-900">
      <div className="w-full text-gray-700 bg-white dark-mode:text-gray-200 dark-mode:bg-gray-800">
        <div className="flex flex-col max-w-screen-xl px-4 mx-auto md:items-center md:justify-between md:flex-row md:px-6 lg:px-8">
          <div className="flex flex-row items-center justify-between p-4">
            <Link href="/">
              <a className="text-lg font-semibold tracking-widest text-gray-900 uppercase rounded-lg dark-mode:text-white focus:outline-none focus:shadow-outline">
                Albert
              </a>
            </Link>
            <button
              className="rounded-lg md:hidden focus:outline-none focus:shadow-outline"
              onClick={() => setisOpen(!isOpen)}
            >
              {isOpen ? (
                <XIcon className="w-5 h-5 text-blue-500" />
              ) : (
                <MenuAlt3Icon className="w-5 h-5 text-blue-500" />
              )}
            </button>
          </div>

          <nav
            className={`flex flex-col relative flex-grow  pb-4 md:pb-0 md:flex md:justify-end md:flex-row ${
              isOpen ? 'flex' : 'hidden'
            }`}
          >
            <a
              className="px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
              href="/"
            >
              Junior 3-9år
            </a>
            <a
              className="px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
              href="/"
            >
              Albert 10-16år
            </a>
            <a
              className="px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
              href="/"
            >
              Nya funktioner
            </a>
            {user && (
              <>
                <button
                  onClick={() => setdropopen(!dropopen)}
                  className="relative px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                >
                  <span className="flex items-center justify-center">
                    <UserIcon className="w-5 h-5 text-blue-500" />
                    {user?.email}
                  </span>
                </button>
                {dropopen && (
                  <div className="absolute w-full mt-2 origin-top-right rounded-md shadow-lg right-2 top-7 md:w-48">
                    <div className="px-2 py-2 bg-white rounded-md shadow dark-mode:bg-gray-800">
                      <Link href="/useraccount">
                        <a className="block px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline">
                          User Account
                        </a>
                      </Link>
                      <button
                        onClick={signout}
                        className="block px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
            {!user && (
              <>
                <button className="justify-center px-4 py-2 mr-3 text-sm font-medium text-black bg-white border border-transparent rounded-full shadow-sm outline-none mt-2inline-flex whitespace-nowrap hover:bg-indigo-700 ring-2 ring-offset-2 ring-indigo-500">
                  <span className="flex items-center justify-center">
                    <img src={'/google.png'} className="w-5 mr-3 h5" /> Sign in
                    with Google
                  </span>{' '}
                </button>
              </>
            )}
          </nav>
        </div>
      </div>
    </div>
  );
}
