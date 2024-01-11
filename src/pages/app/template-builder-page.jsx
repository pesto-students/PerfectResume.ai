import BuilderArea from "src/components/builder/builder-area";
import LayoutAssets from "src/components/builder/layout-assets";
import TreeView from "src/components/builder/tree-view";
import "src/styles/template-builder.css";

const TemplateBuilderPage = () => {
  return (
    <div className="h-full flex flex-col overflow-hidden">
      <div className="flex-1 w-full bg-gray-300">
        <div className="builder-layout h-full bg-orange-200">
          <TreeView />
          <BuilderArea />
          <LayoutAssets />
        </div>
      </div>
    </div>
  );
};

export default TemplateBuilderPage;
