// 사용자 리뷰 리스트
import axios from 'axios';
import { BASE_URL } from './config';

/**
 * 로그인한 사용자의 리뷰 전체 목록 조회
 */
export const getReviewList = async (userId, page = 0, size = 6) => {
  if (!userId) {
    throw new Error('userId가 없습니다');
  }

  try {
    const res = await axios.get(`${BASE_URL}/myreviewlist?userId=${userId}&page=${page}&size=${size}`);
    return res.data;
  } catch (error) {
    console.error('리뷰 목록 조회 실패:', error);
    throw error;
  }
};
