import { selectAllJobsByTermAndSortedAndFiltered } from "@stores/search/searchSlice";
import RequestStatus from "@types/RequestStatus";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useSelector } from "react-redux";
import DemoLoadingSearchResultItem from "./DemoLoadingSearchResultItem";
import DemoSearchResultItem from "./DemoSearchResultItem";

function DemoSearchResults() {
  const searchStatus = useSelector((state) => state.search.status);
  const jobs = useSelector(selectAllJobsByTermAndSortedAndFiltered);

  const onDragEnd = (result) => {};

  return (
    <div className="flex min-w-full flex-col overflow-x-auto rounded border border-gray-200 bg-white text-sm">
      <div className="flex justify-between bg-gray-200/75 px-3 py-4 font-semibold text-gray-900">
        <div className="flex-1 text-left">Name</div>
        <div className="flex-1 text-center">Category</div>
        <div className="flex-1 text-right">Creation Date</div>
      </div>
      {searchStatus === RequestStatus.LOADING ? (
        <div>
          {Array.from({ length: 10 }).map((_, i) => (
            <DemoLoadingSearchResultItem key={i} />
          ))}
        </div>
      ) : (
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="jobs">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {jobs.map((job, index) => {
                  const { id, name, category, creationDate } = job;
                  return (
                    <Draggable
                      key={id}
                      draggableId={id.toString()}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="flex items-center justify-between border-t border-gray-200 even:bg-gray-50"
                        >
                          <DemoSearchResultItem
                            name={name}
                            category={category}
                            creationDate={creationDate}
                          />
                        </div>
                      )}
                    </Draggable>
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
