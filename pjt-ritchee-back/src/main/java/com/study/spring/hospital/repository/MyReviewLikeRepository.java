package com.study.spring.hospital.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.study.spring.hospital.entity.H_review;

@Repository
public interface MyReviewLikeRepository extends JpaRepository<H_review, Integer> {

	@Query("""
			    select r
			    from H_review r
			    where r.r_id = :rId
			""")
	Optional<H_review> findByReviewId(@Param("rId") Integer rId);

	@Query(value = """
			    SELECT
			        r.r_id,
			        r.a_id,
			        r.h_code,
			        r.h_user_id,
			        r.r_title,
			        r.r_content,
			        r.r_eval_pt,
			        r.r_views,
			        r.r_del_yn
			    FROM h_review r
			    WHERE r.r_id = :reviewId
			""", nativeQuery = true)
	List<Object[]> findMyReviewsByReviewIdRaw(@Param("reviewId") Integer reviewId);

	@Query("""
			    select r
			    from H_review r
			    left join fetch r.h_appm
			    left join fetch r.hospital
			    left join fetch r.h_user
			    where r.r_id = :reviewId
			""")
	List<H_review> findMyReviewsByReviewId(@Param("reviewId") Integer reviewId);

	@Query(value = """
			    SELECT COUNT(*)
			    FROM h_like l
			    WHERE l.r_id = :reviewId
			""", nativeQuery = true)
	Long countLikesByReviewId(@Param("reviewId") Integer reviewId);

	@Modifying
	@Query("""
			UPDATE H_review r
			SET r.r_views = r.r_views + 1
			WHERE r.r_id = :r_id
			""")
	void increaseViews(@Param("r_id") Integer reviewId);
}
