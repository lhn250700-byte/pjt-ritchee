import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import Button from '../../../componetns/Button';
import { useUser } from '../../../context/UserContext';
import moment from 'moment';
import {
  getAppmContent,
  getUserReservation,
  postOpinionUpdate,
} from '../../../api/ReservationApi';

function ReservationCheck() {
  const { user } = useUser();
  const nav = useNavigate();
  const id = user?.id;
  const [appointment, setAppointment] = useState({});
  const [formData, setFormData] = useState({
    opinion: '',
    warning: '',
  });
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const a_id = query.get('a_id');
  // 현재 유저 예약 내역 가져오기
  const userReservationFetch = async () => {
    try {
      const data = await getUserReservation(a_id, id);
      setAppointment(data);
    } catch (error) {
      console.error('error', error.message);
      return;
    }
  };

  // a_id를 통해 데이터 추출 후 소견서 작성(병원 관계자용)
  const getappmContent = async () => {
    try {
      const data = await getAppmContent(a_id);
      console.log('소견서 데이터 ', data);
      setAppointment(data);
    } catch (error) {
      console.error('고객이 입력한 증상을 불러오지 못했습니다.', error);
      return;
    }
  };

  const changeHandler = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  // 소견서 작성
  const postOpinion = async () => {
    try {
      await postOpinionUpdate(a_id, formData.opinion, formData.warning);

      alert('소견서 작성이 완료되었습니다.');
      nav('/');
    } catch (error) {
      console.error('소견서 작성이 실패하였습니다.', error);
      return;
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (formData.opinion.trim() === '') {
      alert('진단명을 입력하세요');
      return;
    }
    if (formData.warning.trim() === '') {
      alert('진단 내용을 입력하세요');
      return;
    }
    postOpinion();
  };

  // 생년월일 -> 만 나이 변환 함수
  function getAge(birthString) {
    const today = new Date();
    const birthDate = new Date(birthString);

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    const dayDiff = today.getDate() - birthDate.getDate();

    // 아직 생일이 지나지 않았다면 -1
    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
      age--;
    }

    if (age) return age;
    else return '';
  }

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      opinion: appointment?.a_dia_name,
      warning: appointment?.a_dia_content,
    }));
  }, [appointment]);

  useEffect(() => {
    if (id && a_id) {
      user.u_kind === '1' ? userReservationFetch() : getappmContent();
    }
  }, [user, id, a_id]);

  let date = moment(appointment?.a_date).format('YYYY-MM-DD HH:mm');

  const formatPhone = (phone) => {
    if (!phone) return '';
    const digits = phone.replace(/\D/g, '');
    if (digits.length === 11)
      return digits.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
    if (digits.length === 10)
      return digits.replace(/(\d{2,3})(\d{3,4})(\d{4})/, '$1-$2-$3');
    return phone;
  };

  return (
    <>
      {appointment?.u_kind === '1' ? (
        <div className="myBg bg-light-02 h-screen ">
          <div className="wrap pl-1.5" style={{ backgroundColor: '#f4f8ff' }}>
            <div className="reservation container">
              <h4 className="reservationTitle tit mb-5">
                <span className="material-icons">access_alarm</span>
                {appointment?.name || ''} 님의 예약 내역
              </h4>
              <div className="px-3.5 py-5 mb-7.5 bg-white border border-main-01 rounded-[5px]">
                <div className="hospitalTitle mb-2.5">
                  <h4 className="tit">
                    <span className="material-icons">local_hospital</span>
                    {appointment?.h_name || ''}
                  </h4>
                </div>
                <div className="reservationBody">
                  <div className="patient dummy text-gray-deep">
                    · 환자명 : {appointment?.name || ''}
                  </div>
                  <div className="symptom dummy text-gray-deep">
                    · 증상 : {appointment?.a_content || ''}
                  </div>
                  <div className="age dummy text-gray-deep">
                    · 나이 : {`만 ${getAge(appointment?.birth)}세` || ''}
                  </div>
                  <div className="gender dummy text-gray-deep">
                    · 성별 :{' '}
                    {appointment?.gender === 'M'
                      ? '남'
                      : appointment?.gender === 'F'
                      ? '여'
                      : ''}
                  </div>
                  <div className="reservationDate dummy text-gray-deep">
                    · 예약 일자 : {date.split(' ')[0] ?? ''}
                  </div>
                  <div className="reservationTime dummy text-gray-deep">
                    · 예약 시간 : {date.split(' ')[1]}
                  </div>
                  <div className="phoneNumber dummy text-gray-deep">
                    · 연락처 : {formatPhone(appointment?.phone) || ''}
                  </div>
                  <div className="etc dummy text-gray-deep">
                    · 특이 사항 : {appointment?.text || ''}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="myBg bg-light-02 h-screen ">
          <div className="wrap pl-1.5" style={{ backgroundColor: '#f4f8ff' }}>
            <div className="reservation container">
              <h4 className="reservationTitle tit mb-5">
                <span className="material-icons">health_and_safety</span>
                소견서 작성
              </h4>
              <form onSubmit={submitHandler}>
                <ul className="outline-none placeholder-gray-mid rounded-sm text-[12px] md:text-base bg-white w-full pt-2 pb-4 pl-3 pr-2 mb-[5px] border border-main-01">
                  <h4 className="tit my-3 mt-3 flex items-center gap-1 break-words overflow-hidden">
                    <span className="material-icons">local_hospital</span>
                    {appointment.h_name}
                  </h4>
                  <li className="break-words">
                    · 환자명: {appointment.u_name || ''}
                  </li>
                  <li className="break-words">
                    · 증상: {appointment.a_content || ''}
                  </li>
                  <li>· 나이: {appointment.age || ''}</li>
                  <li>· 성별: {appointment.gender || ''}</li>
                  <li>· 예약 일자: {appointment.a_date || ''}</li>
                  <li>· 예약 시간: {appointment.a_time || ''}</li>
                  <li>· 연락처: {formatPhone(appointment.phone) || ''}</li>
                  <li className="break-words">
                    · 특이 사항: {appointment.text || ''}
                  </li>
                </ul>
                <textarea
                  id="opinion"
                  name="opinion"
                  rows="4"
                  placeholder="의사 소견"
                  value={formData.opinion}
                  onChange={changeHandler}
                  className="outline-none placeholder-gray-mid rounded-sm text-[12px] md:text-base bg-white w-full py-2.5 pl-3 pr-2 mb-[5px] border border-main-01 focus:border-main-02 resize-none"
                ></textarea>
                <textarea
                  id="warning"
                  name="warning"
                  rows="4"
                  placeholder="주의 사항"
                  value={formData.warning}
                  onChange={changeHandler}
                  className="outline-none placeholder-gray-mid rounded-sm text-[12px] md:text-base bg-white w-full py-2.5 pl-3 pr-2 mb-[5px] border border-main-01 focus:border-main-02 resize-none"
                ></textarea>
                <Button size="long" className={'lg: cursor-pointer'}>
                  의사 소견 작성
                </Button>
              </form>
            </div>
          </div>
        </div>
      )}
      {/* Please refer to
    
      /map/reservationForm/reservationCheck?id=1
    */}
      {/* <div>{id ? `${id} 님의 예약 내역 확인` : '예약 내역 확인'}</div> */}
    </>
  );
}

export default ReservationCheck;
