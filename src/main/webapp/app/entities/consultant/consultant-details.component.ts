import { Component, Vue, Inject } from 'vue-property-decorator';

import { IConsultant } from '@/shared/model/consultant.model';
import ConsultantService from './consultant.service';

@Component
export default class ConsultantDetails extends Vue {
  @Inject('consultantService') private consultantService: () => ConsultantService;
  public consultant: IConsultant = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.consultantId) {
        vm.retrieveConsultant(to.params.consultantId);
      }
    });
  }

  public retrieveConsultant(consultantId) {
    this.consultantService()
      .find(consultantId)
      .then(res => {
        this.consultant = res;
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
