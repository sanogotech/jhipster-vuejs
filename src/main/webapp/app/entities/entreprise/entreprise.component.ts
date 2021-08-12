import { mixins } from 'vue-class-component';

import { Component, Vue, Inject } from 'vue-property-decorator';
import Vue2Filters from 'vue2-filters';
import { IEntreprise } from '@/shared/model/entreprise.model';
import AlertMixin from '@/shared/alert/alert.mixin';

import EntrepriseService from './entreprise.service';

@Component({
  mixins: [Vue2Filters.mixin],
})
export default class Entreprise extends mixins(AlertMixin) {
  @Inject('entrepriseService') private entrepriseService: () => EntrepriseService;
  private removeId: number = null;

  public entreprises: IEntreprise[] = [];

  public isFetching = false;

  public mounted(): void {
    this.retrieveAllEntreprises();
  }

  public clear(): void {
    this.retrieveAllEntreprises();
  }

  public retrieveAllEntreprises(): void {
    this.isFetching = true;

    this.entrepriseService()
      .retrieve()
      .then(
        res => {
          this.entreprises = res.data;
          this.isFetching = false;
        },
        err => {
          this.isFetching = false;
        }
      );
  }

  public prepareRemove(instance: IEntreprise): void {
    this.removeId = instance.id;
    if (<any>this.$refs.removeEntity) {
      (<any>this.$refs.removeEntity).show();
    }
  }

  public removeEntreprise(): void {
    this.entrepriseService()
      .delete(this.removeId)
      .then(() => {
        const message = this.$t('jhipsterApp.entreprise.deleted', { param: this.removeId });
        this.alertService().showAlert(message, 'danger');
        this.getAlertFromStore();
        this.removeId = null;
        this.retrieveAllEntreprises();
        this.closeDialog();
      });
  }

  public closeDialog(): void {
    (<any>this.$refs.removeEntity).hide();
  }
}
