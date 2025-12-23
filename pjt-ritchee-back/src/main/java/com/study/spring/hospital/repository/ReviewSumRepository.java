package com.study.spring.hospital.repository;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.study.spring.hospital.dto.ReviewSumDTO;
import com.study.spring.hospital.entity.H_review;

@Repository
public interface ReviewSumRepository extends JpaRepository<H_review, Integer>{
	//단일리뷰정보조회
	@Query(value ="""
			SELECT  R.r_id As r_id, 
					R.a_id As a_id, 
					R.h_code As h_code, 
					MAX(H.h_name) As h_name, 
					R.h_user_id As h_user_id, 
					MAX(U.name) As h_user_name, 
					MAX(R.r_title) As r_title, 
					MAX(R.r_content) As r_content, 
					MAX(R.r_eval_pt) As r_eval_pt, 
					MAX(R.r_views) As r_views, 
					TO_CHAR(R.created_at,'YYYY-MM-DD HH:MM:SS') As createdAt,
		 			COUNT(DISTINCT C.c_id) AS comment_cnt,
		 			COUNT(DISTINCT L.l_id) AS like_cnt
			FROM h_review R 
			JOIN hospital H ON R.h_code = H.h_code
			JOIN h_user U ON U.id = R.h_user_id
			LEFT JOIN h_comment C ON R.r_id = C.r_id
			LEFT JOIN h_like L ON R.r_id = L.r_id
			WHERE COALESCE(R.r_del_yn,'N') = 'N'
			AND COALESCE(C.c_del_yn,'N') = 'N'  
			AND R.r_id = :r_id
			GROUP BY R.r_id, R.a_id, R.h_code, R.h_user_id  
				""",
			nativeQuery = true) // <- 네이티브 쿼리 활성화
	Optional<ReviewSumDTO> findReviewSumInfo(@Param("r_id") Integer r_id);
	
	//병원별리뷰정보조회
	@Query(value ="""
			SELECT  R.r_id As r_id, 
					R.a_id As a_id, 
					R.h_code As h_code, 
					MAX(H.h_name) As h_name, 
					R.h_user_id As h_user_id, 
					MAX(U.name) As h_user_name, 
					MAX(R.r_title) As r_title, 
					MAX(R.r_content) As r_content, 
					MAX(R.r_eval_pt) As r_eval_pt, 
					MAX(R.r_views) As r_views, 
					TO_CHAR(R.created_at,'YYYY-MM-DD HH:MM:SS') As createdAt,
		 			COUNT(DISTINCT C.c_id) AS comment_cnt,
		 			COUNT(DISTINCT L.l_id) AS like_cnt
			FROM h_review R 
			JOIN hospital H ON R.h_code = H.h_code
			JOIN h_user U ON U.id = R.h_user_id
			LEFT JOIN h_comment C ON R.r_id = C.r_id
			LEFT JOIN h_like L ON R.r_id = L.r_id
			WHERE COALESCE(R.r_del_yn,'N') = 'N'
			AND COALESCE(C.c_del_yn,'N') = 'N'  
			AND R.h_code = :h_code
			GROUP BY R.r_id, R.a_id, R.h_code, R.h_user_id
			ORDER BY R.r_id  DESC
				""",
			countQuery = """
			SELECT COUNT(DISTINCT R.r_id) COUNT
			FROM h_review R 
			JOIN hospital H ON R.h_code = H.h_code
			JOIN h_user U ON U.id = R.h_user_id
			LEFT JOIN h_comment C ON R.r_id = C.r_id
			LEFT JOIN h_like L ON R.r_id = L.r_id
			WHERE COALESCE(R.r_del_yn,'N') = 'N'
			AND COALESCE(C.c_del_yn,'N') = 'N'  
			AND R.h_code = :h_code
			""",
			nativeQuery = true) // <- 네이티브 쿼리 활성화
	Page<ReviewSumDTO> findReviewSumByHospital(
			Pageable pageable,
			@Param("h_code") String h_code);
}
