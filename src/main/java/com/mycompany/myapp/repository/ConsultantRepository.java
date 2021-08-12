package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Consultant;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Consultant entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ConsultantRepository extends JpaRepository<Consultant, Long> {
}
