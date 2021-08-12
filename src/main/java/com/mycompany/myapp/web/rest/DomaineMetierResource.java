package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.DomaineMetier;
import com.mycompany.myapp.repository.DomaineMetierRepository;
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
 * REST controller for managing {@link com.mycompany.myapp.domain.DomaineMetier}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class DomaineMetierResource {

    private final Logger log = LoggerFactory.getLogger(DomaineMetierResource.class);

    private static final String ENTITY_NAME = "domaineMetier";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final DomaineMetierRepository domaineMetierRepository;

    public DomaineMetierResource(DomaineMetierRepository domaineMetierRepository) {
        this.domaineMetierRepository = domaineMetierRepository;
    }

    /**
     * {@code POST  /domaine-metiers} : Create a new domaineMetier.
     *
     * @param domaineMetier the domaineMetier to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new domaineMetier, or with status {@code 400 (Bad Request)} if the domaineMetier has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/domaine-metiers")
    public ResponseEntity<DomaineMetier> createDomaineMetier(@Valid @RequestBody DomaineMetier domaineMetier) throws URISyntaxException {
        log.debug("REST request to save DomaineMetier : {}", domaineMetier);
        if (domaineMetier.getId() != null) {
            throw new BadRequestAlertException("A new domaineMetier cannot already have an ID", ENTITY_NAME, "idexists");
        }
        DomaineMetier result = domaineMetierRepository.save(domaineMetier);
        return ResponseEntity.created(new URI("/api/domaine-metiers/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /domaine-metiers} : Updates an existing domaineMetier.
     *
     * @param domaineMetier the domaineMetier to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated domaineMetier,
     * or with status {@code 400 (Bad Request)} if the domaineMetier is not valid,
     * or with status {@code 500 (Internal Server Error)} if the domaineMetier couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/domaine-metiers")
    public ResponseEntity<DomaineMetier> updateDomaineMetier(@Valid @RequestBody DomaineMetier domaineMetier) throws URISyntaxException {
        log.debug("REST request to update DomaineMetier : {}", domaineMetier);
        if (domaineMetier.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        DomaineMetier result = domaineMetierRepository.save(domaineMetier);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, domaineMetier.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /domaine-metiers} : get all the domaineMetiers.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of domaineMetiers in body.
     */
    @GetMapping("/domaine-metiers")
    public List<DomaineMetier> getAllDomaineMetiers() {
        log.debug("REST request to get all DomaineMetiers");
        return domaineMetierRepository.findAll();
    }

    /**
     * {@code GET  /domaine-metiers/:id} : get the "id" domaineMetier.
     *
     * @param id the id of the domaineMetier to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the domaineMetier, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/domaine-metiers/{id}")
    public ResponseEntity<DomaineMetier> getDomaineMetier(@PathVariable Long id) {
        log.debug("REST request to get DomaineMetier : {}", id);
        Optional<DomaineMetier> domaineMetier = domaineMetierRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(domaineMetier);
    }

    /**
     * {@code DELETE  /domaine-metiers/:id} : delete the "id" domaineMetier.
     *
     * @param id the id of the domaineMetier to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/domaine-metiers/{id}")
    public ResponseEntity<Void> deleteDomaineMetier(@PathVariable Long id) {
        log.debug("REST request to delete DomaineMetier : {}", id);
        domaineMetierRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
