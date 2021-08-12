import { Component, Vue, Inject } from 'vue-property-decorator';

import { numeric, required, minLength, maxLength, minValue, maxValue } from 'vuelidate/lib/validators';

import AlertService from '@/shared/alert/alert.service';
import { IPrestataire, Prestataire } from '@/shared/model/prestataire.model';
import PrestataireService from './prestataire.service';

const validations: any = {
  prestataire: {
    nom: {
      required,
      minLength: minLength(3),
    },
    commune: {
      required,
      minLength: minLength(2),
    },
  },
};

@Component({
  validations,
})
export default class PrestataireUpdate extends Vue {
  @Inject('alertService') private alertService: () => AlertService;
  @Inject('prestataireService') private prestataireService: () => PrestataireService;
  public prestataire: IPrestataire = new Prestataire();
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.prestataireId) {
        vm.retrievePrestataire(to.params.prestataireId);
      }
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
    if (this.prestataire.id) {
      this.prestataireService()
        .update(this.prestataire)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('jhipsterApp.prestataire.updated', { param: param.id });
          this.alertService().showAlert(message, 'info');
        });
    } else {
      this.prestataireService()
        .create(this.prestataire)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('jhipsterApp.prestataire.created', { param: param.id });
          this.alertService().showAlert(message, 'success');
        });
    }
  }

  public retrievePrestataire(prestataireId): void {
    this.prestataireService()
      .find(prestataireId)
      .then(res => {
        this.prestataire = res;
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {}
}
