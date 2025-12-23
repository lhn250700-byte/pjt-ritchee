package com.study.spring.hospital.service;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.study.spring.hospital.dto.AppointmentDto;
import com.study.spring.hospital.dto.AppointmentWithHospitalNameDto;
import com.study.spring.hospital.dto.CommentDto;
import com.study.spring.hospital.dto.H_AppmListDto;
import com.study.spring.hospital.dto.H_AppmUserDto;
import com.study.spring.hospital.dto.H_AppmUserHosDto;
import com.study.spring.hospital.dto.H_CommentUserDto;
import com.study.spring.hospital.dto.H_LikeUserDto;
import com.study.spring.hospital.dto.H_ReviewAppmDto;
import com.study.spring.hospital.dto.H_ReviewCommentDto;
import com.study.spring.hospital.dto.H_ReviewLikeDto;
import com.study.spring.hospital.dto.H_ReviewListDto;
import com.study.spring.hospital.dto.H_ReviewUserDto;
import com.study.spring.hospital.dto.HospitalDto;
import com.study.spring.hospital.dto.LikeDto;
import com.study.spring.hospital.dto.ReservationDto;
import com.study.spring.hospital.dto.ReservationResponseDto;
import com.study.spring.hospital.dto.ReviewCreateDto;

import com.study.spring.hospital.dto.ReviewDto;
import com.study.spring.hospital.entity.H_appm;
import com.study.spring.hospital.entity.H_review;
import com.study.spring.hospital.entity.Hospital;
import com.study.spring.hospital.repository.HospitalAppmRepository;

import com.study.spring.hospital.repository.HospitalCommentRepository;
import com.study.spring.hospital.repository.HospitalRepository;
import com.study.spring.hospital.repository.HospitalReviewRepository;

import com.study.spring.user.entity.User;
import com.study.spring.user.repository.UserRepository;

@Service
@Transactional(readOnly = true)
public class HospitalService {
	@Autowired
	HospitalRepository hRepo;
	@Autowired
	UserRepository uRepo;
	@Autowired
	HospitalAppmRepository aRepo;
	@Autowired
	HospitalReviewRepository rRepo;
	


	public List<HospitalDto> findAllHospitalByIdDesc() {
		return hRepo.findAllHospitalByIdDesc();
	}

	public List<H_ReviewAppmDto> findAllReviewByIdDesc() {
		return hRepo.findAllReviewByIdDesc();
	}

	public List<H_ReviewListDto> findWithReivew() {
		List<Hospital> hospitals = hRepo.findWithReview();

		return hospitals.stream()
				.map(h -> H_ReviewListDto.builder()
						.h_code(h.getH_code())
						.h_name(h.getH_name())
						.createdAt(h.getCreatedAt())
						.reviewCount(h.getReviews().size())
						.reviews(h.getReviews().stream()
						.map(review -> new ReviewDto(
								review.getR_id(), 
								review.getR_title(), 
								review.getR_content(),
								review.getR_eval_pt(), 
								review.getR_views(), 
								review.getR_del_yn()))
						.toList())
						.build())
				.toList();
	}


	public H_ReviewListDto findWithReviews(String h_code) {
		Hospital h = hRepo.findWithReviews(h_code);

	    return H_ReviewListDto.builder()
	            .h_code(h.getH_code())
	            .h_name(h.getH_name())
	            .createdAt(h.getCreatedAt())
	            .reviewCount(h.getReviews().size())
	            .reviews(
	                    h.getReviews().stream()
	                            .map(review -> new ReviewDto(
	                                    review.getR_id(),
	                                    review.getR_title(),
	                                    review.getR_content(),
	                                    review.getR_eval_pt(),
	                                    review.getR_views(),
	                                    review.getR_del_yn()
	                            ))
	                            .toList()
	            )
	            .build();
	}

