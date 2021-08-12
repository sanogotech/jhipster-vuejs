/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import Router from 'vue-router';

import AlertService from '@/shared/alert/alert.service';
import * as config from '@/shared/config/config';
import DomaineMetierUpdateComponent from '@/entities/domaine-metier/domaine-metier-update.vue';
import DomaineMetierClass from '@/entities/domaine-metier/domaine-metier-update.component';
import DomaineMetierService from '@/entities/domaine-metier/domaine-metier.service';

import EntrepriseService from '@/entities/entreprise/entreprise.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
const router = new Router();
localVue.use(Router);
localVue.component('font-awesome-icon', {});

describe('Component Tests', () => {
  describe('DomaineMetier Management Update Component', () => {
    let wrapper: Wrapper<DomaineMetierClass>;
    let comp: DomaineMetierClass;
    let domaineMetierServiceStub: SinonStubbedInstance<DomaineMetierService>;

    beforeEach(() => {
      domaineMetierServiceStub = sinon.createStubInstance<DomaineMetierService>(DomaineMetierService);

      wrapper = shallowMount<DomaineMetierClass>(DomaineMetierUpdateComponent, {
        store,
        i18n,
        localVue,
        router,
        provide: {
          alertService: () => new AlertService(store),
          domaineMetierService: () => domaineMetierServiceStub,

          entrepriseService: () => new EntrepriseService(),
        },
      });
      comp = wrapper.vm;
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', async () => {
        // GIVEN
        const entity = { id: 123 };
        comp.domaineMetier = entity;
        domaineMetierServiceStub.update.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(domaineMetierServiceStub.update.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', async () => {
        // GIVEN
        const entity = {};
        comp.domaineMetier = entity;
        domaineMetierServiceStub.create.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(domaineMetierServiceStub.create.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });
    });
  });
});
