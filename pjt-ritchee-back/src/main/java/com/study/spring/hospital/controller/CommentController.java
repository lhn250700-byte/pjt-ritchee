package com.study.spring.hospital.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.study.spring.hospital.dto.H_MyReviewCommentDto;
import com.study.spring.hospital.dto.MyCommentDto;
import com.study.spring.hospital.entity.H_review;
import com.study.spring.hospital.service.CommentService;

@RestController
public class CommentController {

	@Autowired
	CommentService cmService;

	@GetMapping("/api/comment")
	public H_MyReviewCommentDto getReviewWithComments(@RequestParam("reviewId") int reviewId) {
		H_review review = cmService.findReviewWithComments(reviewId);
		return H_MyReviewCommentDto.builder().r_id(review.getR_id()).createdAt(review.getCreatedAt())
				.commentCount(review.getComments().size())
				.comments(review.getComments().stream()
						.map(comment -> new MyCommentDto(
								reviewId,
								comment.getH_user() != null ? comment.getH_user().getId() : null,
								comment.getC_content(),
								comment.getH_user() != null ? comment.getH_user().getName() : null,
								comment.getCreatedAt()))
						.toList())
				.build();
	}

	@PostMapping("/api/comment")
	public void createComment(@RequestBody MyCommentDto req) {
		cmService.createComment(req);
	}
}