import { Component, Vue, Inject } from 'vue-property-decorator';

import { numeric, required, minLength, maxLength, minValue, maxValue } from 'vuelidate/lib/validators';

import AlertService from '@/shared/alert/alert.service';
import { IEntreprise, Entreprise } from '@/shared/model/entreprise.model';
import EntrepriseService from './entreprise.service';

const validations: any = {
  entreprise: {
    nom: {
      required,
    },
    secteur: {
      required,
    },
  },
};

@Component({
  validations,
})
export default class EntrepriseUpdate extends Vue {
  @Inject('alertService') private alertService: () => AlertService;
  @Inject('entrepriseService') private entrepriseService: () => EntrepriseService;
  public entreprise: IEntreprise = new Entreprise();
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.entrepriseId) {
        vm.retrieveEntreprise(to.params.entrepriseId);
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
    if (this.entreprise.id) {
      this.entrepriseService()
        .update(this.entreprise)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('jhipsterApp.entreprise.updated', { param: param.id });
          this.alertService().showAlert(message, 'info');
        });
    } else {
      this.entrepriseService()
        .create(this.entreprise)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('jhipsterApp.entreprise.created', { param: param.id });
          this.alertService().showAlert(message, 'success');
        });
    }
  }

  public retrieveEntreprise(entrepriseId): void {
    this.entrepriseService()
      .find(entrepriseId)
      .then(res => {
        this.entreprise = res;
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {}
}
