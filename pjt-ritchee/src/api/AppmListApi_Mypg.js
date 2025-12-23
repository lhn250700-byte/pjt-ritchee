import axios from 'axios';
import { BASE_URL } from './config';

export const getAppmList = async (a_user_id, page = 0, size = 100) => {
  const { data } = await axios.get(`${BASE_URL}/appmlist/${a_user_id}`, {
    params: { page, size },
  });
  return data;
};

export const getAppmListUpdate = async (a_id, updateData) => {
  const { data } = await axios.put(`${BASE_URL}/appmlist/update/${a_id}`, updateData);
  return data;
};

export const getAppmListDelete = async (a_id) => {
  const response = await axios.put(`${BASE_URL}/appmlist/delete/${a_id}`);
  // 응답이 있으면 성공으로 간주 (상태 코드가 2xx가 아니어도 응답이 있으면 성공)
  return response.data || response;
};
