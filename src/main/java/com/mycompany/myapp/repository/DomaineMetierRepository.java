package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.DomaineMetier;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the DomaineMetier entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DomaineMetierRepository extends JpaRepository<DomaineMetier, Long> {
}
