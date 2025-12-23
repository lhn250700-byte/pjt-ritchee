package com.study.spring.hospital.entity;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.MapsId;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "hospital")
@Data
@NoArgsConstructor @AllArgsConstructor
@Builder
public class Hospital {
	@Id
	private String h_code;
	@OneToOne(mappedBy = "hospital") 
	private Hospital_s hospital_s;
			
	@OneToMany(mappedBy = "hospital") // 하나의 병원에 등록된 모든 리뷰를 불러와야 하기 때문에
	private List<H_review> reviews = new ArrayList<>();
	
	@OneToMany(mappedBy = "hospital")
	private List<H_appm> appms = new ArrayList<>();
	
		
	@Column
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
	
	private LocalDateTime createdAt;
	private LocalDateTime updatedAt;
	
	@PrePersist
	public void onCreate() {
		this.createdAt = LocalDateTime.now();
		this.updatedAt = LocalDateTime.now();
	}

	@PreUpdate
	public void onUpdate() {
		this.updatedAt = LocalDateTime.now();
	}
}
