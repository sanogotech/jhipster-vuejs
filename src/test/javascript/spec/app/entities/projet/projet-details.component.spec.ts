/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import * as config from '@/shared/config/config';
import ProjetDetailComponent from '@/entities/projet/projet-details.vue';
import ProjetClass from '@/entities/projet/projet-details.component';
import ProjetService from '@/entities/projet/projet.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('router-link', {});

describe('Component Tests', () => {
  describe('Projet Management Detail Component', () => {
    let wrapper: Wrapper<ProjetClass>;
    let comp: ProjetClass;
    let projetServiceStub: SinonStubbedInstance<ProjetService>;

    beforeEach(() => {
      projetServiceStub = sinon.createStubInstance<ProjetService>(ProjetService);

      wrapper = shallowMount<ProjetClass>(ProjetDetailComponent, {
        store,
        i18n,
        localVue,
        provide: { projetService: () => projetServiceStub },
      });
      comp = wrapper.vm;
    });

    describe('OnInit', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        const foundProjet = { id: 123 };
        projetServiceStub.find.resolves(foundProjet);

        // WHEN
        comp.retrieveProjet(123);
        await comp.$nextTick();

        // THEN
        expect(comp.projet).toBe(foundProjet);
      });
    });
  });
});
