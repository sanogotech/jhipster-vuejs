/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import * as config from '@/shared/config/config';
import ConsultantDetailComponent from '@/entities/consultant/consultant-details.vue';
import ConsultantClass from '@/entities/consultant/consultant-details.component';
import ConsultantService from '@/entities/consultant/consultant.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('router-link', {});

describe('Component Tests', () => {
  describe('Consultant Management Detail Component', () => {
    let wrapper: Wrapper<ConsultantClass>;
    let comp: ConsultantClass;
    let consultantServiceStub: SinonStubbedInstance<ConsultantService>;

    beforeEach(() => {
      consultantServiceStub = sinon.createStubInstance<ConsultantService>(ConsultantService);

      wrapper = shallowMount<ConsultantClass>(ConsultantDetailComponent, {
        store,
        i18n,
        localVue,
        provide: { consultantService: () => consultantServiceStub },
      });
      comp = wrapper.vm;
    });

    describe('OnInit', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        const foundConsultant = { id: 123 };
        consultantServiceStub.find.resolves(foundConsultant);

        // WHEN
        comp.retrieveConsultant(123);
        await comp.$nextTick();

        // THEN
        expect(comp.consultant).toBe(foundConsultant);
      });
    });
  });
});
