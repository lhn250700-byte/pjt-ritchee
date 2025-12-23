package com.study.spring.hospital.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.study.spring.hospital.dto.HospitalSumDTO;
import com.study.spring.hospital.entity.Hospital;

@Repository
public interface HospitalSumRepository extends JpaRepository<Hospital, String>{

	// TEST 1
	 @Query(value = """
	 		SELECT H.h_code AS h_code,
                    H.h_name AS h_name,
                    COUNT(*) AS review_cnt,
                    ROUND(AVG(R.r_eval_pt), 1) AS avg_eval_pt
             FROM hospital H
             JOIN h_review R ON H.h_code = R.h_code
             WHERE COALESCE(R.r_del_yn,'N') = 'N'
             GROUP BY H.h_code, H.h_name
             ORDER BY review_cnt desc, avg_eval_pt desc
             """, // SQL 위치 지정자 사용 가능
             nativeQuery = true) // <-- 네이티브 쿼리 활성화
	 List<HospitalSumDTO> findHospitalSum1();
	 
	 // TEST 2
	 @Query(value = """
		 		SELECT H.h_code AS h_code, 
		 			H.h_name AS h_name, 
		 			COUNT(DISTINCT R.r_id) AS review_cnt, 
		 			ROUND(AVG(R.r_eval_pt),1) AS avg_eval_pt, 
		 			COUNT(DISTINCT C.c_id) AS comment_cnt
	 			FROM hospital H
	 			JOIN h_review R ON H.h_code = R.h_code
	 			LEFT JOIN h_comment C ON R.r_id = C.r_id
	 			WHERE COALESCE(R.r_del_yn,'N') = 'N'
	 			AND COALESCE(C.c_del_yn,'N') = 'N' 
	 			GROUP BY H.h_code, H.h_name
	 			ORDER BY REVIEW_CNT DESC,AVG_EVAL_PT DESC, COMMENT_CNT DESC
	             """, // SQL 위치 지정자 사용 가능
	             nativeQuery = true) // <-- 네이티브 쿼리 활성화
	 List<HospitalSumDTO> findHospitalSum2();
	 
	 // 리뷰카운트, 평균평점, 코멘트 건수, 좋아요 순
	 @Query(value = """
		 		SELECT H.h_code AS h_code, 
		 			H.h_name AS h_name,
		 			MAX(H.h_addr) AS h_addr,
					MAX(H.h_tel1) AS h_tel1,
					MAX(COALESCE(h_tel2, '010-0000-0000')) AS h_tel2,
					MAX(CASE WHEN H.h_park_yn = 'Y' THEN '주차가능' ELSE '주차불가'END ) AS h_park_yn,
					MAX(H.h_bigo) AS h_bigo, 
		 			COUNT(DISTINCT R.r_id) AS review_cnt, 
		 			ROUND(AVG(COALESCE(R.r_eval_pt,0)),1) AS avg_eval_pt, 
		 			COUNT(DISTINCT C.c_id) AS comment_cnt,
		 			COUNT(DISTINCT L.l_id) AS like_cnt
	 			FROM hospital H
	 			LEFT JOIN h_review R ON H.h_code = R.h_code
	 			LEFT JOIN h_comment C ON R.r_id = C.r_id
	 			LEFT JOIN h_like L ON R.r_id = L.r_id
	 			WHERE COALESCE(R.r_del_yn,'N') = 'N'
	 			AND COALESCE(C.c_del_yn,'N') = 'N' 
	 			GROUP BY H.h_code, H.h_name
	 			ORDER BY REVIEW_CNT DESC,AVG_EVAL_PT DESC, COMMENT_CNT DESC, LIKE_CNT DESC, h_code
	             """, // SQL 위치 지정자 사용 가능
	        countQuery = """
                 SELECT COUNT(DISTINCT H.h_code) COUNT
                 FROM hospital H
                 LEFT JOIN h_review R ON H.h_code = R.h_code
                 LEFT JOIN h_comment C ON R.r_id = C.r_id
                 LEFT JOIN h_like L ON R.r_id = L.r_id
                 WHERE COALESCE(R.r_del_yn,'N') = 'N'
                  AND COALESCE(C.c_del_yn, 'N') = 'N'
                 """, // 전체 카운트를 위한 별도의 쿼리 제공 (성능 및 정확성 향상)
	             nativeQuery = true) // <-- 네이티브 쿼리 활성화
	 Page<HospitalSumDTO> findHospitalSumByReviewCnt(Pageable pageable);
	 
