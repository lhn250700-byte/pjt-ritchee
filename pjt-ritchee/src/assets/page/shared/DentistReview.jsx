import React, { useEffect, useState } from 'react';
import PageNatation from './../../../componetns/PageNatation';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import { getReviewsByHospital } from './../../../api/ReviewAndCommentApi';

function DentistReview() {
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const h_code = query.get('id');

  const [review, setReview] = useState([]);
  const [page, setPage] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);
  const [pageSize, setPageSize] = useState(getDeviceSize());

  // 화면 크기에 따른 size 가져오기
  function getDeviceSize() {
    const width = window.innerWidth;
    if (width >= 1280) return 9; // PC
    else if (width >= 768) return 5; // TB
    else return 5; // MB
  }

  // 화면 resize 시 pageSize 업데이트
  useEffect(() => {
    const handleResize = () => setPageSize(getDeviceSize());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const fetch = async () => {
    if (!h_code) return;

    try {
      const data = await getReviewsByHospital({
        h_code,
        page,
        size: pageSize,
      });

      setReview(Array.isArray(data.content) ? data.content : []);
      setTotalReviews(data.totalElements || 0);
    } catch (error) {
      console.error('reviewList Fetch Error', error);
      setReview([]);
      setTotalReviews(0);
    }
  };

  useEffect(() => {
    fetch();
  }, [h_code, page, pageSize]);

  return (
    <>
      {review.length > 0 ? (
        <div className="myBg bg-light-02">
          <div className="wrap" style={{ backgroundColor: '#f4f8ff', marginTop: '30px' }}>
            <div className="container">
              <div className="flex items-center gap-[5px] mb-5">
                <span className="material-icons">edit_calendar</span>
                <h4>고객님들의 실제 후기</h4>
              </div>

              <ul className="list flex flex-col xl:flex-row xl:flex-wrap xl:gap-4">
                {review?.map((r) => (
                  <li key={r?.r_id} className="w-full xl:w-[32%]">
                    <Link to={`/dentistList/dentistView/dentistReview?reviewId=${r?.r_id}`}>
                      <div
                        className="review w-full px-[13px] py-3.5 bg-white rounded-[5px] shadow-lg border border-main-01 mb-2.5"
                        style={{
                          boxShadow: 'rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px',
                        }}
                      >
                        <div className="reviewTitle flex items-center justify-between mb-3">
                          <span>{r?.r_title || '리뷰 제목'}</span>
                          <span className="material-icons">keyboard_arrow_right</span>
                        </div>
                        <div className="reviewContent dummy text-gray-deep truncate mb-2.5">
                          {r?.r_content || '리뷰 내용'}
                        </div>
                        <div className="reviewEvaluation flex justify-between items-center">
                          <div className="stars flex flex-row text-point">
                            <span className="mr-1">{r?.r_eval_pt ? r?.r_eval_pt.toFixed(1) : '0'}</span>
                            <div className="flex flex-row text-point items-center">
                              {Array.from({ length: 5 }).map((_, i) => {
                                const evalPt = r?.r_eval_pt ?? 0;
                                if (evalPt >= i + 1)
                                  return (
                                    <span key={i} className="material-icons">
                                      star
                                    </span>
                                  );
                                if (evalPt > i && evalPt < i + 1)
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
                          <div className="dummy text-gray-mid">조회수 : {r?.r_views ?? '0'}</div>
                        </div>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* 페이지네이션 */}
          <div className="mb-[34px]">
            <PageNatation totalElements={totalReviews} pageSize={pageSize} currentPage={page} pageFn={setPage} />
          </div>
        </div>
      ) : (
        <p className="w-full text-center text-gray-500 my-30">작성된 후기가 없습니다.</p>
      )}
    </>
  );
}

export default DentistReview;
