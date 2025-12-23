package com.study.spring.hospital.service;

import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.study.spring.hospital.dto.HospitalSumInfoDTO;
import com.study.spring.hospital.repository.HospitalSumInfoRepository;

@Service
@Transactional(readOnly = true)
public class HospitalSumInfoService {
	//	
	//	HospitalSumInfoRepository hospitalSumInfoRepo;
	//
	
	// 필드에 'final' 키워드 추가 (불변성 보장 및 주입 누락 방지)
    private final HospitalSumInfoRepository hospitalSumInfoRepo;

    // 생성자를 호출할 때 HospitalSumInfoRepository 구현체를 찾아서 주입
    public HospitalSumInfoService(HospitalSumInfoRepository hospitalSumInfoRepo) {
        this.hospitalSumInfoRepo = hospitalSumInfoRepo;
    }
	
	// 컨트롤러에서 호출할 메서드 -  
	public Optional<HospitalSumInfoDTO> getHospitalSumInfo(String h_code) {
		// 네이티브 쿼리가 실행되고 결과가 DTO 인터페이스 리스트로 반환
		return hospitalSumInfoRepo.findHospitalSumInfo(h_code);
	}
}