	 // 평균평점, 리뷰카운트, 좋아요, 코멘트 순
	 @Query(value = """
		 		SELECT H.h_code AS h_code, 
		 			H.h_name AS h_name, 
		 			MAX(H.h_addr) AS h_addr,
					MAX(H.h_tel1) As h_tel1,
					MAX(COALESCE(h_tel2, '010-0000-0000')) As h_tel2,
					MAX(CASE WHEN H.h_park_yn = 'Y' THEN '주차가능' ELSE '주차불가'END ) AS h_park_yn,
					MAX(H.h_bigo) AS h_bigo, 
		 			COUNT(DISTINCT R.r_id) AS review_cnt, 
		 			ROUND(AVG(COALESCE(R.r_eval_pt,0)),1) AS avg_eval_pt, 
		 			COUNT(DISTINCT C.c_id) AS comment_cnt,
		 			COUNT(DISTINCT L.l_id) AS like_cnt
	 			FROM hospital H
	 			LEFT JOIN h_review R ON H.h_code = R.h_code
	 			LEFT JOIN h_comment C ON R.r_id = C.r_id
	 			LEFT JOIN h_like L ON R.r_id = L.r_id
	 			WHERE COALESCE(R.r_del_yn,'N') = 'N'
	 			AND COALESCE(C.c_del_yn,'N') = 'N' 
	 			GROUP BY H.h_code, H.h_name
	 			ORDER BY AVG_EVAL_PT DESC, REVIEW_CNT DESC, LIKE_CNT DESC, COMMENT_CNT DESC, h_code
	             """, // SQL 위치 지정자 사용 가능
	       countQuery = """
                 SELECT COUNT(DISTINCT H.h_code) COUNT
                 FROM hospital H
                 LEFT JOIN h_review R ON H.h_code = R.h_code
                 LEFT JOIN h_comment C ON R.r_id = C.r_id
                 LEFT JOIN h_like L ON R.r_id = L.r_id
                 WHERE COALESCE(R.r_del_yn,'N') = 'N'
                  AND COALESCE(C.c_del_yn, 'N') = 'N'
                 """, // 전체 카운트를 위한 별도의 쿼리 제공 (성능 및 정확성 향상
	             nativeQuery = true) // <-- 네이티브 쿼리 활성화
	 Page<HospitalSumDTO> findHospitalSumByEvalPt(Pageable pageable);
	 
