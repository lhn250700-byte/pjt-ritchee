package com.study.spring.user.entity;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import com.study.spring.hospital.entity.H_appm;
import com.study.spring.hospital.entity.H_comment;
import com.study.spring.hospital.entity.H_like;
import com.study.spring.hospital.entity.H_review;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name="h_user")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {
	@Id
	private UUID id;
	
	@OneToMany(mappedBy = "h_user")
	private List<H_appm> appms = new ArrayList<>();
	
	@OneToMany(mappedBy = "h_user")
	private List<H_review> reviews = new ArrayList<>();
	
	@OneToMany(mappedBy = "h_user")
	private List<H_comment> comments = new ArrayList<>();
	
	@OneToMany(mappedBy = "h_user")
	private List<H_like> likes = new ArrayList<>();
	
	@Column
	private String u_kind;
	private String name;
	private String gender;
	private String phone;
	private String addr;
	private LocalDate birth;
	private String text; 
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
