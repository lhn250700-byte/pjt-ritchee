import React from 'react';

const DentCard = ({ hospital }) => {
  return (
    <>
      <div className="tab_cont_tit flex flex-row md:flex-col items-center md:items-start mb-5">
        <h4 className="tit mr-4" id="cardId">
          <span className="material-icons">local_hospital</span>
          {hospital.h_name || '병원명'}
        </h4>
        <div className="stars flex flex-row text-point items-center">
          <span className="mr-1">{hospital.avg_eval_pt.toFixed(1) || '0'}</span>
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

      <div className="cardImg rounded-[10px] overflow-hidden mt-5">
        <img
          src="https://ocnuykfvdtebmondqppu.supabase.co/storage/v1/object/public/images/TESTIMG.png"
          alt="img"
          className="w-full h-full object-cover"
        />
      </div>

      <ul className="cardList text-left mt-4" id="cardList">
        <li className="addr flex items-start gap-[5px] mb-[5px]">
          <div className="bg-main-02 rounded-full w-[15px] h-[15px] flex justify-center items-center p-2.5 shrink-0 mt-[2px]">
            <span className="material-icons text-white" style={{ fontSize: '14px' }}>
              location_on
            </span>
          </div>
          <span className="dummy text-gray-deep">{hospital.h_addr || '주소 없음'}</span>
        </li>

        <li className="tel flex items-center gap-[5px] mb-[5px]">
          <div className="bg-main-02 rounded-full w-[15px] h-[15px] flex justify-center items-center p-2.5 shrink-0">
            <span className="material-icons text-white" style={{ fontSize: '14px' }}>
              edit_calendar
            </span>
          </div>
          <span className="dummy text-gray-deep">{hospital.h_tel1 || '02-000-0000'}</span>
        </li>

        <li className="review flex items-center gap-[5px] mb-[5px]">
          <div className="bg-main-02 rounded-full w-[15px] h-[15px] flex justify-center items-center p-2.5 shrink-0 mt-[2px]">
            <span className="material-icons text-white" style={{ fontSize: '14px' }}>
              edit_calendar
            </span>
          </div>
          <span className="dummy text-gray-deep">
            진료 이용 후기 {hospital.review_cnt > 0 ? hospital.review_cnt : '0'}건, 댓글 {hospital.comment_cnt || '0'}건
          </span>
        </li>

        <li className="etc flex items-center gap-[5px] mb-[5px]">
          <div className="bg-main-02 rounded-full w-[15px] h-[15px] flex justify-center items-center p-2.5 shrink-0 mt-[2px]">
            <span className="material-icons text-white" style={{ fontSize: '14px' }}>
              filter_vintage
            </span>
          </div>
          <span className="dummy text-gray-deep">
            {hospital.h_park_yn || '내용 없음'}
            {hospital.h_bigo.includes('점심') ? '' : `, ${hospital.h_bigo}`}
          </span>
        </li>
      </ul>
    </>
  );
};

export default DentCard;
