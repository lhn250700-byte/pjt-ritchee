import React, { useEffect, useState } from 'react';
import PageNatation from '../../../componetns/PageNatation';
import { useUser } from '../../../context/UserContext';
import { getReviewList } from '../../../api/hospital_reviewHistory';

function ReviewHistory() {
  const { user } = useUser();
  const [reviews, setReviews] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [loading, setLoading] = useState(false);
  const itemsPerPage = 9;

  useEffect(() => {
    const fetchReviews = async () => {
      if (!user?.id) return;

      try {
        setLoading(true);
        const data = await getReviewList(user.id, currentPage, itemsPerPage);
        console.log('리뷰 API 응답:', data);

        // 서버가 페이지네이션을 지원하는 경우
        if (data.content && data.totalElements !== undefined) {
          setReviews(data.content);
          setTotalElements(data.totalElements);
        }
        // 서버가 배열을 직접 반환하는 경우 (클라이언트 측 페이지네이션)
        else if (Array.isArray(data)) {
          const totalItems = data.length;
          const startIndex = currentPage * itemsPerPage;
          const endIndex = startIndex + itemsPerPage;
          const paginatedData = data.slice(startIndex, endIndex);
          setReviews(paginatedData);
          setTotalElements(totalItems);
        }
        // 그 외의 경우
        else {
          setReviews([]);
          setTotalElements(0);
        }
      } catch (error) {
        console.error('리뷰 불러오기 실패:', error);
        setReviews([]);
        setTotalElements(0);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [user, currentPage, itemsPerPage]);

  const handlePageChange = (apiPage) => {
    // pageFn에서 이미 -1을 해서 전달하므로 API 기준(0부터) 페이지 번호
    setCurrentPage(apiPage);
  };

  return (
    <div className="min-h-screen bg-light-02 myBg px-4 py-2 text-sm md:px-6 md:py-3 md:text-base lg:px-8 lg:py-4 lg:text-lg">
      <div className="container flex flex-col max-w-screen-xl mx-auto">
        <h4 className="tit my-5 mt-10 mx-[1vw] break-words">
          <span className="material-icons">edit_calendar</span>
          {user?.name || '회원'} 님의 작성 후기
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
          {loading ? (
            <p className="w-full text-center text-gray-500">로딩중...</p>
          ) : reviews.length === 0 ? (
            <p className="w-full text-left text-gray-500 pl-[1vw]">
              작성한 후기가 없습니다.
            </p>
          ) : (
            reviews.map((review, index) => (
              <div
                key={review.r_id || index}
                className="
            border border-main-01 p-4 rounded-lg bg-white text-gray-700 shadow-lg 
            flex flex-col justify-between
            break-words overflow-hidden 
          "
              >
                <ul className="pl-1 space-y-2 text-gray-500 overflow-hidden break-words">
                  <h4 className="tit my-3 mt-3 flex items-center gap-1 break-words overflow-hidden">
                    <span className="material-icons">local_hospital</span>
                    {review.h_name}
                  </h4>
                  <li className="break-words">· 제목: {review.r_title}</li>
                  <li className="break-words">· 내용: {review.r_content}</li>

                  {/* 별점 */}
                  <li className="flex flex-row text-point items-center">
                    {Array.from({ length: review.r_eval_pt || 0 }).map(
                      (_, i) => (
                        <span
                          key={i}
                          className="material-icons !text-[clamp(14px,10vw,24px)]"
                        >
                          star
                        </span>
                      )
                    )}
                  </li>

                  <li className="break-words">
                    · 작성일:{' '}
                    {review.createdAt?.substring(0, 10) ||
                      review.r_date?.substring(0, 10)}
                  </li>
                </ul>
              </div>
            ))
          )}
        </div>

        {/* 페이지네이션 */}
        <div className="mb-[34px]">
          <PageNatation
            totalElements={totalElements}
            pageSize={itemsPerPage}
            currentPage={currentPage}
            pageFn={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
}

export default ReviewHistory;
