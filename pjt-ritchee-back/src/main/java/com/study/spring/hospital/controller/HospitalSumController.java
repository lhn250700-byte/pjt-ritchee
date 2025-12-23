package com.study.spring.hospital.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.study.spring.hospital.dto.HospitalSumDTO;
import com.study.spring.hospital.service.HospitalSumService;

//@Controller
@RestController
public class HospitalSumController {

	@Autowired
	HospitalSumService HSservice;
	
	@GetMapping("/HS")
	public String HStest() {
		return "HS TEST!!!";
	}
	
	//-------------------------------------------------//
	// TEST :  병원리뷰건수, 평점평균 반올림                  // 
	//-------------------------------------------------//
	// 출력값 : 병원코드, 병원명, 병원리뷰건수, 병원평점평균	 	   //
	//-------------------------------------------------//
	// ORDER BY : 병원리뷰건수, 병원평점평균 				   //
	//-------------------------------------------------//
	@GetMapping("/HS1")
	public ResponseEntity<List<HospitalSumDTO>> getHospitalSum1(){
		List<HospitalSumDTO> summaries = HSservice.getHospitalSum1();
		if (summaries.isEmpty()) {
			return ResponseEntity.noContent().build(); // 결과가 없을 경우 204 No Content 반환
	    }
	        
	    return ResponseEntity.ok(summaries); // 결과가 있을 경우 200 OK와 데이터 반환
	}
	//---------------------------------------------------------//
	// TEST : 병원리뷰건수, 평점평균 반올림, 코멘트갯수 , 좋아요 갯수       // 
	//---------------------------------------------------------//
	// 출력값 : 병원코드, 병원명, 병원리뷰건수, 병원평점평균	,코멘트수        //
	//---------------------------------------------------------//
	// ORDER BY : 병원리뷰건수, 병원평점평균, 좋아요수, 코멘트수		   //
	//---------------------------------------------------------//
	@GetMapping("/HS2")
	public ResponseEntity<List<HospitalSumDTO>> getHospitalSum2(){
		List<HospitalSumDTO> summaries = HSservice.getHospitalSum2();
		if (summaries.isEmpty()) {
			return ResponseEntity.noContent().build(); // 결과가 없을 경우 204 No Content 반환
	    }
	        
	    return ResponseEntity.ok(summaries); // 결과가 있을 경우 200 OK와 데이터 반환
	}
	
	//---------------------------------------------------------//
	// 병원리뷰건수순 : 병원리뷰건수, 평점평균 반올림, 코멘트갯수, 좋아요갯수   // 
	//---------------------------------------------------------//
	// 출력값 : 병원코드, 병원명, 병원리뷰건수, 병원평점평균	,코멘트수        //
	//---------------------------------------------------------//
	// ORDER BY : 병원리뷰건수, 코멘트수 , 병원평점평균, 좋아요순         //
	//---------------------------------------------------------//
	@GetMapping("/api/hs_review")
	public ResponseEntity<Page<HospitalSumDTO>> getHospitalSumByReviewCnt(
			@RequestParam(name="page", defaultValue = "0") int page,
			@RequestParam(name="size", defaultValue = "5") int size
			){
		Pageable pageable = PageRequest.of(page, size);
		
		Page<HospitalSumDTO> summaryPage = HSservice.getHospitalSumByReviewCnt(pageable);
		if (summaryPage.isEmpty()) {
			return ResponseEntity.noContent().build(); // 결과가 없을 경우 204 No Content 반환
	    }
	        
	    return ResponseEntity.ok(summaryPage); // 결과가 있을 경우 200 OK와 데이터 반환
	}
	
