package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.Instant;

/**
 * A Projet.
 */
@Entity
@Table(name = "projet")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Projet implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "nom", nullable = false)
    private String nom;

    @NotNull
    @Column(name = "datedebut", nullable = false)
    private Instant datedebut;

    @NotNull
    @Column(name = "nbjourhome", nullable = false)
    private Integer nbjourhome;

    @ManyToOne
    @JsonIgnoreProperties(value = "projets", allowSetters = true)
    private DomaineMetier domaineMetier;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNom() {
        return nom;
    }

    public Projet nom(String nom) {
        this.nom = nom;
        return this;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public Instant getDatedebut() {
        return datedebut;
    }

    public Projet datedebut(Instant datedebut) {
        this.datedebut = datedebut;
        return this;
    }

    public void setDatedebut(Instant datedebut) {
        this.datedebut = datedebut;
    }

    public Integer getNbjourhome() {
        return nbjourhome;
    }

    public Projet nbjourhome(Integer nbjourhome) {
        this.nbjourhome = nbjourhome;
        return this;
    }

    public void setNbjourhome(Integer nbjourhome) {
        this.nbjourhome = nbjourhome;
    }

    public DomaineMetier getDomaineMetier() {
        return domaineMetier;
    }

    public Projet domaineMetier(DomaineMetier domaineMetier) {
        this.domaineMetier = domaineMetier;
        return this;
    }

    public void setDomaineMetier(DomaineMetier domaineMetier) {
        this.domaineMetier = domaineMetier;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Projet)) {
            return false;
        }
        return id != null && id.equals(((Projet) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Projet{" +
            "id=" + getId() +
            ", nom='" + getNom() + "'" +
            ", datedebut='" + getDatedebut() + "'" +
            ", nbjourhome=" + getNbjourhome() +
            "}";
    }
}
