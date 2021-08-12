import { Component, Vue, Inject } from 'vue-property-decorator';

import { IProjet } from '@/shared/model/projet.model';
import ProjetService from './projet.service';

@Component
export default class ProjetDetails extends Vue {
  @Inject('projetService') private projetService: () => ProjetService;
  public projet: IProjet = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.projetId) {
        vm.retrieveProjet(to.params.projetId);
      }
    });
  }

  public retrieveProjet(projetId) {
    this.projetService()
      .find(projetId)
      .then(res => {
        this.projet = res;
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
