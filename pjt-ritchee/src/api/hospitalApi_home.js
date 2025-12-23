import axios from "axios";
import { BASE_URL } from "./config";

// 병원 평점순 목록 조회
export const getHospitalsByRating = async (page = 0, size = 6) => {
  const { data } = await axios.get(`${BASE_URL}/hs_evalpt`, {
    params: { page, size },
  });
  return data;
};

// 병원 리뷰 많은 순 목록 조회
export const getHospitalsByReview = async (page = 0, size = 6) => {
  const { data } = await axios.get(`${BASE_URL}/hs_review`, {
    params: { page, size },
  });
  return data;
};

// 병원 댓글 많은 순 목록 조회
export const getHospitalsByCommentCnt = async (page = 0, size = 6) => {
  const { data } = await axios.get(`${BASE_URL}/hs_commentcnt`, {
    params: { page, size },
  });
  return data;
};

// 인기 병원 TOP 목록 조회
export const getTopHospitals = async (page = 0, size = 3) => {
  const { data } = await axios.get(`${BASE_URL}/hs_toplist`, {
    params: { page, size },
  });
  return data;
};
