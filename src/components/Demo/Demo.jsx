import DemoSearchBar from "./DemoSearchBar";
import DemoSearchResults from "./DemoSearchResults";

function Demo() {
  return (
    <div
      id="page-container"
      className="flex w-full min-w-[320px] flex-grow flex-col bg-gray-50"
    >
      <main
        id="page-content"
        className="flex max-w-full flex-auto flex-col space-y-4 overflow-hidden px-8 text-center xl:max-w-7xl"
      >
        <DemoSearchBar />
        <DemoSearchResults />
      </main>
    </div>
  );
}

export default Demo;
