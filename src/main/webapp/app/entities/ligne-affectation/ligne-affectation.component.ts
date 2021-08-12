import { mixins } from 'vue-class-component';

import { Component, Vue, Inject } from 'vue-property-decorator';
import Vue2Filters from 'vue2-filters';
import { ILigneAffectation } from '@/shared/model/ligne-affectation.model';
import AlertMixin from '@/shared/alert/alert.mixin';

import LigneAffectationService from './ligne-affectation.service';

@Component({
  mixins: [Vue2Filters.mixin],
})
export default class LigneAffectation extends mixins(AlertMixin) {
  @Inject('ligneAffectationService') private ligneAffectationService: () => LigneAffectationService;
  private removeId: number = null;

  public ligneAffectations: ILigneAffectation[] = [];

  public isFetching = false;

  public mounted(): void {
    this.retrieveAllLigneAffectations();
  }

  public clear(): void {
    this.retrieveAllLigneAffectations();
  }

  public retrieveAllLigneAffectations(): void {
    this.isFetching = true;

    this.ligneAffectationService()
      .retrieve()
      .then(
        res => {
          this.ligneAffectations = res.data;
          this.isFetching = false;
        },
        err => {
          this.isFetching = false;
        }
      );
  }

  public prepareRemove(instance: ILigneAffectation): void {
    this.removeId = instance.id;
    if (<any>this.$refs.removeEntity) {
      (<any>this.$refs.removeEntity).show();
    }
  }

  public removeLigneAffectation(): void {
    this.ligneAffectationService()
      .delete(this.removeId)
      .then(() => {
        const message = this.$t('jhipsterApp.ligneAffectation.deleted', { param: this.removeId });
        this.alertService().showAlert(message, 'danger');
        this.getAlertFromStore();
        this.removeId = null;
        this.retrieveAllLigneAffectations();
        this.closeDialog();
      });
  }

  public closeDialog(): void {
    (<any>this.$refs.removeEntity).hide();
  }
}
