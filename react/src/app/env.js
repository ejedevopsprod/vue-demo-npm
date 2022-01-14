export const api = {
  dev: process.env.REACT_APP_DEV_BASE_URL,
  stage: process.env.REACT_APP_STAGE_BASE_URL,
  production: process.env.REACT_APP_PROD_BASE_URL,
};

let env = process.env.REACT_APP_ENV || "dev";

export const apiURL = api[env];
