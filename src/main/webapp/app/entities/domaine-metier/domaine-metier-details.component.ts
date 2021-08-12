import { Component, Vue, Inject } from 'vue-property-decorator';

import { IDomaineMetier } from '@/shared/model/domaine-metier.model';
import DomaineMetierService from './domaine-metier.service';

@Component
export default class DomaineMetierDetails extends Vue {
  @Inject('domaineMetierService') private domaineMetierService: () => DomaineMetierService;
  public domaineMetier: IDomaineMetier = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.domaineMetierId) {
        vm.retrieveDomaineMetier(to.params.domaineMetierId);
      }
    });
  }

  public retrieveDomaineMetier(domaineMetierId) {
    this.domaineMetierService()
      .find(domaineMetierId)
      .then(res => {
        this.domaineMetier = res;
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
