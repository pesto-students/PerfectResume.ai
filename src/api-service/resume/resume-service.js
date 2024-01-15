import { axiosService } from "../axios-instance";
import { api } from "../config";

const createResume = async (props = {}) => {
  const { payload, options } = props;
  const response = await axiosService.multipart({
    endpoint: api.resume.create,
    payload,
    options,
  });
  return response;
};
const updateResume = async (props = {}) => {
  const { payload, params, options } = props;
  const response = await axiosService.multipartPut({
    endpoint: api.resume.update,
    payload,
    params,
    options,
  });
  return response;
};
const getResume = async (props = {}) => {
  const { params, options } = props;
  const response = await axiosService.get({
    endpoint: api.resume.get,
    params,
    options,
  });
  return response;
};

const getAllResumes = async (props = {}) => {
  const { options } = props;
  const response = await axiosService.get({
    endpoint: api.resume.getAll,
    options,
  });
  return response;
};

const generatePdf = async (props = {}) => {
  const { payload, params, options } = props;
  const response = await axiosService.getPDF({
    endpoint: api.resume.generatePdf,
    payload,
    params,
    options,
  });
  return response;
};
const generateHtmlToPdf = async (props = {}) => {
  const { payload, options } = props;
  const response = await axiosService.getPDF({
    endpoint: api.resume.generateHtmlToPdf,
    payload,
    options,
  });
  return response;
};

export {
  createResume,
  updateResume,
  getResume,
  getAllResumes,
  generatePdf,
  generateHtmlToPdf,
};
