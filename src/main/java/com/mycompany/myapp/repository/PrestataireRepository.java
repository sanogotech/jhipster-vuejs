package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Prestataire;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Prestataire entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PrestataireRepository extends JpaRepository<Prestataire, Long> {
}
