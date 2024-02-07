import { useState } from "react";
import Bucket from "./blocks/bucket";
import Box from "./blocks/box";
import { v4 as uuidv4 } from "uuid";

const boxes = [
  {
    id: `Box-1-original-${uuidv4()}`,
    data: {
      title: "Box-1",
      type: "BOX",
      top: 20,
      left: 80,
    },
  },
  {
    id: `Box-2-original-${uuidv4()}`,
    data: {
      title: "Box-2",
      type: "BLOCK",
      top: 20,
      left: 80,
    },
  },
  {
    id: `Box-3-original-${uuidv4()}`,
    data: {
      title: "Box-3",
      type: "BOX",
      top: 20,
      left: 80,
    },
  },
  {
    id: `Box-4-original-${uuidv4()}`,
    data: {
      title: "Box-4",
      type: "BLOCK",
      top: 20,
      left: 80,
    },
  },
];
const Builder = () => {
  const [blocks, setBlocks] = useState([]);

  const onDrop = (droppedItem) => {
    console.log("droppedItem: ", droppedItem);
    setBlocks((blocks) => [...blocks, droppedItem]);
  };

  const renderBlock = (block, type) => {
    console.log(block);
    if (type !== block.type) return null;
    const { title, top, left } = block;
    const id = `${title}-copy-${uuidv4()}`;
    return (
      <div
        key={id}
        style={{ top: `${top}px`, left: `${left}px` }}
        className={`absolute`}
      >
        <Box id={id} data={{ title, type: "BLOCK", top, left }} type="BLOCK">
          {title}
        </Box>
      </div>
    );
  };

  return (
    <div className="h-full  flex-col bg-white overflow-auto p-4 py-8 flex ">
      <div className="flex items-center flex-wrap gap-1">
        {boxes.map((box) => {
          const { id, data } = box;
          return (
            <Box key={id} id={id} data={data}>
              {data.title}
            </Box>
          );
        })}
      </div>
      <div className="flex items-center gap-5">
        <div>
          <Bucket onDrop={onDrop} type="BOX">
            {blocks.map((block) => renderBlock(block, "BOX"))}
          </Bucket>
        </div>
        <div className="my-4">
          <Bucket onDrop={onDrop} type="BLOCK">
            {blocks.map((block) => renderBlock(block, "BLOCK"))}
          </Bucket>
        </div>
      </div>
    </div>
  );
};
export default Builder;
