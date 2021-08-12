package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;

/**
 * A LigneAffectation.
 */
@Entity
@Table(name = "ligne_affectation")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class LigneAffectation implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "type_affectation", nullable = false)
    private String typeAffectation;

    @NotNull
    @Column(name = "nbjourhome", nullable = false)
    private Integer nbjourhome;

    @ManyToOne
    @JsonIgnoreProperties(value = "ligneAffectations", allowSetters = true)
    private Projet projet;

    @ManyToOne
    @JsonIgnoreProperties(value = "ligneAffectations", allowSetters = true)
    private Consultant consultant;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTypeAffectation() {
        return typeAffectation;
    }

    public LigneAffectation typeAffectation(String typeAffectation) {
        this.typeAffectation = typeAffectation;
        return this;
    }

    public void setTypeAffectation(String typeAffectation) {
        this.typeAffectation = typeAffectation;
    }

    public Integer getNbjourhome() {
        return nbjourhome;
    }

    public LigneAffectation nbjourhome(Integer nbjourhome) {
        this.nbjourhome = nbjourhome;
        return this;
    }

    public void setNbjourhome(Integer nbjourhome) {
        this.nbjourhome = nbjourhome;
    }

    public Projet getProjet() {
        return projet;
    }

    public LigneAffectation projet(Projet projet) {
        this.projet = projet;
        return this;
    }

    public void setProjet(Projet projet) {
        this.projet = projet;
    }

    public Consultant getConsultant() {
        return consultant;
    }

    public LigneAffectation consultant(Consultant consultant) {
        this.consultant = consultant;
        return this;
    }

    public void setConsultant(Consultant consultant) {
        this.consultant = consultant;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof LigneAffectation)) {
            return false;
        }
        return id != null && id.equals(((LigneAffectation) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "LigneAffectation{" +
            "id=" + getId() +
            ", typeAffectation='" + getTypeAffectation() + "'" +
            ", nbjourhome=" + getNbjourhome() +
            "}";
    }
}
