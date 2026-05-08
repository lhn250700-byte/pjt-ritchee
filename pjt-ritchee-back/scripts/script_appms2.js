import http from 'k6/http';
import { check } from 'k6';

export const options = {
  vus: 100,
  duration: '10s',
};

// 실제 테스트용 유저 UUID
const userIds = [
  '406db7d8-f16b-4eee-8e50-f4f98ad346e9',
  'e7e43b27-654a-4e6a-a0b5-b600f046a7e8',
  'af3bd32d-143f-413f-aac6-d1da823f7d25',
  '4b587e16-5b72-4004-8489-4d0b3c2c0ae0',
  'cf4b825a-dd2f-4e2a-aba3-0fac1da9b1fc',
  '6b5ae66c-fc24-4023-a4a3-fa24093d62b5',
  '2313b12f-8a94-46a0-a6f0-48c54f44f856',
  '5d63b022-fb26-4300-9330-93a9ed18d622',
  'c8cffa26-9aff-4bf4-867a-9f7f0145c008',
  '653c4d8d-d3e3-4387-8127-ffb09acb1a2c',
];

export default function () {
  const url = 'http://localhost:8080/api/appms';

  // 각 VU마다 다른 유저 사용
  const userId = userIds[(__VU - 1) % userIds.length];

  // 동일 예약 슬롯 경쟁
  const payload = JSON.stringify({
    h_code: 'A1107492',
    a_date: '2026-05-08 17:00',
    a_content: '동시성 테스트',
    a_user_id: userId,
    a_del_yn: 'N',
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const res = http.post(url, payload, params);

  check(res, {
    'status is 200 or 201 or 409': (r) =>
      r.status === 200 ||
      r.status === 201 ||
      r.status === 409,
  });

  console.log(
    `[VU ${__VU}] user=${userId} status=${res.status}`
  );

  console.log("======================")
  console.log(res.status, res.body);
  console.log("======================")
}