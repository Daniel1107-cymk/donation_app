import axios from 'axios';
import {SERVER_DOMAIN} from '../constants/server';
import Session from './session';
import {errorHandler} from './errorHandler';

const axiosInstance = axios.create({
  baseURL: SERVER_DOMAIN,
  headers: {Accept: 'application/json', 'Content-Type': 'application/json'},
});

const axiosInstanceFormData = axios.create({
  baseURL: SERVER_DOMAIN,
  headers: {Accept: 'application/json', 'Content-Type': 'multipart/form-data'},
});

axiosInstance.interceptors.request.use(async config => {
  const token = await Session.getValue('token');
  config.headers.token = token ? token : '';
  return config;
});

axiosInstanceFormData.interceptors.request.use(async config => {
  const token = await Session.getValue('token');
  config.headers.token = token ? token : '';
  return config;
});

const getData = async path => {
  try {
    const response = await axiosInstance.get(path);
    return {
      success: response.data.success,
      data: response.data.data,
    };
  } catch (error) {
    return errorHandler(error);
  }
};

const postData = async (path, data) => {
  try {
    const response = await axiosInstance.post(path, data);
    return {
      success: response.data.success,
      data: response.data.data,
    };
  } catch (error) {
    return errorHandler(error);
  }
};

const postFormData = async (path, data, callback) => {
  try {
    var config = {
      onUploadProgress: callback,
    };
    const response = await axiosInstanceFormData.post(path, data, config);
    return {
      success: response.data.success,
      data: response.data.data,
    };
  } catch (error) {
    return errorHandler(error);
  }
};

const putFormData = async (path, data) => {
  try {
    const response = await axiosInstanceFormData.put(path, data);
    return {
      success: response.data.success,
      data: response.data.data,
    };
  } catch (error) {
    console.log(error);
    return errorHandler(error);
  }
};

const putData = async (path, data) => {
  try {
    const response = await axiosInstance.put(path, data);
    return {
      success: response.data.success,
      data: response.data.data,
    };
  } catch (error) {
    return errorHandler(error);
  }
};

const deleteData = async path => {
  try {
    const response = await axiosInstance.delete(path);
    return {
      success: response.data.success,
      data: response.data.data,
    };
  } catch (error) {
    return errorHandler(error);
  }
};

export {
  getData as get,
  postData as post,
  putData as put,
  deleteData as remove,
  postFormData as postForm,
  putFormData as putForm,
};