	public List<H_ReviewUserDto> findReviewWithUser() {
		List<User> users = hRepo.findReviewWithUser();
		return users.stream()
				.map(u -> H_ReviewUserDto
						.builder()
						.id(u.getId())
						.u_kind(u.getU_kind())
						.name(u.getName())
						.gender(u.getGender())
						.phone(u.getPhone())
						.addr(u.getAddr())
						.birth(u.getBirth())
						.text(u.getText())
						.createdAt(u.getCreatedAt())
						.reviews(u.getReviews().stream()
								.map(review -> new ReviewDto(
										review.getR_id(), 
										review.getR_title(), 
										review.getR_content(), 
										review.getR_eval_pt(), 
										review.getR_views(),
										review.getR_del_yn()))
								.toList())
						.build())
				.toList();	}

//	public List<H_ReviewCommentDto> findWithComment() {
//		List<H_review> reviews = hRepo.findWithComment();
//		return reviews.stream()
//				.map(r-> H_ReviewCommentDto
//						.builder()
//						.r_id(r.getR_id())
//						.r_title(r.getR_title())
//						.r_content(r.getR_content())
//						.r_eval_pt(r.getR_eval_pt())
//						.r_views(r.getR_views())
//						.createdAt(r.getCreatedAt())
//						.commentCount(r.getComments().size()) // getComments는 엔티티에서 가져오는 네임
//						.comments(r.getComments().stream() // .comments는 dto에서 가져오는 네임
//								.map(comment -> new CommentDto(
//										comment.getC_id(), 
//										comment.getC_content()))
//								.toList())
//						.build())
//				.toList();
//	}

	public List<H_CommentUserDto> findCommentWithUser() {
		List<User> users = hRepo.findCommentWithUser();
		return users.stream()
				.map(u -> H_CommentUserDto
						.builder()
						.id(u.getId())
						.u_kind(u.getU_kind())
						.name(u.getName())
						.gender(u.getGender())
						.phone(u.getPhone())
						.addr(u.getAddr())
						.birth(u.getBirth())
						.text(u.getText())
						.createdAt(u.getCreatedAt())
						.comments(u.getComments().stream()
								.map(comment -> new CommentDto(comment.getC_id(), comment.getC_content()))
								.toList())
						.build())
				.toList();
	}

	public List<H_AppmListDto> findWithAppm() {
		List<Hospital> hospitals = hRepo.findWithAppm();
		return hospitals.stream()
				.map(h-> H_AppmListDto
						.builder()
						.h_code(h.getH_code())
						.h_name(h.getH_name())
						.createdAt(h.getCreatedAt())
						.appmCount(h.getAppms().size())
						.appms(h.getAppms().stream()
								.map(appm-> new AppointmentDto(
										appm.getA_id(),
										appm.getA_date(),
										appm.getA_content(),
										appm.getA_dia_name(),
										appm.getA_dia_content()))
								.toList())
						.build())
				.toList();
	}
	
	// 예약 post
	@Transactional(readOnly = false)
	public Integer appmCreate(ReservationDto req) {
		Hospital hospital = hRepo.findById(req.getH_code())
	            .orElseThrow(() -> new RuntimeException("Hospital not Found"));

	    User user = uRepo.findById(req.getA_user_id())
	            .orElseThrow(() -> new RuntimeException("User not Found"));
	    

	    H_appm appm = H_appm.builder()
	            .hospital(hospital)
	            .h_user(user)
	            .a_date(req.getA_date())
	            .a_content(req.getA_content())
	            .a_del_yn(req.getA_del_yn())
	            .build();
	    H_appm saved = aRepo.save(appm);
	    return saved.getA_id();
	}

	// 유저 정보 기준으로 조회하는 예약 개별 조회
	public H_AppmUserHosDto findAppmWithUserById(Integer a_id, UUID userId) {
	    H_appm appm = hRepo.findAppmWithUserById(a_id, userId);
	    if (appm == null) throw new RuntimeException("예약 정보를 찾을 수 없습니다.");

	    User user = appm.getH_user();
	    if (user == null) throw new RuntimeException("예약한 유저 정보를 찾을 수 없습니다.");

	    Hospital hospital = appm.getHospital();
	    if (hospital == null) throw new RuntimeException("병원 정보를 찾을 수 없습니다.");

	    return H_AppmUserHosDto.builder()
	            .id(user.getId())
	            .u_kind(user.getU_kind())
	            .name(user.getName())
	            .gender(user.getGender())
	            .phone(user.getPhone())
	            .addr(user.getAddr())
	            .birth(user.getBirth())
	            .text(user.getText())
	            .a_id(appm.getA_id())
	            .a_date(appm.getA_date())
	            .a_content(appm.getA_content())
	            .a_dia_name(appm.getA_dia_name())
	            .a_dia_content(appm.getA_dia_content())
	            .h_name(hospital.getH_name())
	            .build();
	}


