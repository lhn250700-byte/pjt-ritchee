package com.study.spring.hospital.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.study.spring.hospital.dto.MyReviewLikeDto;
import com.study.spring.hospital.entity.H_review;
import com.study.spring.hospital.repository.MyReviewLikeRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional // update 직후 select를 하는 것처럼 연속적으로 db 작업을 수행하는 경우, db 작업을 묶음 처리 하여 수행하도록 함 
public class MyReviewService {
    private final MyReviewLikeRepository repo;

    // reviewId 기준으로 리뷰 조회 (DTO 반환)
    public List<MyReviewLikeDto> getMyReviews(Integer reviewId) {
        log.info("Searching for review with ID: {}", reviewId);
        try {
        		repo.increaseViews(reviewId); // 조회수 증가
            // 먼저 Native Query로 시도 (timestamp 제외)
            List<Object[]> rawResults = repo.findMyReviewsByReviewIdRaw(reviewId);
            if (!rawResults.isEmpty()) {
                List<MyReviewLikeDto> reviewDtos = new ArrayList<>();
                for (Object[] row : rawResults) {
                    H_review review = H_review.builder()
                    		.r_id(((Number) row[0]).intValue())
                            .r_title((String) row[4])
                            .r_content((String) row[5])
                            .r_eval_pt(((Number) row[6]).intValue())
                            .r_views(((Number) row[7]).intValue())
                            .r_del_yn((String) row[8])
                            .build();

                    // likes 개수 가져오기 (timestamp 제외)
                    Long likeCount = repo.countLikesByReviewId(reviewId);

                    // DTO 생성 (likes 개수 포함)
                    MyReviewLikeDto dto = new MyReviewLikeDto(review, likeCount != null ? likeCount : 0);
                    reviewDtos.add(dto);
                }
                log.info("Found {} reviews for ID: {} (using raw query)", reviewDtos.size(), reviewId);
                return reviewDtos;
            }
            // Native Query로 결과가 없으면 JPQL 시도
            List<H_review> result = repo.findMyReviewsByReviewId(reviewId);
            List<MyReviewLikeDto> reviewDtos = new ArrayList<>();
            for (H_review review : result) {
                Long likeCount = repo.countLikesByReviewId(reviewId);
                MyReviewLikeDto dto = new MyReviewLikeDto(review, likeCount != null ? likeCount : 0);
                reviewDtos.add(dto);
            }
            log.info("Found {} reviews for ID: {}", reviewDtos.size(), reviewId);
            return reviewDtos;
        } catch (DataIntegrityViolationException e) {
            log.error("Invalid timestamp data found for reviewId: {}. Error: {}", reviewId, e.getMessage(), e);
            // 예외 발생 시 Native Query로 재시도
            try {
                List<Object[]> rawResults = repo.findMyReviewsByReviewIdRaw(reviewId);
                List<MyReviewLikeDto> reviewDtos = new ArrayList<>();
                for (Object[] row : rawResults) {
                    H_review review = H_review.builder()
                            .r_id((Integer) row[0])
                            .r_title((String) row[4])
                            .r_content((String) row[5])
                            .r_eval_pt((Integer) row[6])
                            .r_views((Integer) row[7])
                            .r_del_yn((String) row[8])
                            .build();

                    // likes 개수 가져오기 (timestamp 제외)
                    Long likeCount = repo.countLikesByReviewId(reviewId);

                    // DTO 생성 (likes 개수 포함)
                    MyReviewLikeDto dto = new MyReviewLikeDto(review, likeCount != null ? likeCount : 0);
                    reviewDtos.add(dto);
                }
                return reviewDtos;
            } catch (Exception ex) {
                log.error("Error in fallback query: {}", ex.getMessage());
                return new ArrayList<>();
            }
        } catch (Exception e) {
            log.error("Error occurred while fetching review with ID: {}. Error: {}", reviewId, e.getMessage(), e);
            return new ArrayList<>();
        }
    }
}
