package com.study.spring.hospital.repository;

import com.study.spring.hospital.dto.UserInfoCheckDTO;
import com.study.spring.hospital.entity.AuthUser; // 엔티티 임포트
import org.springframework.data.jpa.repository.JpaRepository; // JpaRepository 사용 가능
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;
import java.util.UUID;

public interface UserInfoRepository extends JpaRepository<AuthUser, UUID> {

    // DTO 인터페이스를 반환 타입으로 지정
    @Query(value = """
            SELECT CASE WHEN COUNT(*) > 0 THEN 'Y' ELSE 'N' END AS userInfoCheckYn
            FROM auth.users
            WHERE email = :email
            """,
            nativeQuery = true)
    Optional<UserInfoCheckDTO> userInfoCheckYn(@Param("email") String email);
}
////
//public interface UserInfoRepository extends Repository<Object, String>{
//    // user email 정보 CHECK YN 
//    // 있는경우 'Y' -- 중복, 없는경우 'N' return
//    @Query(value = """
//            SELECT CASE WHEN COUNT(*) > 0 THEN 'Y' ELSE 'N' END
//            FROM auth.users
//            WHERE email = :email
//            """,
//            nativeQuery = true)
//    // 반환 타입을 Optional<String>으로 변경합니다.
//    Optional<String> checkEmailExistsYn(@Param("email") String email);
//}