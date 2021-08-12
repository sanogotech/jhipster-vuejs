package com.mycompany.myapp.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.mycompany.myapp.web.rest.TestUtil;

public class ConsultantTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Consultant.class);
        Consultant consultant1 = new Consultant();
        consultant1.setId(1L);
        Consultant consultant2 = new Consultant();
        consultant2.setId(consultant1.getId());
        assertThat(consultant1).isEqualTo(consultant2);
        consultant2.setId(2L);
        assertThat(consultant1).isNotEqualTo(consultant2);
        consultant1.setId(null);
        assertThat(consultant1).isNotEqualTo(consultant2);
    }
}
