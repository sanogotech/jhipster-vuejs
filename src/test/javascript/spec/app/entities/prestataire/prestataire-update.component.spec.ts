/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import Router from 'vue-router';

import AlertService from '@/shared/alert/alert.service';
import * as config from '@/shared/config/config';
import PrestataireUpdateComponent from '@/entities/prestataire/prestataire-update.vue';
import PrestataireClass from '@/entities/prestataire/prestataire-update.component';
import PrestataireService from '@/entities/prestataire/prestataire.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
const router = new Router();
localVue.use(Router);
localVue.component('font-awesome-icon', {});

describe('Component Tests', () => {
  describe('Prestataire Management Update Component', () => {
    let wrapper: Wrapper<PrestataireClass>;
    let comp: PrestataireClass;
    let prestataireServiceStub: SinonStubbedInstance<PrestataireService>;

    beforeEach(() => {
      prestataireServiceStub = sinon.createStubInstance<PrestataireService>(PrestataireService);

      wrapper = shallowMount<PrestataireClass>(PrestataireUpdateComponent, {
        store,
        i18n,
        localVue,
        router,
        provide: {
          alertService: () => new AlertService(store),
          prestataireService: () => prestataireServiceStub,
        },
      });
      comp = wrapper.vm;
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', async () => {
        // GIVEN
        const entity = { id: 123 };
        comp.prestataire = entity;
        prestataireServiceStub.update.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(prestataireServiceStub.update.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', async () => {
        // GIVEN
        const entity = {};
        comp.prestataire = entity;
        prestataireServiceStub.create.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(prestataireServiceStub.create.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });
    });
  });
});
