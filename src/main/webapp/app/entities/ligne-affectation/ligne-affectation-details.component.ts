import { Component, Vue, Inject } from 'vue-property-decorator';

import { ILigneAffectation } from '@/shared/model/ligne-affectation.model';
import LigneAffectationService from './ligne-affectation.service';

@Component
export default class LigneAffectationDetails extends Vue {
  @Inject('ligneAffectationService') private ligneAffectationService: () => LigneAffectationService;
  public ligneAffectation: ILigneAffectation = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.ligneAffectationId) {
        vm.retrieveLigneAffectation(to.params.ligneAffectationId);
      }
    });
  }

  public retrieveLigneAffectation(ligneAffectationId) {
    this.ligneAffectationService()
      .find(ligneAffectationId)
      .then(res => {
        this.ligneAffectation = res;
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
