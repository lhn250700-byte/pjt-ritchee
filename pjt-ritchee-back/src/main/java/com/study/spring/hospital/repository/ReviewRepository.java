package com.study.spring.hospital.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.study.spring.hospital.entity.H_review;

@Repository
public interface ReviewRepository extends JpaRepository<H_review, Integer> {
	@Query("""
			select r
			from H_review r
			LEFT JOIN FETCH r.comments c
			LEFT JOIN FETCH c.h_user u
			where r.r_id = :reviewId
			order by c.c_id asc
			""")
	H_review findcommentwithComments(@Param("reviewId") int reviewId);
}
