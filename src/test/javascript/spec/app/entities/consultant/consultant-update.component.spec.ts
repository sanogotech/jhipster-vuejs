/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import Router from 'vue-router';

import AlertService from '@/shared/alert/alert.service';
import * as config from '@/shared/config/config';
import ConsultantUpdateComponent from '@/entities/consultant/consultant-update.vue';
import ConsultantClass from '@/entities/consultant/consultant-update.component';
import ConsultantService from '@/entities/consultant/consultant.service';

import PrestataireService from '@/entities/prestataire/prestataire.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
const router = new Router();
localVue.use(Router);
localVue.component('font-awesome-icon', {});

describe('Component Tests', () => {
  describe('Consultant Management Update Component', () => {
    let wrapper: Wrapper<ConsultantClass>;
    let comp: ConsultantClass;
    let consultantServiceStub: SinonStubbedInstance<ConsultantService>;

    beforeEach(() => {
      consultantServiceStub = sinon.createStubInstance<ConsultantService>(ConsultantService);

      wrapper = shallowMount<ConsultantClass>(ConsultantUpdateComponent, {
        store,
        i18n,
        localVue,
        router,
        provide: {
          alertService: () => new AlertService(store),
          consultantService: () => consultantServiceStub,

          prestataireService: () => new PrestataireService(),
        },
      });
      comp = wrapper.vm;
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', async () => {
        // GIVEN
        const entity = { id: 123 };
        comp.consultant = entity;
        consultantServiceStub.update.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(consultantServiceStub.update.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', async () => {
        // GIVEN
        const entity = {};
        comp.consultant = entity;
        consultantServiceStub.create.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(consultantServiceStub.create.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });
    });
  });
});
