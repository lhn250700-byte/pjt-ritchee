import React, { useEffect, useState } from 'react';
import Button from '../../../componetns/Button';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import moment from 'moment';
import axios from 'axios';
import { useUser } from '../../../context/UserContext';
import { getHospitalInfo, getRunTime } from '../../../api/ReservationApi';
import { BASE_URL } from '../../../api/config';

// 요일 이름
const WEEK_DAYS = ['일', '월', '화', '수', '목', '금', '토'];
// 2025~2026 대한민국 공휴일 (한글 이름만)
const holidays = [
  // 2025년
  { date: '2025-01-01', name: '신정' },
  { date: '2025-01-28', name: '설날 연휴' },
  { date: '2025-01-29', name: '설날' },
  { date: '2025-01-30', name: '설날 연휴' },
  { date: '2025-03-01', name: '삼일절' },
  { date: '2025-03-03', name: '삼일절 대체공휴일' },
  { date: '2025-05-05', name: '어린이날 / 부처님오신날' },
  { date: '2025-05-06', name: '대체공휴일' },
  { date: '2025-06-06', name: '현충일' },
  { date: '2025-08-15', name: '광복절' },
  { date: '2025-10-03', name: '개천절' },
  { date: '2025-10-05', name: '추석 연휴' },
  { date: '2025-10-06', name: '추석' },
  { date: '2025-10-07', name: '추석 연휴' },
  { date: '2025-10-08', name: '추석 대체공휴일' },
  { date: '2025-10-09', name: '한글날' },
  { date: '2025-12-25', name: '성탄절' },

  // 2026년
  { date: '2026-01-01', name: '신정' },
  { date: '2026-02-16', name: '설날 연휴' },
  { date: '2026-02-17', name: '설날' },
  { date: '2026-02-18', name: '설날 연휴' },
  { date: '2026-03-01', name: '삼일절' },
  { date: '2026-03-02', name: '삼일절 대체공휴일' },
  { date: '2026-05-05', name: '어린이날 / 부처님오신날' },
  { date: '2026-05-25', name: '부처님오신날 대체공휴일' },
  { date: '2026-06-06', name: '현충일' },
  { date: '2026-08-15', name: '광복절' },
  { date: '2026-08-17', name: '광복절 대체공휴일' },
  { date: '2026-09-24', name: '추석 연휴' },
  { date: '2026-09-25', name: '추석' },
  { date: '2026-09-26', name: '추석 연휴' },
  { date: '2026-10-03', name: '개천절' },
  { date: '2026-10-05', name: '개천절 대체공휴일' },
  { date: '2026-10-09', name: '한글날' },
  { date: '2026-12-25', name: '성탄절' },
];

