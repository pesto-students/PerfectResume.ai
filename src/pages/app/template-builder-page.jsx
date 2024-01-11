import BuilderArea from "src/components/builder/builder-area";
import LayoutAssets from "src/components/builder/layout-assets";
import TreeView from "src/components/builder/tree-view";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import "src/styles/template-builder.css";

const TemplateBuilderPage = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="h-full flex flex-col overflow-hidden">
        <div className="h-full w-full bg-gray-300 overflow-hiddden">
          <div className="builder-layout h-full bg-orange-200">
            <TreeView />
            <BuilderArea />
            <LayoutAssets />
          </div>
        </div>
      </div>
    </DndProvider>
  );
};

export default TemplateBuilderPage;
