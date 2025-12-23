import React, { useState } from "react";
import { useNavigate, Routes, Route, useLocation } from "react-router-dom";
import EventView from "./EventView";
import "../../../index.css";

function Event() {
  const navigate = useNavigate();
  const location = useLocation();

  const eventTexts = { fontSize: "clamp(14px, 3vw, 20px)" };

  const selectClick = (id) => {
    navigate(`/event/eventview/${id}`);
  };

  // eventview 경로일 때는 EventView만 렌더링
  if (location.pathname.includes('/event/eventview/')) {
    return (
      <Routes>
        <Route path="eventview/:id" element={<EventView />} />
      </Routes>
    );
  }

  const eventData = [
    {
      eventId: 1,
      // imgMobile: 'https://uosmaiisnppqgxbcbawc.supabase.co/storage/v1/object/public/images/event1.png',
      imgMobile:
        "https://uosmaiisnppqgxbcbawc.supabase.co/storage/v1/object/public/images/tevent1.jpg",
      imgTb:
        "https://uosmaiisnppqgxbcbawc.supabase.co/storage/v1/object/public/images/tevent1.jpg",
      imgPc:
        "https://uosmaiisnppqgxbcbawc.supabase.co/storage/v1/object/public/images/pevent1.jpg",
      Info: true,
    },
    {
      eventId: 2,

      // imgMobile: 'https://uosmaiisnppqgxbcbawc.supabase.co/storage/v1/object/public/images/event2.png',
      imgMobile:
        "https://uosmaiisnppqgxbcbawc.supabase.co/storage/v1/object/public/images/tevent2.jpg",
      imgTb:
        "https://uosmaiisnppqgxbcbawc.supabase.co/storage/v1/object/public/images/tevent2.jpg",
      imgPc:
        "https://uosmaiisnppqgxbcbawc.supabase.co/storage/v1/object/public/images/pevent2.jpg",
      // title: '사랑니 발치 이벤트',
    },
    {
      eventId: 3,
      // imgMobile: 'https://uosmaiisnppqgxbcbawc.supabase.co/storage/v1/object/public/images/event3.png',
      imgMobile:
        "https://uosmaiisnppqgxbcbawc.supabase.co/storage/v1/object/public/images/pevent3.jpg",
      imgTb:
        "https://uosmaiisnppqgxbcbawc.supabase.co/storage/v1/object/public/images/tevent3.jpg",
      imgPc:
        "https://uosmaiisnppqgxbcbawc.supabase.co/storage/v1/object/public/images/pevent3.jpg",
      // title: '치아 교정 이벤트',
    },
    {
      eventId: 4,
      // imgMobile: 'https://uosmaiisnppqgxbcbawc.supabase.co/storage/v1/object/public/images/event4.png',
      imgMobile:
        "https://uosmaiisnppqgxbcbawc.supabase.co/storage/v1/object/public/images/pevent4.jpg",
      imgTb:
        "https://uosmaiisnppqgxbcbawc.supabase.co/storage/v1/object/public/images/tevent4.jpg",
      imgPc:
        "https://uosmaiisnppqgxbcbawc.supabase.co/storage/v1/object/public/images/pevent4.jpg",
      // title: '임플란트 이벤트',
    },
    {
      eventId: 5,
      imgTb:
        "https://uosmaiisnppqgxbcbawc.supabase.co/storage/v1/object/public/images/event5_2.jpg",
    },
  ];

  return (
    <>
      {/* 모바일 */}
      {eventData
        .filter((item) => item.eventId !== 5)
        .map((item) => {
          return (
            <div
              key={item.eventId}
              onClick={() => selectClick(item.eventId)}
              className="myBg mb-5 md:hidden"
            >
              {/* 모바일 이미지 컨테이너 */}
              <div className="w-full aspect-[3/2] overflow-hidden">
                <img
                  src={item.imgMobile}
                  alt="img"
                  className="w-full h-full object-cover object-center cursor-pointer"
                />
              </div>

              {item.Info && (
                <div className="container block md:hidden">
                  <div className="flex items-center gap-[1.28vw] mt-[2.87vh] mb-5 md:hidden">
                    <i className="fa-solid fa-tooth md:text-xl lg:text-2xl xl:text-3xl text-deep"></i>
                    <h4
                      className="font-Pretendard text-deep"
                      style={{ fontSize: "clamp(20px, 3vw, 28px)" }}
                    >
                      구로구 주민 이벤트
                    </h4>
                  </div>

                  <p className="mb-[2.87vh] font-Pretendard" style={eventTexts}>
                    구로구 주민 여러분을 위한 특별 치과 이벤트! 건강한 치아,
                    밝은 미소를 위한 무료 검진 및 스케일링 혜택을 만나보세요.
                    예약은 선착순! 지금 바로 신청하세요.
                  </p>
                </div>
              )}
            </div>
          );
        })}

      {/* 태블릿 */}
      <div className="hidden md:block xl:hidden myBg">
        <div className="overflow-hidden w-full md:h-[60vh] lg:h-[70vh]">
          <div
            onClick={() => selectClick(eventData[0].eventId)}
            className="w-full h-full cursor-pointer mb-6"
          >
            <img
              src={eventData[0].imgTb}
              alt="img"
              className="w-full h-full object-cover cursor-pointer"
            />
          </div>
        </div>

        {eventData[0].Info && (
          <div className="container">
            <div className="flex items-center mt-[2.87vh] gap-4 my-5">
              <i className="fa-solid fa-tooth text-4xl text-deep"></i>
              <h4
                className="font-Pretendard text-deep"
                style={{ fontSize: "clamp(20px, 3vw, 28px)" }}
              >
                구로구 주민 이벤트
              </h4>
            </div>

            <p className="font-Pretendard mb-6" style={eventTexts}>
              구로구 주민 여러분을 위한 특별 치과 이벤트! 건강한 치아, 밝은
              미소를 위한 무료 검진 및 스케일링 혜택을 만나보세요. 예약은
              선착순! 지금 바로 신청하세요.
            </p>
          </div>
        )}

        <div className="grid grid-cols-2 gap-6 mb-6">
          {eventData.slice(1).map((item) => {
            return (
              <div key={item.eventId} onClick={() => selectClick(item.eventId)}>
                <img
                  src={item.imgTb}
                  alt="img"
                  className="w-full object-cover object-center mb-5 cursor-pointer"
                />
                {/* <h4 className="text-deep text-center mt-5">{item.title}</h4> */}
              </div>
            );
          })}
        </div>
      </div>

      {/* pc */}
      <div className=" hidden xl:block myBg">
        <div className="w-full xl:h-[60vh] 2xl:h-[88vh] overflow-hidden">
          <div
            onClick={() => selectClick(eventData[0].eventId)}
            className="w-full h-full cursor-pointer mb-6"
          >
            <img
              src={eventData[0].imgPc}
              alt="img"
              className="w-full h-full object-cover object-center cursor-pointer"
            />
          </div>
        </div>

        {eventData[0].Info && (
          <div className="container mt-6">
            <div className="flex items-center gap-4 mt-[2.87vh] mb-4 ">
              <i className="fa-solid fa-tooth text-3xl text-deep"></i>
              <h4
                className="font-Pretendard text-deep xl:text-7xl"
                style={{ fontSize: "clamp(20px, 3vw, 28px)" }}
              >
                구로구 주민 이벤트
              </h4>
            </div>

            <p
              className="font-Pretendard text-lg leading-relaxed mb-[2.87vh] "
              style={eventTexts}
            >
              구로구 주민 여러분을 위한 특별 치과 이벤트! 건강한 치아, 밝은
              미소를 위한 무료 검진 및 스케일링 혜택을 만나보세요. 예약은
              선착순! 지금 바로 신청하세요.
            </p>
          </div>
        )}

        <div className="hidden xl:grid xl:grid-cols-3 xl:gap-6 mb-15">
          {/* 이벤트5 없애기 */}
          {eventData
            .slice(1)
            .filter((item) => item.eventId !== 5)
            .map((item) => {
              return (
                <div
                  key={item.eventId}
                  onClick={() => selectClick(item.eventId)}
                >
                  <img
                    src={item.imgPc}
                    alt="img"
                    className="w-full object-cover object-center cursor-pointer"
                  />
                  {/* <h4 className="text-deep text-center mt-5">{item.title}</h4> */}
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
}

export default Event;
