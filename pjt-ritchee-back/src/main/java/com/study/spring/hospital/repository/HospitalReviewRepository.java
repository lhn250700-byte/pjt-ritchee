package com.study.spring.hospital.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.study.spring.hospital.entity.H_appm;
import com.study.spring.hospital.entity.H_review;

@Repository
public interface HospitalReviewRepository extends JpaRepository<H_review, Integer>{


}
