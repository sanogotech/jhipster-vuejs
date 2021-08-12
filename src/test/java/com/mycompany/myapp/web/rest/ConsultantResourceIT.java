package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.JhipsterApp;
import com.mycompany.myapp.domain.Consultant;
import com.mycompany.myapp.repository.ConsultantRepository;

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
 * Integration tests for the {@link ConsultantResource} REST controller.
 */
@SpringBootTest(classes = JhipsterApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class ConsultantResourceIT {

    private static final String DEFAULT_NOM = "AAAAAAAAAA";
    private static final String UPDATED_NOM = "BBBBBBBBBB";

    private static final String DEFAULT_MATRICULE = "AAAAAAAAAA";
    private static final String UPDATED_MATRICULE = "BBBBBBBBBB";

    private static final String DEFAULT_EMAIL = "AAAAAAAAAA";
    private static final String UPDATED_EMAIL = "BBBBBBBBBB";

    private static final String DEFAULT_PRENOM = "AAAAAAAAAA";
    private static final String UPDATED_PRENOM = "BBBBBBBBBB";

    private static final Integer DEFAULT_DISPONIBILITE_MAX = 1;
    private static final Integer UPDATED_DISPONIBILITE_MAX = 2;

    @Autowired
    private ConsultantRepository consultantRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restConsultantMockMvc;

    private Consultant consultant;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Consultant createEntity(EntityManager em) {
        Consultant consultant = new Consultant()
            .nom(DEFAULT_NOM)
            .matricule(DEFAULT_MATRICULE)
            .email(DEFAULT_EMAIL)
            .prenom(DEFAULT_PRENOM)
            .disponibiliteMax(DEFAULT_DISPONIBILITE_MAX);
        return consultant;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Consultant createUpdatedEntity(EntityManager em) {
        Consultant consultant = new Consultant()
            .nom(UPDATED_NOM)
            .matricule(UPDATED_MATRICULE)
            .email(UPDATED_EMAIL)
            .prenom(UPDATED_PRENOM)
            .disponibiliteMax(UPDATED_DISPONIBILITE_MAX);
        return consultant;
    }

    @BeforeEach
    public void initTest() {
        consultant = createEntity(em);
    }

    @Test
    @Transactional
    public void createConsultant() throws Exception {
        int databaseSizeBeforeCreate = consultantRepository.findAll().size();
        // Create the Consultant
        restConsultantMockMvc.perform(post("/api/consultants")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(consultant)))
            .andExpect(status().isCreated());

        // Validate the Consultant in the database
        List<Consultant> consultantList = consultantRepository.findAll();
        assertThat(consultantList).hasSize(databaseSizeBeforeCreate + 1);
        Consultant testConsultant = consultantList.get(consultantList.size() - 1);
        assertThat(testConsultant.getNom()).isEqualTo(DEFAULT_NOM);
        assertThat(testConsultant.getMatricule()).isEqualTo(DEFAULT_MATRICULE);
        assertThat(testConsultant.getEmail()).isEqualTo(DEFAULT_EMAIL);
        assertThat(testConsultant.getPrenom()).isEqualTo(DEFAULT_PRENOM);
        assertThat(testConsultant.getDisponibiliteMax()).isEqualTo(DEFAULT_DISPONIBILITE_MAX);
    }

    @Test
    @Transactional
    public void createConsultantWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = consultantRepository.findAll().size();

        // Create the Consultant with an existing ID
        consultant.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restConsultantMockMvc.perform(post("/api/consultants")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(consultant)))
            .andExpect(status().isBadRequest());

        // Validate the Consultant in the database
        List<Consultant> consultantList = consultantRepository.findAll();
        assertThat(consultantList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkNomIsRequired() throws Exception {
        int databaseSizeBeforeTest = consultantRepository.findAll().size();
        // set the field null
        consultant.setNom(null);

        // Create the Consultant, which fails.


        restConsultantMockMvc.perform(post("/api/consultants")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(consultant)))
            .andExpect(status().isBadRequest());

        List<Consultant> consultantList = consultantRepository.findAll();
        assertThat(consultantList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkMatriculeIsRequired() throws Exception {
        int databaseSizeBeforeTest = consultantRepository.findAll().size();
        // set the field null
        consultant.setMatricule(null);

        // Create the Consultant, which fails.


        restConsultantMockMvc.perform(post("/api/consultants")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(consultant)))
            .andExpect(status().isBadRequest());

        List<Consultant> consultantList = consultantRepository.findAll();
        assertThat(consultantList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkEmailIsRequired() throws Exception {
        int databaseSizeBeforeTest = consultantRepository.findAll().size();
        // set the field null
        consultant.setEmail(null);

        // Create the Consultant, which fails.


        restConsultantMockMvc.perform(post("/api/consultants")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(consultant)))
            .andExpect(status().isBadRequest());

        List<Consultant> consultantList = consultantRepository.findAll();
        assertThat(consultantList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkPrenomIsRequired() throws Exception {
        int databaseSizeBeforeTest = consultantRepository.findAll().size();
        // set the field null
        consultant.setPrenom(null);

        // Create the Consultant, which fails.


        restConsultantMockMvc.perform(post("/api/consultants")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(consultant)))
            .andExpect(status().isBadRequest());

        List<Consultant> consultantList = consultantRepository.findAll();
        assertThat(consultantList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDisponibiliteMaxIsRequired() throws Exception {
        int databaseSizeBeforeTest = consultantRepository.findAll().size();
        // set the field null
        consultant.setDisponibiliteMax(null);

        // Create the Consultant, which fails.


        restConsultantMockMvc.perform(post("/api/consultants")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(consultant)))
            .andExpect(status().isBadRequest());

        List<Consultant> consultantList = consultantRepository.findAll();
        assertThat(consultantList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllConsultants() throws Exception {
        // Initialize the database
        consultantRepository.saveAndFlush(consultant);

        // Get all the consultantList
        restConsultantMockMvc.perform(get("/api/consultants?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(consultant.getId().intValue())))
            .andExpect(jsonPath("$.[*].nom").value(hasItem(DEFAULT_NOM)))
            .andExpect(jsonPath("$.[*].matricule").value(hasItem(DEFAULT_MATRICULE)))
            .andExpect(jsonPath("$.[*].email").value(hasItem(DEFAULT_EMAIL)))
            .andExpect(jsonPath("$.[*].prenom").value(hasItem(DEFAULT_PRENOM)))
            .andExpect(jsonPath("$.[*].disponibiliteMax").value(hasItem(DEFAULT_DISPONIBILITE_MAX)));
    }
    
    @Test
    @Transactional
    public void getConsultant() throws Exception {
        // Initialize the database
        consultantRepository.saveAndFlush(consultant);

        // Get the consultant
        restConsultantMockMvc.perform(get("/api/consultants/{id}", consultant.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(consultant.getId().intValue()))
            .andExpect(jsonPath("$.nom").value(DEFAULT_NOM))
            .andExpect(jsonPath("$.matricule").value(DEFAULT_MATRICULE))
            .andExpect(jsonPath("$.email").value(DEFAULT_EMAIL))
            .andExpect(jsonPath("$.prenom").value(DEFAULT_PRENOM))
            .andExpect(jsonPath("$.disponibiliteMax").value(DEFAULT_DISPONIBILITE_MAX));
    }
    @Test
    @Transactional
    public void getNonExistingConsultant() throws Exception {
        // Get the consultant
        restConsultantMockMvc.perform(get("/api/consultants/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateConsultant() throws Exception {
        // Initialize the database
        consultantRepository.saveAndFlush(consultant);

        int databaseSizeBeforeUpdate = consultantRepository.findAll().size();

        // Update the consultant
        Consultant updatedConsultant = consultantRepository.findById(consultant.getId()).get();
        // Disconnect from session so that the updates on updatedConsultant are not directly saved in db
        em.detach(updatedConsultant);
        updatedConsultant
            .nom(UPDATED_NOM)
            .matricule(UPDATED_MATRICULE)
            .email(UPDATED_EMAIL)
            .prenom(UPDATED_PRENOM)
            .disponibiliteMax(UPDATED_DISPONIBILITE_MAX);

        restConsultantMockMvc.perform(put("/api/consultants")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedConsultant)))
            .andExpect(status().isOk());

        // Validate the Consultant in the database
        List<Consultant> consultantList = consultantRepository.findAll();
        assertThat(consultantList).hasSize(databaseSizeBeforeUpdate);
        Consultant testConsultant = consultantList.get(consultantList.size() - 1);
        assertThat(testConsultant.getNom()).isEqualTo(UPDATED_NOM);
        assertThat(testConsultant.getMatricule()).isEqualTo(UPDATED_MATRICULE);
        assertThat(testConsultant.getEmail()).isEqualTo(UPDATED_EMAIL);
        assertThat(testConsultant.getPrenom()).isEqualTo(UPDATED_PRENOM);
        assertThat(testConsultant.getDisponibiliteMax()).isEqualTo(UPDATED_DISPONIBILITE_MAX);
    }

    @Test
    @Transactional
    public void updateNonExistingConsultant() throws Exception {
        int databaseSizeBeforeUpdate = consultantRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restConsultantMockMvc.perform(put("/api/consultants")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(consultant)))
            .andExpect(status().isBadRequest());

        // Validate the Consultant in the database
        List<Consultant> consultantList = consultantRepository.findAll();
        assertThat(consultantList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteConsultant() throws Exception {
        // Initialize the database
        consultantRepository.saveAndFlush(consultant);

        int databaseSizeBeforeDelete = consultantRepository.findAll().size();

        // Delete the consultant
        restConsultantMockMvc.perform(delete("/api/consultants/{id}", consultant.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Consultant> consultantList = consultantRepository.findAll();
        assertThat(consultantList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
