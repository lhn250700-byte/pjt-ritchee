package com.study.spring.hospital.repository;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.study.spring.hospital.dto.AppointmentFullDto;
import com.study.spring.hospital.entity.H_appm;

@Repository
public interface AppointmentRepository extends JpaRepository<H_appm, Integer> {

	// 삭제되지 않은 모든 예약 조회
	// @Query("SELECT a FROM H_appm a WHERE a.a_del_yn = 'N'")
	// Page<H_appm> findAllActive(Pageable pageable);

	// 2025.12.10 재정의
	// 특정 사용자(id) 예약 조회
//    @Query("SELECT a FROM H_appm a WHERE a.h_user.id = :userId AND a.a_del_yn = 'N'")
//    Page<H_appm> findByUserId(@Param("userId") UUID userId, Pageable pageable);
//  // 특정 사용자(id) 예약 조회
//    @Query
//    ("""
//    	SELECT new com.study.spring.hospital.dto.AppointmentFullDto(
//    		a.a_id,
//    		h.h_code,
//    		h.h_name,
//    		a.a_content,
//    		a.a_dia_name,
//    		a.a_dia_content,
//    		a.a_date,
//    		u.phone )
//    	FROM H_appm a
//    	JOIN Hospital h
//    	JOIN User u 
//    	WHERE a.a_user_id = :userId 
//    	AND a.a_del_yn = 'N'
//    	ORDER BY a.a_id DESC
//    """	)
	// a.a_date As a_date,
	// 12.11 날짜변환 문제로 인해 Native Query로 변경함
	@Query(value = """
			    SELECT
			        a.a_id As a_id,
			        h.h_code As h_code,
			        h.h_name As h_name,
			        a.a_content As a_content,
			        a.a_dia_name As a_dia_name,
			        a.a_dia_content As a_dia_content,
			        TO_CHAR(a.a_date,'YYYY-MM-DD') As a_date,
			        TO_CHAR(a.a_date,'HH24:MI') As a_time,
			        u.phone  As phone,
			        u.text As text,
			        u.name As u_name,
			        CASE WHEN u.gender = 'M' THEN '남'
			             WHEN u.gender = 'F' THEN '여'
			             ELSE u.gender END As gender,
			        EXTRACT(YEAR FROM AGE(CURRENT_DATE, u.birth)) AS Age,
	                u.u_kind user_ukind, '!' staff_ukind,
	                u.id AS u_id,
	                CASE WHEN COALESCE(r.r_id, 0) = 0 AND COALESCE(A.a_dia_name,'!') <> '!' THEN 'Y'
			        ELSE 'N' END R_able_yn 
			    FROM h_appm a
			    JOIN hospital h ON a.h_code = h.h_code
			    JOIN h_user u ON a.a_user_id = u.id
			    LEFT JOIN h_review r ON a.a_id = r.a_id
			    WHERE a.a_user_id = :userId
			        AND COALESCE(a.a_del_yn,'N') = 'N'
			    ORDER BY a_date DESC, a_time DESC 
			""", countQuery = """
			    SELECT count(a.a_id)
			    FROM h_appm a
			    JOIN hospital h ON a.h_code = h.h_code
			    JOIN h_user u ON a.a_user_id = u.id
			    LEFT JOIN h_review r on a.a_id = r.a_id
			    WHERE a.a_user_id = :userId
			    AND COALESCE(a.a_del_yn,'N') = 'N'
			""", nativeQuery = true // 네이티브 SQL 사용 설정
	)
	Page<AppointmentFullDto> findByUserId(@Param("userId") UUID userId, Pageable pageable);

	// 예약 소프트 삭제
	@Modifying
	@Query("UPDATE H_appm a SET a.a_del_yn = 'Y' WHERE a.a_id = :aId")
	void softDelete(@Param("aId") int aId);

	// 예약 내역 수정삭제를 위한 예약정보조회
	@Query(value = """
			 SELECT
			              a.a_id As a_id,
			              h.h_code As h_code,
			              h.h_name As h_name,
			              a.a_content As a_content,
			              a.a_dia_name As a_dia_name,
			              a.a_dia_content As a_dia_content,
			              TO_CHAR(a.a_date,'YYYY-MM-DD') As a_date,
			              TO_CHAR(a.a_date,'HH24:MI') As a_time,
			              u.phone  As phone,
			              u.text As text,
			              u.name As u_name,
			              CASE WHEN u.gender = 'M' THEN '남'
			                   WHEN u.gender = 'F' THEN '여'
			                   ELSE u.gender END As gender,
			              EXTRACT(YEAR FROM AGE(CURRENT_DATE, u.birth)) AS Age,
			                u.u_kind user_ukind, '!' staff_ukind,
			                u.id AS u_id
			          FROM h_appm a
			          JOIN hospital h ON a.h_code = h.h_code
			          JOIN h_user u ON a.a_user_id = u.id
			         WHERE a.a_id = :a_id
			           AND COALESCE(a.a_del_yn,'N') = 'N'
			""", nativeQuery = true // 네이티브 SQL 사용 설정
	)
	Optional<AppointmentFullDto> findByAppmInfoById(@Param("a_id") int a_id);

