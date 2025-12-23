package com.study.spring.hospital.dto;

import java.time.LocalDateTime;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class HospitalDto {
	private String h_code;
	private String h_name;
	private String h_addr;
	private String h_kind;
	private String h_bigo;
	private String h_content;
	private String h_smpl_dgm;
	private String h_tel1;
	private String h_tel2;
	private String h_long;
	private String h_lat;
	private String h_park_yn;
	private String h_mon_s;
	private String h_mon_c;
	private String h_tue_s;
	private String h_tue_c;
	private String h_wed_s;
	private String h_wed_c;
	private String h_tur_s;
	private String h_tur_c;
	private String h_fri_s;
	private String h_fri_c;
	private String h_sat_s;
	private String h_sat_c;
	private String h_sun_s;
	private String h_sun_c;
	private String h_hol_s;
	private String h_hol_c;
	private String h_lun_s;
	private String h_lun_c;
	private LocalDateTime createdAt;
}
