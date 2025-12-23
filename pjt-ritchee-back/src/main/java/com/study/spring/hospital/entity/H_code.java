package com.study.spring.hospital.entity;

import java.time.LocalDateTime;
import java.util.UUID;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name="h_code")
@Data
@NoArgsConstructor @AllArgsConstructor
@Builder
public class H_code {
	@Id
	private String col_id;
	private String code;
	private String code_name;
}
