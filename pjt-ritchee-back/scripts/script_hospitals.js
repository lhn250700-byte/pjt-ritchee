import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 100,
  duration: '10s',
};

export default function () {
  // 전체 병원 조회 API
  // 실제 서버 주소는 환경에 따라 다름 → 확실하지 않음
  const url = 'http://localhost:8080/api/hospitals';

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const res = http.get(url, params);

  sleep(1);

  check(res, {
    'status is 200': (r) => r.status === 200,
  });
}