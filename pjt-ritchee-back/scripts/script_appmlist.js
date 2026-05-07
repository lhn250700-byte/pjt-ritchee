import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 100,
  duration: '10s',
};

export default function () {
  // 특정 병원의 환자별 진료 리스트 API
  const url = 'http://localhost:8080/api/appmlist/2313b12f-8a94-46a0-a6f0-48c54f44f856?page=0&size=10';

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