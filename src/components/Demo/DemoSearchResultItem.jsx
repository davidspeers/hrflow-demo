import { getDate, getTime } from "@helpers/formatDate";
import { getCategoryColor } from "@helpers/getCategoryColor";
import { useState } from "react";

function DemoSearchResultItem(job) {
  {
    const {
      name,
      category,
      creationDate,
      location,
      skills,
      company,
      type,
      summary,
    } = job;

    const [isExpanded, setIsExpanded] = useState(false);

    const handleExpand = () => {
      setIsExpanded(!isExpanded);
    };

    return (
      <div className="w-full">
        <div
          className="flex items-center justify-between border-t border-gray-200"
          onClick={handleExpand}
        >
          <div className="flex-1 p-3 text-left">
            <p className="font-medium">{name}</p>
          </div>
          <div className="flex-1 p-3 text-center">
            <div
              className={`inline-flex rounded-full border border-transparent px-2 py-1 text-xs font-semibold leading-4
            ${getCategoryColor(category)}`}
            >
              {category}
            </div>
          </div>
          <div className="flex-1 p-3 text-right">
            <div>{getDate(creationDate)}</div>
            <div className="text-gray-400">{getTime(creationDate)}</div>
          </div>
        </div>
        {isExpanded && (
          <div className="flex flex-col">
            <span
              aria-hidden="true"
              className="mb-2 flex h-0.5 grow rounded bg-gray-200"
            ></span>
            <div className="flex grow flex-col">
              {summary && (
                <p className="mx-4 my-2 rounded border border-gray-300 p-2 text-sm">
                  {summary.split("\n").map((line) => (
                    <>
                      {line}
                      <br />
                    </>
                  ))}{" "}
                </p>
              )}
              <div className="flex flex-wrap">
                <div className="flex-1 p-3">
                  <p className="font-medium">Skills</p>
                  <p>{skills.join(", ")}</p>
                </div>
                <div className="flex flex-1 flex-col p-3">
                  <p className="font-medium">Location</p>
                  <p>{location}</p>
                </div>
                <div className="flex-1 p-3">
                  <p className="font-medium">Company</p>
                  <p>{company}</p>
                </div>
                <div className="flex-1 p-3">
                  <p className="font-medium">Contract</p>
                  <p>{type}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default DemoSearchResultItem;
