/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import AlertService from '@/shared/alert/alert.service';
import * as config from '@/shared/config/config';
import LigneAffectationComponent from '@/entities/ligne-affectation/ligne-affectation.vue';
import LigneAffectationClass from '@/entities/ligne-affectation/ligne-affectation.component';
import LigneAffectationService from '@/entities/ligne-affectation/ligne-affectation.service';

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
  describe('LigneAffectation Management Component', () => {
    let wrapper: Wrapper<LigneAffectationClass>;
    let comp: LigneAffectationClass;
    let ligneAffectationServiceStub: SinonStubbedInstance<LigneAffectationService>;

    beforeEach(() => {
      ligneAffectationServiceStub = sinon.createStubInstance<LigneAffectationService>(LigneAffectationService);
      ligneAffectationServiceStub.retrieve.resolves({ headers: {} });

      wrapper = shallowMount<LigneAffectationClass>(LigneAffectationComponent, {
        store,
        i18n,
        localVue,
        stubs: { bModal: bModalStub as any },
        provide: {
          alertService: () => new AlertService(store),
          ligneAffectationService: () => ligneAffectationServiceStub,
        },
      });
      comp = wrapper.vm;
    });

    it('Should call load all on init', async () => {
      // GIVEN
      ligneAffectationServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });

      // WHEN
      comp.retrieveAllLigneAffectations();
      await comp.$nextTick();

      // THEN
      expect(ligneAffectationServiceStub.retrieve.called).toBeTruthy();
      expect(comp.ligneAffectations[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
    it('Should call delete service on confirmDelete', async () => {
      // GIVEN
      ligneAffectationServiceStub.delete.resolves({});

      // WHEN
      comp.prepareRemove({ id: 123 });
      comp.removeLigneAffectation();
      await comp.$nextTick();

      // THEN
      expect(ligneAffectationServiceStub.delete.called).toBeTruthy();
      expect(ligneAffectationServiceStub.retrieve.callCount).toEqual(2);
    });
  });
});
