function DemoLoadingSearchResultItem() {
  return (
    <tr className="h-12 animate-pulse even:bg-gray-50">
      <td className="p-3">
        <div className="h-2 rounded bg-slate-200"></div>
      </td>
      <td className="flex h-12 items-center justify-center p-3">
        <div className="h-2 max-w-12 flex-grow rounded bg-slate-200"></div>
      </td>
      <td className="p-3">
        <div className="flex items-center justify-end ">
          <div className="h-2 max-w-24 flex-grow rounded bg-slate-200"></div>
        </div>
      </td>
    </tr>
  );
}

export default DemoLoadingSearchResultItem;