	@Query(value = """
            SELECT
			    a.a_id AS a_id,
			    h.h_code AS h_code,
			    h.h_name AS h_name,
			    a.a_content AS a_content,
			    a.a_dia_name AS a_dia_name,
			    a.a_dia_content AS a_dia_content,
			    TO_CHAR(a.a_date, 'YYYY-MM-DD') AS a_date,
			    TO_CHAR(a.a_date, 'HH24:MI') AS a_time,
			    u.phone AS phone,
			    u.text AS text,
			    u.name AS u_name,
			    CASE
			        WHEN u.gender = 'M' THEN '남'
			        WHEN u.gender = 'F' THEN '여'
			        ELSE u.gender
			    END AS gender,
			    EXTRACT(YEAR FROM AGE(CURRENT_DATE, u.birth)) AS age,
			    u.u_kind user_ukind,
			    staff.u_kind staff_ukind,
			    u.id AS u_id
			FROM h_appm a
			JOIN hospital h ON a.h_code = h.h_code
			JOIN h_user u ON a.a_user_id = u.id
			JOIN h_user staff
			  ON LEFT(TRIM(staff.text),8) = h.h_code
			 AND staff.u_kind = '2'
			WHERE COALESCE(a.a_del_yn, 'N') = 'N'
			  AND staff.id = :a_user_id
			ORDER BY
			    a_date DESC,
			    CASE
			        WHEN
			            COALESCE(TRIM(a.a_dia_name), '') = ''
			            OR COALESCE(TRIM(a.a_dia_content), '') = ''
			        THEN 0
			        ELSE 1
			    END,
			    a.a_id ASC
		    """, 
		    countQuery = """
		    SELECT COUNT(a.a_id)
				FROM h_appm a
				JOIN hospital h   ON a.h_code = h.h_code
				JOIN h_user staff ON LEFT(TRIM(staff.text),8) = h.h_code AND staff.u_kind = '2'
				JOIN h_user u     ON a.a_user_id = u.id
				WHERE COALESCE(a.a_del_yn, 'N') = 'N'
				  AND staff.id = :a_user_id

			""", nativeQuery = true)
	Page<AppointmentFullDto> findByUserIdAndCode(@Param("a_user_id") UUID a_user_id, Pageable pageable);
	
	@Query(value = """
            SELECT
                a.a_id AS a_id,
                h.h_code AS h_code,
                h.h_name AS h_name,
                a.a_content AS a_content,
                a.a_dia_name AS a_dia_name,
                a.a_dia_content AS a_dia_content,
                TO_CHAR(a.a_date, 'YYYY-MM-DD') AS a_date,
                TO_CHAR(a.a_date, 'HH24:MI') AS a_time,
                u.phone AS phone,
                u.text AS text,
                u.name AS u_name,
                CASE
                    WHEN u.gender = 'M' THEN '남'
                    WHEN u.gender = 'F' THEN '여'
                    ELSE u.gender
                END AS gender,
                EXTRACT(YEAR FROM AGE(CURRENT_DATE, u.birth)) AS age,
                u.u_kind As user_ukind, '!' As staff_ukind,
                u.id AS u_id
			FROM h_appm a
			JOIN hospital h ON a.h_code = h.h_code
			JOIN h_user u ON a.a_user_id = u.id
			WHERE COALESCE(a.a_del_yn, 'N') = 'N'
			  AND u.id     = :a_user_id
			  AND h.h_code = :h_code
			ORDER BY a.a_id DESC
		    """, 
		    countQuery = """
		    SELECT COUNT(a.a_id)
				FROM h_appm a
				JOIN hospital h ON a.h_code = h.h_code
				JOIN h_user u  ON a.a_user_id = u.id  AND u.u_kind = '1'
				WHERE COALESCE(a.a_del_yn, 'N') = 'N'
				  AND staff.id = :a_user_id
				  AND h.h_code = :h_code

			""", nativeQuery = true)
	Page<AppointmentFullDto> findByUserIdAndHcode( 
			@Param("h_code") String h_code, 
			@Param("a_user_id")  UUID a_user_id, 
			Pageable pageable);
}