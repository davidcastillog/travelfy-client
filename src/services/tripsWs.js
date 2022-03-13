import { apiServer } from '../api/ServerAPI';
import { internalServerError, successStatus } from '../utils/clear-res';

export const createTrip = async (data) => {
  try {
    const res = await apiServer.post('/trips/create', data);
    return successStatus(res);
  } catch (error) {
    return internalServerError(error);
  }
};

export const getAllTrips = async () => {
  try {
    const res = await apiServer.get('/trips');
    return successStatus(res);
  } catch (error) {
    return internalServerError(error);
  }
};

export const getOneTrip = async (id, data) => {
  try {
    const res = await apiServer.get(`/trips/${id}`, data);
    return successStatus(res);
  } catch (error) {
    return internalServerError(error);
  }
};

export const getAllPlacesFromTrip = async (id, data) => {
  try {
    const res = await apiServer.get(`/trips/${id}/places`, data);
    return successStatus(res);
  } catch (error) {
    return internalServerError(error);
  }
};

export const updateTrip = async (id, data) => {
  try {
    const res = await apiServer.patch(`/trips/update/${id}`, data);
    return successStatus(res);
  } catch (error) {
    return internalServerError(error);
  }
};

export const deleteTrip = async (id, data) => {
  try {
    const res = await apiServer.delete(`/trips/delete/${id}`, data);
    return successStatus(res);
  } catch (error) {
    return internalServerError(error);
  }
};
