import { Component, Vue, Inject } from 'vue-property-decorator';

import { numeric, required, minLength, maxLength, minValue, maxValue } from 'vuelidate/lib/validators';

import PrestataireService from '../prestataire/prestataire.service';
import { IPrestataire } from '@/shared/model/prestataire.model';

import AlertService from '@/shared/alert/alert.service';
import { IConsultant, Consultant } from '@/shared/model/consultant.model';
import ConsultantService from './consultant.service';

const validations: any = {
  consultant: {
    nom: {
      required,
      minLength: minLength(2),
    },
    matricule: {
      required,
    },
    email: {
      required,
    },
    prenom: {
      required,
      minLength: minLength(2),
    },
    disponibiliteMax: {
      required,
      numeric,
    },
  },
};

@Component({
  validations,
})
export default class ConsultantUpdate extends Vue {
  @Inject('alertService') private alertService: () => AlertService;
  @Inject('consultantService') private consultantService: () => ConsultantService;
  public consultant: IConsultant = new Consultant();

  @Inject('prestataireService') private prestataireService: () => PrestataireService;

  public prestataires: IPrestataire[] = [];
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.consultantId) {
        vm.retrieveConsultant(to.params.consultantId);
      }
      vm.initRelationships();
    });
  }

  created(): void {
    this.currentLanguage = this.$store.getters.currentLanguage;
    this.$store.watch(
      () => this.$store.getters.currentLanguage,
      () => {
        this.currentLanguage = this.$store.getters.currentLanguage;
      }
    );
  }

  public save(): void {
    this.isSaving = true;
    if (this.consultant.id) {
      this.consultantService()
        .update(this.consultant)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('jhipsterApp.consultant.updated', { param: param.id });
          this.alertService().showAlert(message, 'info');
        });
    } else {
      this.consultantService()
        .create(this.consultant)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('jhipsterApp.consultant.created', { param: param.id });
          this.alertService().showAlert(message, 'success');
        });
    }
  }

  public retrieveConsultant(consultantId): void {
    this.consultantService()
      .find(consultantId)
      .then(res => {
        this.consultant = res;
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.prestataireService()
      .retrieve()
      .then(res => {
        this.prestataires = res.data;
      });
  }
}
