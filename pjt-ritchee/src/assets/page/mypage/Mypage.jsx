import React from 'react';
import { Route, Routes } from 'react-router-dom';
import EditInfo from './EditInfo';
import MedicalList from './MedicalList';
import ReviewHistory from './ReviewHistory';

import ReservationList from './ReservationList';

import ReviewForm from './ReviewForm';
import DentistReview from '../shared/DentistReview';
import { Link } from 'react-router-dom';
import { useUser } from '../../../context/UserContext';

// 마이페이지 메인 화면 컴포넌트
function MypageMain() {
  const { user } = useUser();
  return (
    <>
      <div
        className=" flex flex-col items-center justify-center text-white w-full h-[300px] md:h-[400px] lg:h-[500px] myBg"
        style={{
          backgroundImage:
            'url("https://ocnuykfvdtebmondqppu.supabase.co/storage/v1/object/public/images/MyPageIMG.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <span>{user?.name || '회원'}님의 건강을 위한 공간입니다</span>
      </div>

      <div className="wrap">
        <div className="container">
          <div className="flex justify-center gap-3 py-3">
            <Link
              to="/mypage/editInformation"
              className="nav-link px-6 py-2 bg-main-02 text-white rounded-md hover:bg-main-02"
            >
              회원 정보 수정
            </Link>
            <Link
              to="/mypage/reservationList"
              className="nav-link px-10 py-2 bg-main-02 text-white rounded-md hover:bg-main-02"
            >
              예약 현황
            </Link>
          </div>
          <div className="flex justify-center gap-3 mb-[100px]">
            <Link
              to="/mypage/medicalList"
              className="nav-link px-10 py-2 bg-main-02 text-white rounded-md hover:bg-main-02"
            >
              진료 기록
            </Link>
            <Link
              to="/mypage/reviewHistory"
              className="nav-link px-10 py-2 bg-main-02 text-white rounded-md hover:bg-main-02"
            >
              후기 기록
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

function Mypage() {
  return (
    <Routes>
      <Route path="/" element={<MypageMain />} />
      <Route path="editInformation" element={<EditInfo />} />
      <Route path="medicalList" element={<MedicalList />} />
      <Route path="medicalList/reviewForm/:id" element={<ReviewForm />} />
      <Route path="reviewHistory" element={<ReviewHistory />} />
      <Route path="reviewHistory/dentistReview/:id" element={<DentistReview />} />
      <Route path="reservationList" element={<ReservationList />} />
    </Routes>
  );
}

export default Mypage;
