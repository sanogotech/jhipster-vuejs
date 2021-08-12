/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import AlertService from '@/shared/alert/alert.service';
import * as config from '@/shared/config/config';
import EntrepriseComponent from '@/entities/entreprise/entreprise.vue';
import EntrepriseClass from '@/entities/entreprise/entreprise.component';
import EntrepriseService from '@/entities/entreprise/entreprise.service';

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
  describe('Entreprise Management Component', () => {
    let wrapper: Wrapper<EntrepriseClass>;
    let comp: EntrepriseClass;
    let entrepriseServiceStub: SinonStubbedInstance<EntrepriseService>;

    beforeEach(() => {
      entrepriseServiceStub = sinon.createStubInstance<EntrepriseService>(EntrepriseService);
      entrepriseServiceStub.retrieve.resolves({ headers: {} });

      wrapper = shallowMount<EntrepriseClass>(EntrepriseComponent, {
        store,
        i18n,
        localVue,
        stubs: { bModal: bModalStub as any },
        provide: {
          alertService: () => new AlertService(store),
          entrepriseService: () => entrepriseServiceStub,
        },
      });
      comp = wrapper.vm;
    });

    it('Should call load all on init', async () => {
      // GIVEN
      entrepriseServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });

      // WHEN
      comp.retrieveAllEntreprises();
      await comp.$nextTick();

      // THEN
      expect(entrepriseServiceStub.retrieve.called).toBeTruthy();
      expect(comp.entreprises[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
    it('Should call delete service on confirmDelete', async () => {
      // GIVEN
      entrepriseServiceStub.delete.resolves({});

      // WHEN
      comp.prepareRemove({ id: 123 });
      comp.removeEntreprise();
      await comp.$nextTick();

      // THEN
      expect(entrepriseServiceStub.delete.called).toBeTruthy();
      expect(entrepriseServiceStub.retrieve.callCount).toEqual(2);
    });
  });
});
