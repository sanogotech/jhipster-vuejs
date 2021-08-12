package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.LigneAffectation;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the LigneAffectation entity.
 */
@SuppressWarnings("unused")
@Repository
public interface LigneAffectationRepository extends JpaRepository<LigneAffectation, Long> {
}
