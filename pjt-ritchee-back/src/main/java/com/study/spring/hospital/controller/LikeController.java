package com.study.spring.hospital.controller;

import java.util.List;
import java.util.UUID;
import com.study.spring.hospital.service.LikeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.study.spring.hospital.dto.LikeDto;
import com.study.spring.hospital.dto.MyCommentDto;
import com.study.spring.hospital.repository.LikeRepository;

@RestController
public class LikeController {

    private final LikeService likeService;

	@Autowired
	LikeRepository LkRepo;

    LikeController(LikeService likeService) {
        this.likeService = likeService;
    }
	
	//전체 좋아요 리스트
	@GetMapping("/api/likeOne")
	public List<LikeDto> getLike(){
		return LkRepo.findByLikeList();
	}
	
	//리뷰별 좋아요 리스트
	@GetMapping("/api/likeRV/{rId}")
	public List<LikeDto> getRVLike(@PathVariable("rId") int rId) {
	    return LkRepo.findByLikeRV(rId);
	}
	
	
	//리뷰별 좋아요 리스트 카운트
	@GetMapping("/api/likeRVCnt/{rId}")
	public Long getRVLikeCnt(@PathVariable("rId") int rId) {
	    return LkRepo.findByLikeRVCnt(rId);
	}
	
	
	//유저별 좋아요 리스트
	@GetMapping("/api/likeU/{h_user_id}")
	public List<LikeDto> getRVLike(@PathVariable("h_user_id") UUID h_user_id) {
	    return LkRepo.findByLikeUs(h_user_id);
	}
	
	// 유저의 리뷰 좋아요 여부 확인
	@GetMapping("/api/onelike/{h_user_id}/reviewId/{r_id}")
	public LikeDto getL(@PathVariable("h_user_id") UUID h_user_id, @PathVariable("r_id") Integer r_id) {
		return LkRepo.findByLikeUser(h_user_id, r_id);
	}
	
	
	//유저별 좋아요 포스트 매핑
	@PostMapping("/api/LikeOne")
	public void CLike(@RequestBody LikeDto Ldto) {
		likeService.Likes(Ldto);
	}
	
	// 유저별 좋아요 삭제 매핑
    @DeleteMapping("/api/LikeOne")
    public void DLike(@RequestBody LikeDto Ldto) {
        likeService.deleteLike(Ldto);
    }
}
