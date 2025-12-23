package com.study.spring.hospital.controller;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.study.spring.hospital.dto.MyReviewLikeDto;
import com.study.spring.hospital.dto.MyReviewListDto;
import com.study.spring.hospital.repository.MyReviewLikeRepository;
import com.study.spring.hospital.repository.MyReviewRepository;
import com.study.spring.hospital.service.MyReviewService;

@RestController
public class ReviewController {

	@Autowired
	MyReviewRepository myRLRepo;

	@Autowired
	MyReviewLikeRepository MyReviewLikeRepo;

	@Autowired
	MyReviewService myReviewService;

	@GetMapping("/api/myreviewlist")
	public List<MyReviewListDto> getMyLivew(@RequestParam("userId") UUID userId) {
		return myRLRepo.findByMyReviewList(userId);
	}

	@GetMapping("/api/myreviewlist/{id}")
	public List<MyReviewLikeDto> getMyRL(@PathVariable("id") Integer id) {
		return myReviewService.getMyReviews(id);
	}
}
