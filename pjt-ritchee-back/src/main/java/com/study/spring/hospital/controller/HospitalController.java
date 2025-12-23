package com.study.spring.hospital.controller;


import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.UUID;

import javax.management.RuntimeErrorException;

import com.study.spring.user.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.RestController;
import com.study.spring.hospital.dto.AppointmentDto;
import com.study.spring.hospital.dto.CommentDto;
import com.study.spring.hospital.dto.H_AppmListDto;
import com.study.spring.hospital.dto.H_AppmUserDto;
import com.study.spring.hospital.dto.H_AppmUserHosDto;
import com.study.spring.hospital.dto.H_CommentUserDto;
import com.study.spring.hospital.dto.H_LikeUserDto;
import com.study.spring.hospital.dto.H_ReviewAppmDto;
import com.study.spring.hospital.dto.H_ReviewCommentDto;
import com.study.spring.hospital.dto.H_ReviewLikeDto;
import com.study.spring.hospital.dto.HospitalDto;
import com.study.spring.hospital.dto.LikeDto;
import com.study.spring.hospital.dto.ReservationDto;
import com.study.spring.hospital.dto.ReviewCreateDto;
import com.study.spring.hospital.dto.H_ReviewListDto;
import com.study.spring.hospital.dto.H_ReviewUserDto;
import com.study.spring.hospital.dto.ReviewDto;
import com.study.spring.hospital.entity.H_review;
import com.study.spring.hospital.entity.Hospital;
import com.study.spring.hospital.repository.HospitalAppmRepository;
import com.study.spring.hospital.repository.HospitalRepository;
import com.study.spring.hospital.service.HospitalService;
import com.study.spring.user.entity.User;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
public class HospitalController {
	@Autowired
	HospitalService hService;

	@GetMapping("/")
	public String root() {
		return "hi";
	}
	
	// 전체 병원
	@GetMapping("/api/hospital")
	public List<HospitalDto> getHospital() {
		return hService.findAllHospitalByIdDesc();
	}
	
	// 예약별 리뷰 리스트
	@GetMapping("/api/reviewedAppm")
	public List<H_ReviewAppmDto> getReviewWithAppm() {
		return hService.findAllReviewByIdDesc();
	}
	
	// 병원별 리뷰 리스트(리뷰 없으면 안나옴)
	@GetMapping("/api/review")
	public List<H_ReviewListDto> getReviewList() {
		return hService.findWithReivew();
	}
	
	// 예약한 병원 리뷰 작성
	@PostMapping("/api/review")
	public ResponseEntity<String> reviewCreate(@RequestBody ReviewCreateDto req) {
		try {
			hService.reviewCreate(req);
			return ResponseEntity.ok("Review SUCCESS");
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Review FAILURE: " + e.getMessage());
		}
	}	

	@GetMapping("/api/review/{h_code}")
	public H_ReviewListDto getOneOfHospitalReviewList(
	        @PathVariable("h_code") String h_code) {

	    return hService.findWithReviews(h_code);

	}
	
	// 유저별 작성한 리뷰 리스트
	@GetMapping("/api/reviewUser")
	public List<H_ReviewUserDto> getReviewWithUserList() {
		return hService.findReviewWithUser();
	}
	

	// 리뷰별 댓글 리스트
//	@GetMapping("/api/comment")
//	public List<H_ReviewCommentDto> getCommentList() {
//		return hService.findWithComment();
//	}

	
	// 유저별 작성한 댓글 리스트
	@GetMapping("/api/commentUser")
	public List<H_CommentUserDto> getCommentWithUserList() {
		return hService.findCommentWithUser();
	}
	
	// 병원별 예약 리스트
	@GetMapping("/api/appm")
	public List<H_AppmListDto> getAppmList() {
		return hService.findWithAppm();
	}

	// 특정 병원 예약	
	@PostMapping("/api/appm")
	public ResponseEntity<?> appmCreate(@RequestBody ReservationDto req) {
		try {
			Integer id = hService.appmCreate(req);
			return ResponseEntity.ok(id);	
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Apponintment FAILURE: " + e.getMessage());	
		} 
	}
	
//	예약 개별 조회
	@GetMapping("/api/appmUser/{a_id}/userId/{userId}")
	public H_AppmUserHosDto getAppmWithUser(
			@PathVariable("a_id") Integer a_id, 
			@PathVariable("userId") UUID userId) {
	    return hService.findAppmWithUserById(a_id, userId);
	}
//	예약 개별 조회(관계자용 a_id로만)
	@GetMapping("/api/appmContent")
	public AppointmentDto getAppm(@RequestParam("a_id") Integer a_id) {
		return hService.findById(a_id);
		
	}
	
	@GetMapping("/api/appmUser")
	public List<H_AppmUserDto> getAppmWithUserList() {
		return hService.findAppmWithUser();

	}
	
	
	
	// 리뷰별 좋아요 리스트
	@GetMapping("/api/like")
	public List<H_ReviewLikeDto> getLikeList() {
		return hService.findWithLike();
	}
	
	// 유저별 좋아요 누른 리스트
	@GetMapping("/api/likeUser")
	public List<H_LikeUserDto> getLikeWithUserList() {
		return hService.findLikeWithUser();
	}
	
	// 입력된 시간이 운영 시간 내인지 확인하는 API
	@GetMapping("/api/run")
	public String getAble(@RequestParam(name="h_code") String h_code, @RequestParam(name="time") String time) {
		System.out.println("들어온 시간 " + time);
		return hService.getAble(h_code, time);
	}
}
