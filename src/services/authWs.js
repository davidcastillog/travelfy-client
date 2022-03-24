import { apiServer } from '../api/ServerAPI';
import { internalServerError, successStatus } from '../utils/clear-res';

export const loginWS = async (data) => {
  try {
    const res = await apiServer.post('/auth/login', data);
    return successStatus(res);
  } catch (error) {
    return internalServerError(error);
  }
};

export const signUpWS = async (data) => {
  try {
    const res = await apiServer.post('/auth/signup', data);
    return successStatus(res);
  } catch (error) {
    return internalServerError(error);
  }
};

export const changePasswordWS = async (data) => {
  try {
    const res = await apiServer.post('/auth/changepassword', data);
    return successStatus(res);
  } catch (error) {
    return internalServerError(error);
  }
};

export const updateUserWS = async (data) => {
  try {
    const res = await apiServer.post('/auth/update', data);
    return successStatus(res);
  } catch (error) {
    return internalServerError(error);
  }
};

export const logoutWS = async () => {
  try {
    const res = await apiServer.post('/auth/logout');
    return successStatus(res);
  } catch (error) {
    return internalServerError(error);
  }
};

export const getUserWS = async () => {
  try {
    const res = await apiServer.get('/auth/getuser');
    return successStatus(res);
  } catch (error) {
    return internalServerError(error);
  }
};