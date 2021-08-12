/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import AlertService from '@/shared/alert/alert.service';
import * as config from '@/shared/config/config';
import DomaineMetierComponent from '@/entities/domaine-metier/domaine-metier.vue';
import DomaineMetierClass from '@/entities/domaine-metier/domaine-metier.component';
import DomaineMetierService from '@/entities/domaine-metier/domaine-metier.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('b-alert', {});
localVue.component('b-badge', {});
localVue.directive('b-modal', {});
localVue.component('b-button', {});
localVue.component('router-link', {});

const bModalStub = {
  render: () => {},
  methods: {
    hide: () => {},
    show: () => {},
  },
};

describe('Component Tests', () => {
  describe('DomaineMetier Management Component', () => {
    let wrapper: Wrapper<DomaineMetierClass>;
    let comp: DomaineMetierClass;
    let domaineMetierServiceStub: SinonStubbedInstance<DomaineMetierService>;

    beforeEach(() => {
      domaineMetierServiceStub = sinon.createStubInstance<DomaineMetierService>(DomaineMetierService);
      domaineMetierServiceStub.retrieve.resolves({ headers: {} });

      wrapper = shallowMount<DomaineMetierClass>(DomaineMetierComponent, {
        store,
        i18n,
        localVue,
        stubs: { bModal: bModalStub as any },
        provide: {
          alertService: () => new AlertService(store),
          domaineMetierService: () => domaineMetierServiceStub,
        },
      });
      comp = wrapper.vm;
    });

    it('Should call load all on init', async () => {
      // GIVEN
      domaineMetierServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });

      // WHEN
      comp.retrieveAllDomaineMetiers();
      await comp.$nextTick();

      // THEN
      expect(domaineMetierServiceStub.retrieve.called).toBeTruthy();
      expect(comp.domaineMetiers[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
    it('Should call delete service on confirmDelete', async () => {
      // GIVEN
      domaineMetierServiceStub.delete.resolves({});

      // WHEN
      comp.prepareRemove({ id: 123 });
      comp.removeDomaineMetier();
      await comp.$nextTick();

      // THEN
      expect(domaineMetierServiceStub.delete.called).toBeTruthy();
      expect(domaineMetierServiceStub.retrieve.callCount).toEqual(2);
    });
  });
});
