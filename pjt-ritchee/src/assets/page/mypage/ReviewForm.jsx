import React, { useEffect, useState } from "react";
import { Link, Form, useNavigate, useLocation } from "react-router-dom";
import Button from "../../../componetns/Button";
import {
  createReview,
  getHospitalList,
} from "../../../api/hospital_createreview";
import { useUser } from "../../../context/UserContext";

function ReviewForm() {
  const { user } = useUser();
  const navigate = useNavigate();
  const location = useLocation();

  // location.state에서 안전하게 가져오기
  const {
    hospitalCode,
    hospitalName: HospitalName = "",
    a_id,
  } = location.state || {};

  const [rating, setRating] = useState(0);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [hospitalName, setHospitalName] = useState(HospitalName);
  console.log(a_id);
  useEffect(() => {
    if (!hospitalCode) {
      alert("잘못된 접근입니다.");
      navigate("/mypage/medicalList");
      return;
    }
    (async () => {
      try {
        const hospitals = await getHospitalList();
        const hospital = hospitals.find((h) => h.h_code === hospitalCode);
        if (hospital) setHospitalName(hospital.h_name);
      } catch (err) {
        console.error("병원 정보 조회 실패", err);
      }
    })();
  }, [hospitalCode, navigate]);

  const handleStarClick = (clickedRating) => {
    setRating((prev) => (prev === clickedRating ? 0 : clickedRating));
  };

  const handleCancel = (e) => {
    e.preventDefault();
    navigate("/mypage/medicalList");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!rating || !title || !content) {
      alert("별점, 제목, 내용을 모두 입력해주세요.");
      return;
    }

    if (!hospitalCode || !hospitalName) {
      alert("병원 정보를 불러올 수 없습니다.");
      return;
    }

    const reviewData = {
      h_code: hospitalCode,
      h_user_id: user?.id,
      a_id: a_id,
      r_title: title,
      r_content: content,
      r_eval_pt: rating,
      r_views: 0,
      r_del_yn: "N",
    };

    console.log("전송할 리뷰 데이터:", reviewData);

    try {
      await createReview(reviewData);
      alert("리뷰가 등록되었습니다.");
      navigate("/mypage/reviewHistory");
    } catch (err) {
      console.error("리뷰 등록 실패", err);
      alert(err.response?.data?.message || "리뷰 등록 중 오류가 발생했습니다.");
    }
  };

  return (
    <>
      <div className="min-h-screen bg-light-02 myBg text-sm md:px-6 md:py-3 md:text-base lg:px-8 lg:py-4 lg:text-lg">
        <div className="container flex flex-col">
          <div className="w-full md:max-w-2xl mx-auto">
            <h4 className="tit my-1 mt-10">
              <span className="material-icons">edit_calendar</span>
              후기 작성 하기
            </h4>
          </div>

          <div className="w-full md:max-w-2xl mx-auto">
            <span className="tit my-1 mt-5">
              <span className="material-icons">local_hospital</span>
              {hospitalName}
            </span>
          </div>

          <div className="pl-1 my-5 text-gray-500 w-full md:max-w-3xl mx-auto">
            <div className="container">
              · &nbsp; 방문 일자 &nbsp;: 2025-11-12
            </div>
          </div>

          <div className="container">
            <div className="w-full md:max-w-2xl mx-auto border border-main-01 p-3 rounded-[4px] mb-5 bg-white text-gray-200">
              <div className=" space-y-2 my-5 text-gray-500">
                <p className="tit  flex items-center gap-2">
                  <i className="fa-regular fa-solid fa-tooth text-[12px] p-1  mr-4 rounded-full text-white bg-deep mb-0.5"></i>
                  진료는 만족스러웠나요?
                </p>
              </div>
              <div className="flex flex-row text-point items-center justify-evenly w-full mb-3">
                {[1, 2, 3, 4, 5].map((starNum) => (
                  <span
                    key={starNum}
                    className="material-icons !text-[clamp(30px,10vw,80px)] cursor-pointer"
                    onClick={() => handleStarClick(starNum)}
                  >
                    {starNum <= rating ? "star" : "star_outline"}
                  </span>
                ))}
              </div>
            </div>

            <div className="w-full md:max-w-2xl mx-auto">
              <form className="w-full">
                <div className="relative">
                  <i className="fa-regular fa-solid fa-tooth text-[12px] p-1 rounded-full text-white bg-deep mb-0.5 absolute left-3 top-6.5"></i>
                  <input
                    type="text"
                    className="border border-main-01 p-6 pl-11 w-full rounded-[4px] bg-white placeholder-deep text-black text-base font-semibold"
                    placeholder="후기의 제목을 작성해주세요!"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                <div className="relative mt-5">
                  <i
                    className="fa-regular fa-solid fa-tooth text-[12px] p-1 rounded-full text-white bg-deep mb-0.5 absolute left-3 top-6
                  "
                  ></i>
                  <textarea
                    className="border border-main-01 p-2.5 pl-11 py-5.5 w-full rounded-[4px] bg-white text-black text-base font-semibold h-[300px] placeholder-black resize-none"
                    placeholder="세세한 후기를 작성해주세요!"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  />
                </div>

                <div className="flex justify-between w-full mb-20 mt-5">
                  <Button size="mid" variant="primary" onClick={handleCancel}>
                    취소
                  </Button>
                  <Button size="mid" variant="primary" onClick={handleSubmit}>
                    등록
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ReviewForm;
