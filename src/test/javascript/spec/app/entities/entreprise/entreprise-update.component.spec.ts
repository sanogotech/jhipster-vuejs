/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import Router from 'vue-router';

import AlertService from '@/shared/alert/alert.service';
import * as config from '@/shared/config/config';
import EntrepriseUpdateComponent from '@/entities/entreprise/entreprise-update.vue';
import EntrepriseClass from '@/entities/entreprise/entreprise-update.component';
import EntrepriseService from '@/entities/entreprise/entreprise.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
const router = new Router();
localVue.use(Router);
localVue.component('font-awesome-icon', {});

describe('Component Tests', () => {
  describe('Entreprise Management Update Component', () => {
    let wrapper: Wrapper<EntrepriseClass>;
    let comp: EntrepriseClass;
    let entrepriseServiceStub: SinonStubbedInstance<EntrepriseService>;

    beforeEach(() => {
      entrepriseServiceStub = sinon.createStubInstance<EntrepriseService>(EntrepriseService);

      wrapper = shallowMount<EntrepriseClass>(EntrepriseUpdateComponent, {
        store,
        i18n,
        localVue,
        router,
        provide: {
          alertService: () => new AlertService(store),
          entrepriseService: () => entrepriseServiceStub,
        },
      });
      comp = wrapper.vm;
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', async () => {
        // GIVEN
        const entity = { id: 123 };
        comp.entreprise = entity;
        entrepriseServiceStub.update.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(entrepriseServiceStub.update.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', async () => {
        // GIVEN
        const entity = {};
        comp.entreprise = entity;
        entrepriseServiceStub.create.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(entrepriseServiceStub.create.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });
    });
  });
});
