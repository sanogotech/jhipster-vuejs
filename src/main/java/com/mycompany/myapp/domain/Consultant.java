package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;

/**
 * A Consultant.
 */
@Entity
@Table(name = "consultant")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Consultant implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Size(min = 2)
    @Column(name = "nom", nullable = false)
    private String nom;

    @NotNull
    @Column(name = "matricule", nullable = false)
    private String matricule;

    @NotNull
    @Column(name = "email", nullable = false)
    private String email;

    @NotNull
    @Size(min = 2)
    @Column(name = "prenom", nullable = false)
    private String prenom;

    @NotNull
    @Column(name = "disponibilite_max", nullable = false)
    private Integer disponibiliteMax;

    @ManyToOne
    @JsonIgnoreProperties(value = "consultants", allowSetters = true)
    private Prestataire prestataire;

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

    public Consultant nom(String nom) {
        this.nom = nom;
        return this;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getMatricule() {
        return matricule;
    }

    public Consultant matricule(String matricule) {
        this.matricule = matricule;
        return this;
    }

    public void setMatricule(String matricule) {
        this.matricule = matricule;
    }

    public String getEmail() {
        return email;
    }

    public Consultant email(String email) {
        this.email = email;
        return this;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPrenom() {
        return prenom;
    }

    public Consultant prenom(String prenom) {
        this.prenom = prenom;
        return this;
    }

    public void setPrenom(String prenom) {
        this.prenom = prenom;
    }

    public Integer getDisponibiliteMax() {
        return disponibiliteMax;
    }

    public Consultant disponibiliteMax(Integer disponibiliteMax) {
        this.disponibiliteMax = disponibiliteMax;
        return this;
    }

    public void setDisponibiliteMax(Integer disponibiliteMax) {
        this.disponibiliteMax = disponibiliteMax;
    }

    public Prestataire getPrestataire() {
        return prestataire;
    }

    public Consultant prestataire(Prestataire prestataire) {
        this.prestataire = prestataire;
        return this;
    }

    public void setPrestataire(Prestataire prestataire) {
        this.prestataire = prestataire;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Consultant)) {
            return false;
        }
        return id != null && id.equals(((Consultant) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Consultant{" +
            "id=" + getId() +
            ", nom='" + getNom() + "'" +
            ", matricule='" + getMatricule() + "'" +
            ", email='" + getEmail() + "'" +
            ", prenom='" + getPrenom() + "'" +
            ", disponibiliteMax=" + getDisponibiliteMax() +
            "}";
    }
}
