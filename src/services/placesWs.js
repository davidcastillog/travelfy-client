import { apiServer } from '../api/ServerAPI';
import { internalServerError, successStatus } from '../utils/clear-res';

export const createPlace = async (data) => {
  try {
    const res = await apiServer.post('/places/create', data);
    return successStatus(res);
  } catch (error) {
    return internalServerError(error);
  }
};

export const getAllPlaces = async () => {
  try {
    const res = await apiServer.get('/places');
    return successStatus(res);
  } catch (error) {
    return internalServerError(error);
  }
};

export const getOnePlace = async (id) => {
  try {
    const res = await apiServer.get(`/places/${id}`);
    return successStatus(res);
  } catch (error) {
    return internalServerError(error);
  }
};

export const updatePlace = async (id, data) => {
  try {
    const res = await apiServer.patch(`/places/update/${id}`, data);
    return successStatus(res);
  } catch (error) {
    return internalServerError(error);
  }
};

export const deletePlace = async (id) => {
  try {
    const res = await apiServer.delete(`/places/delete/${id}`);
    return successStatus(res);
  } catch (error) {
    return internalServerError(error);
  }
};