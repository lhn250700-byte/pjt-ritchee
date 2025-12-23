import React, { useState, useEffect } from 'react';

function PageNatation({
  totalElements, // 서버에서 받아온 총 요소 수
  pageSize = 10, // 한 페이지에 보여줄 요소 수
  currentPage = 0, // 현재 페이지 (0-based 또는 1-based 자동 감지)
  totalPages, // 총 페이지 수 (totalElements 대신 직접 전달 가능)
  pageFn, // 클릭 시 호출
}) {
  // 총 페이지 수 계산
  // totalPages가 직접 전달되면 사용, 아니면 totalElements와 pageSize로 계산
  const calculatedTotalPages = totalPages !== undefined 
    ? totalPages 
    : (totalElements !== undefined && totalElements !== null && pageSize > 0 
        ? Math.ceil(totalElements / pageSize) 
        : 0);

  // currentPage가 0-based인지 1-based인지 자동 감지
  // currentPage가 0이거나 calculatedTotalPages보다 작으면 0-based로 간주
  // 그 외에는 1-based로 간주 (예: currentPage가 1 이상이고 totalPages와 비슷한 범위)
  // 더 정확하게는: currentPage가 0이면 0-based, currentPage가 1 이상이면 1-based로 간주
  // 하지만 totalPages가 전달되고 currentPage가 1 이상이면 이미 1-based로 변환된 것으로 간주
  const isZeroBased = currentPage === 0 || (totalPages === undefined && totalElements !== undefined);
  const normalizedCurrentPage = isZeroBased ? currentPage + 1 : currentPage;
  
  const [internalCurrentPage, setInternalCurrentPage] = useState(normalizedCurrentPage);

  // 외부 currentPage 변경 시 내부 상태 동기화
  useEffect(() => {
    const normalized = isZeroBased ? currentPage + 1 : currentPage;
    setInternalCurrentPage(normalized);
  }, [currentPage, isZeroBased]);

  const handlePageChange = (page) => {
    if (page < 1 || page > calculatedTotalPages) return;
    setInternalCurrentPage(page);
    if (pageFn) {
      // 모든 pageFn은 0-based를 기대하므로 항상 0-based로 전달
      // (내부적으로는 1-based로 표시하지만, 콜백은 0-based로 전달)
      pageFn(page - 1);
    }
  };

  // 페이지 번호 그룹 계산 (5개씩 그룹화)
  const getPageNumbers = () => {
    const pages = [];
    const pageGroup = Math.ceil(internalCurrentPage / 5);
    const startPage = (pageGroup - 1) * 5 + 1;
    const endPage = Math.min(pageGroup * 5, calculatedTotalPages);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  // totalPages가 0이면 표시하지 않음
  if (calculatedTotalPages === 0) return null;

  return (
    <div className="flex items-center justify-center gap-2 py-4">
      {/* 이전 버튼 */}
      <button
        onClick={() => handlePageChange(internalCurrentPage - 1)}
        disabled={internalCurrentPage === 1}
        className={`${
          internalCurrentPage === 1 ? '' : 'lg:hover:cursor-pointer'
        } w-10 h-10 rounded-md bg-white text-gray-deep border border-main-01 hover:bg-main-01 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300`}
      >
        <i className="fa-solid fa-chevron-left"></i>
      </button>

      {/* 페이지 번호 */}
      {getPageNumbers().map((page) => (
        <button
          key={page}
          onClick={() => handlePageChange(page)}
          className={`lg:hover:cursor-pointer w-10 h-10 rounded-md transition-colors duration-300 ${
            internalCurrentPage === page
              ? 'bg-point text-white'
              : 'bg-white text-gray-deep border border-main-01 hover:bg-light-01'
          }`}
        >
          {page}
        </button>
      ))}

      {/* 다음 버튼 */}
      <button
        onClick={() => handlePageChange(internalCurrentPage + 1)}
        disabled={internalCurrentPage === calculatedTotalPages}
        className={`${
          internalCurrentPage === calculatedTotalPages ? '' : 'lg:hover:cursor-pointer'
        } w-10 h-10 rounded-md bg-white text-gray-deep border border-main-01 hover:bg-light-01 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300`}
      >
        <i className="fa-solid fa-chevron-right"></i>
      </button>
    </div>
  );
}

export default PageNatation;
