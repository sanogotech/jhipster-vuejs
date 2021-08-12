import { Component, Vue, Inject } from 'vue-property-decorator';

import { IPrestataire } from '@/shared/model/prestataire.model';
import PrestataireService from './prestataire.service';

@Component
export default class PrestataireDetails extends Vue {
  @Inject('prestataireService') private prestataireService: () => PrestataireService;
  public prestataire: IPrestataire = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.prestataireId) {
        vm.retrievePrestataire(to.params.prestataireId);
      }
    });
  }

  public retrievePrestataire(prestataireId) {
    this.prestataireService()
      .find(prestataireId)
      .then(res => {
        this.prestataire = res;
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
