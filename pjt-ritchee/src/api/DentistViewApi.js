import axios from 'axios';
import { BASE_URL } from './config';

// 병원 정보 불러오기
export const getHospitalDetail = async (h_code) => {
  const { data } = await axios.get(`${BASE_URL}/hs_info/${h_code}`);
  return data;
};
