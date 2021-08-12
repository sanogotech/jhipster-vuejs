package com.mycompany.myapp.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.mycompany.myapp.web.rest.TestUtil;

public class LigneAffectationTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(LigneAffectation.class);
        LigneAffectation ligneAffectation1 = new LigneAffectation();
        ligneAffectation1.setId(1L);
        LigneAffectation ligneAffectation2 = new LigneAffectation();
        ligneAffectation2.setId(ligneAffectation1.getId());
        assertThat(ligneAffectation1).isEqualTo(ligneAffectation2);
        ligneAffectation2.setId(2L);
        assertThat(ligneAffectation1).isNotEqualTo(ligneAffectation2);
        ligneAffectation1.setId(null);
        assertThat(ligneAffectation1).isNotEqualTo(ligneAffectation2);
    }
}
