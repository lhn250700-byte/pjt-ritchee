import React, { useEffect, useState } from 'react';
import { Link, Route, Routes, useLocation } from 'react-router-dom';
import { CustomOverlayMap, Map, MapMarker } from 'react-kakao-maps-sdk';
import Button from '../../../componetns/Button';
import axios from 'axios';
import { getHospitalDetail } from '../../../api/MapApi';

function MapPage() {
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const h_code = query.get('id');
  const [hospital, setHospital] = useState({});
  const [location, setLocation] = useState({
    center: {
      lat: 37.5665,
      lng: 126.978,
    },
    isPanto: false,
  });
  const [isOpened, setIsOpened] = useState(false);

  // h_code 달고 올 때 함수
  const fetch = async () => {
    try {
      const data = await getHospitalDetail(h_code);
      setHospital(data ? data : {});
      setLocation({
        center: {
          lat: data?.h_lat || 37.5665,
          lng: data.h_long || 126.978,
        },
        isPanto: true,
      });
    } catch (error) {
      console.error('Single Hospital Info Fetch Error', error.message);
      setHospital({});
    }
  };

  useEffect(() => {
    // 내장 스크립트 naviagator로 현재 위치 가져와서 location에 저장 (h_code 없이 올 때 함수)
    const getPosition = () => {
      if (navigator) {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            const { latitude: lat, longitude: lng } = pos.coords;
            setLocation((prev) => ({
              ...prev,
              center: { lat, lng },
            }));
          },
          (err) => {
            console.error(err);
          },
          {
            enableHighAccuracy: true,
          }
        );
      } else console.error('navigator가 없습니다!');
    };
    if (h_code != null) fetch();
    else getPosition();
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
      <Map
        center={location.center}
        isPanto={location.isPanto}
        level={0}
        style={{ height: h_code ? '50vh' : '93vh' }}
        className="myBg"
      >
        {h_code ? (
          <>
            <MapMarker
              position={{ lat: location.center.lat, lng: location.center.lng }}
              infoWindowOptions={{
                disableAutoPan: true,
              }}
              image={{
                src: 'https://uosmaiisnppqgxbcbawc.supabase.co/storage/v1/object/public/images/mapmarker.png', // 마커이미지의 주소입니다
                size: {
                  width: 35,
                  height: 53,
                }, // 마커이미지의 크기입니다
              }}
            />

            <CustomOverlayMap position={{ lat: location.center.lat, lng: location.center.lng }} yAnchor={1.9}>
              <div className="bg-white border-2 border-main-02 rounded-[5px] px-3 py-[5px] mt-[3px]">
                {hospital.h_name}
                <div className="stars flex flex-row text-point items-end">
                  <span className="mr-1 text-[10px]!">
                    {hospital.avg_eval_pt == 0 ? '0' : hospital.avg_eval_pt?.toFixed(1)}
                  </span>
                  <div className="flex flex-row text-point items-center">
                    {Array.from({ length: 5 }).map((_, i) => {
                      if (hospital.avg_eval_pt >= i + 1)
                        return (
                          <span key={i} className="material-icons">
                            star
                          </span>
                        );
                      if (hospital.avg_eval_pt > i && hospital.avg_eval_pt < i + 1)
                        return (
                          <span key={i} className="material-icons">
                            star_half
                          </span>
                        );
                      return (
                        <span key={i} className="material-icons">
                          star_outline
                        </span>
                      );
                    })}
                  </div>
                </div>
              </div>
            </CustomOverlayMap>
          </>
        ) : null}
      </Map>
      {h_code ? (
        <div className="myBg bg-light-02">
          <div className="wrap mb-[50px]" style={{ backgroundColor: '#f4f8ff' }}>
            <div className="container bg-white border border-main-01 rounded-[5px]">
              <div className="hospital px-3.5 py-[15px]">
                <div className="hospitalTitle mb-2.5">
                  <h4 className="tit">
                    <span className="material-icons">local_hospital</span>
                    {hospital.h_name}
                  </h4>
                </div>
                <div className="hospitalBody">
                  <div className="detail h-[100px]">
                    <div className="addr flex gap-[5px] mb-[5px]">
                      <div className="bg-main-02 rounded-full w-[15px] h-[15px] flex justify-center items-center mt-[3px] p-2.5">
                        <span className="material-icons text-white" style={{ fontSize: '14px' }}>
                          location_on
                        </span>
                      </div>
                      <div className="dummy text-gray-deep mt-1">주소 : {hospital.h_addr}</div>
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
                      <div className="dummy text-gray-deep mt-1">
                        점심 시간 : {`${hospital[`h_lun_s`]} ~ ${hospital[`h_lun_c`]}` || '13 : 00 ~ 14 : 00'}
                      </div>
                    </div>
                  </div>
                  <div className={`flex justify-between ${isOpened ? 'mt-[150px]' : ''}`}>
                    <Button size="mid" className="m-0">
                      <Link className="w-full" to={`/map/reservationForm?id=${h_code}`}>
                        예약하기
                      </Link>
                    </Button>

                    <Button size="mid" className="m-0">
                      <div className="w-full text-[16px]">전화하기</div>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default MapPage;