function ReservationForm() {
  // [달력 관련]
  const [currentDate, setCurrentDate] = useState(new Date()); // 현재 보여줄 달
  const [selectedDate, setSelectedDate] = useState(null); // 선택한 날짜

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // 한 달의 날짜 배열 생성
  const getMonthDays = (year, month) => {
    const firstDay = new Date(year, month, 1).getDay(); // 첫 요일
    const lastDate = new Date(year, month + 1, 0).getDate(); // 마지막 날짜
    const days = [];

    // 이전 달 공백
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }

    // 이번 달 날짜
    for (let i = 1; i <= lastDate; i++) {
      days.push(new Date(year, month, i));
    }

    return days;
  };

  const days = getMonthDays(year, month);

  // 이전/다음 달 이동
  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  // 오늘 날짜
  const today = new Date();

  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const h_code = query.get('id');
  const [hospital, setHospital] = useState({});
  const { user } = useUser();
  const nav = useNavigate();

  const runTime = async () => {
    try {
      const data = await getRunTime(h_code, formData.reservationTime);
      return data;
    } catch (error) {
      console.error('run time info fetch error', error);
      return;
    }
  };

  // 병원 정보 가져오기
  const fetch = async () => {
    try {
      const data = await getHospitalInfo(h_code);
      setHospital(data);
    } catch (err) {
      console.error('Single Hospital Info Fetch Error', err.message);
      return;
    }
  };
  const [isCalendar, setIsCalendar] = useState(false);
  const [privacyChecked, setPrivacyChecked] = useState(false);
  const [formData, setFormData] = useState({
    hospitalSymptom: '',
    reservationDate: '',
    reservationTime: '',
  });

  // 예약 함수
  const postAppm = async () => {
    if ((await runTime()) === 'N') {
      alert(
        '예약은 치과 운영 시간 내에서 가능하며, 점심시간을 제외한 시간대로 선택해 주시기 바랍니다.',
      );
      return;
    }

    let res = formData.reservationDate + ' ' + formData.reservationTime;
    if (formData.reservationTime.length !== 5) {
      alert('올바른 시간 형식이 아닙니다. ex) 13:00');
      return;
    }
    if (res && moment(res).isValid()) {
      res = moment(res).format('YYYY-MM-DD HH:mm');
    } else {
      alert('올바른 시간 형식이 아닙니다. ex) 13:00');
      return;
    }

    try {
      const { data: a_id } = await axios.post(`${BASE_URL}/appms`, {
        h_code: h_code,
        a_date: res,
        a_content: formData.hospitalSymptom,
        a_user_id: user.id,
        a_del_yn: 'N',
      });

      alert('예약이 완료되었습니다.');
      nav(`/map/reservationForm/reservationCheck?a_id=${a_id}`);
    } catch (error) {
      console.error('error!', error.message);
    }
  };

  const eventHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const formatPhone = (phone) => {
    if (!phone) return '';
    const digits = phone.replace(/\D/g, '');
    if (digits.length === 11)
      return digits.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
    if (digits.length === 10)
      return digits.replace(/(\d{2,3})(\d{3,4})(\d{4})/, '$1-$2-$3');
    return phone;
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (!user || !user.id) {
      alert('로그인이 필요합니다.');
      return;
    }

    // Validation
    if (formData.hospitalSymptom.trim() === '') {
      alert('증상을 입력하세요.');
      return;
    }
    if (formData.reservationDate.trim() === '') {
      alert('날짜를 선택하세요.');
      return;
    }
    if (formData.reservationTime.trim() === '') {
      alert('시간을 입력하세요.');
      if (moment(formData.reservationTime.trim())) return;
    }

    // 현재 시간 기준 1시간 전 체크
    const [hour, minute] = formData.reservationTime.split(':');
    const selectedMoment = moment(formData.reservationDate)
      .hours(Number(hour))
      .minutes(Number(minute))
      .seconds(0)
      .milliseconds(0);

    const oneHourAgo = moment().subtract(1, 'hours');

    if (selectedMoment.isBefore(oneHourAgo)) {
      alert('과거 시간으로 예약할 수 없습니다. 현재 시간 이후로 예약하세요. ');
      return;
    }

    // 예약 진행
    postAppm();
  };

  useEffect(() => {
    fetch();
  }, []);

  return (
    <>
      <div className="myBg bg-light-02">
        <div className="wrap" style={{ backgroundColor: '#f4f8ff' }}>
          <div className="container">
            <h4 className="tit mb-5">
              <i className="fa-solid fa-tooth"></i>
              진료 예약하기
            </h4>
            <form onSubmit={submitHandler}>
              <input
                type="text"
                name="hospitalName"
                placeholder="병원명"
                className="
                opacity-50 cursor-not-allowed
                outline-none placeholder-gray-mid rounded-sm text-[12px] md:text-base bg-white 
                w-full py-2.5 pl-3 pr-2 mb-[5px] 
                border border-main-01 focus:border-main-02"
                value={hospital?.h_name || '병원명'}
                disabled
              />
              <input
                type="text"
                name="hospitalSymptom"
                placeholder="증상"
                className="outline-none placeholder-gray-mid rounded-sm text-[12px] md:text-base bg-white w-full py-2.5 pl-3 pr-2 mb-[5px] border border-main-01 focus:border-main-02"
                onChange={eventHandler}
              />
              <input
                type="text"
                name="userName"
                placeholder="이름"
                value={user?.name || ''}
                className="opacity-50 cursor-not-allowed outline-none rounded-sm text-[12px] md:text-base bg-white w-full py-2.5 pl-3 pr-2 mb-[5px] border border-main-01 focus:border-main-02"
                disabled
              />
              {/* <div className="w-[130px] flex justify-between my-2.5 cursor-pointer">
                <div
                  className="flex items-center gap-[5px]"
                  onClick={() => setFormData((prev) => ({ ...prev, gender: 'M' }))}
                >
                  <span className="material-icons text-main-02">
                    {formData.gender === 'M' ? 'radio_button_checked' : 'radio_button_unchecked'}
                  </span>
                  <span className="male dummy">남</span>
                </div>
                <div
                  className="flex items-center gap-[5px]"
                  onClick={() => setFormData((prev) => ({ ...prev, gender: 'F' }))}
                >
                  <span className="material-icons text-main-02">
                    {formData.gender === 'F' ? 'radio_button_checked' : 'radio_button_unchecked'}
                  </span>
                  <span className="female dummy">여</span>
                </div>
              </div> */}
              {/* 달력 */}
              <div className="relative">
                <div
                  className={`rounded-sm text-[12px] md:text-base text-${
                    selectedDate ? 'black' : 'gray-mid'
                  } bg-white 
                  w-full py-2.5 pl-3 pr-2 mb-[5px] border border-main-01 
                  flex items-center gap-2 cursor-pointer`}
                  onClick={() => setIsCalendar((prev) => !prev)}
                >
                  <span className="material-icons text-[15px]! md:text-[20px]!">
                    edit_calendar
                  </span>
                  {selectedDate
                    ? moment(selectedDate).format('YYYY-MM-DD')
                    : '날짜 선택'}
                </div>
                <div
                  className={`${
                    isCalendar ? '' : 'hidden'
                  } absolute w-full z-10`}
                >
                  <div className="w-full max-w-md  p-4 bg-white rounded-lg shadow-md">
                    {/* 헤더 */}
                    <div className="flex justify-between items-center mb-4">
                      <button
                        type="button"
                        onClick={prevMonth}
                        className="px-2 py-1 rounded hover:bg-gray-200 cursor-pointer"
                      >
                        {'<'}
                      </button>
                      <div className="font-bold text-lg">
                        {year} - {month + 1}
                      </div>
                      <button
                        type="button"
                        onClick={nextMonth}
                        className="px-2 py-1 rounded hover:bg-gray-200 cursor-pointer"
                      >
                        {'>'}
                      </button>
                    </div>

                    {/* 요일 */}
                    <div className="grid grid-cols-7 text-center font-semibold mb-2">
                      {WEEK_DAYS.map((day) => {
                        return <div key={day}>{day}</div>;
                      })}
                    </div>

                    {/* 날짜 */}
                    <div className="grid grid-cols-7 gap-1">
                      {days.map((date, idx) => {
                        if (!date) return <div key={idx}></div>;

                        const isToday =
                          date.getDate() === today.getDate() &&
                          date.getMonth() === today.getMonth() &&
                          date.getFullYear() === today.getFullYear();

                        const isSelected =
                          selectedDate &&
                          date.getDate() === selectedDate.getDate() &&
                          date.getMonth() === selectedDate.getMonth() &&
                          date.getFullYear() === selectedDate.getFullYear();

                        const dayOfWeek = date.getDay(); // 0:일, 6:토
                        const dateStr = moment(date).format('YYYY-MM-DD');
                        const isHoliday = holidays.some(
                          (h) => h.date === dateStr,
                        );

                        // 텍스트 색상 결정
                        let textColor = '';
                        if (dayOfWeek === 6)
                          textColor = 'text-blue-500'; // 토요일은 파랑
                        else if (dayOfWeek === 0 || isHoliday)
                          textColor = 'text-red-500'; // 일요일 또는 공휴일 빨강

                        return (
                          <div
                            key={idx}
                            className={`h-10 flex items-center justify-center rounded cursor-pointer
                            ${date ? 'hover:border border-main-01' : ''}
                            ${isToday ? 'border border-blue-500' : ''}
                            ${isSelected ? 'bg-blue-500 text-white' : ''}
                            ${textColor}
                          `}
                            onClick={() => {
                              if (!date) return;
                              if (
                                moment(date).isBefore(moment().startOf('day'))
                              ) {
                                alert(
                                  '과거 일자로 예약할 수 없습니다. 현재 일자 이후로 예약하세요.',
                                );
                                return;
                              }

                              setSelectedDate(date);
                              setFormData((prev) => ({
                                ...prev,
                                reservationDate:
                                  moment(date).format('YYYY-MM-DD'),
                              }));
                            }}
                            onDoubleClick={() => {
                              if (!date) return;
                              setSelectedDate(date);
                              setFormData((prev) => ({
                                ...prev,
                                reservationDate:
                                  moment(date).format('YYYY-MM-DD'),
                              }));
                              setIsCalendar(false); // 🔹 달력 닫기
                            }}
                          >
                            {date.getDate()}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>

              <input
                type="text"
                name="reservationTime"
                placeholder="예약 시간 ex) 13:00"
                className="outline-none placeholder-gray-mid rounded-sm text-[12px] md:text-base bg-white w-full py-2.5 pl-3 pr-2 mb-[5px] border border-main-01 focus:border-main-02"
                onChange={eventHandler}
              />
              <input
                type="text"
                name="userPhoneNumber"
                value={formatPhone(user?.phone) || ''}
                placeholder="연락처"
                className="opacity-50 cursor-not-allowed outline-none placeholder-gray-mid rounded-sm text-[12px] md:text-base bg-white w-full py-2.5 pl-3 pr-2 mb-[5px] border border-main-01 focus:border-main-02"
                disabled
              />
              <textarea
                id="etc"
                name="etc"
                rows="4"
                placeholder="특이 사항"
                value={user?.text || ''}
                disabled
                className="opacity-50 cursor-not-allowed outline-none placeholder-gray-mid rounded-sm text-[12px] md:text-base! resize-none bg-white w-full py-2.5 pl-3 pr-2 mb-[5px] border border-main-01 focus:border-main-02"
              ></textarea>
              <div className="flex gap-[7px] select-none cursor-pointer">
                {privacyChecked ? (
                  <span
                    className="material-icons text-main-02"
                    onClick={() => setPrivacyChecked((prev) => !prev)}
                  >
                    check_box
                  </span>
                ) : (
                  <span
                    className="material-icons text-main-02"
                    onClick={() => setPrivacyChecked((prev) => !prev)}
                  >
                    check_box_outline_blank
                  </span>
                )}
                <label
                  className="dummy text-gray-deep"
                  onClick={() => setPrivacyChecked((prev) => !prev)}
                >
                  병원 예약을 위해 기본 개인정보를 수집·이용합니다. 예약 완료 후
                  관련 법령에 따라 보관 후 파기합니다.
                </label>
              </div>
              <Button
                size="long"
                className={`mb-[50px] ${
                  privacyChecked ? '' : 'opacity-50! cursor-not-allowed!'
                } cursor-pointer`}
                onClick={privacyChecked ? null : (e) => e.preventDefault()}
                disabled={!privacyChecked}
              >
                <div
                  className={`w-full ${
                    privacyChecked ? '' : 'pointer-events-none!'
                  }`}
                >
                  예약하기
                </div>
              </Button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default ReservationForm;
