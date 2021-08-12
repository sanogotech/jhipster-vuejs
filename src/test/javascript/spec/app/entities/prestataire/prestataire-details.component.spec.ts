/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import * as config from '@/shared/config/config';
import PrestataireDetailComponent from '@/entities/prestataire/prestataire-details.vue';
import PrestataireClass from '@/entities/prestataire/prestataire-details.component';
import PrestataireService from '@/entities/prestataire/prestataire.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('router-link', {});

describe('Component Tests', () => {
  describe('Prestataire Management Detail Component', () => {
    let wrapper: Wrapper<PrestataireClass>;
    let comp: PrestataireClass;
    let prestataireServiceStub: SinonStubbedInstance<PrestataireService>;

    beforeEach(() => {
      prestataireServiceStub = sinon.createStubInstance<PrestataireService>(PrestataireService);

      wrapper = shallowMount<PrestataireClass>(PrestataireDetailComponent, {
        store,
        i18n,
        localVue,
        provide: { prestataireService: () => prestataireServiceStub },
      });
      comp = wrapper.vm;
    });

    describe('OnInit', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        const foundPrestataire = { id: 123 };
        prestataireServiceStub.find.resolves(foundPrestataire);

        // WHEN
        comp.retrievePrestataire(123);
        await comp.$nextTick();

        // THEN
        expect(comp.prestataire).toBe(foundPrestataire);
      });
    });
  });
});
