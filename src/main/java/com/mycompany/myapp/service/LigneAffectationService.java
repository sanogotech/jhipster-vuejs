package com.mycompany.myapp.service;

import com.mycompany.myapp.domain.LigneAffectation;
import com.mycompany.myapp.repository.LigneAffectationRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing {@link LigneAffectation}.
 */
@Service
@Transactional
public class LigneAffectationService {

    private final Logger log = LoggerFactory.getLogger(LigneAffectationService.class);

    private final LigneAffectationRepository ligneAffectationRepository;

    public LigneAffectationService(LigneAffectationRepository ligneAffectationRepository) {
        this.ligneAffectationRepository = ligneAffectationRepository;
    }

    /**
     * Save a ligneAffectation.
     *
     * @param ligneAffectation the entity to save.
     * @return the persisted entity.
     */
    public LigneAffectation save(LigneAffectation ligneAffectation) {
        log.debug("Request to save LigneAffectation : {}", ligneAffectation);
        return ligneAffectationRepository.save(ligneAffectation);
    }

    /**
     * Get all the ligneAffectations.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<LigneAffectation> findAll() {
        log.debug("Request to get all LigneAffectations");
        return ligneAffectationRepository.findAll();
    }


    /**
     * Get one ligneAffectation by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<LigneAffectation> findOne(Long id) {
        log.debug("Request to get LigneAffectation : {}", id);
        return ligneAffectationRepository.findById(id);
    }

    /**
     * Delete the ligneAffectation by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete LigneAffectation : {}", id);
        ligneAffectationRepository.deleteById(id);
    }
}
