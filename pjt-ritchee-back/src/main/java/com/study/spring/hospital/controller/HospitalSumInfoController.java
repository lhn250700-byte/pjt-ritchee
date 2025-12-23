package com.study.spring.hospital.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.study.spring.hospital.dto.HospitalSumInfoDTO;
import com.study.spring.hospital.service.HospitalSumInfoService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
public class HospitalSumInfoController {

	@Autowired
	HospitalSumInfoService HSInfoService;
	
	@GetMapping("/api/hs_info/{h_code}")
	public ResponseEntity<HospitalSumInfoDTO> getHospitalSumInfo(
				@PathVariable("h_code") String h_code){
		
		log.info("h_code : " + h_code);
		Optional<HospitalSumInfoDTO> sumInfo = HSInfoService.getHospitalSumInfo(h_code);
		if (sumInfo.isEmpty()) {
			return ResponseEntity.noContent().build(); // 결과가 없을 경우 204 No Content 반환
	    }
	        
		  // Optional 내부의 실제 객체를 가져와서 반환합니다.
        // 결과가 있을 경우 200 OK와 데이터 반환
	    return ResponseEntity.ok(sumInfo.get()); 
	}
	
}
