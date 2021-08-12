package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.JhipsterApp;
import com.mycompany.myapp.domain.DomaineMetier;
import com.mycompany.myapp.repository.DomaineMetierRepository;

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
 * Integration tests for the {@link DomaineMetierResource} REST controller.
 */
@SpringBootTest(classes = JhipsterApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class DomaineMetierResourceIT {

    private static final String DEFAULT_NOM = "AAAAAAAAAA";
    private static final String UPDATED_NOM = "BBBBBBBBBB";

    @Autowired
    private DomaineMetierRepository domaineMetierRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restDomaineMetierMockMvc;

    private DomaineMetier domaineMetier;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static DomaineMetier createEntity(EntityManager em) {
        DomaineMetier domaineMetier = new DomaineMetier()
            .nom(DEFAULT_NOM);
        return domaineMetier;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static DomaineMetier createUpdatedEntity(EntityManager em) {
        DomaineMetier domaineMetier = new DomaineMetier()
            .nom(UPDATED_NOM);
        return domaineMetier;
    }

    @BeforeEach
    public void initTest() {
        domaineMetier = createEntity(em);
    }

    @Test
    @Transactional
    public void createDomaineMetier() throws Exception {
        int databaseSizeBeforeCreate = domaineMetierRepository.findAll().size();
        // Create the DomaineMetier
        restDomaineMetierMockMvc.perform(post("/api/domaine-metiers")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(domaineMetier)))
            .andExpect(status().isCreated());

        // Validate the DomaineMetier in the database
        List<DomaineMetier> domaineMetierList = domaineMetierRepository.findAll();
        assertThat(domaineMetierList).hasSize(databaseSizeBeforeCreate + 1);
        DomaineMetier testDomaineMetier = domaineMetierList.get(domaineMetierList.size() - 1);
        assertThat(testDomaineMetier.getNom()).isEqualTo(DEFAULT_NOM);
    }

    @Test
    @Transactional
    public void createDomaineMetierWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = domaineMetierRepository.findAll().size();

        // Create the DomaineMetier with an existing ID
        domaineMetier.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restDomaineMetierMockMvc.perform(post("/api/domaine-metiers")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(domaineMetier)))
            .andExpect(status().isBadRequest());

        // Validate the DomaineMetier in the database
        List<DomaineMetier> domaineMetierList = domaineMetierRepository.findAll();
        assertThat(domaineMetierList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkNomIsRequired() throws Exception {
        int databaseSizeBeforeTest = domaineMetierRepository.findAll().size();
        // set the field null
        domaineMetier.setNom(null);

        // Create the DomaineMetier, which fails.


        restDomaineMetierMockMvc.perform(post("/api/domaine-metiers")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(domaineMetier)))
            .andExpect(status().isBadRequest());

        List<DomaineMetier> domaineMetierList = domaineMetierRepository.findAll();
        assertThat(domaineMetierList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllDomaineMetiers() throws Exception {
        // Initialize the database
        domaineMetierRepository.saveAndFlush(domaineMetier);

        // Get all the domaineMetierList
        restDomaineMetierMockMvc.perform(get("/api/domaine-metiers?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(domaineMetier.getId().intValue())))
            .andExpect(jsonPath("$.[*].nom").value(hasItem(DEFAULT_NOM)));
    }
    
    @Test
    @Transactional
    public void getDomaineMetier() throws Exception {
        // Initialize the database
        domaineMetierRepository.saveAndFlush(domaineMetier);

        // Get the domaineMetier
        restDomaineMetierMockMvc.perform(get("/api/domaine-metiers/{id}", domaineMetier.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(domaineMetier.getId().intValue()))
            .andExpect(jsonPath("$.nom").value(DEFAULT_NOM));
    }
    @Test
    @Transactional
    public void getNonExistingDomaineMetier() throws Exception {
        // Get the domaineMetier
        restDomaineMetierMockMvc.perform(get("/api/domaine-metiers/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateDomaineMetier() throws Exception {
        // Initialize the database
        domaineMetierRepository.saveAndFlush(domaineMetier);

        int databaseSizeBeforeUpdate = domaineMetierRepository.findAll().size();

        // Update the domaineMetier
        DomaineMetier updatedDomaineMetier = domaineMetierRepository.findById(domaineMetier.getId()).get();
        // Disconnect from session so that the updates on updatedDomaineMetier are not directly saved in db
        em.detach(updatedDomaineMetier);
        updatedDomaineMetier
            .nom(UPDATED_NOM);

        restDomaineMetierMockMvc.perform(put("/api/domaine-metiers")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedDomaineMetier)))
            .andExpect(status().isOk());

        // Validate the DomaineMetier in the database
        List<DomaineMetier> domaineMetierList = domaineMetierRepository.findAll();
        assertThat(domaineMetierList).hasSize(databaseSizeBeforeUpdate);
        DomaineMetier testDomaineMetier = domaineMetierList.get(domaineMetierList.size() - 1);
        assertThat(testDomaineMetier.getNom()).isEqualTo(UPDATED_NOM);
    }

    @Test
    @Transactional
    public void updateNonExistingDomaineMetier() throws Exception {
        int databaseSizeBeforeUpdate = domaineMetierRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDomaineMetierMockMvc.perform(put("/api/domaine-metiers")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(domaineMetier)))
            .andExpect(status().isBadRequest());

        // Validate the DomaineMetier in the database
        List<DomaineMetier> domaineMetierList = domaineMetierRepository.findAll();
        assertThat(domaineMetierList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteDomaineMetier() throws Exception {
        // Initialize the database
        domaineMetierRepository.saveAndFlush(domaineMetier);

        int databaseSizeBeforeDelete = domaineMetierRepository.findAll().size();

        // Delete the domaineMetier
        restDomaineMetierMockMvc.perform(delete("/api/domaine-metiers/{id}", domaineMetier.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<DomaineMetier> domaineMetierList = domaineMetierRepository.findAll();
        assertThat(domaineMetierList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
