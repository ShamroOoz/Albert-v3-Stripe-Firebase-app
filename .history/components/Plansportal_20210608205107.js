import { useRouter } from 'next/router';

const Plansportal = ({ plan }) => {
  const router = useRouter();
  const onClicklistner = () => {};

  return (
    <section className="flex flex-col w-full max-w-sm p-12 space-y-6 bg-white rounded-lg shadow-xl">
      <div className="flex-shrink-0">
        <span
          className={`text-4xl font-medium tracking-tight ${
            plan.name == 'PLUS' ? 'text-green-500' : ''
          }`}
        >
          {plan.price.monthly}
        </span>
        <span className="text-gray-400"> SEK/mån</span>
      </div>

      <div className="flex-shrink-0 pb-6 space-y-2 border-b">
        <h2 className="text-2xl font-normal">{plan.name}</h2>
        <p className="text-sm text-gray-400">{plan.discretion}</p>
      </div>

      <ul className="flex-1 space-y-4">
        {plan?.features.map((feature, index) => (
          <li className="flex items-start" key={index}>
            <svg
              className="w-6 h-6 text-green-300"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span className="ml-3 text-base font-medium">{feature}</span>
          </li>
        ))}
      </ul>

      <div className="flex-shrink-0 pt-4">
        <button
          onClick={onClicklistner}
          className={`inline-flex items-center justify-center w-full max-w-xs px-4 py-2 transition-colors border rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
            plan.name == 'PLUS'
              ? 'bg-indigo-600 text-white hover:bg-indigo-700'
              : 'hover:bg-indigo-700 hover:text-white'
          }`}
        >
          {`Get ${plan.name}`}
        </button>
      </div>
    </section>
  );
};

export default Plansportal;
