package com.study.spring.hospital.dto;

import java.time.LocalDateTime;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class MyReviewListDto {
	private String h_code;
	private String h_name;
	private String r_title;
	private String r_content;
	private Integer r_eval_pt;
	private Integer r_views;
	private String r_del_yn;
	private LocalDateTime createdAt;

}
