package com.study.spring.hospital.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.study.spring.hospital.dto.LikeDto;
import com.study.spring.hospital.entity.H_like;
import com.study.spring.hospital.entity.H_review;
import com.study.spring.hospital.repository.LikeRepository;
import com.study.spring.hospital.repository.MyReviewRepository;
import com.study.spring.user.entity.User;
import com.study.spring.user.repository.UserRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class LikeService {

	@Autowired
	private final LikeRepository likeRpo;

	@Autowired
	private final MyReviewRepository reviewRepo;

	@Autowired
	private final UserRepository userRepo;

	@Transactional
	public void Likes(LikeDto Ldto) {

		// 1) 리뷰 엔티티 조회
		H_review review = reviewRepo.findById(Ldto.getR_id())
				.orElseThrow(() -> new IllegalArgumentException("리뷰를 찾을 수 없습니다. r_id=" + Ldto.getR_id()));

		// 2) 유저 엔티티 조회
		User user = userRepo.findById(Ldto.getH_user_id())
				.orElseThrow(() -> new IllegalArgumentException("유저를 찾을 수 없습니다. user_id=" + Ldto.getH_user_id()));

		// 3) Like 엔티티 생성
		H_like like = H_like.builder().h_review(review).h_user(user).build(); // createdAt은 @PrePersist 자동

		// 4) 저장
		likeRpo.save(like);

	}
	
	
	//delete 매핑
	 public void deleteLike(LikeDto ldto) {
	        likeRpo.deleteLike(ldto.getR_id(), ldto.getH_user_id());
	    }


}
