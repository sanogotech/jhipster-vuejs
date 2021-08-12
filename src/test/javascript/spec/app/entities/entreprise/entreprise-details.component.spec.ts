/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import * as config from '@/shared/config/config';
import EntrepriseDetailComponent from '@/entities/entreprise/entreprise-details.vue';
import EntrepriseClass from '@/entities/entreprise/entreprise-details.component';
import EntrepriseService from '@/entities/entreprise/entreprise.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('router-link', {});

describe('Component Tests', () => {
  describe('Entreprise Management Detail Component', () => {
    let wrapper: Wrapper<EntrepriseClass>;
    let comp: EntrepriseClass;
    let entrepriseServiceStub: SinonStubbedInstance<EntrepriseService>;

    beforeEach(() => {
      entrepriseServiceStub = sinon.createStubInstance<EntrepriseService>(EntrepriseService);

      wrapper = shallowMount<EntrepriseClass>(EntrepriseDetailComponent, {
        store,
        i18n,
        localVue,
        provide: { entrepriseService: () => entrepriseServiceStub },
      });
      comp = wrapper.vm;
    });

    describe('OnInit', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        const foundEntreprise = { id: 123 };
        entrepriseServiceStub.find.resolves(foundEntreprise);

        // WHEN
        comp.retrieveEntreprise(123);
        await comp.$nextTick();

        // THEN
        expect(comp.entreprise).toBe(foundEntreprise);
      });
    });
  });
});
