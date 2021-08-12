import { Component, Vue, Inject } from 'vue-property-decorator';

import { numeric, required, minLength, maxLength, minValue, maxValue } from 'vuelidate/lib/validators';

import ProjetService from '../projet/projet.service';
import { IProjet } from '@/shared/model/projet.model';

import ConsultantService from '../consultant/consultant.service';
import { IConsultant } from '@/shared/model/consultant.model';

import AlertService from '@/shared/alert/alert.service';
import { ILigneAffectation, LigneAffectation } from '@/shared/model/ligne-affectation.model';
import LigneAffectationService from './ligne-affectation.service';

const validations: any = {
  ligneAffectation: {
    typeAffectation: {
      required,
    },
    nbjourhome: {
      required,
      numeric,
    },
  },
};

@Component({
  validations,
})
export default class LigneAffectationUpdate extends Vue {
  @Inject('alertService') private alertService: () => AlertService;
  @Inject('ligneAffectationService') private ligneAffectationService: () => LigneAffectationService;
  public ligneAffectation: ILigneAffectation = new LigneAffectation();

  @Inject('projetService') private projetService: () => ProjetService;

  public projets: IProjet[] = [];

  @Inject('consultantService') private consultantService: () => ConsultantService;

  public consultants: IConsultant[] = [];
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.ligneAffectationId) {
        vm.retrieveLigneAffectation(to.params.ligneAffectationId);
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
    if (this.ligneAffectation.id) {
      this.ligneAffectationService()
        .update(this.ligneAffectation)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('jhipsterApp.ligneAffectation.updated', { param: param.id });
          this.alertService().showAlert(message, 'info');
        });
    } else {
      this.ligneAffectationService()
        .create(this.ligneAffectation)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('jhipsterApp.ligneAffectation.created', { param: param.id });
          this.alertService().showAlert(message, 'success');
        });
    }
  }

  public retrieveLigneAffectation(ligneAffectationId): void {
    this.ligneAffectationService()
      .find(ligneAffectationId)
      .then(res => {
        this.ligneAffectation = res;
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.projetService()
      .retrieve()
      .then(res => {
        this.projets = res.data;
      });
    this.consultantService()
      .retrieve()
      .then(res => {
        this.consultants = res.data;
      });
  }
}
