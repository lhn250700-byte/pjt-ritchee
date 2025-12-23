package com.study.spring.hospital.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.study.spring.hospital.dto.LikeDto;
import com.study.spring.hospital.entity.H_like;

import jakarta.transaction.Transactional;

@Repository
public interface LikeRepository extends JpaRepository<H_like, Integer> {

	// 전체 좋아요 리스트
	@Query("""
			select new com.study.spring.hospital.dto.LikeDto(
			    l.l_id,
			    l.h_review.r_id,
			    l.h_user.id,
			    l.createdAt
			)
			from H_like l
			""")
	List<LikeDto> findByLikeList();

	// 리뷰별 좋아요 리스트
	@Query("""
			select new com.study.spring.hospital.dto.LikeDto(
			    l.l_id,
			    l.h_review.r_id,
			    l.h_user.id,
			    l.createdAt
			)
			from H_like l
			where l.h_review.r_id = :rId
			""")
	List<LikeDto> findByLikeRV(@Param("rId") int rId);

	// 리뷰별 좋아요 리스트 카운트
	@Query("""
			select count(l)
			from H_like l
			where l.h_review.r_id = :rId
			""")
	Long findByLikeRVCnt(@Param("rId") int rId);

	// 유저별 좋아요 리스트
	@Query("""
			select new com.study.spring.hospital.dto.LikeDto(
			    l.l_id,
			    l.h_review.r_id,
			    l.h_user.id,
			    l.createdAt
			)
			from H_like l
			where l.h_user.id = :userId
			""")
	List<LikeDto> findByLikeUs(@Param("userId") UUID userId);

	@Modifying(clearAutomatically = true)
	@Transactional
	@Query("DELETE FROM H_like l WHERE l.h_review.r_id = :rId AND l.h_user.id = :userId")
	void deleteLike(@Param("rId") int rId, @Param("userId") UUID userId);

	@Query("""
			select new com.study.spring.hospital.dto.LikeDto(
			    l.l_id,
			    l.h_review.r_id,
			    l.h_user.id,
			    l.createdAt
			)
			from H_like l
			where l.h_user.id = :userId and l.h_review.r_id = :r_id
			""")
	LikeDto findByLikeUser(@Param("userId") UUID h_user_id, @Param("r_id") Integer r_id);

}
