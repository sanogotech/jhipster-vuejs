package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.Prestataire;
import com.mycompany.myapp.repository.PrestataireRepository;
import com.mycompany.myapp.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.mycompany.myapp.domain.Prestataire}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class PrestataireResource {

    private final Logger log = LoggerFactory.getLogger(PrestataireResource.class);

    private static final String ENTITY_NAME = "prestataire";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final PrestataireRepository prestataireRepository;

    public PrestataireResource(PrestataireRepository prestataireRepository) {
        this.prestataireRepository = prestataireRepository;
    }

    /**
     * {@code POST  /prestataires} : Create a new prestataire.
     *
     * @param prestataire the prestataire to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new prestataire, or with status {@code 400 (Bad Request)} if the prestataire has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/prestataires")
    public ResponseEntity<Prestataire> createPrestataire(@Valid @RequestBody Prestataire prestataire) throws URISyntaxException {
        log.debug("REST request to save Prestataire : {}", prestataire);
        if (prestataire.getId() != null) {
            throw new BadRequestAlertException("A new prestataire cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Prestataire result = prestataireRepository.save(prestataire);
        return ResponseEntity.created(new URI("/api/prestataires/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /prestataires} : Updates an existing prestataire.
     *
     * @param prestataire the prestataire to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated prestataire,
     * or with status {@code 400 (Bad Request)} if the prestataire is not valid,
     * or with status {@code 500 (Internal Server Error)} if the prestataire couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/prestataires")
    public ResponseEntity<Prestataire> updatePrestataire(@Valid @RequestBody Prestataire prestataire) throws URISyntaxException {
        log.debug("REST request to update Prestataire : {}", prestataire);
        if (prestataire.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Prestataire result = prestataireRepository.save(prestataire);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, prestataire.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /prestataires} : get all the prestataires.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of prestataires in body.
     */
    @GetMapping("/prestataires")
    public List<Prestataire> getAllPrestataires() {
        log.debug("REST request to get all Prestataires");
        return prestataireRepository.findAll();
    }

    /**
     * {@code GET  /prestataires/:id} : get the "id" prestataire.
     *
     * @param id the id of the prestataire to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the prestataire, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/prestataires/{id}")
    public ResponseEntity<Prestataire> getPrestataire(@PathVariable Long id) {
        log.debug("REST request to get Prestataire : {}", id);
        Optional<Prestataire> prestataire = prestataireRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(prestataire);
    }

    /**
     * {@code DELETE  /prestataires/:id} : delete the "id" prestataire.
     *
     * @param id the id of the prestataire to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/prestataires/{id}")
    public ResponseEntity<Void> deletePrestataire(@PathVariable Long id) {
        log.debug("REST request to delete Prestataire : {}", id);
        prestataireRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
