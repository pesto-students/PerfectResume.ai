import PropTypes from "prop-types";
import StarsIcon from "src/assets/icons/stars.svg?react";
import Tippy from "@tippyjs/react/headless";
import { rephrase } from "src/api-service/openai/openai-service";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import BotIcon from "src/assets/icons/bot.svg?react";
import Copy from "src/assets/icons/copy.svg?react";
import ArrowRight from "src/assets/icons/arrow-right.svg?react";
import ArrowStackUp from "src/assets/icons/arrow-stack-up.svg?react";
import SpinnerIcon from "src/assets/icons/spinner.svg?react";
import { useState, useRef } from "react";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { updateMetaDataSection } from "src/store/builderSlice";

const AiRephraseBox = ({
  metaData,
  activeSection,
  field,
  data,
  rephraseCacheId,
  onApplyText,
}) => {
  const { config } = useSelector((state) => state.openAiState);
  const [phrases, setPhrases] = useState([]);
  const [userInteracting, setUserInteracting] = useState(false);
  const [hasPhrases, setHasPhrases] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [currentContext, setCurrentContext] = useState("");
  const [isReqPending, setIsReqPending] = useState(false);
  const scrollableRef = useRef(null);
  const dispatch = useDispatch();

  // Query for fetching phrases
  const fetchPhrases = async () => {
    setIsReqPending(true);
    const response = await rephrase({
      payload: { config: config, text: data },
    });
    setIsReqPending(false);
    if (!response.status) {
      throw new Error(JSON.stringify(response));
    }
    return response.data;
  };

  const {
    isLoading,
    error,
    data: phrasesData,
    refetch,
  } = useQuery({
    queryKey: [`phrases${field}${rephraseCacheId}`],
    queryFn: fetchPhrases,
    enabled: false,
    retry: false,
  });

  const rephraseHandleError = () => {
    const errorObj = JSON.parse(error.message);
    toast.error(errorObj.msg, {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  const rephraseHandler = () => {
    // check the condition twice
    if (phrasesData && !isLoading && !error) {
      if (!hasPhrases) {
        setHasPhrases(true);
      }
      const { versions } = phrasesData;
      if (data && currentContext !== data) {
        setCurrentContext(data);
        setPhrases((phrases) => [
          ...phrases,
          { text: data, system: false },
          ...versions,
        ]);
      } else {
        setPhrases((phrases) => [...phrases, ...versions]);
      }
    }
  };

  const applyText = (value) => {
    onApplyText({ field, value });
  };

  const copyText = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        toast.success("Text copied to clipboard", {
          position: toast.POSITION.TOP_CENTER,
        });
      })
      .catch(() => {
        toast.error("Failed to copy", {
          position: toast.POSITION.TOP_CENTER,
        });
      });
    const data = metaData[activeSection];
  };

  const toggleRephraseBox = () => {
    if (!phrases.length) {
      refetch();
    }
    if (!isVisible) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const handleScroll = () => {
    const container = scrollableRef.current;
    if (!userInteracting && isVisible && container) {
      container.scrollTop = container.scrollHeight;
    }
  };

  const handleUserEnter = () => {
    setUserInteracting(true);
  };
  const handleUserLeave = () => setUserInteracting(false);

  // Setup event listeners to change state based on user interaction
  useEffect(() => {
    const container = scrollableRef.current;
    if (!container) return;

    container.addEventListener("mouseenter", handleUserEnter);
    container.addEventListener("mouseleave", handleUserLeave);

    return () => {
      container.removeEventListener("mouseenter", handleUserEnter);
      container.removeEventListener("mouseleave", handleUserLeave);
    };
  }, [hasPhrases]);

  useEffect(() => {
    handleScroll();
  }, [phrases, isVisible]);

  useEffect(() => {
    if (phrasesData) {
      rephraseHandler(phrasesData);
    }
    if (error) {
      rephraseHandleError();
    }
  }, [phrasesData, error]);

  return (
    <Tippy
      render={() => (
        <div
          className="z-10 bg-white rounded-lg shadow-lg border border-solid border-gray-300 overflow-hidden
            w-[500px] dark:bg-gray-700"
        >
          <div className="h-96 overflow-hidden">
            {phrases.length ? (
              <div className="h-full flex flex-col">
                <div className="flex items-center px-4 py-2 border-b border-solid border-gray-200">
                  <span className="inline-block pb-2 me-1">
                    <BotIcon className="w-7 h-7" />
                  </span>
                  <h1 className="text-lg font-semibold text-center">
                    Resume.AI
                  </h1>
                </div>
                <div
                  className="flex-1 px-5 pt-2 pb-5 overflow-y-auto custom-scrollbar scroll-smooth"
                  ref={scrollableRef}
                >
                  <div>
                    {phrases.map((phrase, index) => {
                      return (
                        <div key={index} className="mb-5 group">
                          <div
                            className={`flex items-start gap-2 ${
                              !phrase.system
                                ? "bg-gray-100 p-4 mt-8 rounded border border-solid border-gray-200"
                                : ""
                            }`}
                          >
                            {phrase.system ? (
                              <span className="text-gray-700 mt-1">
                                <ArrowRight className="w-4 h-4" />
                              </span>
                            ) : null}

                            <p
                              className={`text-sm leading-6 font-normal text-[#374151] ${
                                phrase.system
                                  ? "text-[#374151]"
                                  : "text-[#303947]"
                              }`}
                            >
                              {phrase.text}
                            </p>
                            <div className="invisible group-hover:visible">
                              <button
                                className={`p-2 ms-2 text-gray-400 shadow-md
                                rounded   hover:text-gray-600 hover:bg-gray-200 ${
                                  phrase.system ? "bg-gray-100" : "bg-gray-50 "
                                }`}
                                onClick={() => applyText(phrase.text)}
                              >
                                <ArrowStackUp className="w-4 h-4" />
                              </button>
                              <button
                                className={`hidden p-2 ms-2 text-gray-400 shadow-md
                                  rounded   hover:text-gray-600 hover:bg-gray-200 ${
                                    phrase.system
                                      ? "bg-gray-100"
                                      : "bg-gray-50 "
                                  }`}
                                onClick={() => copyText(phrase.text)}
                              >
                                <Copy className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="flex justify-center items-center bg-white py-4 border-t border-solid border-gray-200">
                  <button
                    type="submit"
                    disabled={isReqPending ? true : false}
                    className={`${
                      isReqPending
                        ? "bg-accent-700 cursor-not-allowed"
                        : "bg-accent hover:bg-accent-900 cursor-pointer"
                    } px-3 py-2 text-xs font-medium text-center inline-flex items-center text-white  rounded-md  focus:ring-4 focus:outline-none focus:ring-accent-300`}
                    onClick={() => refetch()}
                  >
                    {isReqPending ? (
                      <>
                        <SpinnerIcon />
                        <span>Generating...</span>
                      </>
                    ) : (
                      "Generate More"
                    )}
                  </button>
                </div>
              </div>
            ) : (
              <div className="h-full flex-col flex justify-center items-center">
                <div className="flex justify-center items-center">
                  <span className="inline-block pb-2 mx-1">
                    <BotIcon className="w-7 h-7" />
                  </span>
                  <h1 className="text-lg font-semibold text-center">
                    Resume.AI
                  </h1>
                </div>
                <div className="mt-4">
                  <h1 className="text-lg font-semibold text-center">
                    Please wait, while AI Rephrases your context
                  </h1>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      interactive={true}
      appendTo={document.body}
      placement="bottom-end"
      visible={isVisible}
      onClickOutside={() => setIsVisible(false)}
    >
      <button
        type="button"
        className="flex bg-accent text-white p-1 rounded-lg overflow-hidden mx-2"
        onClick={() => {
          toggleRephraseBox();
        }}
      >
        <StarsIcon className="w-6 h-6" />
      </button>
    </Tippy>
  );
};

AiRephraseBox.propTypes = {
  metaData: PropTypes.object,
  activeSection: PropTypes.string,
  field: PropTypes.string,
  data: PropTypes.string,
  rephraseCacheId: PropTypes.string,
  onApplyText: PropTypes.func,
};

export default AiRephraseBox;
