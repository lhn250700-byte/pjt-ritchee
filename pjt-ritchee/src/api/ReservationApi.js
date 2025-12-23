import axios from 'axios';
import { BASE_URL } from './config';

// 사용자 예약 정보 조회
export const getUserReservation = async (a_id, userId) => {
  const { data } = await axios.get(`${BASE_URL}/appmUser/${a_id}/userId/${userId}`);
  return data;
};

// 병원 관계자용 예약 정보 조회
export const getAppmContent = async (a_id) => {
  const { data } = await axios.get(`${BASE_URL}/appminfo`, { params: { a_id } });
  return data;
};

// 소견서 작성
export const postOpinionUpdate = async (a_id, opinion, warning) => {
  await axios.put(`${BASE_URL}/appmlist/opinionUpdate/${a_id}`, null, {
    params: {
      a_dia_name: opinion,
      a_dia_content: warning,
    },
  });
};

// 병원 정보 조회
export const getHospitalInfo = async (h_code) => {
  const { data } = await axios.get(`${BASE_URL}/hs_info/${h_code}`);
  return data;
};

// 병원 운영 시간 조회
export const getRunTime = async (h_code, time) => {
  const { data } = await axios.get(`${BASE_URL}/run`, {
    params: { h_code, time },
  });
  return data;
};

// 예약 생성
export const postReservation = async ({ h_code, date, content, userId }) => {
  const { data: a_id } = await axios.post(`${BASE_URL}/appm`, {
    h_code,
    a_date: date,
    a_content: content,
    a_user_id: userId,
    a_del_yn: 'N',
  });
  return a_id;
};
