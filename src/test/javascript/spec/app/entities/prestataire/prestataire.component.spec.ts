/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import AlertService from '@/shared/alert/alert.service';
import * as config from '@/shared/config/config';
import PrestataireComponent from '@/entities/prestataire/prestataire.vue';
import PrestataireClass from '@/entities/prestataire/prestataire.component';
import PrestataireService from '@/entities/prestataire/prestataire.service';

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
  describe('Prestataire Management Component', () => {
    let wrapper: Wrapper<PrestataireClass>;
    let comp: PrestataireClass;
    let prestataireServiceStub: SinonStubbedInstance<PrestataireService>;

    beforeEach(() => {
      prestataireServiceStub = sinon.createStubInstance<PrestataireService>(PrestataireService);
      prestataireServiceStub.retrieve.resolves({ headers: {} });

      wrapper = shallowMount<PrestataireClass>(PrestataireComponent, {
        store,
        i18n,
        localVue,
        stubs: { bModal: bModalStub as any },
        provide: {
          alertService: () => new AlertService(store),
          prestataireService: () => prestataireServiceStub,
        },
      });
      comp = wrapper.vm;
    });

    it('Should call load all on init', async () => {
      // GIVEN
      prestataireServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });

      // WHEN
      comp.retrieveAllPrestataires();
      await comp.$nextTick();

      // THEN
      expect(prestataireServiceStub.retrieve.called).toBeTruthy();
      expect(comp.prestataires[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
    it('Should call delete service on confirmDelete', async () => {
      // GIVEN
      prestataireServiceStub.delete.resolves({});

      // WHEN
      comp.prepareRemove({ id: 123 });
      comp.removePrestataire();
      await comp.$nextTick();

      // THEN
      expect(prestataireServiceStub.delete.called).toBeTruthy();
      expect(prestataireServiceStub.retrieve.callCount).toEqual(2);
    });
  });
});
