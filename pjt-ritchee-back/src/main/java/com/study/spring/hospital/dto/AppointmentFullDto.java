package com.study.spring.hospital.dto;

import java.util.UUID;

public interface AppointmentFullDto {
	Long getA_id();
	String getH_code();
	String getH_name();
	String getA_content();
	String getA_dia_name();
	String getA_dia_content();
	String getA_date();
	String getA_time();
	String getPhone();
	String getText();
	String getU_name();
	String getGender();
	String getAge();
	String getUser_ukind();
	String getStaff_ukind();
	UUID getU_id();
	String getR_able_yn();
}

//@Data
//@NoArgsConstructor
//@Builder
//public class AppointmentFullDto {
	// 2025.12.10 재정의
//		private int a_id;
//		private String hospitalName;
//		private String patientName;
//		private String symptom;
//		private String age;
//		private LocalDate date;
//		private LocalTime time;
//		private String phone;
//		private String note;
//		private String diagnosis;
//}
//public class AppointmentFullDto {
//	private int a_id;			// 예약ID 
//	private String h_code;		// 병원코드
//	private String h_name;		// 병원명
//	private String a_content;	// 증상
//	private	String a_dia_name; 	// 진단명
//	private	String a_dia_content; // 진단내용
//	private	LocalDate a_date;		// 예약일시
//	private	String phone;		// 에약자 연락처
//	private String text;		// 예약자 추가정보
//	
//	public AppointmentFullDto(
//	            int a_id,
//	            String h_code,
//	            String h_name,
//	            String a_content,
//	            String a_dia_name,
//	            String a_dia_content,
//	            LocalDate a_date,
//	            String u_phone,
//				String u_text) {
//	        this.a_id = a_id;
//	        this.h_code = h_code;
//	        this.h_name = h_name;
//	        this.a_content = a_content;
//	        this.a_dia_name = a_dia_name;
//	        this.a_dia_content = a_dia_content;
//	        this.a_date = a_date;
//	        this.u_phone = u_phone;
//			this.u_text = u_text;
//	    }
//}
