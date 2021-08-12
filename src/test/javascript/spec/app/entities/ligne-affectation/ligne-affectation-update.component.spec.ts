/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import Router from 'vue-router';

import AlertService from '@/shared/alert/alert.service';
import * as config from '@/shared/config/config';
import LigneAffectationUpdateComponent from '@/entities/ligne-affectation/ligne-affectation-update.vue';
import LigneAffectationClass from '@/entities/ligne-affectation/ligne-affectation-update.component';
import LigneAffectationService from '@/entities/ligne-affectation/ligne-affectation.service';

import ProjetService from '@/entities/projet/projet.service';

import ConsultantService from '@/entities/consultant/consultant.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
const router = new Router();
localVue.use(Router);
localVue.component('font-awesome-icon', {});

describe('Component Tests', () => {
  describe('LigneAffectation Management Update Component', () => {
    let wrapper: Wrapper<LigneAffectationClass>;
    let comp: LigneAffectationClass;
    let ligneAffectationServiceStub: SinonStubbedInstance<LigneAffectationService>;

    beforeEach(() => {
      ligneAffectationServiceStub = sinon.createStubInstance<LigneAffectationService>(LigneAffectationService);

      wrapper = shallowMount<LigneAffectationClass>(LigneAffectationUpdateComponent, {
        store,
        i18n,
        localVue,
        router,
        provide: {
          alertService: () => new AlertService(store),
          ligneAffectationService: () => ligneAffectationServiceStub,

          projetService: () => new ProjetService(),

          consultantService: () => new ConsultantService(),
        },
      });
      comp = wrapper.vm;
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', async () => {
        // GIVEN
        const entity = { id: 123 };
        comp.ligneAffectation = entity;
        ligneAffectationServiceStub.update.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(ligneAffectationServiceStub.update.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', async () => {
        // GIVEN
        const entity = {};
        comp.ligneAffectation = entity;
        ligneAffectationServiceStub.create.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(ligneAffectationServiceStub.create.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });
    });
  });
});
