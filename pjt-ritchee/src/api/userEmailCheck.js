import axios from 'axios';
import { BASE_URL } from './config';

// 이메일 중복 체크
export const checkUserEmail = async (useremail) => {
  const { data } = await axios.get(`${BASE_URL}/useremailchk`, {
    params: { email: useremail },
  });
  return data;
};

