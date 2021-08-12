package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.LigneAffectation;
import com.mycompany.myapp.service.LigneAffectationService;
import com.mycompany.myapp.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.mycompany.myapp.domain.LigneAffectation}.
 */
@RestController
@RequestMapping("/api")
public class LigneAffectationResource {

    private final Logger log = LoggerFactory.getLogger(LigneAffectationResource.class);

    private static final String ENTITY_NAME = "ligneAffectation";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final LigneAffectationService ligneAffectationService;

    public LigneAffectationResource(LigneAffectationService ligneAffectationService) {
        this.ligneAffectationService = ligneAffectationService;
    }

    /**
     * {@code POST  /ligne-affectations} : Create a new ligneAffectation.
     *
     * @param ligneAffectation the ligneAffectation to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new ligneAffectation, or with status {@code 400 (Bad Request)} if the ligneAffectation has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/ligne-affectations")
    public ResponseEntity<LigneAffectation> createLigneAffectation(@Valid @RequestBody LigneAffectation ligneAffectation) throws URISyntaxException {
        log.debug("REST request to save LigneAffectation : {}", ligneAffectation);
        if (ligneAffectation.getId() != null) {
            throw new BadRequestAlertException("A new ligneAffectation cannot already have an ID", ENTITY_NAME, "idexists");
        }
        LigneAffectation result = ligneAffectationService.save(ligneAffectation);
        return ResponseEntity.created(new URI("/api/ligne-affectations/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /ligne-affectations} : Updates an existing ligneAffectation.
     *
     * @param ligneAffectation the ligneAffectation to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated ligneAffectation,
     * or with status {@code 400 (Bad Request)} if the ligneAffectation is not valid,
     * or with status {@code 500 (Internal Server Error)} if the ligneAffectation couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/ligne-affectations")
    public ResponseEntity<LigneAffectation> updateLigneAffectation(@Valid @RequestBody LigneAffectation ligneAffectation) throws URISyntaxException {
        log.debug("REST request to update LigneAffectation : {}", ligneAffectation);
        if (ligneAffectation.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        LigneAffectation result = ligneAffectationService.save(ligneAffectation);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, ligneAffectation.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /ligne-affectations} : get all the ligneAffectations.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of ligneAffectations in body.
     */
    @GetMapping("/ligne-affectations")
    public List<LigneAffectation> getAllLigneAffectations() {
        log.debug("REST request to get all LigneAffectations");
        return ligneAffectationService.findAll();
    }

    /**
     * {@code GET  /ligne-affectations/:id} : get the "id" ligneAffectation.
     *
     * @param id the id of the ligneAffectation to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the ligneAffectation, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/ligne-affectations/{id}")
    public ResponseEntity<LigneAffectation> getLigneAffectation(@PathVariable Long id) {
        log.debug("REST request to get LigneAffectation : {}", id);
        Optional<LigneAffectation> ligneAffectation = ligneAffectationService.findOne(id);
        return ResponseUtil.wrapOrNotFound(ligneAffectation);
    }

    /**
     * {@code DELETE  /ligne-affectations/:id} : delete the "id" ligneAffectation.
     *
     * @param id the id of the ligneAffectation to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/ligne-affectations/{id}")
    public ResponseEntity<Void> deleteLigneAffectation(@PathVariable Long id) {
        log.debug("REST request to delete LigneAffectation : {}", id);
        ligneAffectationService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
