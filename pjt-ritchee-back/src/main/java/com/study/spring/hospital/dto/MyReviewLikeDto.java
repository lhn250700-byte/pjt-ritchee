package com.study.spring.hospital.dto;

import java.time.LocalDateTime;

import com.study.spring.hospital.entity.H_review;

public class MyReviewLikeDto {
    private Integer r_id;
    private String r_title;
    private Integer r_eval_pt;
    private Integer r_views;
    private String r_content;
    private LocalDateTime createdAt;
    private long likeCount;
    private long commentCount;

    public MyReviewLikeDto(H_review review) {
        this.r_id = review.getR_id();
        this.r_title = review.getR_title();
        this.r_eval_pt = review.getR_eval_pt();
        this.r_views = review.getR_views();
        this.r_content = review.getR_content();
        this.createdAt = review.getCreatedAt();
        this.likeCount = review.getLikes() != null ? review.getLikes().size() : 0;
        this.commentCount = review.getComments() != null ? review.getComments().size() : 0;
    }

    // likes 개수를 직접 받는 생성자
    public MyReviewLikeDto(H_review review, long likeCount) {
        this.r_id = review.getR_id();
        this.r_title = review.getR_title();
        this.r_eval_pt = review.getR_eval_pt();
        this.r_views = review.getR_views();
        this.r_content = review.getR_content();
        this.createdAt = review.getCreatedAt();
        this.likeCount = likeCount;
        this.commentCount = review.getComments() != null ? review.getComments().size() : 0;
    }

    // Getters
    public int getR_id() {
        return r_id;
    }

    public String getR_title() {
        return r_title;
    }

    public Integer getR_eval_pt() {
        return r_eval_pt;
    }

    public Integer getR_views() {
        return r_views;
    }

    public String getR_content() {
        return r_content;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public long getLikeCount() {
        return likeCount;
    }

    public long getCommentCount() {
        return commentCount;
    }
}
