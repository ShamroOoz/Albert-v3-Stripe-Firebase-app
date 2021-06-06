export default function Showcase() {
  return (
    <div className="bg-white dark:bg-gray-800">
      <div className="container flex flex-col px-6 py-4 mx-auto space-y-6 md:h-128 md:py-16 md:flex-row md:items-center md:space-x-6">
        <div className="flex flex-col items-center w-full md:flex-row md:w-1/2">
          <div className="max-w-lg md:mx-12 md:order-2">
            <h1 className="text-3xl font-medium tracking-wide text-gray-800 dark:text-white md:text-4xl">
              Play and learn in a game-inspired world
            </h1>
            <p className="mt-4 text-gray-600 dark:text-gray-300">
              Engaging exercises and games, specially developed to arouse
              curiosity and valuable knowledge.
            </p>
            <div className="mt-6">
              <a
                href="/"
                className="block px-3 py-2 font-semibold text-center text-white transition-colors duration-200 transform bg-indigo-600 border rounded-md shadow-sm md:inline border-transparentrounded-full mt-2inline-flex whitespace-nowrap hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 "
              >
                Download from App Store
              </a>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center w-full h-96 md:w-1/2">
          <img
            className="object-cover w-full h-full max-w-2xl rounded-md"
            src="https://hejalbert.se/junior/junior_zigzag_3_se.png"
            alt="apple watch photo"
          />
        </div>
      </div>
    </div>
  );
}