	 // 코멘트, 평균평점, 리뷰건수, 좋아요 순
	 @Query(value = """
		 		SELECT H.h_code AS h_code, 
		 			H.h_name AS h_name, 
		 			MAX(H.h_addr) AS h_addr,
					MAX(H.h_tel1) AS h_tel1,
					MAX(COALESCE(h_tel2, '010-0000-0000')) AS h_tel2,
					MAX(CASE WHEN H.h_park_yn = 'Y' THEN '주차가능' ELSE '주차불가'END ) AS h_park_yn,
					MAX(H.h_bigo) AS h_bigo, 
		 			COUNT(DISTINCT R.r_id) AS review_cnt, 
		 			ROUND(AVG(COALESCE(R.r_eval_pt,0)),1) AS avg_eval_pt, 
		 			COUNT(DISTINCT C.c_id) AS comment_cnt,
		 			COUNT(DISTINCT L.l_id) AS like_cnt
	 			FROM hospital H
	 			LEFT JOIN h_review R ON H.h_code = R.h_code
	 			LEFT JOIN h_comment C ON R.r_id = C.r_id
	 			LEFT JOIN h_like L ON R.r_id = L.r_id
	 			WHERE COALESCE(R.r_del_yn,'N') = 'N'
	 			AND COALESCE(C.c_del_yn,'N') = 'N' 
	 			GROUP BY H.h_code, H.h_name
	 			ORDER BY COMMENT_CNT DESC, AVG_EVAL_PT DESC, REVIEW_CNT DESC , LIKE_CNT DESC, h_code
	 			""", // SQL 위치 지정자 사용 가능
	 		countQuery = """
                 SELECT COUNT(DISTINCT H.h_code) COUNT
                 FROM hospital H
                 LEFT JOIN h_review R ON H.h_code = R.h_code
                 LEFT JOIN h_comment C ON R.r_id = C.r_id
                 LEFT JOIN h_like L ON R.r_id = L.r_id
                 WHERE COALESCE(R.r_del_yn,'N') = 'N'
                  AND COALESCE(C.c_del_yn, 'N') = 'N'
                 """, // 전체 카운트를 위한 별도의 쿼리 제공 (성능 및 정확성 향상
	             nativeQuery = true) // <-- 네이티브 쿼리 활성화
	 Page<HospitalSumDTO> findHospitalSumByCommentCnt(Pageable pageable);
	 
	 // 인기 TOP3 - 평점, 좋아요, 리뷰카운트, 코멘트순 3개
	 @Query(value = """
		 		SELECT H.h_code AS h_code, 
		 			H.h_name AS h_name, 
		 			MAX(H.h_addr) AS h_addr,
					MAX(H.h_tel1) AS h_tel1,
					MAX(COALESCE(h_tel2, '010-0000-0000')) AS h_tel2,
					MAX(CASE WHEN H.h_park_yn = 'Y' THEN '주차가능' ELSE '주차불가'END ) AS h_park_yn,
					MAX(H.h_bigo) AS h_bigo, 
		 			COUNT(DISTINCT R.r_id) AS review_cnt, 
		 			ROUND(AVG(COALESCE(R.r_eval_pt,0)),1) AS avg_eval_pt, 
		 			COUNT(DISTINCT C.c_id) AS comment_cnt,
		 			COUNT(DISTINCT L.l_id) AS like_cnt
	 			FROM hospital H
	 			LEFT JOIN h_review R ON H.h_code = R.h_code
	 			LEFT JOIN h_comment C ON R.r_id = C.r_id
	 			LEFT JOIN h_like L ON R.r_id = L.r_id
	 			WHERE COALESCE(R.r_del_yn,'N') = 'N'
	 			AND COALESCE(C.c_del_yn,'N') = 'N' 
	 			GROUP BY H.h_code, H.h_name
	 			ORDER BY avg_eval_pt DESC, like_cnt DESC, review_cnt DESC, comment_cnt DESC, h_code
	             """, // SQL 위치 지정자 사용 가능
	      	countQuery = """
                 SELECT COUNT(DISTINCT H.h_code) COUNT
                 FROM hospital H
                 LEFT JOIN h_review R ON H.h_code = R.h_code
                 LEFT JOIN h_comment C ON R.r_id = C.r_id
                 LEFT JOIN h_like L ON R.r_id = L.r_id
                 WHERE COALESCE(R.r_del_yn,'N') = 'N'
                 AND COALESCE(C.c_del_yn, 'N') = 'N'
                 """, // 전체 카운트를 위한 별도의 쿼리 제공 (성능 및 정확성 향상
	             nativeQuery = true) // <-- 네이티브 쿼리 활성화
	 Page<HospitalSumDTO> findHospitalSumByTopList(Pageable pageable);
	 
