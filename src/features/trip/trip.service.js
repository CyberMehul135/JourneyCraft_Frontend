import { authAxios } from "@/services/axios";

export const generateAiTrip = async (payload) => {
  const res = await authAxios.post(`/api/v1/itinery/generate`, payload);
  return res.data;
};

export const generateAiRecommendedTrip = async (payload) => {
  const res = await authAxios.post(`/api/v1/itinery/recommended`, payload);
  return res.data;
};

export const createTrip = async (tripData) => {
  const res = await authAxios.post(`/api/v1/itinery/`, tripData);
  return res.data;
};

export const getTrips = async (search = "") => {
  const res = await authAxios.get(`/api/v1/itinery/?search=${search}`);
  return res.data;
};

export const getTrip = async (travelPlanId) => {
  const res = await authAxios.get(`/api/v1/itinery/${travelPlanId}`);
  return res.data;
};

export const deleteTrip = async (tripId) => {
  const res = await authAxios.delete(`/api/v1/itinery/${tripId}`);
  return res.data;
};

export const getTripStats = async () => {
  const res = await authAxios.get(`/api/v1/itinery/stats`);
  return res.data;
};

export const getAiModels = async () => {
  const res = await authAxios.get(`/api/v1/ai/models`);
  return res.data;
};

export const toggleFavouriteTrip = async (id) => {
  const res = await authAxios.patch(`/api/v1/itinery/${id}/favourite`);
  return res.data;
};
