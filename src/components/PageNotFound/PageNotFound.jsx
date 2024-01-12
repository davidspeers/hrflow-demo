function PageNotFound() {
  return (
    <>
      <div className="mx-auto flex w-full min-w-[320px] flex-grow flex-col bg-gray-100">
        <main id="page-content" className="flex flex-auto">
          <div className="relative flex flex-grow items-center overflow-hidden bg-white ">
            <div className="container relative mx-auto space-y-8 px-8 py-16 text-center lg:py-16 xl:max-w-7xl">
              <div>
                <div className="mb-5 text-rose-300 ">
                  <svg
                    className="hi-outline hi-document-magnifying-glass inline-block size-12"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v16.5c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9zm3.75 11.625a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
                    />
                  </svg>
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
                <svg
                  className="hi-mini hi-arrow-left inline-block size-5 opacity-50 transition group-hover:opacity-100"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z"
                    clipRule="evenodd"
                  />
                </svg>
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
