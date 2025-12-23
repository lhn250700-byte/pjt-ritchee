package com.study.spring.hospital.dto;

import java.time.LocalDateTime;

public interface ReviewLikeProjection {
    int getRId();
    Long getLikeCount();
    LocalDateTime getCreatedAt();
}