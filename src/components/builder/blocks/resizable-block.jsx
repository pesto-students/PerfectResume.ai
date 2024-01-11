import { useState } from "react";
import { Resizable } from "re-resizable";
import PropTypes from "prop-types";

const ResizableBlock = ({ id, title }) => {
  const [width, setWidth] = useState(200);
  return (
    <Resizable
      width={width}
      height={100}
      onResize={(e, direction, ref, d) => {
        setWidth(width + d.width);
      }}
    >
      <div data-id={id} className="border border-solid border-gray-500 p-2 m-2">
        {title}
      </div>
    </Resizable>
  );
};

ResizableBlock.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
};

export default ResizableBlock;
