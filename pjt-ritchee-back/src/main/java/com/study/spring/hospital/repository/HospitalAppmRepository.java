package com.study.spring.hospital.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.study.spring.hospital.entity.H_appm;

@Repository
public interface HospitalAppmRepository extends JpaRepository<H_appm, Integer> {
	
}
