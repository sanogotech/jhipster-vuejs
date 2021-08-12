import { mixins } from 'vue-class-component';

import { Component, Vue, Inject } from 'vue-property-decorator';
import Vue2Filters from 'vue2-filters';
import { IProjet } from '@/shared/model/projet.model';
import AlertMixin from '@/shared/alert/alert.mixin';

import JhiDataUtils from '@/shared/data/data-utils.service';

import ProjetService from './projet.service';

@Component({
  mixins: [Vue2Filters.mixin],
})
export default class Projet extends mixins(JhiDataUtils, AlertMixin) {
  @Inject('projetService') private projetService: () => ProjetService;
  private removeId: number = null;
  public itemsPerPage = 20;
  public queryCount: number = null;
  public page = 1;
  public previousPage = 1;
  public propOrder = 'id';
  public reverse = true;
  public totalItems = 0;
  public infiniteId = +new Date();
  public links = {};

  public projets: IProjet[] = [];

  public isFetching = false;

  public mounted(): void {
    this.retrieveAllProjets();
  }

  public clear(): void {
    this.page = 1;
    this.links = {};
    this.infiniteId += 1;
    this.projets = [];
    this.retrieveAllProjets();
  }

  public reset(): void {
    this.page = 1;
    this.infiniteId += 1;
    this.projets = [];
    this.retrieveAllProjets();
  }

  public retrieveAllProjets(): void {
    this.isFetching = true;

    const paginationQuery = {
      page: this.page - 1,
      size: this.itemsPerPage,
      sort: this.sort(),
    };
    this.projetService()
      .retrieve(paginationQuery)
      .then(
        res => {
          if (res.data && res.data.length > 0) {
            for (let i = 0; i < res.data.length; i++) {
              this.projets.push(res.data[i]);
            }
            if (res.headers && res.headers['link']) {
              this.links = this.parseLinks(res.headers['link']);
            }
          }
          this.totalItems = Number(res.headers['x-total-count']);
          this.queryCount = this.totalItems;
          this.isFetching = false;
          if (<any>this.$refs.infiniteLoading) {
            (<any>this.$refs.infiniteLoading).stateChanger.loaded();
            if (this.links !== {} && this.page > this.links['last']) {
              (<any>this.$refs.infiniteLoading).stateChanger.complete();
            }
          }
        },
        err => {
          this.isFetching = false;
        }
      );
  }

  public prepareRemove(instance: IProjet): void {
    this.removeId = instance.id;
    if (<any>this.$refs.removeEntity) {
      (<any>this.$refs.removeEntity).show();
    }
  }

  public removeProjet(): void {
    this.projetService()
      .delete(this.removeId)
      .then(() => {
        const message = this.$t('jhipsterApp.projet.deleted', { param: this.removeId });
        this.alertService().showAlert(message, 'danger');
        this.getAlertFromStore();
        this.removeId = null;
        this.reset();
        this.closeDialog();
      });
  }

  public loadMore($state): void {
    if (!this.isFetching) {
      this.page++;
      this.transition();
    }
  }

  public sort(): Array<any> {
    const result = [this.propOrder + ',' + (this.reverse ? 'asc' : 'desc')];
    if (this.propOrder !== 'id') {
      result.push('id');
    }
    return result;
  }

  public loadPage(page: number): void {
    if (page !== this.previousPage) {
      this.previousPage = page;
      this.transition();
    }
  }

  public transition(): void {
    this.retrieveAllProjets();
  }

  public changeOrder(propOrder): void {
    this.propOrder = propOrder;
    this.reverse = !this.reverse;
    this.reset();
  }

  public closeDialog(): void {
    (<any>this.$refs.removeEntity).hide();
  }
}
