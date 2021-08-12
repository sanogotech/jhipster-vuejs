package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.Consultant;
import com.mycompany.myapp.repository.ConsultantRepository;
import com.mycompany.myapp.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.mycompany.myapp.domain.Consultant}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class ConsultantResource {

    private final Logger log = LoggerFactory.getLogger(ConsultantResource.class);

    private static final String ENTITY_NAME = "consultant";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ConsultantRepository consultantRepository;

    public ConsultantResource(ConsultantRepository consultantRepository) {
        this.consultantRepository = consultantRepository;
    }

    /**
     * {@code POST  /consultants} : Create a new consultant.
     *
     * @param consultant the consultant to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new consultant, or with status {@code 400 (Bad Request)} if the consultant has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/consultants")
    public ResponseEntity<Consultant> createConsultant(@Valid @RequestBody Consultant consultant) throws URISyntaxException {
        log.debug("REST request to save Consultant : {}", consultant);
        if (consultant.getId() != null) {
            throw new BadRequestAlertException("A new consultant cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Consultant result = consultantRepository.save(consultant);
        return ResponseEntity.created(new URI("/api/consultants/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /consultants} : Updates an existing consultant.
     *
     * @param consultant the consultant to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated consultant,
     * or with status {@code 400 (Bad Request)} if the consultant is not valid,
     * or with status {@code 500 (Internal Server Error)} if the consultant couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/consultants")
    public ResponseEntity<Consultant> updateConsultant(@Valid @RequestBody Consultant consultant) throws URISyntaxException {
        log.debug("REST request to update Consultant : {}", consultant);
        if (consultant.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Consultant result = consultantRepository.save(consultant);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, consultant.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /consultants} : get all the consultants.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of consultants in body.
     */
    @GetMapping("/consultants")
    public ResponseEntity<List<Consultant>> getAllConsultants(Pageable pageable) {
        log.debug("REST request to get a page of Consultants");
        Page<Consultant> page = consultantRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /consultants/:id} : get the "id" consultant.
     *
     * @param id the id of the consultant to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the consultant, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/consultants/{id}")
    public ResponseEntity<Consultant> getConsultant(@PathVariable Long id) {
        log.debug("REST request to get Consultant : {}", id);
        Optional<Consultant> consultant = consultantRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(consultant);
    }

    /**
     * {@code DELETE  /consultants/:id} : delete the "id" consultant.
     *
     * @param id the id of the consultant to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/consultants/{id}")
    public ResponseEntity<Void> deleteConsultant(@PathVariable Long id) {
        log.debug("REST request to delete Consultant : {}", id);
        consultantRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
