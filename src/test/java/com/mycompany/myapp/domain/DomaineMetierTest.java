package com.mycompany.myapp.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.mycompany.myapp.web.rest.TestUtil;

public class DomaineMetierTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(DomaineMetier.class);
        DomaineMetier domaineMetier1 = new DomaineMetier();
        domaineMetier1.setId(1L);
        DomaineMetier domaineMetier2 = new DomaineMetier();
        domaineMetier2.setId(domaineMetier1.getId());
        assertThat(domaineMetier1).isEqualTo(domaineMetier2);
        domaineMetier2.setId(2L);
        assertThat(domaineMetier1).isNotEqualTo(domaineMetier2);
        domaineMetier1.setId(null);
        assertThat(domaineMetier1).isNotEqualTo(domaineMetier2);
    }
}
