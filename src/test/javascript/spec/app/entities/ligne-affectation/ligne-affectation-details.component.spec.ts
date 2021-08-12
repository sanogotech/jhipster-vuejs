/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import * as config from '@/shared/config/config';
import LigneAffectationDetailComponent from '@/entities/ligne-affectation/ligne-affectation-details.vue';
import LigneAffectationClass from '@/entities/ligne-affectation/ligne-affectation-details.component';
import LigneAffectationService from '@/entities/ligne-affectation/ligne-affectation.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('router-link', {});

describe('Component Tests', () => {
  describe('LigneAffectation Management Detail Component', () => {
    let wrapper: Wrapper<LigneAffectationClass>;
    let comp: LigneAffectationClass;
    let ligneAffectationServiceStub: SinonStubbedInstance<LigneAffectationService>;

    beforeEach(() => {
      ligneAffectationServiceStub = sinon.createStubInstance<LigneAffectationService>(LigneAffectationService);

      wrapper = shallowMount<LigneAffectationClass>(LigneAffectationDetailComponent, {
        store,
        i18n,
        localVue,
        provide: { ligneAffectationService: () => ligneAffectationServiceStub },
      });
      comp = wrapper.vm;
    });

    describe('OnInit', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        const foundLigneAffectation = { id: 123 };
        ligneAffectationServiceStub.find.resolves(foundLigneAffectation);

        // WHEN
        comp.retrieveLigneAffectation(123);
        await comp.$nextTick();

        // THEN
        expect(comp.ligneAffectation).toBe(foundLigneAffectation);
      });
    });
  });
});
