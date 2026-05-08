package com.study.spring.hospital.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name="h_r_slot")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class HRSlot {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long slotId;

    @Column(nullable = false)
    private String hCode;

    @Column(nullable = false)
    private LocalDateTime rDatetime;

    @Builder.Default
    @Column(nullable = false)
    private Integer rCount = 1;

    @Column(nullable = false)
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }

    public boolean isAvailable() {
        return this.rCount == 1;
    }

    public void reserve() {
        this.rCount = 0;
    }

    public void cancel() {
        this.rCount = 1;
    }
}
