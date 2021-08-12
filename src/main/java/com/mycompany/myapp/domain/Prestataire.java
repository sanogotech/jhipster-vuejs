package com.mycompany.myapp.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;

/**
 * A Prestataire.
 */
@Entity
@Table(name = "prestataire")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Prestataire implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Size(min = 3)
    @Column(name = "nom", nullable = false)
    private String nom;

    @NotNull
    @Size(min = 2)
    @Column(name = "commune", nullable = false)
    private String commune;

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

    public Prestataire nom(String nom) {
        this.nom = nom;
        return this;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getCommune() {
        return commune;
    }

    public Prestataire commune(String commune) {
        this.commune = commune;
        return this;
    }

    public void setCommune(String commune) {
        this.commune = commune;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Prestataire)) {
            return false;
        }
        return id != null && id.equals(((Prestataire) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Prestataire{" +
            "id=" + getId() +
            ", nom='" + getNom() + "'" +
            ", commune='" + getCommune() + "'" +
            "}";
    }
}
