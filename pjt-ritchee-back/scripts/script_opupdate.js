import http from 'k6/http';
import { check } from 'k6';

export const options = {
  vus: 5,
  duration: '5s',
};
// 동일 row (핵심)
const a_id = 12905;

export default function () {
  // RequestParam 방식 → URL 쿼리로 전달해야 정상 동작
  const url =
    `http://localhost:8080/api/appmlist/opinionUpdate/${a_id}` +
    `?a_dia_name=${encodeURIComponent(`k6-test-${__VU}`)}` +
    `&a_dia_content=${encodeURIComponent('optimistic-lock-test')}`;

  const res = http.put(url);

  check(res, {
    'status is 200 or 409': (r) =>
      r.status === 200 || r.status === 409,
  });

  console.log(
    `[VU ${__VU}] status=${res.status}`
  );
}