	 //
	 // 병원 평점/리뷰 순 TOP N 목록 조회 (검색 조건 포함)
	 // h_name, h_addr, h_park_yn 조건을 동적으로 적용
	 //
	 @Query(value = """
		        SELECT H.h_code AS h_code, 
		               H.h_name AS h_name, 
		               MAX(H.h_addr) AS h_addr,
		               MAX(H.h_tel1) AS h_tel1,
		               MAX(COALESCE(h_tel2, '010-0000-0000')) AS h_tel2,
		               MAX(CASE WHEN H.h_park_yn = 'Y' THEN '주차가능' ELSE '주차불가' END ) AS h_park_yn,
		               MAX(H.h_bigo) AS h_bigo, 
		               COUNT(DISTINCT R.r_id) AS review_cnt, 
		               ROUND(AVG(COALESCE(R.r_eval_pt,0)),1) AS avg_eval_pt, 
		               COUNT(DISTINCT C.c_id) AS comment_cnt,
		               COUNT(DISTINCT L.l_id) AS like_cnt
		        FROM hospital H
		        LEFT JOIN h_review R ON H.h_code = R.h_code
		        LEFT JOIN h_comment C ON R.r_id = C.r_id
		        LEFT JOIN h_like L ON R.r_id = L.l_id
		        WHERE 
		           COALESCE(R.r_del_yn,'N') = 'N'
		           AND COALESCE(C.c_del_yn,'N') = 'N'
		            /* === 추가된 검색 조건 시작 === */
		           AND (:h_name IS NULL OR H.h_name LIKE CONCAT('%', :h_name, '%'))
		           AND (:h_addr IS NULL OR H.h_addr LIKE CONCAT('%', :h_addr, '%'))
		           AND (:h_park_yn IS NULL OR (CASE WHEN H.h_park_yn = 'Y' THEN '주차가능' ELSE '주차불가' END)  LIKE CONCAT('%', :h_park_yn, '%'))
		            /* === 추가된 검색 조건 종료 === */
		        GROUP BY H.h_code, H.h_name
		        ORDER BY avg_eval_pt DESC, like_cnt DESC, review_cnt DESC, comment_cnt DESC, h_code
		        """,
		        countQuery = """
		            SELECT COUNT(DISTINCT H.h_code) COUNT
		            FROM hospital H
		            LEFT JOIN h_review R ON H.h_code = R.h_code
		            LEFT JOIN h_comment C ON R.r_id = C.r_id
		            LEFT JOIN h_like L ON R.r_id = L.l_id
		            WHERE 
		                COALESCE(R.r_del_yn,'N') = 'N'
		                AND COALESCE(C.c_del_yn, 'N') = 'N'
		                /* === 추가된 검색 조건 시작 === */
		                AND (:h_name IS NULL OR H.h_name LIKE CONCAT('%', :h_name, '%'))
		                AND (:h_addr IS NULL OR H.h_addr LIKE CONCAT('%', :h_addr, '%'))
		                AND (:h_park_yn IS NULL OR (CASE WHEN H.h_park_yn = 'Y' THEN '주차가능' ELSE '주차불가' END)  LIKE CONCAT('%', :h_park_yn, '%'))
		                /* === 추가된 검색 조건 종료 === */
		            """,
		        nativeQuery = true)
		    Page<HospitalSumDTO> findHospitalSumByTopListFindNameWithSearch(
		            Pageable pageable,
		            @Param("h_name") String h_name,
		            @Param("h_addr") String h_addr,
		            @Param("h_park_yn") String h_park_yn);
	 
