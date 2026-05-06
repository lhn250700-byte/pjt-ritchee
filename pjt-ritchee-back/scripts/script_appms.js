import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 100,
  duration: '10s',
};

export default function () {
  // 예약 API (엔드포인트는 환경에 따라 다를 수 있음 → 확실하지 않음)
  const url = 'http://localhost:8080/api/appms';

  const payload = JSON.stringify({
    h_code: 'A1107492',
    a_date: '2026-05-07 16:00',
    a_content: '치통',
    a_user_id: '2313b12f-8a94-46a0-a6f0-48c54f44f856',
    a_del_yn: 'N'
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const res = http.post(url, payload, params);

  sleep(1);

  check(res, {
    'status is 200 or 201': (r) => r.status === 200 || r.status === 201,
  });
}