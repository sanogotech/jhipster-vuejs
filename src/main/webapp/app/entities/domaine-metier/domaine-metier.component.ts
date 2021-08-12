import { mixins } from 'vue-class-component';

import { Component, Vue, Inject } from 'vue-property-decorator';
import Vue2Filters from 'vue2-filters';
import { IDomaineMetier } from '@/shared/model/domaine-metier.model';
import AlertMixin from '@/shared/alert/alert.mixin';

import DomaineMetierService from './domaine-metier.service';

@Component({
  mixins: [Vue2Filters.mixin],
})
export default class DomaineMetier extends mixins(AlertMixin) {
  @Inject('domaineMetierService') private domaineMetierService: () => DomaineMetierService;
  private removeId: number = null;

  public domaineMetiers: IDomaineMetier[] = [];

  public isFetching = false;

  public mounted(): void {
    this.retrieveAllDomaineMetiers();
  }

  public clear(): void {
    this.retrieveAllDomaineMetiers();
  }

  public retrieveAllDomaineMetiers(): void {
    this.isFetching = true;

    this.domaineMetierService()
      .retrieve()
      .then(
        res => {
          this.domaineMetiers = res.data;
          this.isFetching = false;
        },
        err => {
          this.isFetching = false;
        }
      );
  }

  public prepareRemove(instance: IDomaineMetier): void {
    this.removeId = instance.id;
    if (<any>this.$refs.removeEntity) {
      (<any>this.$refs.removeEntity).show();
    }
  }

  public removeDomaineMetier(): void {
    this.domaineMetierService()
      .delete(this.removeId)
      .then(() => {
        const message = this.$t('jhipsterApp.domaineMetier.deleted', { param: this.removeId });
        this.alertService().showAlert(message, 'danger');
        this.getAlertFromStore();
        this.removeId = null;
        this.retrieveAllDomaineMetiers();
        this.closeDialog();
      });
  }

  public closeDialog(): void {
    (<any>this.$refs.removeEntity).hide();
  }
}
