import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import PageNatation from '../../../componetns/PageNatation';
import { useUser } from '../../../context/UserContext';
import {
  getHospitalList,
  getMedicalList,
} from '../../../api/hospital_medicallist';
import Button from '../../../componetns/Button';

function MedicalList() {
  const [searchParams] = useSearchParams();
  const [medicals, setMedicals] = useState([]);
  const [list, setList] = useState([]);
  const [page, setPage] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const nav = useNavigate();

  const pageSize = 6;
  const id = searchParams.get('id');
  const { user } = useUser();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = id || user?.id;
        if (!userId) return;

        const medicalData = await getMedicalList(userId, page, pageSize);
        setMedicals(
          Array.isArray(medicalData.content) ? medicalData.content : []
        );
        const hospitalData = await getHospitalList();

        const hospitalMap = {};
        hospitalData.forEach((h) => {
          hospitalMap[h.h_code] = h.h_name;
        });

        const mergedList = medicalData.content.map((item) => ({
          ...item,
          h_name: hospitalMap[item.h_code] || '병원 정보 없음',
        }));
        setList(mergedList);
        // API 응답에서 totalElements 저장
        setTotalElements(medicalData.totalElements || 0);
      } catch (error) {
        console.error('진료 기록 조회 실패 : ', error);
      }
    };

    fetchData();
  }, [id, user, page]);

  const handlePageChange = (apiPage) => {
    // pageFn에서 이미 -1을 해서 전달하므로 API 기준(0부터) 페이지 번호
    // 즉시 상태 업데이트하여 포인트 컬러가 바로 반영되도록 함
    setPage(apiPage);
  };

  return (
    <>
      {user?.u_kind === '1' ? (
        <div className="min-h-screen bg-light-02 myBg px-4 py-2 text-sm md:px-6 md:py-3 md:text-base lg:px-8 lg:py-4 lg:text-lg">
          <div className="container flex flex-col max-w-screen-xl mx-auto">
            <h4 className="tit my-5 mt-10 mx-[1vw] break-words">
              <i className="fa-solid fa-hospital text-[16px]"></i>
              {id
                ? `${id}번 회원님의 진료 내역`
                : `${user?.name || '회원'} 님의 진료 기록`}
            </h4>

            {/* 중간에서 절대 깨지지 않는 Grid */}
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
            mb-10
          "
            >
              {list.length === 0 ? (
                <p className="w-full text-left text-gray-500 pl-[1vw]">
                  작성한 진료 기록이 없습니다.
                </p>
              ) : (
                list.map((item) => (
                  <div
                    key={item.a_id}
                    className="
            border border-main-01 p-4 rounded-lg bg-white text-gray-700 shadow-lg 
            flex flex-col justify-between
            break-words overflow-hidden 
          "
                  >
                    <ul className="pl-1 space-y-2 text-gray-500 overflow-hidden break-words">
                      <h4 className="tit my-3 mt-3 flex items-center gap-1 break-words overflow-hidden">
                        <span className="material-icons">local_hospital</span>
                        {item.h_name}
                      </h4>
                      <li className="break-words">
                        · 진료일자 : {item.a_date}
                      </li>
                      <li className="break-words">· 증상 : {item.a_content}</li>
                      <li className="break-words">
                        · 의사 소견 : {item.a_dia_name}
                      </li>
                      <li className="break-words">
                        · 주의 사항 : {item.a_dia_content}
                      </li>
                      <li className="dummy text-red-400 pl-1 break-words">
                        {item.r_able_yn === 'Y'
                          ? null
                          : '리뷰 작성 전이나 의사 소견 입력 후에 후기 작성이 가능합니다.'}
                      </li>
                    </ul>

                    <div className="flex justify-center gap-5">
                      <Button
                        onClick={() =>
                          nav(`/mypage/medicalList/reviewForm/${item.a_id}`, {
                            state: {
                              hospitalCode: item.h_code,
                              hospitalName: item.h_name,
                              a_id: item.a_id,
                            },
                          })
                        }
                        className={`${
                          item.r_able_yn === 'Y'
                            ? 'bg-main-02 !hover:bg-main-02'
                            : 'bg-gray-mid pointer-events-none'
                        } flex-grow text-center py-2  text-white rounded-md mt-4`}
                      >
                        후기 작성 하기
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* 페이지네이션 */}
            <div className="mb-[34px]">
              <PageNatation
                totalElements={totalElements}
                pageSize={pageSize}
                currentPage={page}
                pageFn={handlePageChange}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="min-h-screen bg-light-02 myBg px-4 py-2 text-sm md:px-6 md:py-3 md:text-base lg:px-8 lg:py-4 lg:text-lg">
          <div className="container flex flex-col max-w-screen-xl mx-auto">
            <h4 className="tit my-5 mt-10 mx-[1vw] break-words">
              <i className="fa-solid fa-hospital text-[16px]"></i>
              {medicals?.[0]?.u_name || ''}님의 진료 내역
            </h4>

            <ul
              className={`w-[90%] flex flex-row flex-wrap gap-4  ${
                medicals.length < 4 ? 'md:gap-20' : 'md:justify-between'
              } `}
            >
              {medicals?.length === 0 ? (
                <p className="w-full text-left text-gray-500 pl-[1vw]">
                  작성한 진료 기록이 없습니다.
                </p>
              ) : (
                medicals?.map((m, i) => (
                  <li
                    key={i}
                    className="w-full sm:w-[45%] lg:w-[30%] border p-4 rounded-lg mb-5 bg-white text-gray-700 shadow-lg"
                  >
                    <h4 className="tit my-3 flex items-center gap-2">
                      <span className="material-icons">local_hospital</span>
                      {m.h_name || ''}
                    </h4>

                    <ul className="pl-1 my-5 text-gray-500 space-y-2 break-words overflow-hidden">
                      <li className="break-words">
                        · 진료일자 : {m.a_date || ''}
                      </li>
                      <li className="break-words">· 증상 : {m.text || ''}</li>
                      <li className="break-words">
                        · 의사 소견 : {m.a_dia_name || '진료 대기 중입니다.'}
                      </li>
                      <li className="break-words">
                        · 주의 사항 : {m.a_dia_content || '진료 대기 중입니다.'}
                      </li>
                    </ul>
                  </li>
                ))
              )}
            </ul>

            {/* 페이지네이션 */}
            <div className="mb-[34px]">
              <PageNatation
                totalElements={totalElements}
                pageSize={pageSize}
                currentPage={page}
                pageFn={handlePageChange}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default MedicalList;
