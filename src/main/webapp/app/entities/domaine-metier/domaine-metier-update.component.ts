import { Component, Vue, Inject } from 'vue-property-decorator';

import { numeric, required, minLength, maxLength, minValue, maxValue } from 'vuelidate/lib/validators';

import EntrepriseService from '../entreprise/entreprise.service';
import { IEntreprise } from '@/shared/model/entreprise.model';

import AlertService from '@/shared/alert/alert.service';
import { IDomaineMetier, DomaineMetier } from '@/shared/model/domaine-metier.model';
import DomaineMetierService from './domaine-metier.service';

const validations: any = {
  domaineMetier: {
    nom: {
      required,
    },
  },
};

@Component({
  validations,
})
export default class DomaineMetierUpdate extends Vue {
  @Inject('alertService') private alertService: () => AlertService;
  @Inject('domaineMetierService') private domaineMetierService: () => DomaineMetierService;
  public domaineMetier: IDomaineMetier = new DomaineMetier();

  @Inject('entrepriseService') private entrepriseService: () => EntrepriseService;

  public entreprises: IEntreprise[] = [];
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.domaineMetierId) {
        vm.retrieveDomaineMetier(to.params.domaineMetierId);
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
    if (this.domaineMetier.id) {
      this.domaineMetierService()
        .update(this.domaineMetier)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('jhipsterApp.domaineMetier.updated', { param: param.id });
          this.alertService().showAlert(message, 'info');
        });
    } else {
      this.domaineMetierService()
        .create(this.domaineMetier)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('jhipsterApp.domaineMetier.created', { param: param.id });
          this.alertService().showAlert(message, 'success');
        });
    }
  }

  public retrieveDomaineMetier(domaineMetierId): void {
    this.domaineMetierService()
      .find(domaineMetierId)
      .then(res => {
        this.domaineMetier = res;
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.entrepriseService()
      .retrieve()
      .then(res => {
        this.entreprises = res.data;
      });
  }
}
