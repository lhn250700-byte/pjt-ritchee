import React, { useEffect, useState } from 'react';
import Button from '../../../componetns/Button';
import DentistReview from './DentistReview';
import { Link, useLocation, useParams, useSearchParams } from 'react-router-dom';
import { getHospitalDetail } from '../../../api/DentistViewApi';

function DentistView() {
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const h_code = query.get('id');
  const [hospital, setHospital] = useState({});
  const [isOpened, setIsOpened] = useState(false);
  const fetch = async () => {
    const data = await getHospitalDetail(h_code);
    setHospital(data);
  };

  const telHandler = () => {
    alert(`${hospital?.h_tel1}으로 전화 연결합니다.`);
  };

  useEffect(() => {
    fetch();
  }, []);

  const hours = {
    mon: [hospital.h_mon_s, hospital.h_mon_c, '월'],
    tue: [hospital.h_tue_s, hospital.h_tue_c, '화'],
    wed: [hospital.h_wed_s, hospital.h_wed_c, '수'],
    thu: [hospital.h_tur_s, hospital.h_tur_c, '목'],
    fri: [hospital.h_fri_s, hospital.h_fri_c, '금'],
    sat: [hospital.h_sat_s, hospital.h_sat_c, '토'],
    sun: [hospital.h_sun_s, hospital.h_sun_c, '일'],
  };

  // 요일 배열 (getDay()의 순서인 'sun' 부터 시작!)
  const weekdayOrder = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];

  const todayIndex = new Date().getDay();

  // 오늘부터 순서를 정렬
  const adjustedOrder = weekdayOrder.slice(todayIndex).concat(weekdayOrder.slice(0, todayIndex));

  const sortedHours = adjustedOrder.map((day) => hours[day]);

  return (
    <>
      <div className="myBg">
        <img
          src="https://ocnuykfvdtebmondqppu.supabase.co/storage/v1/object/public/images/TESTIMG.png"
          alt=""
          className="w-full"
        />
      </div>

      <div className="wrap">
        <div className="pb-5 pl-[3px] mb-7.5">
          <div className="hospitalTitle flex mb-5 justify-between xl:justify-normal xl:gap-5">
            <h4 className="tit">
              <span className="material-icons">local_hospital</span>
              {hospital.h_name || '병원명'}
            </h4>
            <Link
              to={`/map?id=${h_code}`}
              className="bg-point rounded-md w-6 h-6 flex justify-center items-center mt-[3px] p-3"
            >
              <span className="material-icons text-white" style={{ fontSize: '14px' }}>
                location_on
              </span>
            </Link>
          </div>
          <div className="hospitalBody">
            <div className="detail h-[100px]">
              <div className="addr flex gap-[5px] mb-[5px]">
                <div className="bg-main-02 rounded-full w-[15px] h-[15px] flex justify-center items-center mt-[3px] p-2.5">
                  <span className="material-icons text-white" style={{ fontSize: '14px' }}>
                    location_on
                  </span>
                </div>
                <div className="dummy text-gray-deep">주소 : {hospital.h_addr || '주소'}</div>
              </div>
              <div className="operationHours flex gap-[5px] mb-[5px]">
                <div className="bg-main-02 rounded-full w-[15px] h-[15px] flex justify-center items-center mt-[3px] p-2.5">
                  <div className="material-icons text-white" style={{ fontSize: '14px' }}>
                    access_time_filled
                  </div>
                </div>
                <span
                  className="dummy text-gray-deep flex gap-[5px] cursor-pointer"
                  onClick={() => setIsOpened((prev) => !prev)}
                >
                  <span className="dummy">진료 시간 :</span>
                  <div className="flex items-center mr-1 text-black font-bold">
                    {sortedHours[0][2]} {sortedHours[0][0]} ~ {sortedHours[0][1]}
                    <span className={`material-icons ${isOpened ? 'hidden!' : ''} text-gray-deep font-normal`}>
                      keyboard_arrow_down
                    </span>
                  </div>
                </span>
              </div>
              <div className={`ml-[25px] ${isOpened ? '' : 'hidden'} mb-[5px]`}>
                {sortedHours.map(([s, c, d], i) => {
                  return (
                    <div key={i} className={`dummy ${i == 0 ? 'font-bold text-black' : 'text-gray-deep'}`}>
                      {d} {s} ~ {c}
                    </div>
                  );
                })}
              </div>
              <div className="lunchTime flex gap-[5px] mb-[5px]">
                <div className="bg-main-02 rounded-full w-[15px] h-[15px] flex justify-center items-center mt-[3px] p-2.5">
                  <span className="material-icons text-white" style={{ fontSize: '14px' }}>
                    restaurant
                  </span>
                </div>
                <div className="dummy text-gray-deep">
                  점심 시간 : {`${hospital[`h_lun_s`]} ~ ${hospital[`h_lun_c`]}` || '13 : 00 ~ 14 : 00'}
                </div>
              </div>
              <div className="etc flex gap-[5px] mb-[5px]">
                <div className="bg-main-02 rounded-full w-[15px] h-[15px] flex justify-center items-center mt-[3px] p-2.5">
                  <span className="material-icons text-white" style={{ fontSize: '14px' }}>
                    local_parking
                  </span>
                </div>
                <div className="dummy text-gray-deep">주차 : 건물 지하 2층 차단기 통과 후 이용 가능</div>
              </div>
            </div>
            <div className={`flex justify-between xl:justify-normal xl:gap-5 ${isOpened ? 'mt-[150px]' : ''}`}>
              {/* mb */}
              <Button size="mid" className="xl:hidden">
                <Link className="w-full" to={`../../map/reservationForm?id=${h_code}`}>
                  예약하기
                </Link>
              </Button>
              <Button size="mid" className="xl:hidden cursor-pointer" onClick={telHandler}>
                <div className="w-full text-[16px]">전화하기</div>
              </Button>
              {/* pc */}
              <Button size="short" className="hidden xl:block">
                <Link className="block w-full" to={`../../map/reservationForm?id=${h_code}`}>
                  예약하기
                </Link>
              </Button>
              <Button size="short" className="hidden xl:block cursor-pointer" onClick={telHandler}>
                <div className="block w-full text-[16px]">전화하기</div>
              </Button>
            </div>
          </div>
        </div>
      </div>
      <DentistReview hospital={hospital} />

      {/*Please refer to
      // 그냥 Map으로 이동
      <Link to="/map">지도 보기</Link>
      // 치과 id를 쿼리로 넘기려면
      <Link to={`/map?id=${치과id}`}>지도 보기</Link> */}
    </>
  );
}

export default DentistView;
