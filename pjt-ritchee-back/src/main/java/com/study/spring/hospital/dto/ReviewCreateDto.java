package com.study.spring.hospital.dto;

import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ReviewCreateDto {
	private String h_code;
	private UUID h_user_id;
	private int a_id;
	private String r_title;
	private String r_content;
	private Integer r_eval_pt;
	private String r_del_yn;
}