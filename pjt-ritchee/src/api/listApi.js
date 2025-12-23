import axios from 'axios';
import { BASE_URL } from './config';

// 특정 병원의 예약 리스트 (관리자용으로 관리자의 user_id가 필요함)
export const getAppmListOfHospital = async (a_user_id, page, size) => {
  const { data } = await axios.get(`${BASE_URL}/appmListOfHospital`, {
    params: {
      a_user_id,
      page,
      size,
    },
  });

  return data;
};

// 리스트 and 검색 리스트(in List.jsx)
export const getHospitalList = async ({ page = 0, size = 10, sortType = 'rating', para1, para2, para3 }) => {
  const isSearch = para1 || para2 || para3;

  let endpoint = 'hs_evalpt';
  if (sortType === 'review') endpoint = 'hs_review';
  else if (sortType === 'comment') endpoint = 'hs_commentcnt';

  const url = isSearch
    ? `${BASE_URL}/hs${sortType === 'review' ? '_review' : sortType === 'comment' ? '_comment' : ''}_find_para`
    : `${BASE_URL}/${endpoint}`;

  const { data } = await axios.get(url, {
    params: {
      page,
      size,
      ...(isSearch && { para1, para2, para3 }),
    },
  });

  return data;
};