	//---------------------------------------------------------//
	// 병원평점평균순 : 병원리뷰건수, 평점평균 반올림, 코멘트갯수, 좋아요갯수   // 
	//---------------------------------------------------------//
	// 출력값 : 병원코드, 병원명, 병원리뷰건수, 병원평점평균	,코멘트수        //
	//---------------------------------------------------------//
	// ORDER BY : 병원평점평균,  병원리뷰건수, 좋아요순, 코멘트수	       //
	//---------------------------------------------------------//
	@GetMapping("/api/hs_evalpt")
	public ResponseEntity<Page<HospitalSumDTO>> getHospitalSumByEvalPt(
			@RequestParam(name="page", defaultValue = "0") int page,
			@RequestParam(name="size", defaultValue = "5") int size
			){
		
		Pageable pageable = PageRequest.of(page, size);
		
		Page<HospitalSumDTO> summaryPage = HSservice.getHospitalSumByEvalPt(pageable);
		if (summaryPage.isEmpty()) {
			return ResponseEntity.noContent().build(); // 결과가 없을 경우 204 No Content 반환
	    }
	        
	    return ResponseEntity.ok(summaryPage); // 결과가 있을 경우 200 OK와 데이터 반환
	}
	
	//---------------------------------------------------------//
	// 코멘트순  : 병원리뷰건수, 평점평균 반올림, 코멘트갯수 , 좋아요        // 
	//---------------------------------------------------------//
	// 출력값 : 병원코드, 병원명, 병원리뷰건수, 병원평점평균	,코멘트수        //
	//---------------------------------------------------------//
	// ORDER BY : 코멘트수, 병원평점평균,병원리뷰건수	, 좋아요		       //
	//---------------------------------------------------------//
	@GetMapping("/api/hs_commentcnt")
	public ResponseEntity<Page<HospitalSumDTO>> getHospitalSumByCommnetCnt(
			@RequestParam(name="page", defaultValue = "0") int page,
			@RequestParam(name="size", defaultValue = "5") int size
			){
		Pageable pageable = PageRequest.of(page, size);
		
		Page<HospitalSumDTO> summaryPage = HSservice.getHospitalSumByCommentCnt(pageable);
		if (summaryPage.isEmpty()) {
			return ResponseEntity.noContent().build(); // 결과가 없을 경우 204 No Content 반환
	    }
	        
	    return ResponseEntity.ok(summaryPage); // 결과가 있을 경우 200 OK와 데이터 반환
	}
	
	//--------------------------------------------------//
	// 병원평점평균순 : 병원리뷰건수, 평점평균 반올림, 코멘트갯수,좋아요// 
	//--------------------------------------------------//
	// 출력값 : 병원코드, 병원명, 병원리뷰건수, 병원평점평균	,코멘트수 //
	//--------------------------------------------------//
	// ORDER BY : 병원평점평균,좋아요, 병원리뷰건수, 코멘트수		//
	//--------------------------------------------------//
	@GetMapping("/api/hs_toplist")
	public ResponseEntity<Page<HospitalSumDTO>> getHospitalSumByTopList(
			@RequestParam(name="page", defaultValue = "0") int page,
			@RequestParam(name="size", defaultValue = "3") int size		
			){
		Pageable pageable = PageRequest.of(page, size);
		
		Page<HospitalSumDTO> summaryPage = HSservice.getHospitalSumByTopList(pageable);
		if (summaryPage.isEmpty()) {
			return ResponseEntity.noContent().build(); // 결과가 없을 경우 204 No Content 반환
	    }
	        
	    return ResponseEntity.ok(summaryPage); // 결과가 있을 경우 200 OK와 데이터 반환
	}
	
	//--------------------------------------------------//
	// 병원평점평균순 : 병원리뷰건수, 평점평균 반올림, 코멘트갯수,좋아요// 
	//--------------------------------------------------//
	// 출력값 : 병원코드, 병원명, 병원리뷰건수, 병원평점평균	,코멘트수 //
	//--------------------------------------------------//
	// ORDER BY : 병원평점평균,좋아요, 병원리뷰건수, 코멘트수		//
	//--------------------------------------------------//
	@GetMapping("/api/hs_find_name")
	public ResponseEntity<Page<HospitalSumDTO>> getHospitalSumByTopListFindName(
	            @RequestParam(name="page", defaultValue = "0") int page,
	            @RequestParam(name="size", defaultValue = "5") int size,
	            /* === 추가된 검색 파라미터 === */
	            @RequestParam(name="h_name", required = false) String h_name,
	            @RequestParam(name="h_addr", required = false) String h_addr,
	            @RequestParam(name="h_park_yn", required = false) String h_park_yn
				){
			Pageable pageable = PageRequest.of(page, size);

	        // 수정된 Service 메소드 호출 (검색 조건 전달)
	        Page<HospitalSumDTO> summaryPage = HSservice.getHospitalSumByTopListFindNameWithSearch(
	                pageable, 
	                h_name, 
	                h_addr, 
	                h_park_yn
	        );
	        
	        if (summaryPage.isEmpty()) {
	            return ResponseEntity.noContent().build(); // 결과가 없을 경우 204 No Content 반환
	        }
	            
	        return ResponseEntity.ok(summaryPage); // 결과가 있을 경우 200 OK와 데이터 반환
	    }
	
