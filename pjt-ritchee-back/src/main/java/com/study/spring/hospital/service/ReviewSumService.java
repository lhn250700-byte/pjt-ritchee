package com.study.spring.hospital.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.study.spring.hospital.dto.ReviewSumDTO;
import com.study.spring.hospital.repository.ReviewSumRepository;

@Service
@Transactional(readOnly = true)
public class ReviewSumService {

	@Autowired
	ReviewSumRepository reviewSumRepo;

	public Optional<ReviewSumDTO> getReviewSumInfo(Integer r_id) {
		return reviewSumRepo.findReviewSumInfo(r_id);
	}
	
	public Page<ReviewSumDTO> getReviewSumByHospital(
			Pageable pageable,
			String h_code	){
		
		return reviewSumRepo.findReviewSumByHospital(
			pageable,
			h_code	);
	}

}
