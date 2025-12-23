import React, { useEffect, useState } from 'react';
import PageNatation from './../../../componetns/PageNatation';
import Button from '../../../componetns/Button';
import { useUser } from '../../../context/UserContext';
import { getAppmList, getAppmListDelete } from '../../../api/AppmListApi_Mypg';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { getAppmListOfHospital } from '../../../api/listApi';

function AppmList() {
  const { user } = useUser();
  const nav = useNavigate();
  const [appmList, setAppmList] = useState([]);

  const [currentPage, setCurrentPage] = useState(0);
  const [totalElements, setTotalElements] = useState(0);

  const itemsPerPage = 6;
  const hospitalName =
    appmList?.[0]?.h_name || user?.text.slice(9, user?.text.length - 1) || '';
  const opinionHandler = (i) => {
    if (!appmList) return;
    nav(`/map/reservationForm/reservationCheck?a_id=${i}`);
  };

  const listHandler = (i, h) => {
    if (!appmList) return;
    nav(`/mypage/medicalList?id=${i}&h_code=${h}`);
  };

  useEffect(() => {
    const fetchAppmList = async () => {
      try {
        if (!user?.id) return;

        const data = await getAppmListOfHospital(
          user.id,
          currentPage,
          itemsPerPage
        );
        console.log(data);

        setAppmList(Array.isArray(data.content) ? data.content : []);
        setTotalElements(data.totalElements || 0);
      } catch (error) {
        console.error('Error fetching appmList', error);
        setAppmList([]);
        setTotalElements(0);
      }
    };

    fetchAppmList();
  }, [user, currentPage, itemsPerPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
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

  return (
    <div className="min-h-screen bg-light-02 myBg px-4 py-2 text-sm md:px-6 md:py-3 md:text-base lg:px-8 lg:py-4 lg:text-lg">
      <div className="container flex flex-col max-w-screen-xl mx-auto">
        <h4 className="tit my-5 mt-10 mx-[1vw] break-words">
          <span className="material-icons">alarm</span>
          {hospitalName || '병원'}의 예약 내역
        </h4>

        {/* 중간에서 절대 깨지지 않는 Grid */}
        {appmList.length > 0 ? (
          <>
            <div
              className="
        w-full
        grid 
        gap-6
        grid-cols-[repeat(auto-fit,minmax(280px,1fr))]
        md:flex
        md:flex-wrap
        md:justify-between
        md:[&>div]:w-[45%]
        2xl:grid
        2xl:grid-cols-3
        2xl:[&>div]:w-full
        mx-auto
      "
            >
              {appmList.map((reservation, index) => (
                <div
                  key={reservation.id ?? index}
                  className="
            border p-4 rounded-lg bg-white text-gray-200 shadow-lg 
            flex flex-col justify-between
            break-words overflow-hidden
          "
                >
                  <ul className=" pl-1 space-y-2 text-gray-500 overflow-hidden break-words">
                    <h4 className="tit my-3 mt-3 flex items-center gap-1 break-words overflow-hidden">
                      <span className="material-icons">local_hospital</span>
                      {reservation.h_name}
                    </h4>
                    <li className="break-words">
                      · 환자명: {reservation.u_name}
                    </li>
                    <li className="break-words">
                      · 증상: {reservation.a_content}
                    </li>
                    <li>· 나이: {reservation.age}</li>
                    <li>· 성별: {reservation.gender}</li>
                    <li>· 예약 일자: {reservation.a_date}</li>
                    <li>· 예약 시간: {reservation.a_time}</li>
                    <li>· 연락처: {formatPhone(reservation.phone)}</li>
                    <li className="break-words">
                      · 특이 사항: {reservation.text}
                    </li>
                    <li className="break-words">
                      · 진단명:{' '}
                      {reservation.a_dia_name || '진료 대기 중입니다.'}
                    </li>
                    <li className="break-words">
                      · 진단 내용:{' '}
                      {reservation.a_dia_content || '진료 대기 중입니다.'}
                    </li>
                  </ul>

                  <div className="flex flex-wrap justify-between w-full mt-5 gap-2">
                    <Button
                      size="mid"
                      variant="primary"
                      className="flex-1 min-w-[100px] xl:cursor-pointer"
                      onClick={() => opinionHandler(reservation.a_id)}
                    >
                      소견서 작성
                    </Button>

                    <Button
                      size="mid"
                      variant="primary"
                      className="flex-1 min-w-[100px] xl:cursor-pointer"
                      onClick={() =>
                        listHandler(reservation.u_id, reservation.h_code)
                      }
                    >
                      {reservation.u_name} 환자 진료 리스트
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {/* 페이지네이션 */}
            <div className="mb-[34px]">
              <PageNatation
                totalElements={totalElements}
                pageSize={itemsPerPage}
                currentPage={currentPage} // ✅ 0-based 그대로
                pageFn={handlePageChange}
              />
            </div>
          </>
        ) : (
          <p className="w-full text-center text-gray-500 mt-20 myBg bg-light-02">
            예약 내역이 없습니다.
          </p>
        )}
      </div>
    </div>
  );
}

export default AppmList;