	@GetMapping("/api/hs_find_para")
	public ResponseEntity<Page<HospitalSumDTO>> getHospitalSumByTopListFindPara(
	            @RequestParam(name="page", defaultValue = "0") int page,
	            @RequestParam(name="size", defaultValue = "5") int size,
	            /* === 추가된 검색 파라미터 === */
	            @RequestParam(name="para1", required = false) String para1,
	            @RequestParam(name="para2", required = false) String para2,
	            @RequestParam(name="para3", required = false) String para3
				){
			Pageable pageable = PageRequest.of(page, size);

	        // 수정된 Service 메소드 호출 (검색 조건 전달)
	        Page<HospitalSumDTO> summaryPage = HSservice.getHospitalSumByTopLisFindParatWithSearch(
	                pageable, 
	                para1, 
	                para2, 
	                para3
	        );
	        
	        if (summaryPage.isEmpty()) {
	            return ResponseEntity.noContent().build(); // 결과가 없을 경우 204 No Content 반환
	        }
	            
	        return ResponseEntity.ok(summaryPage); // 결과가 있을 경우 200 OK와 데이터 반환
	    }
	
	
	@GetMapping("/api/hs_review_find_para")
	public ResponseEntity<Page<HospitalSumDTO>> getHospitalSumByReviewAndTopListFindPara1(
	            @RequestParam(name="page", defaultValue = "0") int page,
	            @RequestParam(name="size", defaultValue = "5") int size,
	            /* === 추가된 검색 파라미터 === */
	            @RequestParam(name="para1", required = false) String para1,
	            @RequestParam(name="para2", required = false) String para2,
	            @RequestParam(name="para3", required = false) String para3
				){
			Pageable pageable = PageRequest.of(page, size);

	        // 수정된 Service 메소드 호출 (검색 조건 전달)
	        Page<HospitalSumDTO> summaryPage = HSservice.getHospitalSumByReviewAndTopListFindPara1(
	                pageable, 
	                para1, 
	                para2, 
	                para3
	        );
	        
	        if (summaryPage.isEmpty()) {
	            return ResponseEntity.noContent().build(); // 결과가 없을 경우 204 No Content 반환
	        }
	            
	        return ResponseEntity.ok(summaryPage); // 결과가 있을 경우 200 OK와 데이터 반환
    }
	@GetMapping("/api/hs_comment_find_para")
	public ResponseEntity<Page<HospitalSumDTO>> getHospitalSumByCommentAndTopListFindPara1(
			@RequestParam(name="page", defaultValue = "0") int page,
			@RequestParam(name="size", defaultValue = "5") int size,
			/* === 추가된 검색 파라미터 === */
			@RequestParam(name="para1", required = false) String para1,
			@RequestParam(name="para2", required = false) String para2,
			@RequestParam(name="para3", required = false) String para3
			){
		Pageable pageable = PageRequest.of(page, size);
		
		// 수정된 Service 메소드 호출 (검색 조건 전달)
		Page<HospitalSumDTO> summaryPage = HSservice.getHospitalSumByCommentAndTopListFindPara1(
				pageable, 
				para1, 
				para2, 
				para3
				);
		
		if (summaryPage.isEmpty()) {
			return ResponseEntity.noContent().build(); // 결과가 없을 경우 204 No Content 반환
		}
		
		return ResponseEntity.ok(summaryPage); // 결과가 있을 경우 200 OK와 데이터 반환
	}
		
}
