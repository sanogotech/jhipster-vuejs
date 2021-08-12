import { mixins } from 'vue-class-component';

import { Component, Vue, Inject } from 'vue-property-decorator';
import Vue2Filters from 'vue2-filters';
import { IPrestataire } from '@/shared/model/prestataire.model';
import AlertMixin from '@/shared/alert/alert.mixin';

import PrestataireService from './prestataire.service';

@Component({
  mixins: [Vue2Filters.mixin],
})
export default class Prestataire extends mixins(AlertMixin) {
  @Inject('prestataireService') private prestataireService: () => PrestataireService;
  private removeId: number = null;

  public prestataires: IPrestataire[] = [];

  public isFetching = false;

  public mounted(): void {
    this.retrieveAllPrestataires();
  }

  public clear(): void {
    this.retrieveAllPrestataires();
  }

  public retrieveAllPrestataires(): void {
    this.isFetching = true;

    this.prestataireService()
      .retrieve()
      .then(
        res => {
          this.prestataires = res.data;
          this.isFetching = false;
        },
        err => {
          this.isFetching = false;
        }
      );
  }

  public prepareRemove(instance: IPrestataire): void {
    this.removeId = instance.id;
    if (<any>this.$refs.removeEntity) {
      (<any>this.$refs.removeEntity).show();
    }
  }

  public removePrestataire(): void {
    this.prestataireService()
      .delete(this.removeId)
      .then(() => {
        const message = this.$t('jhipsterApp.prestataire.deleted', { param: this.removeId });
        this.alertService().showAlert(message, 'danger');
        this.getAlertFromStore();
        this.removeId = null;
        this.retrieveAllPrestataires();
        this.closeDialog();
      });
  }

  public closeDialog(): void {
    (<any>this.$refs.removeEntity).hide();
  }
}
