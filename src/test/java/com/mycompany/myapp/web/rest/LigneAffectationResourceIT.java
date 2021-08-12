package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.JhipsterApp;
import com.mycompany.myapp.domain.LigneAffectation;
import com.mycompany.myapp.repository.LigneAffectationRepository;
import com.mycompany.myapp.service.LigneAffectationService;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link LigneAffectationResource} REST controller.
 */
@SpringBootTest(classes = JhipsterApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class LigneAffectationResourceIT {

    private static final String DEFAULT_TYPE_AFFECTATION = "AAAAAAAAAA";
    private static final String UPDATED_TYPE_AFFECTATION = "BBBBBBBBBB";

    private static final Integer DEFAULT_NBJOURHOME = 1;
    private static final Integer UPDATED_NBJOURHOME = 2;

    @Autowired
    private LigneAffectationRepository ligneAffectationRepository;

    @Autowired
    private LigneAffectationService ligneAffectationService;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restLigneAffectationMockMvc;

    private LigneAffectation ligneAffectation;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static LigneAffectation createEntity(EntityManager em) {
        LigneAffectation ligneAffectation = new LigneAffectation()
            .typeAffectation(DEFAULT_TYPE_AFFECTATION)
            .nbjourhome(DEFAULT_NBJOURHOME);
        return ligneAffectation;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static LigneAffectation createUpdatedEntity(EntityManager em) {
        LigneAffectation ligneAffectation = new LigneAffectation()
            .typeAffectation(UPDATED_TYPE_AFFECTATION)
            .nbjourhome(UPDATED_NBJOURHOME);
        return ligneAffectation;
    }

    @BeforeEach
    public void initTest() {
        ligneAffectation = createEntity(em);
    }

    @Test
    @Transactional
    public void createLigneAffectation() throws Exception {
        int databaseSizeBeforeCreate = ligneAffectationRepository.findAll().size();
        // Create the LigneAffectation
        restLigneAffectationMockMvc.perform(post("/api/ligne-affectations")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(ligneAffectation)))
            .andExpect(status().isCreated());

        // Validate the LigneAffectation in the database
        List<LigneAffectation> ligneAffectationList = ligneAffectationRepository.findAll();
        assertThat(ligneAffectationList).hasSize(databaseSizeBeforeCreate + 1);
        LigneAffectation testLigneAffectation = ligneAffectationList.get(ligneAffectationList.size() - 1);
        assertThat(testLigneAffectation.getTypeAffectation()).isEqualTo(DEFAULT_TYPE_AFFECTATION);
        assertThat(testLigneAffectation.getNbjourhome()).isEqualTo(DEFAULT_NBJOURHOME);
    }

    @Test
    @Transactional
    public void createLigneAffectationWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = ligneAffectationRepository.findAll().size();

        // Create the LigneAffectation with an existing ID
        ligneAffectation.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restLigneAffectationMockMvc.perform(post("/api/ligne-affectations")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(ligneAffectation)))
            .andExpect(status().isBadRequest());

        // Validate the LigneAffectation in the database
        List<LigneAffectation> ligneAffectationList = ligneAffectationRepository.findAll();
        assertThat(ligneAffectationList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkTypeAffectationIsRequired() throws Exception {
        int databaseSizeBeforeTest = ligneAffectationRepository.findAll().size();
        // set the field null
        ligneAffectation.setTypeAffectation(null);

        // Create the LigneAffectation, which fails.


        restLigneAffectationMockMvc.perform(post("/api/ligne-affectations")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(ligneAffectation)))
            .andExpect(status().isBadRequest());

        List<LigneAffectation> ligneAffectationList = ligneAffectationRepository.findAll();
        assertThat(ligneAffectationList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkNbjourhomeIsRequired() throws Exception {
        int databaseSizeBeforeTest = ligneAffectationRepository.findAll().size();
        // set the field null
        ligneAffectation.setNbjourhome(null);

        // Create the LigneAffectation, which fails.


        restLigneAffectationMockMvc.perform(post("/api/ligne-affectations")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(ligneAffectation)))
            .andExpect(status().isBadRequest());

        List<LigneAffectation> ligneAffectationList = ligneAffectationRepository.findAll();
        assertThat(ligneAffectationList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllLigneAffectations() throws Exception {
        // Initialize the database
        ligneAffectationRepository.saveAndFlush(ligneAffectation);

        // Get all the ligneAffectationList
        restLigneAffectationMockMvc.perform(get("/api/ligne-affectations?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(ligneAffectation.getId().intValue())))
            .andExpect(jsonPath("$.[*].typeAffectation").value(hasItem(DEFAULT_TYPE_AFFECTATION)))
            .andExpect(jsonPath("$.[*].nbjourhome").value(hasItem(DEFAULT_NBJOURHOME)));
    }
    
    @Test
    @Transactional
    public void getLigneAffectation() throws Exception {
        // Initialize the database
        ligneAffectationRepository.saveAndFlush(ligneAffectation);

        // Get the ligneAffectation
        restLigneAffectationMockMvc.perform(get("/api/ligne-affectations/{id}", ligneAffectation.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(ligneAffectation.getId().intValue()))
            .andExpect(jsonPath("$.typeAffectation").value(DEFAULT_TYPE_AFFECTATION))
            .andExpect(jsonPath("$.nbjourhome").value(DEFAULT_NBJOURHOME));
    }
    @Test
    @Transactional
    public void getNonExistingLigneAffectation() throws Exception {
        // Get the ligneAffectation
        restLigneAffectationMockMvc.perform(get("/api/ligne-affectations/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateLigneAffectation() throws Exception {
        // Initialize the database
        ligneAffectationService.save(ligneAffectation);

        int databaseSizeBeforeUpdate = ligneAffectationRepository.findAll().size();

        // Update the ligneAffectation
        LigneAffectation updatedLigneAffectation = ligneAffectationRepository.findById(ligneAffectation.getId()).get();
        // Disconnect from session so that the updates on updatedLigneAffectation are not directly saved in db
        em.detach(updatedLigneAffectation);
        updatedLigneAffectation
            .typeAffectation(UPDATED_TYPE_AFFECTATION)
            .nbjourhome(UPDATED_NBJOURHOME);

        restLigneAffectationMockMvc.perform(put("/api/ligne-affectations")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedLigneAffectation)))
            .andExpect(status().isOk());

        // Validate the LigneAffectation in the database
        List<LigneAffectation> ligneAffectationList = ligneAffectationRepository.findAll();
        assertThat(ligneAffectationList).hasSize(databaseSizeBeforeUpdate);
        LigneAffectation testLigneAffectation = ligneAffectationList.get(ligneAffectationList.size() - 1);
        assertThat(testLigneAffectation.getTypeAffectation()).isEqualTo(UPDATED_TYPE_AFFECTATION);
        assertThat(testLigneAffectation.getNbjourhome()).isEqualTo(UPDATED_NBJOURHOME);
    }

    @Test
    @Transactional
    public void updateNonExistingLigneAffectation() throws Exception {
        int databaseSizeBeforeUpdate = ligneAffectationRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restLigneAffectationMockMvc.perform(put("/api/ligne-affectations")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(ligneAffectation)))
            .andExpect(status().isBadRequest());

        // Validate the LigneAffectation in the database
        List<LigneAffectation> ligneAffectationList = ligneAffectationRepository.findAll();
        assertThat(ligneAffectationList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteLigneAffectation() throws Exception {
        // Initialize the database
        ligneAffectationService.save(ligneAffectation);

        int databaseSizeBeforeDelete = ligneAffectationRepository.findAll().size();

        // Delete the ligneAffectation
        restLigneAffectationMockMvc.perform(delete("/api/ligne-affectations/{id}", ligneAffectation.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<LigneAffectation> ligneAffectationList = ligneAffectationRepository.findAll();
        assertThat(ligneAffectationList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
