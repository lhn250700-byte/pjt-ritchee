package com.study.spring.hospital.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import com.study.spring.hospital.dto.HospitalSumDTO;
import com.study.spring.hospital.repository.HospitalSumRepository;

@Service
@Transactional(readOnly = true)
public class HospitalSumService {
	
	@Autowired
	HospitalSumRepository hospitalSumRepo;
	
//	// 생성자 주입방식으로 변경
//    private final HospitalSumRepository hospitalSumRepo; // final 추가
//
//    // 생성자 주입
//    public HospitalSumService(HospitalSumRepository hospitalSumRepo) {
//        this.hospitalSumRepo = hospitalSumRepo;
//    }

//    private final HospitalRepository hospitalRepository;
//
//    @Autowired
//    public HospitalSumService(HospitalRepository hospitalRepository) {
//        this.hospitalRepository = hospitalRepository;
//    }

	// 컨트롤러에서 호출할 메서드 -  
	public List<HospitalSumDTO> getHospitalSum1() {
		// 네이티브 쿼리가 실행되고 결과가 DTO 인터페이스 리스트로 반환
		return hospitalSumRepo.findHospitalSum1();
	}

	// 컨트롤러에서 호출할 메써드
	public List<HospitalSumDTO> getHospitalSum2() {
		// 네이티브 쿼리가 실행되고 결과가 DTO 인터페이스 리스트로 반환
		return hospitalSumRepo.findHospitalSum2();
	}
	
	
	// 리뷰카운트 순
//	public List<HospitalSumDTO> getHospitalSumByReviewCnt() {
//		// 네이티브 쿼리가 실행되고 결과가 DTO 인터페이스 리스트로 반환
//		return hospitalSumRepo.findHospitalSumByReviewCnt();
//	}
	public Page<HospitalSumDTO> getHospitalSumByReviewCnt(Pageable pageable ) {
		// 네이티브 쿼리가 실행되고 결과가 DTO 인터페이스 리스트로 반환
		return hospitalSumRepo.findHospitalSumByReviewCnt(pageable);
	}
	
	// 평가평점 순
	public Page<HospitalSumDTO> getHospitalSumByEvalPt(Pageable pageable) {
		// 네이티브 쿼리가 실행되고 결과가 DTO 인터페이스 리스트로 반환
		return hospitalSumRepo.findHospitalSumByEvalPt(pageable);
	}
	
	// 코멘트건수 순
	public Page<HospitalSumDTO> getHospitalSumByCommentCnt(Pageable pageable) {
		// 네이티브 쿼리가 실행되고 결과가 DTO 인터페이스 리스트로 반환
		return hospitalSumRepo.findHospitalSumByCommentCnt(pageable);
	}

	// 병원평점 TOP3 LIST
	public Page<HospitalSumDTO> getHospitalSumByTopList(Pageable pageable) {
		// TODO Auto-generated method stub
		return hospitalSumRepo.findHospitalSumByTopList(pageable);
	}

	public Page<HospitalSumDTO> getHospitalSumByTopListFindNameWithSearch(
			Pageable pageable, 
			String h_name, 
			String h_addr,
			String h_park_yn) {

        // 검색 조건이 비어있으면 NULL로 변환하여 DB 쿼리에서 무시되도록 처리
        String nameParam = StringUtils.hasText(h_name) ? h_name : null;
        String addrParam = StringUtils.hasText(h_addr) ? h_addr : null;
        String parkParam = StringUtils.hasText(h_park_yn) ? h_park_yn : null;

        return hospitalSumRepo.findHospitalSumByTopListFindNameWithSearch(
                pageable,
                nameParam,
                addrParam,
                parkParam
        );
	}

	public Page<HospitalSumDTO> getHospitalSumByTopLisFindParatWithSearch(
			Pageable pageable, 
			String para1, 
			String para2,
			String para3) 
	{
		// 검색 조건이 비어있으면 NULL로 변환하여 DB 쿼리에서 무시되도록 처리
        // 검색 조건이 비어있으면 NULL로 변환하여 DB 쿼리에서 무시되도록 처리
        String para1Param = StringUtils.hasText(para1) ? para1 : null;
        String para2Param = StringUtils.hasText(para2) ? para2 : null;
        String para3Param = StringUtils.hasText(para3) ? para3 : null;

        return hospitalSumRepo.findHospitalSumByTopListFindParatWithSearch(
                pageable,
                para1Param,
                para2Param,
                para3Param
        );
	}

	public Page<HospitalSumDTO> getHospitalSumByReviewAndTopListFindPara1(Pageable pageable, String para1, String para2,
			String para3) {
		// 검색 조건이 비어있으면 NULL로 변환하여 DB 쿼리에서 무시되도록 처리
        // 검색 조건이 비어있으면 NULL로 변환하여 DB 쿼리에서 무시되도록 처리
        String para1Param = StringUtils.hasText(para1) ? para1 : null;
        String para2Param = StringUtils.hasText(para2) ? para2 : null;
        String para3Param = StringUtils.hasText(para3) ? para3 : null;

        return hospitalSumRepo.findHospitalSumByReviewAndTopListFindPara1(
                pageable,
                para1Param,
                para2Param,
                para3Param
        );
	}

	public Page<HospitalSumDTO> getHospitalSumByCommentAndTopListFindPara1(Pageable pageable, String para1,
			String para2, String para3) {
		// 검색 조건이 비어있으면 NULL로 변환하여 DB 쿼리에서 무시되도록 처리
        // 검색 조건이 비어있으면 NULL로 변환하여 DB 쿼리에서 무시되도록 처리
        String para1Param = StringUtils.hasText(para1) ? para1 : null;
        String para2Param = StringUtils.hasText(para2) ? para2 : null;
        String para3Param = StringUtils.hasText(para3) ? para3 : null;

        return hospitalSumRepo.findHospitalSumByCommentAndTopListFindPara1(
                pageable,
                para1Param,
                para2Param,
                para3Param
        );
	}

}
