import { Component, Vue, Inject } from 'vue-property-decorator';

import { IEntreprise } from '@/shared/model/entreprise.model';
import EntrepriseService from './entreprise.service';

@Component
export default class EntrepriseDetails extends Vue {
  @Inject('entrepriseService') private entrepriseService: () => EntrepriseService;
  public entreprise: IEntreprise = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.entrepriseId) {
        vm.retrieveEntreprise(to.params.entrepriseId);
      }
    });
  }

  public retrieveEntreprise(entrepriseId) {
    this.entrepriseService()
      .find(entrepriseId)
      .then(res => {
        this.entreprise = res;
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
