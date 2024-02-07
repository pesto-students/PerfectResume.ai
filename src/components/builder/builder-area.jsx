import {
  Mosaic,
  MosaicWindow,
  updateTree,
  MosaicWithoutDragDropContext,
} from "react-mosaic-component";
import "react-mosaic-component/react-mosaic-component.css";
import DraggableBlock from "./blocks/primitive-block";
import { useState } from "react";
import { useDrop } from "react-dnd";
import CustomWindow from "./blocks/custom-mosaic-window";

const BuilderArea = () => {
  // Initial layout with one window
  // State for the layout and window count
  const [layout, setLayout] = useState({
    direction: "row",
    first: "a",
    second: "b",
  });
  const [windowCount, setWindowCount] = useState(1);
  const [hasDropped, setHasDropped] = useState(false);
  const [hasDroppedOnChild, setHasDroppedOnChild] = useState(false);

  const onLayoutChange = (newLayout) => {
    setLayout(newLayout);
  };

  const [{ isOver, isOverCurrent }, drop] = useDrop(
    () => ({
      accept: "DRAGGABLE_BLOCK",
      drop: (item, monitor) => {
        const didDrop = monitor.didDrop();
        console.log("didDrop: ", didDrop);
        setHasDropped(true);
        setHasDroppedOnChild(didDrop);
        onDrop(item);
      },
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
        isOverCurrent: monitor.isOver({ shallow: true }),
        canDrop: !!monitor.canDrop(),
      }),
    }),
    [layout, setHasDropped, setHasDroppedOnChild],
  );

  console.log("isOverCurrent: ", isOverCurrent);
  console.log("isOver: ", isOver);
  const onDrop = ({ id, title }) => {
    addWindow();
  };

  const addWindow = () => {
    const newWindowId = `window${windowCount + 1}`;

    const updateLayout = (currentLayout) => {
      console.log("updateLayout: ", currentLayout); // output: "a"
      // If the current layout is a string, it's a leaf node and can be split
      if (typeof currentLayout === "string") {
        return {
          direction: "row",
          first: currentLayout,
          second: newWindowId,
          splitPercentage: 50,
        };
      }

      // If the current layout is an object, recursively update the last part (second)
      return {
        ...currentLayout,
        second: updateLayout(currentLayout.second),
      };
    };

    const newLayout = updateLayout(layout);
    setLayout(newLayout);
    setWindowCount(windowCount + 1);
  };

  const handleDragOverWindow = (event) => {
    console.log("handleDragOverWindow: ", event);
  };

  const renderWindow = (id, path) => {
    return (
      <CustomWindow
        path={path}
        title={`Window ${id}`}
        onDragOverWindow={handleDragOverWindow}
      ></CustomWindow>
    );
  };

  // const renderCustomWindow = (id, path) => {
  //   return (
  //     <div path={path} className="border-8 border-gray-300 border-solid"></div>
  //   );
  // };

  return (
    <div className="h-full bg-white overflow-auto p-4 py-8 flex justify-center">
      <div className="my-8">
        <DraggableBlock title="box1" id="box1" onDrop={onDrop} />
        <DraggableBlock title="box2" id="box2" onDrop={onDrop} />
      </div>
      <div
        className="w-[210mm] min-w-[210mm] h-[320mm] min-h-[297mm]"
        ref={drop}
      >
        <MosaicWithoutDragDropContext
          renderTile={renderWindow}
          value={layout}
          onChange={onLayoutChange}
          zeroStateView={<div>Drag and drop components here</div>}
        />
      </div>
    </div>
  );
};

export default BuilderArea;