	public List<H_ReviewLikeDto> findWithLike() {
		List<H_review> reviews = hRepo.findWithLike();
		return reviews.stream()
				.map(r -> H_ReviewLikeDto
						.builder()
						.r_id(r.getR_id())
						.createdAt(r.getCreatedAt())
						.likeCount(r.getLikes().size())
						.likes(r.getLikes().stream()
								.map(like -> new LikeDto(
										like.getL_id(), 
										like.getH_review().getR_id(), 
										like.getH_user().getId(), 
										like.getCreatedAt()))
								.toList())
						.build())
				.toList();
	}

	public List<H_LikeUserDto> findLikeWithUser() {
		List<User> users = hRepo.findLikeWithUser();
		return users.stream()
				.map(u -> H_LikeUserDto
						.builder()
						.id(u.getId())
						.u_kind(u.getU_kind())
						.name(u.getName())
						.gender(u.getGender())
						.phone(u.getPhone())
						.addr(u.getAddr())
						.birth(u.getBirth())
						.text(u.getText())
						.createdAt(u.getCreatedAt())
						.likes(u.getLikes().stream()
								.map(like -> new LikeDto(like.getL_id(), 
										like.getH_review().getR_id(), 
										like.getH_user().getId(), 
										like.getCreatedAt()))
								.toList())
						.build())
				.toList();
	}


	@Transactional(readOnly = false)
	public void reviewCreate(ReviewCreateDto req) {
		Hospital hospital = hRepo.findById(req.getH_code())
	            .orElseThrow(() -> new RuntimeException("Hospital not Found"));

	    User user = uRepo.findById(req.getH_user_id())
	            .orElseThrow(() -> new RuntimeException("User not Found"));
	    H_appm appm = aRepo.findById(req.getA_id())
	    		.orElseThrow(() -> new RuntimeException("Appointent not Found"));
	    
	    // 본인 맞는지
	    if (!appm.getH_user().getId().equals(user.getId())) {
	    	throw new RuntimeException("본인 예약만 리뷰 작성이 가능합니다.");
	    }
	    
	    // 중복 방지
	    if (appm.getH_review() != null) throw new RuntimeException("이미 리뷰가 작성된 예약입니다.");
	    
	    // 평점 검증
	    if (req.getR_eval_pt() < 1 || req.getR_eval_pt() > 5) throw new RuntimeException("평점은 1 ~ 5 사이여야 합니다.");

	    H_review review = H_review.builder()
    			.hospital(hospital)
    			.h_user(user)
    			.h_appm(appm)
    			.r_title(req.getR_title())
    			.r_content(req.getR_content())
    			.r_eval_pt(req.getR_eval_pt())
    			.r_views(0)
    			.r_del_yn("N")
	    		.build();
	    
	    // 리뷰 저장 -> 예약에 연결
	    
	    rRepo.save(review);
	    appm.setH_review(review);
	    aRepo.save(appm);
	}

	public List<H_AppmUserDto> findAppmWithUser() {
		List<User> users = hRepo.findAppmWithUser();
		return users.stream()
				.map(u -> H_AppmUserDto
						.builder()
						.id(u.getId())
						.u_kind(u.getU_kind())
						.name(u.getName())
						.gender(u.getGender())
						.phone(u.getPhone())
						.addr(u.getAddr())
						.birth(u.getBirth())
						.text(u.getText())
						.createdAt(u.getCreatedAt())
						.appms(u.getAppms().stream()
								.map(appm -> new AppointmentDto(
										appm.getA_id(), 
										appm.getA_date(), 
										appm.getA_content(), 
										appm.getA_dia_name(), 
										appm.getA_dia_content()))
								.toList())
						.build())
				.toList();
	}

	public String getAble(String h_code, String time) {
		return hRepo.getAble(h_code, time);
	}

	public AppointmentDto findById(Integer a_id) {
		return hRepo.findById(a_id);
	}
}
