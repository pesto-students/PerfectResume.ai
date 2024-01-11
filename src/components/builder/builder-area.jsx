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

const BuilderArea = () => {
  const [, drop] = useDrop(() => ({
    accept: "DRAGGABLE_BLOCK",
    drop: (data) => {
      console.log("targetPane: ");
      onDrop(data);
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging,
    }),
  }));
  const [layout, setLayout] = useState(null);
  const onDragEnd = (newLayout) => {
    console.log("newLayout: ", newLayout);
    setLayout(newLayout);
  };

  const onDrop = ({ id, title }) => {
    // Duplicate the dropped component with a unique identifier
    const newComponent = { id, title };
    console.log("onDrop: ", newComponent);
    // Create a new node for the dropped component
    // Create unique keys for the first and second elements
    const firstKey = `first_${id}`;
    const secondKey = `second_${id}`;
    const newComponentNode = {
      direction: "row",
      first: (
        <div key={firstKey} className="w-[200px] h-[200px] bg-red-600"></div>
      ),
      second: (
        <div key={secondKey} className="w-[200px] h-[200px] bg-green-600"></div>
      ),
    };
    // Check if mosaicUpdate.path is defined before using it
    if (layout && Array.isArray(layout.path)) {
      // Update the layout state with the new component node using updateTree
      setLayout(updateTree(layout, layout.path, newComponentNode));
    } else {
      // If mosaicUpdate.path is undefined, set the layout as the newComponentNode
      setLayout(newComponentNode);
    }
  };

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
          renderTile={(id, path) => (
            <div
              id={id}
              key={id}
              path={path}
              className="border-8 border-gray-300 border-solid"
            ></div>
          )}
          initialValue={layout}
          onChange={onDragEnd}
          zeroStateView={<div>Drag and drop components here</div>}
        />
      </div>
    </div>
  );
};

export default BuilderArea;
