package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.JhipsterApp;
import com.mycompany.myapp.domain.Entreprise;
import com.mycompany.myapp.repository.EntrepriseRepository;

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

import com.mycompany.myapp.domain.enumeration.Secteur;
/**
 * Integration tests for the {@link EntrepriseResource} REST controller.
 */
@SpringBootTest(classes = JhipsterApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class EntrepriseResourceIT {

    private static final String DEFAULT_NOM = "AAAAAAAAAA";
    private static final String UPDATED_NOM = "BBBBBBBBBB";

    private static final Secteur DEFAULT_SECTEUR = Secteur.ELECTRICITE;
    private static final Secteur UPDATED_SECTEUR = Secteur.EAU;

    @Autowired
    private EntrepriseRepository entrepriseRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restEntrepriseMockMvc;

    private Entreprise entreprise;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Entreprise createEntity(EntityManager em) {
        Entreprise entreprise = new Entreprise()
            .nom(DEFAULT_NOM)
            .secteur(DEFAULT_SECTEUR);
        return entreprise;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Entreprise createUpdatedEntity(EntityManager em) {
        Entreprise entreprise = new Entreprise()
            .nom(UPDATED_NOM)
            .secteur(UPDATED_SECTEUR);
        return entreprise;
    }

    @BeforeEach
    public void initTest() {
        entreprise = createEntity(em);
    }

    @Test
    @Transactional
    public void createEntreprise() throws Exception {
        int databaseSizeBeforeCreate = entrepriseRepository.findAll().size();
        // Create the Entreprise
        restEntrepriseMockMvc.perform(post("/api/entreprises")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(entreprise)))
            .andExpect(status().isCreated());

        // Validate the Entreprise in the database
        List<Entreprise> entrepriseList = entrepriseRepository.findAll();
        assertThat(entrepriseList).hasSize(databaseSizeBeforeCreate + 1);
        Entreprise testEntreprise = entrepriseList.get(entrepriseList.size() - 1);
        assertThat(testEntreprise.getNom()).isEqualTo(DEFAULT_NOM);
        assertThat(testEntreprise.getSecteur()).isEqualTo(DEFAULT_SECTEUR);
    }

    @Test
    @Transactional
    public void createEntrepriseWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = entrepriseRepository.findAll().size();

        // Create the Entreprise with an existing ID
        entreprise.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restEntrepriseMockMvc.perform(post("/api/entreprises")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(entreprise)))
            .andExpect(status().isBadRequest());

        // Validate the Entreprise in the database
        List<Entreprise> entrepriseList = entrepriseRepository.findAll();
        assertThat(entrepriseList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkNomIsRequired() throws Exception {
        int databaseSizeBeforeTest = entrepriseRepository.findAll().size();
        // set the field null
        entreprise.setNom(null);

        // Create the Entreprise, which fails.


        restEntrepriseMockMvc.perform(post("/api/entreprises")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(entreprise)))
            .andExpect(status().isBadRequest());

        List<Entreprise> entrepriseList = entrepriseRepository.findAll();
        assertThat(entrepriseList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkSecteurIsRequired() throws Exception {
        int databaseSizeBeforeTest = entrepriseRepository.findAll().size();
        // set the field null
        entreprise.setSecteur(null);

        // Create the Entreprise, which fails.


        restEntrepriseMockMvc.perform(post("/api/entreprises")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(entreprise)))
            .andExpect(status().isBadRequest());

        List<Entreprise> entrepriseList = entrepriseRepository.findAll();
        assertThat(entrepriseList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllEntreprises() throws Exception {
        // Initialize the database
        entrepriseRepository.saveAndFlush(entreprise);

        // Get all the entrepriseList
        restEntrepriseMockMvc.perform(get("/api/entreprises?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(entreprise.getId().intValue())))
            .andExpect(jsonPath("$.[*].nom").value(hasItem(DEFAULT_NOM)))
            .andExpect(jsonPath("$.[*].secteur").value(hasItem(DEFAULT_SECTEUR.toString())));
    }
    
    @Test
    @Transactional
    public void getEntreprise() throws Exception {
        // Initialize the database
        entrepriseRepository.saveAndFlush(entreprise);

        // Get the entreprise
        restEntrepriseMockMvc.perform(get("/api/entreprises/{id}", entreprise.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(entreprise.getId().intValue()))
            .andExpect(jsonPath("$.nom").value(DEFAULT_NOM))
            .andExpect(jsonPath("$.secteur").value(DEFAULT_SECTEUR.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingEntreprise() throws Exception {
        // Get the entreprise
        restEntrepriseMockMvc.perform(get("/api/entreprises/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateEntreprise() throws Exception {
        // Initialize the database
        entrepriseRepository.saveAndFlush(entreprise);

        int databaseSizeBeforeUpdate = entrepriseRepository.findAll().size();

        // Update the entreprise
        Entreprise updatedEntreprise = entrepriseRepository.findById(entreprise.getId()).get();
        // Disconnect from session so that the updates on updatedEntreprise are not directly saved in db
        em.detach(updatedEntreprise);
        updatedEntreprise
            .nom(UPDATED_NOM)
            .secteur(UPDATED_SECTEUR);

        restEntrepriseMockMvc.perform(put("/api/entreprises")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedEntreprise)))
            .andExpect(status().isOk());

        // Validate the Entreprise in the database
        List<Entreprise> entrepriseList = entrepriseRepository.findAll();
        assertThat(entrepriseList).hasSize(databaseSizeBeforeUpdate);
        Entreprise testEntreprise = entrepriseList.get(entrepriseList.size() - 1);
        assertThat(testEntreprise.getNom()).isEqualTo(UPDATED_NOM);
        assertThat(testEntreprise.getSecteur()).isEqualTo(UPDATED_SECTEUR);
    }

    @Test
    @Transactional
    public void updateNonExistingEntreprise() throws Exception {
        int databaseSizeBeforeUpdate = entrepriseRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restEntrepriseMockMvc.perform(put("/api/entreprises")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(entreprise)))
            .andExpect(status().isBadRequest());

        // Validate the Entreprise in the database
        List<Entreprise> entrepriseList = entrepriseRepository.findAll();
        assertThat(entrepriseList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteEntreprise() throws Exception {
        // Initialize the database
        entrepriseRepository.saveAndFlush(entreprise);

        int databaseSizeBeforeDelete = entrepriseRepository.findAll().size();

        // Delete the entreprise
        restEntrepriseMockMvc.perform(delete("/api/entreprises/{id}", entreprise.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Entreprise> entrepriseList = entrepriseRepository.findAll();
        assertThat(entrepriseList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
