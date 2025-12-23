	package com.study.spring.hospital.controller;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.study.spring.hospital.dto.AppointmentFullDto;
import com.study.spring.hospital.dto.HospitalSumInfoDTO;
import com.study.spring.hospital.entity.H_appm;
import com.study.spring.hospital.repository.AppointmentRepository;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController("hospitalAppmController")
public class AppointmentController {

    @Autowired
    private AppointmentRepository appointmentRepository;

    // 유저별 예약 내역 페이징 조회
//    @GetMapping("/appmlist/{a_user_id}")
//    public Page<AppointmentFullDto> getUserAppointments(
//    		@PathVariable(name = "a_user_id") UUID a_user_id, 
//    		 @RequestParam(name = "page", defaultValue = "0") int page,
//    	        @RequestParam(name = "size", defaultValue = "10") int size) {
//
//        Pageable pageable = PageRequest.of(page, size);
//        Page<H_appm> appointmentsPage = appointmentRepository.findByUserId(a_user_id, pageable);
//
//        // Page<H_appm> -> Page<AppointmentFullDto>
//        return appointmentsPage.map(this::mapToDto);
//    }
    
    @GetMapping("/api/appmlist/{a_user_id}")
    public Page<AppointmentFullDto> getUserAppointments(
    	@PathVariable(name = "a_user_id") UUID a_user_id, 
    	@RequestParam(name = "page", defaultValue = "0") int page,
    	@RequestParam(name = "size", defaultValue = "10") int size) {

        Pageable pageable = PageRequest.of(page, size);
        Page<AppointmentFullDto> appointmentsPage = appointmentRepository.findByUserId(a_user_id, pageable);

        // Page<H_appm> -> Page<AppointmentFullDto>
        return appointmentsPage;
    }
    
    // 병원별 예약 리스트 (hospitalController에 있는 api와의 차이점 : 유저 정보 추가)
    @GetMapping("/api/appmListOfHospital")
    public Page<AppointmentFullDto> getHospitalAppointments(
    		@RequestParam("a_user_id") UUID a_user_id,
    		@RequestParam(name = "page", defaultValue = "0") int page,
        	@RequestParam(name = "size", defaultValue = "10") int size) {
    		
    		Pageable pageable = PageRequest.of(page, size);
    		Page<AppointmentFullDto> appointmentsPage = appointmentRepository.findByUserIdAndCode(a_user_id , pageable);
    	
			return appointmentsPage;
    	
    }
    
    
    @GetMapping("/api/appmListOfUser")
    public Page<AppointmentFullDto> getHospitalAppointmentsById(
    		@RequestParam("h_code") String h_code,
    		@RequestParam("a_user_id") UUID a_user_id,
    		@RequestParam(name = "page", defaultValue = "0") int page,
        	@RequestParam(name = "size", defaultValue = "10") int size) {
    		
    		Pageable pageable = PageRequest.of(page, size);
    		Page<AppointmentFullDto> appointmentsPage = appointmentRepository.findByUserIdAndHcode(h_code,a_user_id , pageable);
    	
			return appointmentsPage;
    	
    }
    
    // 유저별 진료 리스트

    // 예약 업데이트
//    @PutMapping("/api/appointment/update/{a_id}")
//    public AppointmentFullDto updateAppointment(
//            @PathVariable("a_id") int a_id,
//            @RequestParam("symptom") String symptom,
//            @RequestParam("note") String note,
//            @RequestParam("diagnosis") String diagnosis) {
//
//        return appointmentRepository.findById(a_id)
//                .map(appointment -> {
//                    appointment.setA_content(symptom);
//                    appointment.setA_dia_content(note);
//                    appointment.setA_dia_name(diagnosis);
//                    appointmentRepository.save(appointment);
//                    return mapToDto(appointment);
//                })
//                .orElse(null);
//    }
    