	 //
	 // 병원 평점/리뷰 순 TOP N 목록 조회 (검색 조건 포함)
	 // para1, para2, para3 조건을 동적으로 적용
	 //
	 @Query(value = """
		        SELECT H.h_code AS h_code, 
		               H.h_name AS h_name, 
		               MAX(H.h_addr) AS h_addr,
		               MAX(H.h_tel1) AS h_tel1,
		               MAX(COALESCE(h_tel2, '010-0000-0000')) AS h_tel2,
		               MAX(CASE WHEN H.h_park_yn = 'Y' THEN '주차가능' ELSE '주차불가' END ) AS h_park_yn,
		               MAX(H.h_bigo) AS h_bigo, 
		               COUNT(DISTINCT R.r_id) AS review_cnt, 
		               ROUND(AVG(COALESCE(R.r_eval_pt,0)),1) AS avg_eval_pt, 
		               COUNT(DISTINCT C.c_id) AS comment_cnt,
		               COUNT(DISTINCT L.l_id) AS like_cnt
		        FROM hospital H
		        LEFT JOIN h_review R ON H.h_code = R.h_code
		        LEFT JOIN h_comment C ON R.r_id = C.r_id
		        LEFT JOIN h_like L ON R.r_id = L.l_id
		        WHERE 
		           COALESCE(R.r_del_yn,'N') = 'N'
		           AND COALESCE(C.c_del_yn,'N') = 'N'
		            /* === para1, para2, para3를 merge 추가된 검색 조건 시작 === */
		           AND ((:para1 IS NOT NULL AND H.h_name||H.h_addr||(CASE WHEN H.h_park_yn = 'Y' THEN '주차가능' ELSE '주차불가' END) LIKE CONCAT('%', :para1, '%'))
		               OR (:para2 IS NOT NULL AND H.h_name||H.h_addr||(CASE WHEN H.h_park_yn = 'Y' THEN '주차가능' ELSE '주차불가' END) LIKE CONCAT('%', :para2, '%'))
		               OR (:para3 IS NOT NULL AND H.h_name||H.h_addr||(CASE WHEN H.h_park_yn = 'Y' THEN '주차가능' ELSE '주차불가' END) LIKE CONCAT('%', :para3, '%'))
		               )
		            /* === para1, para2, para3를 merge 추가된 검색 조건 종료 === */
		        GROUP BY H.h_code, H.h_name
		        ORDER BY avg_eval_pt DESC, like_cnt DESC, review_cnt DESC, comment_cnt DESC, h_code
		        """,
		        countQuery = """
		            SELECT COUNT(DISTINCT H.h_code) COUNT
		            FROM hospital H
		            LEFT JOIN h_review R ON H.h_code = R.h_code
		            LEFT JOIN h_comment C ON R.r_id = C.r_id
		            LEFT JOIN h_like L ON R.r_id = L.l_id
		            WHERE 
		                COALESCE(R.r_del_yn,'N') = 'N'
		                AND COALESCE(C.c_del_yn, 'N') = 'N'
		        	/* === para1, para2, para3를 merge 추가된 검색 조건 시작 === */
		        	    AND ((:para1 IS NOT NULL AND H.h_name||H.h_addr||(CASE WHEN H.h_park_yn = 'Y' THEN '주차가능' ELSE '주차불가' END) LIKE CONCAT('%', :para1, '%'))
		                     OR (:para2 IS NOT NULL AND H.h_name||H.h_addr||(CASE WHEN H.h_park_yn = 'Y' THEN '주차가능' ELSE '주차불가' END) LIKE CONCAT('%', :para2, '%'))
		                     OR (:para3 IS NOT NULL AND H.h_name||H.h_addr||(CASE WHEN H.h_park_yn = 'Y' THEN '주차가능' ELSE '주차불가' END) LIKE CONCAT('%', :para3, '%'))
		                    )
		        	/* === para1, para2, para3를 merge 추가된 검색 조건 종료 === */
		            """,
		        nativeQuery = true)
		    Page<HospitalSumDTO> findHospitalSumByTopListFindParatWithSearch(
		            Pageable pageable,
		            @Param("para1") String para1,
		            @Param("para2") String para2,
		            @Param("para3") String para3);

