/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import AlertService from '@/shared/alert/alert.service';
import * as config from '@/shared/config/config';
import ConsultantComponent from '@/entities/consultant/consultant.vue';
import ConsultantClass from '@/entities/consultant/consultant.component';
import ConsultantService from '@/entities/consultant/consultant.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('b-alert', {});
localVue.component('b-badge', {});
localVue.component('jhi-sort-indicator', {});
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
  describe('Consultant Management Component', () => {
    let wrapper: Wrapper<ConsultantClass>;
    let comp: ConsultantClass;
    let consultantServiceStub: SinonStubbedInstance<ConsultantService>;

    beforeEach(() => {
      consultantServiceStub = sinon.createStubInstance<ConsultantService>(ConsultantService);
      consultantServiceStub.retrieve.resolves({ headers: {} });

      wrapper = shallowMount<ConsultantClass>(ConsultantComponent, {
        store,
        i18n,
        localVue,
        stubs: { jhiItemCount: true, bPagination: true, bModal: bModalStub as any },
        provide: {
          alertService: () => new AlertService(store),
          consultantService: () => consultantServiceStub,
        },
      });
      comp = wrapper.vm;
    });

    it('Should call load all on init', async () => {
      // GIVEN
      consultantServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });

      // WHEN
      comp.retrieveAllConsultants();
      await comp.$nextTick();

      // THEN
      expect(consultantServiceStub.retrieve.called).toBeTruthy();
      expect(comp.consultants[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });

    it('should load a page', async () => {
      // GIVEN
      consultantServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });
      comp.previousPage = 1;

      // WHEN
      comp.loadPage(2);
      await comp.$nextTick();

      // THEN
      expect(consultantServiceStub.retrieve.called).toBeTruthy();
      expect(comp.consultants[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });

    it('should re-initialize the page', async () => {
      // GIVEN
      consultantServiceStub.retrieve.reset();
      consultantServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });

      // WHEN
      comp.loadPage(2);
      await comp.$nextTick();
      comp.clear();
      await comp.$nextTick();

      // THEN
      expect(consultantServiceStub.retrieve.callCount).toEqual(2);
      expect(comp.page).toEqual(1);
      expect(comp.consultants[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });

    it('should calculate the sort attribute for an id', () => {
      // WHEN
      const result = comp.sort();

      // THEN
      expect(result).toEqual(['id,asc']);
    });

    it('should calculate the sort attribute for a non-id attribute', () => {
      // GIVEN
      comp.propOrder = 'name';

      // WHEN
      const result = comp.sort();

      // THEN
      expect(result).toEqual(['name,asc', 'id']);
    });
    it('Should call delete service on confirmDelete', async () => {
      // GIVEN
      consultantServiceStub.delete.resolves({});

      // WHEN
      comp.prepareRemove({ id: 123 });
      comp.removeConsultant();
      await comp.$nextTick();

      // THEN
      expect(consultantServiceStub.delete.called).toBeTruthy();
      expect(consultantServiceStub.retrieve.callCount).toEqual(2);
    });
  });
});
