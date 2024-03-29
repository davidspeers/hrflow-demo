import { ReorderIcon } from "@icons";
import {
  selectAllJobs,
  selectCategoryFilters,
  selectSearchTerm,
  updateJobPosition,
  updateSortFilter,
} from "@stores/search/searchSlice";
import RequestStatus from "@types/RequestStatus";
import SortFilter from "@types/sortFilter";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import DemoLoadingSearchResultItem from "./DemoLoadingSearchResultItem";
import DemoSearchResultItem from "./DemoSearchResultItem";

function DemoSearchResults() {
  const dispatch = useDispatch();

  const searchStatus = useSelector((state) => state.search.status);
  const jobs = useSelector(selectAllJobs);
  const searchTerm = useSelector(selectSearchTerm);
  const categoryFilters = useSelector(selectCategoryFilters);

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination } = result;

    dispatch(updateSortFilter(SortFilter.CUSTOM));
    dispatch(
      updateJobPosition({
        oldPosition: source.index,
        newPosition: destination.index,
      }),
    );
  };

  const getIsJobShown = (job) => {
    const isJobFiltered =
      categoryFilters.length === 0
        ? true
        : categoryFilters
            .map((filter) => filter.toLowerCase())
            .includes(job.category?.toLowerCase());
    const isJobSearched = job.name
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase());
    return isJobFiltered && isJobSearched;
  };

  return (
    <div className="flex flex-col overflow-x-auto rounded border border-gray-200 bg-white text-sm">
      <div className="flex justify-between bg-gray-200/75 px-3 py-4 font-semibold text-gray-900">
        <div className="flex-1 text-left">Job Title</div>
        <div className="hidden flex-1 text-center sm:block">Category</div>
        <div className="flex-1 text-right">Creation Date</div>
      </div>
      {searchStatus === RequestStatus.LOADING ? (
        <div>
          {Array.from({ length: 10 }).map((_, i) => (
            <DemoLoadingSearchResultItem key={i} />
          ))}
        </div>
      ) : searchStatus === RequestStatus.SUCCEEDED && jobs.length === 0 ? (
        <div className="p-8 font-semibold text-gray-800">No jobs found.</div>
      ) : (
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="jobs">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {jobs.map((job, index) => {
                  const isJobShown = getIsJobShown(job);
                  const { id } = job;
                  return (
                    isJobShown && (
                      <Draggable
                        key={id}
                        draggableId={id.toString()}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            className="flex even:bg-slate-100"
                          >
                            <DemoSearchResultItem {...job} />
                            <div
                              className="mt-6 pb-0.5 text-gray-400"
                              {...provided.dragHandleProps}
                            >
                              <ReorderIcon />
                            </div>
                          </div>
                        )}
                      </Draggable>
                    )
                  );
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      )}
    </div>
  );
}

export default DemoSearchResults;
