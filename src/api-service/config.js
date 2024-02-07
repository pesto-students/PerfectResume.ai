const prefix = "api/v1";

function routeMap(path) {
  return `${prefix}${path}`;
}

const api = {
  auth: {
    login: routeMap("/auth/login"),
    signUp: routeMap("/auth/signup"),
    logout: routeMap("/auth/logout"),
    forgotPassword: routeMap("/auth/forgotPassword"),
    resetPassword: routeMap("/auth/resetPassword"),
  },
  user: {
    profile: routeMap("/users"),
  },
  templates: {
    get: routeMap("/templates"),
    getAll: routeMap("/templates"),
  },
  resume: {
    create: routeMap("/resumes"),
    update: routeMap("/resumes"),
    get: routeMap("/resumes"),
    getAll: routeMap("/resumes/user/all"),
    generatePdf: routeMap("/templates/generate-pdf"),
    generateHtmlToPdf: routeMap("/templates/generate-html-pdf"),
  },
  upload: {
    s3: routeMap("/upload/s3"),
  },
  openai: {
    rephrase: routeMap("/openai/prompt"),
  },
};

export { api };