	 @Query(value = """
		        SELECT H.h_code AS h_code, 
		               H.h_name AS h_name, 
		               MAX(H.h_addr) AS h_addr,
		               MAX(H.h_tel1) AS h_tel1,
		               MAX(COALESCE(h_tel2, '010-0000-0000')) AS h_tel2,
		               MAX(CASE WHEN H.h_park_yn = 'Y' THEN '주차가능' ELSE '주차불가' END ) AS h_park_yn,
		               MAX(H.h_bigo) AS h_bigo, 
		               COUNT(DISTINCT R.r_id) AS review_cnt, 
		               ROUND(AVG(COALESCE(R.r_eval_pt,0)),1) AS avg_eval_pt, 
		               COUNT(DISTINCT C.c_id) AS comment_cnt,
		               COUNT(DISTINCT L.l_id) AS like_cnt
		        FROM hospital H
		        LEFT JOIN h_review R ON H.h_code = R.h_code
		        LEFT JOIN h_comment C ON R.r_id = C.r_id
		        LEFT JOIN h_like L ON R.r_id = L.l_id
		        WHERE 
		           COALESCE(R.r_del_yn,'N') = 'N'
		           AND COALESCE(C.c_del_yn,'N') = 'N'
		            /* === para1, para2, para3를 merge 추가된 검색 조건 시작 === */
		           AND ((:para1 IS NOT NULL AND H.h_name||H.h_addr||(CASE WHEN H.h_park_yn = 'Y' THEN '주차가능' ELSE '주차불가' END) LIKE CONCAT('%', :para1, '%'))
		               OR (:para2 IS NOT NULL AND H.h_name||H.h_addr||(CASE WHEN H.h_park_yn = 'Y' THEN '주차가능' ELSE '주차불가' END) LIKE CONCAT('%', :para2, '%'))
		               OR (:para3 IS NOT NULL AND H.h_name||H.h_addr||(CASE WHEN H.h_park_yn = 'Y' THEN '주차가능' ELSE '주차불가' END) LIKE CONCAT('%', :para3, '%'))
		               )
		            /* === para1, para2, para3를 merge 추가된 검색 조건 종료 === */
		        GROUP BY H.h_code, H.h_name
		        ORDER BY review_cnt DESC, avg_eval_pt DESC, like_cnt DESC, comment_cnt DESC, h_code
		        """,
		        countQuery = """
		            SELECT COUNT(DISTINCT H.h_code) COUNT
		            FROM hospital H
		            LEFT JOIN h_review R ON H.h_code = R.h_code
		            LEFT JOIN h_comment C ON R.r_id = C.r_id
		            LEFT JOIN h_like L ON R.r_id = L.l_id
		            WHERE 
		                COALESCE(R.r_del_yn,'N') = 'N'
		                AND COALESCE(C.c_del_yn, 'N') = 'N'
		        	/* === para1, para2, para3를 merge 추가된 검색 조건 시작 === */
		        	    AND ((:para1 IS NOT NULL AND H.h_name||H.h_addr||(CASE WHEN H.h_park_yn = 'Y' THEN '주차가능' ELSE '주차불가' END) LIKE CONCAT('%', :para1, '%'))
		                     OR (:para2 IS NOT NULL AND H.h_name||H.h_addr||(CASE WHEN H.h_park_yn = 'Y' THEN '주차가능' ELSE '주차불가' END) LIKE CONCAT('%', :para2, '%'))
		                     OR (:para3 IS NOT NULL AND H.h_name||H.h_addr||(CASE WHEN H.h_park_yn = 'Y' THEN '주차가능' ELSE '주차불가' END) LIKE CONCAT('%', :para3, '%'))
		                    )
		        	/* === para1, para2, para3를 merge 추가된 검색 조건 종료 === */
		            """,
		        nativeQuery = true)
		    Page<HospitalSumDTO> findHospitalSumByReviewAndTopListFindPara1(
		            Pageable pageable,
		            @Param("para1") String para1,
		            @Param("para2") String para2,
		            @Param("para3") String para3);

	 
	 @Query(value = """
		        SELECT H.h_code AS h_code, 
		               H.h_name AS h_name, 
		               MAX(H.h_addr) AS h_addr,
		               MAX(H.h_tel1) AS h_tel1,
		               MAX(COALESCE(h_tel2, '010-0000-0000')) AS h_tel2,
		               MAX(CASE WHEN H.h_park_yn = 'Y' THEN '주차가능' ELSE '주차불가' END ) AS h_park_yn,
		               MAX(H.h_bigo) AS h_bigo, 
		               COUNT(DISTINCT R.r_id) AS review_cnt, 
		               ROUND(AVG(COALESCE(R.r_eval_pt,0)),1) AS avg_eval_pt, 
		               COUNT(DISTINCT C.c_id) AS comment_cnt,
		               COUNT(DISTINCT L.l_id) AS like_cnt
		        FROM hospital H
		        LEFT JOIN h_review R ON H.h_code = R.h_code
		        LEFT JOIN h_comment C ON R.r_id = C.r_id
		        LEFT JOIN h_like L ON R.r_id = L.l_id
		        WHERE 
		           COALESCE(R.r_del_yn,'N') = 'N'
		           AND COALESCE(C.c_del_yn,'N') = 'N'
		            /* === para1, para2, para3를 merge 추가된 검색 조건 시작 === */
		           AND ((:para1 IS NOT NULL AND H.h_name||H.h_addr||(CASE WHEN H.h_park_yn = 'Y' THEN '주차가능' ELSE '주차불가' END) LIKE CONCAT('%', :para1, '%'))
		               OR (:para2 IS NOT NULL AND H.h_name||H.h_addr||(CASE WHEN H.h_park_yn = 'Y' THEN '주차가능' ELSE '주차불가' END) LIKE CONCAT('%', :para2, '%'))
		               OR (:para3 IS NOT NULL AND H.h_name||H.h_addr||(CASE WHEN H.h_park_yn = 'Y' THEN '주차가능' ELSE '주차불가' END) LIKE CONCAT('%', :para3, '%'))
		               )
		            /* === para1, para2, para3를 merge 추가된 검색 조건 종료 === */
		        GROUP BY H.h_code, H.h_name
		        ORDER BY comment_cnt DESC, avg_eval_pt DESC, review_cnt DESC, like_cnt DESC, h_code
		        """,
		        countQuery = """
		            SELECT COUNT(DISTINCT H.h_code) COUNT
		            FROM hospital H
		            LEFT JOIN h_review R ON H.h_code = R.h_code
		            LEFT JOIN h_comment C ON R.r_id = C.r_id
		            LEFT JOIN h_like L ON R.r_id = L.l_id
		            WHERE 
		                COALESCE(R.r_del_yn,'N') = 'N'
		                AND COALESCE(C.c_del_yn, 'N') = 'N'
		        	/* === para1, para2, para3를 merge 추가된 검색 조건 시작 === */
		        	    AND ((:para1 IS NOT NULL AND H.h_name||H.h_addr||(CASE WHEN H.h_park_yn = 'Y' THEN '주차가능' ELSE '주차불가' END) LIKE CONCAT('%', :para1, '%'))
		                     OR (:para2 IS NOT NULL AND H.h_name||H.h_addr||(CASE WHEN H.h_park_yn = 'Y' THEN '주차가능' ELSE '주차불가' END) LIKE CONCAT('%', :para2, '%'))
		                     OR (:para3 IS NOT NULL AND H.h_name||H.h_addr||(CASE WHEN H.h_park_yn = 'Y' THEN '주차가능' ELSE '주차불가' END) LIKE CONCAT('%', :para3, '%'))
		                    )
		        	/* === para1, para2, para3를 merge 추가된 검색 조건 종료 === */
		            """,
		        nativeQuery = true)
		    Page<HospitalSumDTO> findHospitalSumByCommentAndTopListFindPara1(
		            Pageable pageable,
		            @Param("para1") String para1,
		            @Param("para2") String para2,
		            @Param("para3") String para3);
		    
}
