package com.study.spring.hospital.dto;

import java.time.LocalDateTime;
import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ReservationResponseDto {
	private Integer a_id; // DB에서 생성된 값
	public String h_code;
	@JsonFormat(pattern = "yyyy-MM-dd HH:mm")
	public LocalDateTime a_date;
	public String a_content;
	public UUID a_user_id;
	public String a_del_yn;
}
