import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../../componetns/Button";
import {
  getHospitalsByRating,
  getHospitalsByReview,
  getHospitalsByCommentCnt,
  getTopHospitals,
} from "../../../api/hospitalApi_home";

function Home() {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState(0);
  const [hospitals, setHospitals] = useState([]);
  const [hospitalsReview, setHospitalsReview] = useState([]);
  const [hospitalsComment, setHospitalsComment] = useState([]);
  const [topHospitals, setTopHospitals] = useState([]);

  // 별점 렌더링 함수
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating); // 꽉 찬 별 개수
    const hasHalfStar = rating % 1 >= 0.5; // 반 별 여부
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0); // 빈 별 개수

    // 꽉 찬 별
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <span key={`full-${i}`} className="material-icons">
          star
        </span>
      );
    }
    // 반 별
    if (hasHalfStar) {
      stars.push(
        <span key="half" className="material-icons">
          star_half
        </span>
      );
    }
    // 빈 별
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <span key={`empty-${i}`} className="material-icons">
          star_outline
        </span>
      );
    }

    return stars;
  };

  // API에서 hospital 데이터 가져오기 (별점순)
  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const data = await getHospitalsByRating(0, 6);
        console.log(data);
        setHospitals(data.content || data);
      } catch (error) {
        console.error("Error fetching hospitals:", error);
      }
    };

    fetchHospitals();
  }, []);

  // API에서 hospital 데이터 가져오기 (리뷰 많은 순)
  useEffect(() => {
    const fetchHospitalsReview = async () => {
      try {
        const data = await getHospitalsByReview(0, 6);
        console.log(data);
        setHospitalsReview(data.content || data);
      } catch (error) {
        console.error("Error fetching hospitals by review:", error);
      }
    };

    fetchHospitalsReview();
  }, []);

  // API에서 hospital 데이터 가져오기 (댓글 많은 순)
  useEffect(() => {
    const fetchHospitalsComment = async () => {
      try {
        const data = await getHospitalsByCommentCnt(0, 6);
        console.log(data);
        setHospitalsComment(data.content || data);
      } catch (error) {
        console.error("Error fetching hospitals by comment:", error);
      }
    };

    fetchHospitalsComment();
  }, []);

  // API에서 인기 병원 TOP 목록 가져오기
  useEffect(() => {
    const fetchTopHospitals = async () => {
      try {
        const data = await getTopHospitals(0, 3);
        console.log(data);
        setTopHospitals(data.content || data);
      } catch (error) {
        console.error("Error fetching top hospitals:", error);
      }
    };

    fetchTopHospitals();
  }, []);

  useEffect(() => {
    const swiper = new window.Swiper(".home-swiper", {
      slidesPerView: 1,
      spaceBetween: 0,
      loop: true,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });

    return () => {
      if (swiper) swiper.destroy();
    };
  }, []);

  return (
    <>
      {/* 메인 슬라이더 */}
      <div className="relative w-full myBg">
        <div className="swiper home-swiper">
          <div className="swiper-wrapper">
            <div className="swiper-slide">
              <div
                className="w-full h-[60vw] md:h-[45vw] lg:h-[50vw] overflow-hidden cursor-pointer"
                onClick={() => navigate("/event/eventview/1")}
              >
                <img
                  src="https://uosmaiisnppqgxbcbawc.supabase.co/storage/v1/object/public/images/pevent1.jpg"
                  alt="img"
                  className="w-full h-full object-cover object-center lg:object-top"
                />
              </div>
            </div>

            <div className="swiper-slide">
              <div
                className="w-full h-[60vw] md:h-[45vw] lg:h-[50vw] overflow-hidden cursor-pointer"
                onClick={() => navigate("/event/eventview/2")}
              >
                <img
                  src="https://uosmaiisnppqgxbcbawc.supabase.co/storage/v1/object/public/images/pevent2.jpg"
                  alt="img"
                  className="w-full h-full object-cover object-center lg:object-top"
                />
              </div>
            </div>

            <div className="swiper-slide">
              <div
                className="w-full h-[60vw] md:h-[45vw] lg:h-[50vw] overflow-hidden cursor-pointer"
                onClick={() => navigate("/event/eventview/3")}
              >
                <img
                  src="https://uosmaiisnppqgxbcbawc.supabase.co/storage/v1/object/public/images/pevent3.jpg"
                  alt="img"
                  className="w-full h-full object-cover object-center lg:object-top"
                />
              </div>
            </div>

            <div className="swiper-slide">
              <div
                className="w-full h-[60vw] md:h-[45vw] lg:h-[50vw] overflow-hidden cursor-pointer"
                onClick={() => navigate("/event/eventview/4")}
              >
                <img
                  src="https://uosmaiisnppqgxbcbawc.supabase.co/storage/v1/object/public/images/pevent4.jpg"
                  alt="img"
                  className="w-full h-full object-cover object-center lg:object-top"
                />
              </div>
            </div>
          </div>
          {/* 화살표 네비게이션 */}
          <div className="swiper-button-prev !text-white !w-12 !h-12 after:!text-2xl"></div>
          <div className="swiper-button-next !text-white !w-12 !h-12 after:!text-2xl"></div>
        </div>
      </div>

      <div className="wrap">
        <div className="container">
          <h4 className="tit">
            <i className="fa-solid fa-crown"></i>
            릿치 랭킹 인기 병원
          </h4>

          <section className="sect1 w-full mt-3 mb-7">
            <div className="flex flex-row justify-between w-full gap-4">
              {topHospitals.map((hospital) => (
                <div
                  key={hospital.h_code}
                  className="w-1/3 flex flex-col items-center justify-center rounded-[10px] overflow-hidden cursor-pointer transition-transform duration-300 hover:scale-[1.03] hover:opacity-80"
                  onClick={() =>
                    navigate(`/dentistList/dentistView?id=${hospital.h_code}`)
                  }
                >
                  <div className="w-full h-[150px] md:h-[300px] overflow-hidden rounded-[10px]">
                    <img
                      src="https://ocnuykfvdtebmondqppu.supabase.co/storage/v1/object/public/images/TESTIMG.png"
                      alt="img"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span
                    className="mt-2"
                    style={{ fontSize: "clamp(12px, 1.5vw, 20px)" }}
                  >
                    {hospital.h_name || "병원명"}
                  </span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      <section className="sect2 mt-3  myBg w-[96vw] lg:w-[100vw] bg-light-02">
        {/* 탭 버튼 */}
        <div className="flex">
          <button
            onClick={() => setActiveTab(0)}
            className={`flex-1 py-3 text-center font-semibold transition-colors rounded-tl-[10px] rounded-tr-[10px] border border-white cursor-pointer ${
              activeTab === 0
                ? "bg-main-02 text-white"
                : "bg-gray-light text-gray-deep hover:bg-main-01 hover:text-white"
            }`}
          >
            별점 높은 순
          </button>
          <button
            onClick={() => setActiveTab(1)}
            className={`flex-1 py-3 text-center font-semibold transition-colors rounded-tl-[10px] rounded-tr-[10px] border border-white cursor-pointer ${
              activeTab === 1
                ? "bg-main-02 text-white"
                : "bg-gray-light text-gray-deep hover:bg-main-01 hover:text-white"
            }`}
          >
            리뷰 많은 순
          </button>
          <button
            onClick={() => setActiveTab(2)}
            className={`flex-1 py-3 text-center font-semibold transition-colors rounded-tl-[10px] rounded-tr-[10px] border border-white cursor-pointer ${
              activeTab === 2
                ? "bg-main-02 text-white"
                : "bg-gray-light text-gray-deep hover:bg-main-01 hover:text-white"
            }`}
          >
            댓글 많은 순
          </button>
        </div>

        <div className="container">
          <h4 className="tit mt-8">
            <span className="material-icons">
              {activeTab === 0 && "star"}
              {activeTab === 1 && "edit"}
              {activeTab === 2 && "chat"}
            </span>
            {activeTab === 0 && "별점 높은 병원 순위"}
            {activeTab === 1 && "리뷰 많은 병원 순위"}
            {activeTab === 2 && "댓글 많은 병원 순위"}
          </h4>

          {/* 탭 콘텐츠 */}
          <div className="py-6 flex flex-col md:flex-row md:flex-wrap md:justify-between gap-4">
            {/* tab1 start */}

            {activeTab === 0 &&
              hospitals.map((hospital, index) => (
                <div
                  key={hospital.h_code}
                  className={`tab_cont text-center text-deep p-6 bg-white rounded-[10px] shadow-[0_4px_10px_rgba(0,0,0,0.1)] w-full md:w-[48%] lg:w-[30%] ${
                    index === hospitals.length - 1 ? "hidden md:block" : ""
                  }`}
                >
                  <div className="tab_cont_tit flex flex-col items-start">
                    <h4 className="tit mr-4" id="cardId">
                      <span className="material-icons">local_hospital</span>
                      {hospital.h_name || "병원명"}
                    </h4>

                    <div className="stars flex flex-row text-point items-center">
                      <span className="mr-1">
                        {hospital.avg_eval_pt?.toFixed(1)}
                      </span>
                      <div className="flex flex-row text-point items-center">
                        {renderStars(hospital.avg_eval_pt || 0)}
                      </div>
                    </div>
                  </div>

                  <div className="cardImg rounded-[10px] overflow-hidden mt-5">
                    <img
                      src="https://ocnuykfvdtebmondqppu.supabase.co/storage/v1/object/public/images/TESTIMG.png"
                      alt="img"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <ul className="cardList text-left mt-4" id="cardList">
                    <li className="flex items-start gap-[5px] mb-[5px]">
                      <div className="bg-main-02 rounded-full w-[15px] h-[15px] flex justify-center items-center p-2.5 shrink-0 mt-[2px]">
                        <span
                          className="material-icons text-white"
                          style={{ fontSize: "14px" }}
                        >
                          location_on
                        </span>
                      </div>
                      <span className="dummy text-gray-deep">
                        {hospital.h_addr || "주소 없음"}
                      </span>
                    </li>
                    <li className="flex items-center gap-[5px] mb-[5px]">
                      <div className="bg-main-02 rounded-full w-[15px] h-[15px] flex justify-center items-center p-2.5 shrink-0">
                        <span
                          className="material-icons text-white"
                          style={{ fontSize: "14px" }}
                        >
                          phone
                        </span>
                      </div>
                      <span className="dummy text-gray-deep">
                        {hospital.h_tel1 || "전화번호 없음"}
                      </span>
                    </li>
                    <li className="flex items-center gap-[5px] mb-[5px]">
                      <div className="bg-main-02 rounded-full w-[15px] h-[15px] flex justify-center items-center p-2.5 shrink-0">
                        <span
                          className="material-icons text-white"
                          style={{ fontSize: "14px" }}
                        >
                          edit_calendar
                        </span>
                      </div>
                      <span className="dummy text-gray-deep">
                        진료 이용 후기 {hospital.review_cnt || 0}건, 댓글{" "}
                        {hospital.comment_cnt || 0}건
                      </span>
                    </li>
                    <li className="flex items-start gap-[5px]">
                      <div className="bg-main-02 rounded-full w-[15px] h-[15px] flex justify-center items-center p-2.5 shrink-0 mt-[2px]">
                        <span
                          className="material-icons text-white"
                          style={{ fontSize: "14px" }}
                        >
                          description
                        </span>
                      </div>
                      <span className="dummy text-gray-deep mt-0.5">
                        {hospital.h_park_yn || "내용 없음"}, &nbsp;
                        {hospital.h_bigo || "내용 없음"}
                      </span>
                    </li>
                  </ul>
                </div>
              ))}

            {/* tab2 start */}

            {activeTab === 1 &&
              hospitalsReview.map((hospital, index) => (
                <div
                  key={hospital.h_code}
                  className={`tab_cont text-center text-deep p-6 bg-white rounded-[10px] shadow-[0_4px_10px_rgba(0,0,0,0.1)] w-full md:w-[48%] lg:w-[30%] ${
                    index === hospitalsReview.length - 1
                      ? "hidden md:block"
                      : ""
                  }`}
                >
                  <div className="tab_cont_tit flex flex-col items-start">
                    <h4 className="tit mr-4" id="cardId">
                      <span className="material-icons">local_hospital</span>
                      {hospital.h_name || "병원명"}
                    </h4>

                    <div className="stars flex flex-row text-point items-center">
                      <span className="mr-1">
                        {hospital.avg_eval_pt?.toFixed(1)}
                      </span>
                      <div className="flex flex-row text-point items-center">
                        {renderStars(hospital.avg_eval_pt || 0)}
                      </div>
                    </div>
                  </div>

                  <div className="cardImg rounded-[10px] overflow-hidden mt-5">
                    <img
                      src="https://ocnuykfvdtebmondqppu.supabase.co/storage/v1/object/public/images/TESTIMG.png"
                      alt="img"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <ul className="cardList text-left mt-4" id="cardList">
                    <li className="flex items-start gap-[5px] mb-[5px]">
                      <div className="bg-main-02 rounded-full w-[15px] h-[15px] flex justify-center items-center p-2.5 shrink-0 mt-[2px]">
                        <span
                          className="material-icons text-white"
                          style={{ fontSize: "14px" }}
                        >
                          location_on
                        </span>
                      </div>
                      <span className="dummy text-gray-deep">
                        {hospital.h_addr || "주소 없음"}
                      </span>
                    </li>
                    <li className="flex items-center gap-[5px] mb-[5px]">
                      <div className="bg-main-02 rounded-full w-[15px] h-[15px] flex justify-center items-center p-2.5 shrink-0">
                        <span
                          className="material-icons text-white"
                          style={{ fontSize: "14px" }}
                        >
                          phone
                        </span>
                      </div>
                      <span className="dummy text-gray-deep">
                        {hospital.h_tel1 || "전화번호 없음"}
                      </span>
                    </li>
                    <li className="flex items-center gap-[5px] mb-[5px]">
                      <div className="bg-main-02 rounded-full w-[15px] h-[15px] flex justify-center items-center p-2.5 shrink-0">
                        <span
                          className="material-icons text-white"
                          style={{ fontSize: "14px" }}
                        >
                          edit_calendar
                        </span>
                      </div>
                      <span className="dummy text-gray-deep">
                        진료 이용 후기 {hospital.review_cnt || 0}건, 댓글{" "}
                        {hospital.comment_cnt || 0}건
                      </span>
                    </li>
                    <li className="flex items-start gap-[5px]">
                      <div className="bg-main-02 rounded-full w-[15px] h-[15px] flex justify-center items-center p-2.5 shrink-0 mt-[2px]">
                        <span
                          className="material-icons text-white"
                          style={{ fontSize: "14px" }}
                        >
                          description
                        </span>
                      </div>
                      <span className="dummy text-gray-deep mt-0.5">
                        {hospital.h_park_yn || "내용 없음"}, &nbsp;
                        {hospital.h_bigo || "내용 없음"}
                      </span>
                    </li>
                  </ul>
                </div>
              ))}

            {/* tab3 start */}

            {activeTab === 2 &&
              hospitalsComment.map((hospital, index) => (
                <div
                  key={hospital.h_code}
                  className={`tab_cont text-center text-deep p-6 bg-white rounded-[10px] shadow-[0_4px_10px_rgba(0,0,0,0.1)] w-full md:w-[48%] lg:w-[30%] ${
                    index === hospitalsComment.length - 1
                      ? "hidden md:block"
                      : ""
                  }`}
                >
                  <div className="tab_cont_tit flex flex-col items-start">
                    <h4 className="tit mr-4" id="cardId">
                      <span className="material-icons">local_hospital</span>
                      {hospital.h_name || "병원명"}
                    </h4>

                    <div className="stars flex flex-row text-point items-center">
                      <span className="mr-1">
                        {hospital.avg_eval_pt?.toFixed(1)}
                      </span>
                      <div className="flex flex-row text-point items-center">
                        {renderStars(hospital.avg_eval_pt || 0)}
                      </div>
                    </div>
                  </div>

                  <div className="cardImg rounded-[10px] overflow-hidden mt-5">
                    <img
                      src="https://ocnuykfvdtebmondqppu.supabase.co/storage/v1/object/public/images/TESTIMG.png"
                      alt="img"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <ul className="cardList text-left mt-4" id="cardList">
                    <li className="flex items-start gap-[5px] mb-[5px]">
                      <div className="bg-main-02 rounded-full w-[15px] h-[15px] flex justify-center items-center p-2.5 shrink-0 mt-[2px]">
                        <span
                          className="material-icons text-white"
                          style={{ fontSize: "14px" }}
                        >
                          location_on
                        </span>
                      </div>
                      <span className="dummy text-gray-deep">
                        {hospital.h_addr || "주소 없음"}
                      </span>
                    </li>
                    <li className="flex items-center gap-[5px] mb-[5px]">
                      <div className="bg-main-02 rounded-full w-[15px] h-[15px] flex justify-center items-center p-2.5 shrink-0">
                        <span
                          className="material-icons text-white"
                          style={{ fontSize: "14px" }}
                        >
                          phone
                        </span>
                      </div>
                      <span className="dummy text-gray-deep">
                        {hospital.h_tel1 || "전화번호 없음"}
                      </span>
                    </li>
                    <li className="flex items-center gap-[5px] mb-[5px]">
                      <div className="bg-main-02 rounded-full w-[15px] h-[15px] flex justify-center items-center p-2.5 shrink-0">
                        <span
                          className="material-icons text-white"
                          style={{ fontSize: "14px" }}
                        >
                          edit_calendar
                        </span>
                      </div>
                      <span className="dummy text-gray-deep">
                        진료 이용 후기 {hospital.review_cnt || 0}건, 댓글{" "}
                        {hospital.comment_cnt || 0}건
                      </span>
                    </li>
                    <li className="flex items-start gap-[5px]">
                      <div className="bg-main-02 rounded-full w-[15px] h-[15px] flex justify-center items-center p-2.5 shrink-0 mt-[2px]">
                        <span
                          className="material-icons text-white"
                          style={{ fontSize: "14px" }}
                        >
                          description
                        </span>
                      </div>
                      <span className="dummy text-gray-deep mt-0.5">
                        {hospital.h_park_yn || "내용 없음"}, &nbsp;
                        {hospital.h_bigo || "내용 없음"}
                      </span>
                    </li>
                  </ul>
                </div>
              ))}
          </div>
        </div>

        <div className="w-[90%] md:w-[50%] lg:w-[30%] flex justify-center mx-auto pb-6 mb-[50px]">
          <Button
            size="long"
            variant="primary"
            onClick={() => {
              // activeTab에 따라 정렬 파라미터 추가
              const sortParam =
                activeTab === 0
                  ? "rating"
                  : activeTab === 1
                  ? "review"
                  : "comment";
              navigate(`/dentistList?sort=${sortParam}`);
            }}
            className="cursor-pointer"
          >
            더보기
          </Button>
        </div>
      </section>
    </>
  );
}

export default Home;
