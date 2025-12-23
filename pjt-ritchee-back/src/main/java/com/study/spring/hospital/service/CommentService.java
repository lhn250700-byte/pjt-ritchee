package com.study.spring.hospital.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.study.spring.hospital.dto.MyCommentDto;
import com.study.spring.hospital.entity.H_comment;
import com.study.spring.hospital.entity.H_review;
import com.study.spring.hospital.repository.CommentRepository;
import com.study.spring.hospital.repository.ReviewRepository;
import com.study.spring.user.entity.User;
import com.study.spring.user.repository.UserRepository;

@Service
public class CommentService {

	@Autowired
	CommentRepository commentRepository;

	@Autowired
	ReviewRepository reviewRepository; // 리뷰 조회용
	
	@Autowired
	UserRepository userRepository;

	public H_review findReviewWithComments(int reviewId) {
		return reviewRepository.findcommentwithComments(reviewId);
	}

	public void createComment(MyCommentDto req) {
		H_review review = reviewRepository.findById(req.getReviewId())
				.orElseThrow(() -> new RuntimeException("Review not found"));

		User user = userRepository.findById(req.getUserId())
	             .orElseThrow(() -> new RuntimeException("User not found"));
		
		H_comment comment = new H_comment();
		comment.setC_content(req.getC_content());
		comment.setH_review(review);
		comment.setH_user(user);

		commentRepository.save(comment);
	}
}
