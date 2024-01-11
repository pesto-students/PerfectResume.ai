import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Template from "src/components/template";
import TemplateForm from "src/components/template-form";
import {
  setResumeData,
  setTemplateData,
  updateResumeMetaData,
} from "src/store/builderSlice";
import GearIcon from "src/assets/icons/gear.svg?react";
import InfoIcon from "src/assets/icons/info.svg?react";
import DownloadIcon from "src/assets/icons/download.svg?react";
import ShareIcon from "src/assets/icons/share.svg?react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { initFlowbite } from "flowbite";
import CreateResumeForm from "src/components/create-resume-form";
import {
  generatePdf,
  getResume,
  updateResume,
} from "src/api-service/resume/resume-service";
import { getTemplate } from "src/api-service/template/template-service";
import { htmlToBlob } from "src/utils/htmlToBlob";
import { toast } from "react-toastify";
import Skeleton from "react-loading-skeleton";
import FetchError from "src/components/fetch-error";
import Tippy from "@tippyjs/react";
import OpenAiConfigForm from "src/components/form/openai-config-form";
import CropTool from "src/components/crop-tool";
import { uploadPhoto } from "src/api-service/upload/upload-service";
import { useContext } from "react";
import { LoaderContext } from "src/contexts/loader-context";
import { setActiveSection } from "src/store/editorSlice";

