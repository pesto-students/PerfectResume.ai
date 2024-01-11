const CreateTemplate = () => {
  return (
    <div id="resume-root" className="w-full h-full">
      <div className="h-auto min-h-full p-5 flex flex-col">
        <div className="flex items-end">
          <div className="template-title-section flex-2 relative">
            <div className="IGNORE_THIS_IN_PDF">
              <div className="absolute right-0 bottom-0">
                <button
                  data-section="titleSection"
                  className="resume-edit-btn w-5 h-5 outline outline-1 outline-white bg-primary text-white rounded-[4px] p-[2px]"
                >
                  <img src="/pencil.svg" alt="" />
                </button>
              </div>
            </div>
            <h1 className="text-3xl leading-none font-bold text-gray-900 uppercase">
              sampath mannem
            </h1>
            <h1 className="text-xl leading-none font-medium text-gray-700 uppercase mt-2">
              Software Engineer
            </h1>
            <div className="flex items-start mt-4">
              <div className="w-[14px] h-[16px] mr-2 flex items-center justify-center text-gray-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  data-name="Layer 1"
                  viewBox="0 0 24 24"
                  width="256"
                  height="256"
                >
                  <path
                    d="M20.47,2H3.53A1.45,1.45,0,0,0,2.06,3.43V20.57A1.45,1.45,0,0,0,3.53,22H20.47a1.45,1.45,0,0,0,1.47-1.43V3.43A1.45,1.45,0,0,0,20.47,2ZM8.09,18.74h-3v-9h3ZM6.59,8.48h0a1.56,1.56,0,1,1,0-3.12,1.57,1.57,0,1,1,0,3.12ZM18.91,18.74h-3V13.91c0-1.21-.43-2-1.52-2A1.65,1.65,0,0,0,12.85,13a2,2,0,0,0-.1.73v5h-3s0-8.18,0-9h3V11A3,3,0,0,1,15.46,9.5c2,0,3.45,1.29,3.45,4.06Z"
                    fill="currentColor"
                  ></path>
                </svg>
              </div>
              <a
                href="https://linkedin.com/in/sampath-mannem"
                className="text-[12px] leading-4 text-gray-700 font-normal"
              >
                linkedin.com/in/sampath88
              </a>
            </div>
            <div className="flex items-start mt-2">
              <div className="w-[14px] h-[16px] mr-2 flex items-center justify-center text-gray-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="256"
                  height="256"
                >
                  <path
                    d="M22 12.247a10 10 0 0 1-6.833 9.488c-.507.1-.687-.214-.687-.481 0-.328.012-1.407.012-2.743a2.386 2.386 0 0 0-.679-1.852c2.228-.248 4.566-1.093 4.566-4.935a3.859 3.859 0 0 0-1.028-2.683 3.591 3.591 0 0 0-.1-2.647s-.838-.269-2.747 1.025a9.495 9.495 0 0 0-5.007 0c-1.91-1.294-2.75-1.025-2.75-1.025a3.6 3.6 0 0 0-.1 2.647 3.864 3.864 0 0 0-1.027 2.683c0 3.832 2.334 4.69 4.555 4.942A2.137 2.137 0 0 0 9.54 18a2.128 2.128 0 0 1-2.91-.831 2.1 2.1 0 0 0-1.53-1.027s-.977-.013-.069.608a2.646 2.646 0 0 1 1.109 1.463s.586 1.944 3.368 1.34c.005.835.014 1.463.014 1.7 0 .265-.183.574-.683.482A10 10 0 1 1 22 12.247Z"
                    fill="currentColor"
                  ></path>
                </svg>
              </div>
              <a
                href="https://github.com/sampath88"
                className="text-[12px] leading-4 text-gray-700 font-normal"
              >
                github.com/sampath88
              </a>
            </div>
          </div>
          <div className="template-contact-section ml-10 mr-4 relative flex-1">
            <div className="IGNORE_THIS_IN_PDF">
              <div className="absolute right-0 top-0">
                <button
                  data-section="contactInfo"
                  className="resume-edit-btn w-5 h-5 outline outline-1 outline-white bg-primary text-white rounded-[4px] p-[2px]"
                >
                  <img src="/pencil.svg" alt="" />
                </button>
              </div>
            </div>
            <div className="flex items-start">
              <div className="w-[12px] h-[16px] mr-2 flex items-center justify-center text-gray-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M2.106 6.447A2 2 0 001 8.237V16a2 2 0 002 2h14a2 2 0 002-2V8.236a2 2 0 00-1.106-1.789l-7-3.5a2 2 0 00-1.788 0l-7 3.5zm1.48 4.007a.75.75 0 00-.671 1.342l5.855 2.928a2.75 2.75 0 002.46 0l5.852-2.926a.75.75 0 10-.67-1.342l-5.853 2.926a1.25 1.25 0 01-1.118 0l-5.856-2.928z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
              <a
                href="email:palmerstone@mail.com"
                className="text-[11px] leading-4 text-gray-700"
              >
                palmerston@mail.com
              </a>
            </div>
            <div className="flex items-start mt-2">
              <div className="w-[12px] h-[16px] mr-2 flex items-center justify-center text-gray-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M2 3.5A1.5 1.5 0 013.5 2h1.148a1.5 1.5 0 011.465 1.175l.716 3.223a1.5 1.5 0 01-1.052 1.767l-.933.267c-.41.117-.643.555-.48.95a11.542 11.542 0 006.254 6.254c.395.163.833-.07.95-.48l.267-.933a1.5 1.5 0 011.767-1.052l3.223.716A1.5 1.5 0 0118 15.352V16.5a1.5 1.5 0 01-1.5 1.5H15c-1.149 0-2.263-.15-3.326-.43A13.022 13.022 0 012.43 8.326 13.019 13.019 0 012 5V3.5z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
              <p className="text-[11px] leading-4 text-gray-700">123-456-789</p>
            </div>
            <div className="flex items-start mt-2">
              <div className="w-[12px] h-[16px] mr-2 flex items-center justify-center text-gray-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 00.281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 103 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 002.273 1.765 11.842 11.842 0 00.976.544l.062.029.018.008.006.003zM10 11.25a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
              <p className="text-[11px] leading-4 text-gray-700">
                3205 Eden Drive, Glen All Virginia
              </p>
            </div>
          </div>
        </div>
        <div className="w-full mt-4 border border-solid border-gray-500"></div>
        <div className="h-full flex-1 flex flex-row">
          <div className="template-left-section w-3/5">
            <div className="mt-6 mr-4">
              <div className="template-project-section relative">
                <div className="IGNORE_THIS_IN_PDF">
                  <div className="absolute right-0 top-0">
                    <button
                      data-section="projects"
                      className="resume-edit-btn w-5 h-5 outline outline-1 outline-white bg-primary text-white rounded-[4px] p-[2px]"
                    >
                      <img src="/pencil.svg" alt="" />
                    </button>
                  </div>
                </div>
                <h1 className="text-xs leading-none text-gray-700 uppercase font-bold mb-2">
                  Projects
                </h1>
                <div>
                  <a
                    href="https://perfect-resume-gamma.vercel.app"
                    className="text-base leading-none text-gray-800 font-bold mb-2"
                  >
                    PerfectResume.ai
                  </a>
                  <p className="text-xs font-medium text-gray-700 mb-2">
                    <a
                      href="https://perfect-resume-gamma.vercel.app"
                      className="text-xs ml-0"
                    >
                      https://perfect-resume-gamma.vercel.app
                    </a>
                  </p>
                  <div className="flex items-center flex-wrap mb-1">
                    <p className="text-xs font-medium text-gray-800 mr-1">
                      Technologies:
                    </p>
                    <div data-repeat="true" className="flex items-center">
                      <p className="text-[12px] leading-4 text-gray-800">
                        Python
                      </p>
                      <span className="p-0.5 mx-1 rounded-full bg-gray-400"></span>
                    </div>
                  </div>

                  <p className="text-[11px] leading-4 text-[#6B7280]">
                    PerfectResume.ai is a web application which will empowers
                    users to create, enhance, and review resumes using AI-driven
                    features.
                  </p>
                  <div className="flex flex-row items-baseline mt-2">
                    <span className="p-0.5 mr-2 rounded-full bg-[#19010A]"></span>
                    <p className="text-[11px] leading-4 text-[#6B7280]">
                      Offers tools for resume building with pre-generated ATS
                      friendly resume Template crafted by industry experts
                    </p>
                  </div>
                  <div className="flex flex-row items-baseline mt-2">
                    <span className="p-0.5 mr-2 rounded-full bg-[#19010A]"></span>
                    <p className="text-[11px] leading-4 text-[#6B7280]">
                      AI-generated content suggestions and enhancements which
                      will help effectively showcase work and project
                      descriptions, Customize content generation based on job
                      description
                    </p>
                  </div>
                  <div className="flex flex-row items-baseline mt-2">
                    <span className="p-0.5 mr-2 rounded-full bg-[#19010A]"></span>
                    <p className="text-[11px] leading-4 text-[#6B7280]">
                      Platform to receive reviews and gather feedback from a
                      diverse range of individuals
                    </p>
                  </div>
                </div>
              </div>
              <div className="template-workExperience-section mt-8 relative">
                <div className="IGNORE_THIS_IN_PDF">
                  <div className="absolute right-0 top-0">
                    <button
                      data-section="workExperience"
                      className="resume-edit-btn w-5 h-5 outline outline-1 outline-white bg-primary text-white rounded-[4px] p-[2px]"
                    >
                      <img src="/pencil.svg" alt="" />
                    </button>
                  </div>
                </div>
                <h1 className="text-xs leading-none text-gray-700 uppercase font-bold mb-2">
                  WORK EXPERIENCE
                </h1>
              </div>
              <div
                data-repeat="true"
                className="template-workexperience-section mt-4"
              >
                <a
                  href="https://cpaydev.icorei.com/subscription/"
                  className="text-base leading-none text-gray-800 font-bold mb-2"
                >
                  cSmartHr
                </a>
                <p className="text-xs font-medium text-gray-700 mb-2">
                  <a
                    href="https://cpaydev.icorei.com/subscription/"
                    className="text-xs ml-0"
                  >
                    https://cpaydev.icorei.com/subscription/
                  </a>
                </p>
                <p className="text-[11px] leading-4 text-[#6B7280] mt-2">
                  Frontend Developer | Apr 2019 - Present
                </p>
                <div className="flex items-center flex-wrap my-1">
                  <p className="text-xs font-medium text-gray-800 mr-1">
                    Technologies:
                  </p>
                  <div data-repeat="true" className="flex items-center">
                    <p className="text-[12px] leading-4 text-gray-800">
                      Python
                    </p>
                    <span className="p-0.5 mx-1 rounded-full bg-gray-400"></span>
                  </div>
                </div>
                <div className="flex flex-row items-baseline mt-2">
                  <span className="p-0.5 mr-2 rounded-full bg-[#19010A]"></span>
                  <p className="text-[11px] leading-4 text-[#6B7280]">
                    Utilized PySpark to distribute data processing on large
                    streaming datasets to improve ingestion and processing speed
                    of that daat by 87%
                  </p>
                </div>
                <div className="flex flex-row items-baseline mt-2">
                  <span className="p-0.5 mr-2 rounded-full bg-[#19010A]"></span>
                  <p className="text-[11px] leading-4 text-[#6B7280]">
                    Build basic ETL that ingested transactional and event data
                    from a web app with 10,000 daily active users that saved
                    over $85,000 annually in external vendor costs
                  </p>
                </div>
                <div className="flex flex-row items-baseline mt-2">
                  <span className="p-0.5 mr-2 rounded-full bg-[#19010A]"></span>
                  <p className="text-[11px] leading-4 text-[#6B7280]">
                    Build basic ETL that ingested transactional and event data
                    from a web app with 10,000 daily active users that saved
                    over $85,000 annually in external vendor costs
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="template-right-section w-2/5 border-l border-solid border-gray-800">
            <div className="mt-6">
              <div className="template-skill-section mx-4 mt-6 relative">
                <div className="IGNORE_THIS_IN_PDF">
                  <div className="absolute right-0 top-0">
                    <button
                      data-section="skills"
                      className="resume-edit-btn w-5 h-5 outline outline-1 outline-white bg-primary text-white rounded-[4px] p-[2px]"
                    >
                      <img src="/pencil.svg" alt="" />
                    </button>
                  </div>
                </div>
                <h1 className="text-xs leading-none text-gray-700 uppercase font-bold mb-2">
                  Skills Summary
                </h1>
                <div className="mb-4">
                  <h1 className="text-xs leading-none text-gray-600 uppercase font-bold mb-2">
                    Front-end Development
                  </h1>
                  <div data-repeat="true" className="flex items-center">
                    <div className="mr-2 flex items-center justify-center">
                      <span className="rounded-full p-[3px] mr-[1px] bg-gray-600"></span>
                    </div>
                    <p className="text-[11px] leading-4 text-gray-800">
                      Python
                    </p>
                  </div>
                </div>
                <div className="mb-4">
                  <h1 className="text-xs leading-none text-gray-600 uppercase font-bold mb-2">
                    Back-end Development
                  </h1>
                  <div data-repeat="true" className="flex items-center">
                    <div className="mr-2 flex items-center justify-center">
                      <span className="rounded-full p-[3px] mr-[1px] bg-gray-600"></span>
                    </div>
                    <p className="text-[11px] leading-4 text-gray-800">
                      Python
                    </p>
                  </div>
                </div>
                <div className="mb-4">
                  <h1 className="text-xs leading-none text-gray-600 uppercase font-bold mb-2">
                    Databases
                  </h1>
                  <div data-repeat="true" className="flex items-center">
                    <div className="mr-2 flex items-center justify-center">
                      <span className="rounded-full p-[3px] mr-[1px] bg-gray-600"></span>
                    </div>
                    <p className="text-[11px] leading-4 text-gray-800">
                      Python
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateTemplate;
