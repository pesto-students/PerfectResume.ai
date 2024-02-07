import CreateTemplate from "src/components/create-template";
import { generateHtmlToPdf } from "src/api-service/resume/resume-service";
import { useContext } from "react";
import { LoaderContext } from "src/contexts/loader-context";

const CreateTemplatePage = () => {
  const { toggleLoader } = useContext(LoaderContext);

  const downloadResume = async () => {
    let reqProps = {};
    let htmlString = document.getElementById("resume-root").outerHTML;
    reqProps["payload"] = {
      html: htmlString,
    };
    toggleLoader(true, "Pdf is Downloading, Please wait for few seconds...");
    const response = await generateHtmlToPdf(reqProps);
    toggleLoader();
    if (response.status) {
      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      document.body.appendChild(a);
      a.style = "display: none";
      a.href = url;
      const name = "MyResume";
      a.download = name + ".pdf";
      a.click();
      window.URL.revokeObjectURL(url);
    }
  };
  return (
    <div className="h-full flex justify-center overflow-auto p-8 ">
      <div className="h-full">
        <div className="flex flex-col items-center justify-start max-w-[600px] w-full h-full mb-8">
          <div data-title="header" className="w-full mb-4">
            <div className="w-full flex justify-between items-center">
              <div>
                <h1 className="text-base text-primary font-medium">
                  Create Template
                </h1>
              </div>
              <div className="flex items-center">
                <button
                  type="button"
                  className="px-3 py-1.5 ml-2 text-xs font-semibold text-center uppercase inline-flex items-center text-white bg-accent rounded-md border-2 border-accent  hover:bg-accent-900 hover:border-accent-900 focus:ring-4 focus:outline-none focus:ring-accent-300"
                  onClick={downloadResume}
                >
                  Create
                </button>
              </div>
            </div>
          </div>
          <div className=" w-[210mm] min-w-[210mm] shadow-[0_6px_15px_#00000029] p-1 rounded border-t border-solid border-[#f3f3f3]">
            <div className="w-[210mm] min-w-[210mm] min-h-[297mm] h-[297mm] overflow-y-auto overflow-x-hidden custom-scrollbar">
              <CreateTemplate />
            </div>
          </div>
        </div>
        <div className="h-[200px]"></div>
      </div>
    </div>
  );
};

export default CreateTemplatePage;