const BuildResume = () => {
  const { action, templateId, resumeId } = useParams();
  const { template, resume, metaData } = useSelector(
    (state) => state.builderState,
  );
  const { config } = useSelector((state) => state.openAiState);
  // const [metaData, setMetaData] = useState(finalMetaData);
  const [openCreateResumeForm, setOpenCreateResumeForm] = useState(false);
  const [openCropTool, setOpenCropTool] = useState(false);
  const [uploadImageSrc, setUploadImageSrc] = useState({});
  const [openAiConfigForm, setOpenAiConfigForm] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toggleLoader } = useContext(LoaderContext);

  const isUpdateMode = action === "update" && !!resumeId;

  // Query for fetching template data
  const fetchTemplate = async () => {
    const response = await getTemplate({ params: templateId });
    if (!response.status) {
      throw new Error(JSON.stringify(response));
    }
    return response.data;
  };

  // Query for fetching resume data
  const fetchResume = async () => {
    const response = await getResume({ params: resumeId });
    if (!response.status) {
      throw new Error(JSON.stringify(response));
    }
    return response.data;
  };

  // React Query for template
  const {
    isLoading: isTemplateLoading,
    error: templateError,
    data: templateData,
  } = useQuery({
    queryKey: ["template", templateId],
    queryFn: fetchTemplate,
    enabled: !!templateId, // Ensure templateId is not null or undefined
    retry: 2,
  });

  // React Query for resume
  const {
    isLoading: isResumeLoading,
    error: resumeError,
    data: resumeData,
  } = useQuery({
    queryKey: ["resume", resumeId],
    queryFn: fetchResume,
    enabled: isUpdateMode, // Only enabled if action is 'update' and resumeId is present
  });
  const isLoading = isTemplateLoading || isResumeLoading;
  const hasError = templateError || (action === "update" && resumeError);

  const updateMetaData = (newMetaData) => {
    const updatedMetaData = { ...metaData, ...newMetaData };
    // setMetaData(updatedMetaData);
    dispatch(updateResumeMetaData({ metaData: updatedMetaData }));
  };

  const resetMetaData = () => {
    if (isUpdateMode) {
      updateMetaData(resume.metaData);
    } else {
      updateMetaData(template.metaData);
    }
    dispatch(setActiveSection(""));
  };

  const onSaveResume = () => {
    if (!isUpdateMode) {
      setOpenCreateResumeForm(true);
    } else {
      handleUpdateResume();
    }
  };

  const handleUpdateResume = async () => {
    const node = document.getElementById("resume-root");
    node.style["width"] = "595px";
    node.style["height"] = "842px";

    toggleLoader(
      true,
      "Please wait for few seconds, while we update your Resume",
    );
    const resumeBlob = await htmlToBlob(node);
    const payload = new FormData();
    payload.append("image", resumeBlob, resume.name);
    payload.append("data", JSON.stringify({ metaData: metaData }));
    const response = await updateResume({ params: resume.id, payload });
    toggleLoader();
    if (response.status) {
      toast.success(response.msg || "Resume updation success", {
        position: toast.POSITION.TOP_CENTER,
      });
    } else {
      toast.error(response.msg, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  const downloadResume = async () => {
    let reqProps = {};
    if (resumeId) {
      reqProps["params"] = resumeId;
    } else {
      reqProps["payload"] = {
        template: templateData.template,
        metaData: metaData,
      };
    }
    toggleLoader(true, "Pdf is Downloading, Please wait for few seconds...");
    const response = await generatePdf(reqProps);
    toggleLoader();
    if (response.status) {
      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      document.body.appendChild(a);
      a.style = "display: none";
      a.href = url;
      const name = resumeData ? resumeData.name : "resume";
      a.download = name + ".pdf";
      a.click();
      window.URL.revokeObjectURL(url);
    }
  };

  function onSelectFile(imageObj) {
    setUploadImageSrc({ ...imageObj });
  }

  const cancelCrop = () => {
    setOpenCropTool(false);
    setUploadImageSrc({});
  };

  const onSaveCrop = async (blob) => {
    const payload = new FormData();
    payload.append("image", blob, blob.name);
    toggleLoader(true, "Uploading the photo, Please wait...");
    const response = await uploadPhoto({ payload });
    toggleLoader();
    if (response.status) {
      toast.success(response.msg || "Photo upload success", {
        position: toast.POSITION.TOP_CENTER,
      });
      setOpenCropTool(false);
      setUploadImageSrc({});
      const uniqueString = Date.now().toString(); // Use current timestamp as unique string
      const uniqueUrl = response.data.url + "?unique=" + uniqueString;
      updateMetaData({ profilePic: { photo: uniqueUrl } });
    } else {
      toast.error(response.msg, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };
  useEffect(() => {
    if (uploadImageSrc && uploadImageSrc.src) {
      setOpenCropTool(true);
    } else {
      setOpenCropTool(false);
    }
  }, [uploadImageSrc]);

  useEffect(() => {
    if (resumeData) {
      dispatch(setResumeData({ resume: resumeData }));
    }
  }, [resumeData]);

  useEffect(() => {
    if (templateData) {
      if (!isUpdateMode) {
        updateMetaData(templateData.metaData);
      }
      dispatch(setTemplateData({ template: templateData }));
    }
  }, [templateData]);

  useEffect(() => {
    if (hasError) {
      const error = templateError || resumeError;
      const errorObj = JSON.parse(error.message);
      if (errorObj && errorObj.data && errorObj.data.statusCode === 404) {
        const message = isUpdateMode
          ? "Resume Not Found"
          : "Template Not Found";
        toast.error(message, {
          position: toast.POSITION.TOP_CENTER,
        });
        const path = isUpdateMode ? "/app" : "/app/build-resume";
        return navigate(path, { replace: true });
      }
    }
  }, [templateError, resumeError]);

  useEffect(() => {
    initFlowbite();
  }, [templateData, resumeData]);

  if (hasError) {
    return (
      <div>
        <FetchError />
      </div>
    );
  }

  return (
    <>
      <div className="h-full hidden flex-col px-10 py-4 pt-8 min-[900px]:flex">
        <div data-component="create-resume-form">
          <CreateResumeForm
            openModal={openCreateResumeForm}
            setOpenModal={setOpenCreateResumeForm}
          />
        </div>
        <div data-component="crop-tool">
          <CropTool
            imageObj={uploadImageSrc}
            openModal={openCropTool}
            setOpenModal={cancelCrop}
            onSaveCrop={onSaveCrop}
          />
        </div>
        <div className="flex justify-center mb-10">
          {resumeData ? (
            <h1 className="text-2xl text-gray-800 font-semibold uppercase underline">
              {resumeData.name}
            </h1>
          ) : (
            <h1 className="text-2xl text-gray-800 font-semibold capitalize">
              Create New Resume
            </h1>
          )}
        </div>
        <div className="flex-1 flex justify-center gap-x-[5%]">
          <div className="flex flex-col items-start justify-start max-w-[600px] w-full h-auto mb-8">
            <div data-title="header" className="w-full mb-4">
              <div className="w-full flex justify-between items-center">
                <div>
                  <h1 className="text-base text-primary font-medium">
                    Block Editor
                  </h1>
                </div>
                <div>
                  {isLoading ? (
                    <div>
                      <Skeleton width={110} height={36} />
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      <Tippy
                        content="Please ensure you update your AI configuration to align with the job title and description you're targeting."
                        theme={"light"}
                      >
                        <div className="me-2 text-gray-400 cursor-pointer">
                          <InfoIcon />
                        </div>
                      </Tippy>

                      <div className=" relative">
                        {!config.jobDescription ? (
                          <div className="absolute -left-1 -top-1">
                            <span className="relative flex h-3 w-3">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                            </span>
                          </div>
                        ) : null}

                        <button
                          type="button"
                          className="px-3 py-2 text-xs font-medium text-center inline-flex items-center text-white bg-accent rounded-lg hover:bg-accent-900 focus:ring-4 focus:outline-none focus:ring-accent-300"
                          onClick={() =>
                            setOpenAiConfigForm((toggle) => !toggle)
                          }
                        >
                          <span className="me-2">
                            <GearIcon />
                          </span>
                          Configure AI
                        </button>
                      </div>
                    </div>
                  )}
                </div>
                <OpenAiConfigForm
                  openModal={openAiConfigForm}
                  setOpenModal={setOpenAiConfigForm}
                />
              </div>
            </div>
            <TemplateForm />
          </div>
          <div className="flex flex-col items-center justify-start max-w-[600px] w-full h-full mb-8">
            <div data-title="header" className="w-full mb-4">
              <div className="w-full flex justify-between items-center">
                <div>
                  <h1 className="text-base text-primary font-medium">
                    Template View
                  </h1>
                </div>
                {isLoading ? (
                  <div>
                    <Skeleton width={200} height={32} />
                  </div>
                ) : (
                  <div className="flex items-center">
                    <button
                      type="button"
                      className="px-3 py-1.5 ml-2 text-xs font-semibold text-center uppercase inline-flex items-center text-gray-800 bg-white rounded-md border-2 border-gray-300  hover:bg-gray-300 focus:ring-4 focus:outline-none focus:ring-accent-300"
                      onClick={() => resetMetaData()}
                    >
                      Reset
                    </button>
                    <button
                      type="button"
                      className="px-3 py-1.5 ml-2 text-xs font-semibold text-center uppercase inline-flex items-center text-white bg-accent rounded-md border-2 border-accent  hover:bg-accent-900 hover:border-accent-900 focus:ring-4 focus:outline-none focus:ring-accent-300"
                      onClick={() => onSaveResume()}
                    >
                      {isUpdateMode ? "Update" : "Create"}
                    </button>
                    <Tippy content="Download Resume">
                      <button
                        type="button"
                        className="px-1.5 py-1.5 ml-2 text-xs font-medium text-center inline-flex items-center text-white bg-accent rounded-md hover:bg-accent-900 focus:ring-4 focus:outline-none focus:ring-accent-300"
                        onClick={() => downloadResume()}
                      >
                        <DownloadIcon />
                      </button>
                    </Tippy>
                    {/* <Tippy content="Share your Resume">
                    <button
                      type="button"
                      className="px-1.5 py-1.5 ml-2 text-xs font-medium text-center inline-flex items-center text-white bg-accent rounded-md hover:bg-accent-900 focus:ring-4 focus:outline-none focus:ring-accent-300"
                    >
                      <ShareIcon />
                    </button>
                  </Tippy> */}
                  </div>
                )}
              </div>
            </div>
            <div className=" w-full shadow-[0_6px_15px_#00000029] p-1 rounded border-t border-solid border-[#f3f3f3]">
              {isLoading ? (
                <div>
                  <Skeleton
                    className="w-[350px] lg:w-[400px] xl:w-[592px]"
                    height={840}
                  />
                </div>
              ) : (
                <Template onSelectFile={onSelectFile} />
              )}
            </div>
          </div>
        </div>
        <div className="w-full h-[300px] bg-transparent"></div>
      </div>
      <div className="h-full flex flex-col justify-center items-center px-10 py-4 pt-8 min-[900px]:hidden">
        <h1 className="text-2xl font-semibold text-primary">
          Builder View currently works only on Desktop view
        </h1>
      </div>
    </>
  );
};

export default BuildResume;
