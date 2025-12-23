import axios from 'axios';
import { BASE_URL } from './config';

/**
 * 리뷰 작성
 * POST /api/review
 */
export const createReview = async (reviewData) => {
  try {
    const res = await axios.post(`${BASE_URL}/review`, reviewData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return res.data; // 서버에서 반환하는 메시지
  } catch (error) {
    console.error('리뷰 등록 실패:', error);
    throw error;
  }
};

// 병원 목록
export const getHospitalList = async () => {
  const { data } = await axios.get(`${BASE_URL}/hospital`);
  return data;
};
