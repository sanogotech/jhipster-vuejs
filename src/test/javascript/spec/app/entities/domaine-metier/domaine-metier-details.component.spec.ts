/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import * as config from '@/shared/config/config';
import DomaineMetierDetailComponent from '@/entities/domaine-metier/domaine-metier-details.vue';
import DomaineMetierClass from '@/entities/domaine-metier/domaine-metier-details.component';
import DomaineMetierService from '@/entities/domaine-metier/domaine-metier.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('router-link', {});

describe('Component Tests', () => {
  describe('DomaineMetier Management Detail Component', () => {
    let wrapper: Wrapper<DomaineMetierClass>;
    let comp: DomaineMetierClass;
    let domaineMetierServiceStub: SinonStubbedInstance<DomaineMetierService>;

    beforeEach(() => {
      domaineMetierServiceStub = sinon.createStubInstance<DomaineMetierService>(DomaineMetierService);

      wrapper = shallowMount<DomaineMetierClass>(DomaineMetierDetailComponent, {
        store,
        i18n,
        localVue,
        provide: { domaineMetierService: () => domaineMetierServiceStub },
      });
      comp = wrapper.vm;
    });

    describe('OnInit', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        const foundDomaineMetier = { id: 123 };
        domaineMetierServiceStub.find.resolves(foundDomaineMetier);

        // WHEN
        comp.retrieveDomaineMetier(123);
        await comp.$nextTick();

        // THEN
        expect(comp.domaineMetier).toBe(foundDomaineMetier);
      });
    });
  });
});