    @PutMapping("/api/appmlist/update/{a_id}")
    public ResponseEntity<String> updateAppointment(
          @PathVariable("a_id") int a_id,
          @RequestParam("a_date") String a_date,
          @RequestParam("a_content") String a_content,
          @RequestParam("a_dia_name") String a_dia_name,
          @RequestParam("a_dia_content") String a_dia_content) {


      Optional<H_appm> appointmentOpt = appointmentRepository.findById(a_id);

      if (appointmentOpt.isPresent()) {
          H_appm existingAppointment = appointmentOpt.get();

          // String -> LocalDate로 변환 (엔티티 타입에 맞춰 파싱, 시간은 무시)
          try {
              DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
              // 문자열 전체를 LocalDateTime으로 파싱한 후, 날짜 부분만 추출
              LocalDateTime localDateTime = LocalDateTime.parse(a_date, formatter); 
              // 엔티티의 a_date 필드 타입이 LocalDateTime이라고 가정
              existingAppointment.setA_date(localDateTime); 
              
          } catch (Exception e) {
        	  log.info("a_date :" + a_date);
              return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                                   .body("잘못된 날짜/시간 형식입니다. 'YYYY-MM-DD HH:MM:SS' 형식으로 보내주세요.");
          }

          // 나머지 필드 업데이트
          existingAppointment.setA_content(a_content);
          existingAppointment.setA_dia_name(a_dia_name);
          existingAppointment.setA_dia_content(a_dia_content);
          
          // DB 저장 (@PreUpdate가 updatedAt 갱신)
          appointmentRepository.save(existingAppointment);

          return ResponseEntity.ok("예약 ID " + a_id + "예약내역 수정완료.");
          
      } else {
          return ResponseEntity.status(HttpStatus.NOT_FOUND)
                               .body("예약 ID " + a_id + "를 찾을수 없습니다.");
      }
    }
    
    // 소견서 작성
    @PutMapping("/api/appmlist/opinionUpdate/{a_id}")
    public ResponseEntity<String> updateOpinion(
          @PathVariable("a_id") int a_id,
          @RequestParam("a_dia_name") String a_dia_name,
          @RequestParam("a_dia_content") String a_dia_content) {


      Optional<H_appm> appointmentOpt = appointmentRepository.findById(a_id);

      if (appointmentOpt.isPresent()) {
          H_appm existingAppointment = appointmentOpt.get();
          // 나머지 필드 업데이트
          existingAppointment.setA_dia_name(a_dia_name);
          existingAppointment.setA_dia_content(a_dia_content);
          
          // DB 저장 (@PreUpdate가 updatedAt 갱신)
          appointmentRepository.save(existingAppointment);

          return ResponseEntity.ok("예약 ID " + a_id + "예약내역 수정완료.");
          
      } else {
          return ResponseEntity.status(HttpStatus.NOT_FOUND)
                               .body("예약 ID " + a_id + "를 찾을수 없습니다.");
      }
    }
    
  
    // 예약 취소
    @PutMapping("/api/appmlist/delete/{a_id}")
    public String cancelAppointment(@PathVariable("a_id") int a_id) {
        appointmentRepository.findById(a_id).ifPresent(a -> {
            a.setA_del_yn("Y");
            appointmentRepository.save(a);
        });
        return "예약이 취소되었습니다.";
    }

    // 엔티티 -> DTO 변환
//    private AppointmentFullDto mapToDto(H_appm a) {
//        if (a == null) return null;

//        AppointmentFullDto dto = new AppointmentFullDto();
//        dto.setA_id(a.getA_id());
//        dto.setHospitalName(a.getHospital() != null ? a.getHospital().getH_name() : null);
//        dto.setPatientName(a.getH_user() != null ? a.getH_user().getName() : null);
//        dto.setSymptom(a.getA_content());
//        dto.setNote(a.getA_dia_content());
//        dto.setDiagnosis(a.getA_dia_name());
//        dto.setDate(a.getA_date());
//        dto.setTime(null); // 시간 컬럼이 없으므로 null로 설정
//        dto.setPhone(a.getH_user() != null ? a.getH_user().getPhone() : null);
//        dto.setAge(a.getH_user() != null ? String.valueOf(a.getH_user().getU_kind()) : null);
//        dto.setA_id(a.getA_id());
 
//        return dto;
//    }
    
    // 수정, 삭제용 a_id별 예약내역조회
    @GetMapping("/api/appminfo")
    public ResponseEntity<AppointmentFullDto> getUserAppmInfoById(
    	@RequestParam(name = "a_id") int a_id) {

    	log.info("a_id : " + a_id);
		Optional<AppointmentFullDto> appmInfo = appointmentRepository.findByAppmInfoById(a_id);
        if (appmInfo.isEmpty()) {
        	log.error("findByAppmInfoById({}) 쿼리 결과가 없습니다..", a_id);
            return ResponseEntity.notFound().build(); 
        }
        
        // 데이터가 존재하면 HTTP 200 OK와 함께 본문(Body)에 데이터 반환
        log.info("findByAppmInfoById({}) 쿼리 결과 성공: {}", a_id, appmInfo.get());
        return ResponseEntity.ok(appmInfo.get());
	    
    }
}