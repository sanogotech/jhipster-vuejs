import { Component, Vue, Inject } from 'vue-property-decorator';

import { numeric, required, minLength, maxLength, minValue, maxValue } from 'vuelidate/lib/validators';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import parseISO from 'date-fns/parseISO';
import { DATE_TIME_LONG_FORMAT } from '@/shared/date/filters';

import DomaineMetierService from '../domaine-metier/domaine-metier.service';
import { IDomaineMetier } from '@/shared/model/domaine-metier.model';

import AlertService from '@/shared/alert/alert.service';
import { IProjet, Projet } from '@/shared/model/projet.model';
import ProjetService from './projet.service';

const validations: any = {
  projet: {
    nom: {
      required,
    },
    datedebut: {
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
export default class ProjetUpdate extends Vue {
  @Inject('alertService') private alertService: () => AlertService;
  @Inject('projetService') private projetService: () => ProjetService;
  public projet: IProjet = new Projet();

  @Inject('domaineMetierService') private domaineMetierService: () => DomaineMetierService;

  public domaineMetiers: IDomaineMetier[] = [];
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.projetId) {
        vm.retrieveProjet(to.params.projetId);
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
    if (this.projet.id) {
      this.projetService()
        .update(this.projet)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('jhipsterApp.projet.updated', { param: param.id });
          this.alertService().showAlert(message, 'info');
        });
    } else {
      this.projetService()
        .create(this.projet)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('jhipsterApp.projet.created', { param: param.id });
          this.alertService().showAlert(message, 'success');
        });
    }
  }

  public convertDateTimeFromServer(date: Date): string {
    if (date) {
      return format(date, DATE_TIME_LONG_FORMAT);
    }
    return null;
  }

  public updateInstantField(field, event) {
    if (event.target.value) {
      this.projet[field] = parse(event.target.value, DATE_TIME_LONG_FORMAT, new Date());
    } else {
      this.projet[field] = null;
    }
  }

  public updateZonedDateTimeField(field, event) {
    if (event.target.value) {
      this.projet[field] = parse(event.target.value, DATE_TIME_LONG_FORMAT, new Date());
    } else {
      this.projet[field] = null;
    }
  }

  public retrieveProjet(projetId): void {
    this.projetService()
      .find(projetId)
      .then(res => {
        res.datedebut = new Date(res.datedebut);
        this.projet = res;
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.domaineMetierService()
      .retrieve()
      .then(res => {
        this.domaineMetiers = res.data;
      });
  }
}
