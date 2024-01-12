function DemoLoadingSearchResultItem() {
  return (
    <div className="flex h-16 animate-pulse items-center justify-between border-t border-gray-200 even:bg-slate-100">
      <div className="ml-3 flex-1">
        <div className="h-2 max-w-60 rounded bg-slate-200"></div>
      </div>
      <div className="hidden flex-1 items-center justify-center sm:flex">
        <div className="h-2 max-w-36 flex-grow rounded bg-slate-200"></div>
      </div>
      <div className="flex flex-1 items-center justify-end">
        <div className="mr-3 h-2 max-w-16 flex-grow rounded bg-slate-200"></div>
      </div>
    </div>
  );
}

export default DemoLoadingSearchResultItem;
