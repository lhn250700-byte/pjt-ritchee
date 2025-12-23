package com.study.spring.hospital.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.study.spring.hospital.dto.MedicalListDto;
import com.study.spring.hospital.entity.H_appm;


@Repository
public interface MedicalReopository extends JpaRepository<H_appm, Integer> {

	@Query("""
		    select new com.study.spring.hospital.dto.MedicalListDto(
		        ha.a_id,
		        ha.a_content,
		        ha.a_date,
		        ha.a_del_yn,
		        ha.a_dia_content,
		        ha.a_dia_name,
		        CAST(ha.h_user.id AS string),    
		        ha.createdAt,
		        ha.hospital.h_code
		    )
		    from H_appm ha
		    order by ha.a_id desc
		""")
		List<MedicalListDto> findAllMedicalByIdDesc();

}
