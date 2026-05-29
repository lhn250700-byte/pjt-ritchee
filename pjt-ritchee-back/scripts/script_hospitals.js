import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
      { duration: '30s', target: 300 },  // 30초 동안 300명까지 빠르게 상승
      { duration: '1m', target: 600 },   // 1분 동안 600명으로 1차 한계 테스트
      { duration: '1m', target: 1000 },  // 다음 1분 동안 1000명까지 올려서 서버 터뜨리기 시도
      { duration: '30s', target: 0 },
    ],
};

export default function () {
//  const url = 'http://localhost:8080/api/hospitals';
  const url = 'http://localhost/api/hospitals';
  const params = {
    headers: { 'Content-Type': 'application/json' },
  };

  const res = http.get(url, params);

  // 무차별 난사를 위해 sleep을 0.1초로 축소
  sleep(0.1);

  check(res, {
    'status is 200': (r) => r.status === 200,
  });
}