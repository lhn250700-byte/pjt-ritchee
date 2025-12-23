import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import DentCard from './DentCard';
import PageNatation from '../../../componetns/PageNatation';
import { getHospitalList } from '../../../api/listApi';

const List = () => {
  const nav = useNavigate();
  const [searchParams] = useSearchParams();

  const [inputValue, setInputValue] = useState('');
  const [hospital, setHospital] = useState([]);
  const [totalElements, setTotalElements] = useState(0); // 총 병원 수

  // URL에서 page, para1, para2 추출
  const page = Number(searchParams.get('page')) || 0;
  const para1 = searchParams.get('para1') || '';
  const para2 = searchParams.get('para2') || '';
  const para3 = searchParams.get('para3') || '';

  const sortType = searchParams.get('sort') || 'rating'; // 기본값은 별점 순

  const fetchHospital = async () => {
    try {
      const data = await getHospitalList({
        page,
        size: 10,
        sortType,
        para1,
        para2,
        para3,
      });

      setHospital(Array.isArray(data.content) ? data.content : []);
      setTotalElements(data.totalElements || 0); // 총 병원 수 저장
    } catch (error) {
      console.error('Fetch Hospital List Error', error);
      setHospital([]);
      setTotalElements(0);
    }
  };

  // 검색 validation + URL 이동
  const onSearch = () => {
    const value = inputValue.trim();

    if (!value) {
      alert('검색어를 입력하세요.');
      return;
    }

    const words = value.split(/\s+/);

    nav(
      `/dentistList?sort=${sortType}&page=0&para1=${words[0]}${words[1] ? `&para2=${words[1]}` : ''}${
        words[2] ? `&para3=${words[2]}` : ''
      }`
    );
  };

  // 엔터 검색
  const EnterHandler = (e) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  };

  // 페이지 클릭 시 URL 이동
  const onPageChange = (newPage) => {
    nav(
      `/dentistList?sort=${sortType}&page=${newPage}${para1 ? `&para1=${para1}` : ''}${para2 ? `&para2=${para2}` : ''}${
        para3 ? `&para3=${para3}` : ''
      }`
    );
  };

  useEffect(() => {
    fetchHospital();
    window.scrollTo({ top: 0 });
  }, [page, para1, para2, para3, sortType]);

  return (
    <div className="myBg bg-light-02">
      <div className="wrap" style={{ backgroundColor: '#f4f8ff' }}>
        <div className="container" style={{ paddingLeft: '5px', paddingRight: '5px' }}>
          <h4 className="tit mb-5">
            <i className="fa-solid fa-tooth"></i>
            구로구 리뷰 치과 릿치!
          </h4>

          {/* 검색 */}
          <div className="list">
            <div className="search rounded-[20px] bg-white border border-main-01 mb-5 py-2 px-4 relative flex flex-col justify-center">
              <input
                type="text"
                name="search"
                placeholder="검색어를 입력하세요"
                className="searchInput outline-none placeholder-gray-mid"
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={EnterHandler}
              />
              <button
                className="searchBtn bg-main-02 w-5 h-5 p-3 rounded-full flex justify-center items-center absolute right-3.5 xl:cursor-pointer"
                onClick={onSearch}
              >
                <span className="material-icons text-white" style={{ fontSize: '17px' }}>
                  search
                </span>
              </button>
            </div>

            {/* 병원 리스트 */}
            <ul
              className={`py-6 flex flex-col md:flex-row md:flex-wrap ${
                hospital?.length < 4 ? 'md:gap-20' : 'md:justify-between'
              } gap-4`}
            >
              {hospital.length !== 0 ? (
                hospital.map((h, i) => (
                  <li
                    key={h.h_code}
                    className={`tab_cont text-center text-deep p-6 bg-white rounded-[10px] shadow-[0_4px_10px_rgba(0,0,0,0.1)] w-full md:w-[48%] lg:w-[30%] ${
                      i === 9 ? 'md:hidden' : ''
                    }`}
                  >
                    <Link to={`/dentistList/dentistView?id=${h.h_code}`}>
                      <DentCard hospital={h} />
                    </Link>
                  </li>
                ))
              ) : para1 ? (
                <li className="text-deep">검색 결과가 없습니다.</li>
              ) : null}
            </ul>
          </div>
        </div>
      </div>

      {/* 페이지네이션 */}
      <div className="mb-[34px]">
        <PageNatation
          totalElements={totalElements} // 총 병원 수
          pageSize={10}
          currentPage={page} // 0-based
          pageFn={onPageChange} // 클릭 시 URL 이동
        />
      </div>
    </div>
  );
};

export default List;
