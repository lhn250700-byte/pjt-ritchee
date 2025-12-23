import axios from 'axios';
import { BASE_URL } from './config';

// 병원 목록
export const getHospitalList = async () => {
  const { data } = await axios.get(`${BASE_URL}/hospital`);
  return data;
};

export const getMedicalList = async (userId, page = 0, size = 10) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/appmlist/${userId}?page=${page}&size=${size}`);
    return data;
  } catch (error) {
    console.error('진료 기록 조회 실패:', error);
    throw error;
  }
};
