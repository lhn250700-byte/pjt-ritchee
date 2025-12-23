package com.study.spring.user.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class UserDto {
	private UUID id;
	private String u_kind;
	private String name;
	private String gender;
	private String phone;
	private String addr;
	private LocalDate birth;
	private String text;
}
