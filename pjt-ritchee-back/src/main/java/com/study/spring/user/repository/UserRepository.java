package com.study.spring.user.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.study.spring.user.dto.UserDto;
import com.study.spring.user.entity.User;

@Repository
public interface UserRepository extends JpaRepository<User, UUID>{
	
	@Query("""
			select new com.study.spring.user.dto.UserDto(
				u.id,
				u.u_kind,
				u.name,
				u.gender,
				u.phone,
				u.addr,
				u.birth,
				u.text
			)
			from User u
			order by u.id desc
			""")
	List<UserDto> findAllUserByIdDesc();
	
}
