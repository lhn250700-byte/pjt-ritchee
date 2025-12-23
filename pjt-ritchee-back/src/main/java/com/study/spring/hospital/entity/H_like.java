package com.study.spring.hospital.entity;

import java.time.LocalDateTime;
import java.util.UUID;

import com.study.spring.user.entity.User;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name="h_like", uniqueConstraints = {
		@UniqueConstraint(name="h_like_r_id_h_user_id", columnNames = {"r_id", "h_user_id"})
})
@Data
@NoArgsConstructor @AllArgsConstructor
@Builder
public class H_like {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int l_id;
	
	@ManyToOne
	@JoinColumn(name="r_id")
	private H_review h_review;
	
	@ManyToOne
	@JoinColumn(name="h_user_id")
	private User h_user;
	
	private LocalDateTime createdAt;
	
	@PrePersist
	public void onCreate() {
		this.createdAt = LocalDateTime.now();
	}
}
