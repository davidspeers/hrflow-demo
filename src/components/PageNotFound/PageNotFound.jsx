import { BackArrowIcon, SearchPageIcon } from "@icons";

function PageNotFound() {
  return (
    <>
      <div className="mx-auto flex w-full min-w-[320px] flex-grow flex-col">
        <main id="page-content" className="flex flex-auto">
          <div className="relative flex flex-grow items-center overflow-hidden bg-gray-50">
            <div className="container relative mx-auto space-y-8 px-8 py-16 text-center lg:py-16 xl:max-w-7xl">
              <div>
                <div className="mb-5 text-rose-300 ">
                  <SearchPageIcon />
                </div>
                <div className="text-6xl font-extrabold text-rose-600 md:text-7xl ">
                  404
                </div>
                <div
                  className="mx-auto my-6 h-1.5 w-12 rounded-lg bg-gray-200 md:my-10"
                  aria-hidden="true"
                />
                <h1 className="mb-3 text-2xl font-extrabold md:text-3xl">
                  Page Couldn&rsquo;t Be Found
                </h1>
                <h2 className="mx-auto mb-5 font-medium text-gray-500 md:leading-relaxed lg:w-3/5">
                  Maybe it&rsquo;s been moved or deleted. Sorry about that!
                </h2>
              </div>
              <a
                href="/demo"
                className="group inline-flex items-center justify-center rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-semibold leading-5 text-gray-800 hover:border-gray-300 hover:text-gray-900 hover:shadow-sm focus:ring focus:ring-gray-300 focus:ring-opacity-25 active:border-gray-200 active:shadow-none"
              >
                <BackArrowIcon />
                <span>Back to Demo</span>
              </a>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default PageNotFound;
