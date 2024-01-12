import { useState } from "react";
import DraggableBox from "./blocks/box";
import DropContainer from "./blocks/container";

const Builder = () => {
  const [boxes, setBoxes] = useState({
    box1: { top: 20, left: 80, title: "Box 1" },
    box2: { top: 120, left: 80, title: "Box 2" },
  });

  const moveBox = (id, left, top) => {
    setBoxes({
      ...boxes,
      [id]: { ...boxes[id], left, top },
    });
  };

  return (
    <div className="h-full bg-white overflow-auto p-4 py-8 flex justify-center">
      <div>
        {Object.keys(boxes).map((key) => {
          const { left, top, title } = boxes[key];
          return (
            <DraggableBox key={key} id={key} left={left} top={top}>
              {title}
            </DraggableBox>
          );
        })}
      </div>
      <div>
        <DropContainer onDrop={moveBox}></DropContainer>
      </div>
    </div>
  );
};
export default Builder;
