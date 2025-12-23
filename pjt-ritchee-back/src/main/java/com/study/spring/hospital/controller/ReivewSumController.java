package com.study.spring.hospital.controller;

import java.util.Optional;
import java.util.stream.Stream;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.study.spring.hospital.dto.HospitalSumDTO;
import com.study.spring.hospital.dto.ReviewSumDTO;
import com.study.spring.hospital.service.ReviewSumService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
public class ReivewSumController {

	@Autowired
	ReviewSumService RInfoService;
	
	@GetMapping("/api/rs_review/{r_id}")
	public ResponseEntity<ReviewSumDTO> getReviewSumInfo(
			@PathVariable("r_id") Integer r_id){
		log.info("r_id :" + r_id );
		Optional<ReviewSumDTO> sumInfo = RInfoService.getReviewSumInfo(r_id);
		if (sumInfo.isEmpty()) {
			return ResponseEntity.noContent().build(); // 결과가 없을 경우 204 No Content 반환
	    }
  	    // Optional 내부의 실제 객체를 가져와서 반환
        // 결과가 있을 경우 200 OK와 데이터 반환
	    return ResponseEntity.ok(sumInfo.get()); 
		
	}
	
	@GetMapping("/api/rs_review")
	public ResponseEntity<Page<ReviewSumDTO>> findReviewSumHospital(
            @RequestParam(name="page", defaultValue = "0") int page,
            @RequestParam(name="size", defaultValue = "5") int size,
			@RequestParam("h_code") String h_code){
		log.info("h_code :" + h_code );
		Pageable pageable = PageRequest.of(page, size);
		
		Page<ReviewSumDTO> sumInfo = RInfoService.getReviewSumByHospital(
                pageable, 
                h_code   );
		if (sumInfo.isEmpty()) {
			return ResponseEntity.noContent().build(); // 결과가 없을 경우 204 No Content 반환
	    }
  	    // Optional 내부의 실제 객체를 가져와서 반환
        // 결과가 있을 경우 200 OK와 데이터 반환
	    return ResponseEntity.ok(sumInfo); 
		
	}
	
}
