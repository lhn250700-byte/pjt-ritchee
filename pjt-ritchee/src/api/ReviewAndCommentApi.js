import axios from 'axios';
import { BASE_URL } from './config';

// 댓글 리스트 (in Comment.jsx)
export const getCommentsByReviewId = async (reviewId) => {
  const { data } = await axios.get(`${BASE_URL}/comment`, {
    params: { reviewId },
  });
  return data;
};

// 댓글 작성 (in Comment.jsx)
export const createComment = async ({ reviewId, content, userId }) => {
  const { data } = await axios.post(`${BASE_URL}/comment`, {
    reviewId,
    c_content: content,
    userId,
  });
  return data;
};

// 병원 리뷰 목록 조회 (in DentistReview.jsx)
export const getReviewsByHospital = async ({ h_code, page = 0, size = 5 }) => {
  const { data } = await axios.get(`${BASE_URL}/rs_review`, {
    params: {
      h_code,
      page,
      size,
    },
  });

  return data;
};

// 리뷰 상세 조회
export const getReviewDetail = async (reviewId) => {
  const { data } = await axios.get(`${BASE_URL}/myreviewlist/${reviewId}`);
  return data;
};

// 리뷰 좋아요 수 조회
export const getReviewLikeCount = async (reviewId) => {
  const { data } = await axios.get(`${BASE_URL}/likeRVCnt/${reviewId}`);
  return data;
};

// 내가 이 리뷰에 좋아요 했는지 조회
export const getMyReviewLike = async ({ userId, reviewId }) => {
  const { data } = await axios.get(`${BASE_URL}/onelike/${userId}/reviewId/${reviewId}`);
  return data;
};

// 리뷰 좋아요
export const likeReview = async ({ reviewId, userId }) => {
  const { data } = await axios.post(`${BASE_URL}/LikeOne`, {
    r_id: reviewId,
    h_user_id: userId,
  });
  return data;
};

// 리뷰 좋아요 취소
export const unlikeReview = async ({ likeId, reviewId, userId }) => {
  const { data } = await axios.delete(`${BASE_URL}/LikeOne`, {
    data: {
      l_id: likeId,
      r_id: reviewId,
      h_user_id: userId,
    },
  });
  return data;
};
