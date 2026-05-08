package com.study.spring.hospital.repository;

import com.study.spring.hospital.entity.HRSlot;
import jakarta.persistence.LockModeType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.Optional;

@Repository
public interface HRSlotRepository extends JpaRepository<HRSlot, Long> {
    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("""
        SELECT s
        FROM HRSlot s
        WHERE s.hCode = :hCode
        AND s.rDatetime = :rDatetime
    """)
    Optional<HRSlot> findSlotForUpdate(
            @Param("hCode") String hCode,
            @Param("rDatetime")LocalDateTime rDatetime
    );
}
