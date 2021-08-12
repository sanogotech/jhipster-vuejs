import { Authority } from '@/shared/security/authority';
/* tslint:disable */
// prettier-ignore

// prettier-ignore
const Prestataire = () => import('@/entities/prestataire/prestataire.vue');
// prettier-ignore
const PrestataireUpdate = () => import('@/entities/prestataire/prestataire-update.vue');
// prettier-ignore
const PrestataireDetails = () => import('@/entities/prestataire/prestataire-details.vue');
// prettier-ignore
const Projet = () => import('@/entities/projet/projet.vue');
// prettier-ignore
const ProjetUpdate = () => import('@/entities/projet/projet-update.vue');
// prettier-ignore
const ProjetDetails = () => import('@/entities/projet/projet-details.vue');
// prettier-ignore
const Consultant = () => import('@/entities/consultant/consultant.vue');
// prettier-ignore
const ConsultantUpdate = () => import('@/entities/consultant/consultant-update.vue');
// prettier-ignore
const ConsultantDetails = () => import('@/entities/consultant/consultant-details.vue');
// prettier-ignore
const DomaineMetier = () => import('@/entities/domaine-metier/domaine-metier.vue');
// prettier-ignore
const DomaineMetierUpdate = () => import('@/entities/domaine-metier/domaine-metier-update.vue');
// prettier-ignore
const DomaineMetierDetails = () => import('@/entities/domaine-metier/domaine-metier-details.vue');
// prettier-ignore
const Entreprise = () => import('@/entities/entreprise/entreprise.vue');
// prettier-ignore
const EntrepriseUpdate = () => import('@/entities/entreprise/entreprise-update.vue');
// prettier-ignore
const EntrepriseDetails = () => import('@/entities/entreprise/entreprise-details.vue');
// prettier-ignore
const LigneAffectation = () => import('@/entities/ligne-affectation/ligne-affectation.vue');
// prettier-ignore
const LigneAffectationUpdate = () => import('@/entities/ligne-affectation/ligne-affectation-update.vue');
// prettier-ignore
const LigneAffectationDetails = () => import('@/entities/ligne-affectation/ligne-affectation-details.vue');
// jhipster-needle-add-entity-to-router-import - JHipster will import entities to the router here

export default [
  {
    path: '/prestataire',
    name: 'Prestataire',
    component: Prestataire,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/prestataire/new',
    name: 'PrestataireCreate',
    component: PrestataireUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/prestataire/:prestataireId/edit',
    name: 'PrestataireEdit',
    component: PrestataireUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/prestataire/:prestataireId/view',
    name: 'PrestataireView',
    component: PrestataireDetails,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/projet',
    name: 'Projet',
    component: Projet,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/projet/new',
    name: 'ProjetCreate',
    component: ProjetUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/projet/:projetId/edit',
    name: 'ProjetEdit',
    component: ProjetUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/projet/:projetId/view',
    name: 'ProjetView',
    component: ProjetDetails,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/consultant',
    name: 'Consultant',
    component: Consultant,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/consultant/new',
    name: 'ConsultantCreate',
    component: ConsultantUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/consultant/:consultantId/edit',
    name: 'ConsultantEdit',
    component: ConsultantUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/consultant/:consultantId/view',
    name: 'ConsultantView',
    component: ConsultantDetails,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/domaine-metier',
    name: 'DomaineMetier',
    component: DomaineMetier,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/domaine-metier/new',
    name: 'DomaineMetierCreate',
    component: DomaineMetierUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/domaine-metier/:domaineMetierId/edit',
    name: 'DomaineMetierEdit',
    component: DomaineMetierUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/domaine-metier/:domaineMetierId/view',
    name: 'DomaineMetierView',
    component: DomaineMetierDetails,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/entreprise',
    name: 'Entreprise',
    component: Entreprise,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/entreprise/new',
    name: 'EntrepriseCreate',
    component: EntrepriseUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/entreprise/:entrepriseId/edit',
    name: 'EntrepriseEdit',
    component: EntrepriseUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/entreprise/:entrepriseId/view',
    name: 'EntrepriseView',
    component: EntrepriseDetails,
    meta: { authorities: [Authority.USER] },
  },

  {
    path: '/prestataire',
    name: 'Prestataire',
    component: Prestataire,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/prestataire/new',
    name: 'PrestataireCreate',
    component: PrestataireUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/prestataire/:prestataireId/edit',
    name: 'PrestataireEdit',
    component: PrestataireUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/prestataire/:prestataireId/view',
    name: 'PrestataireView',
    component: PrestataireDetails,
    meta: { authorities: [Authority.USER] },
  },

  {
    path: '/prestataire',
    name: 'Prestataire',
    component: Prestataire,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/prestataire/new',
    name: 'PrestataireCreate',
    component: PrestataireUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/prestataire/:prestataireId/edit',
    name: 'PrestataireEdit',
    component: PrestataireUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/prestataire/:prestataireId/view',
    name: 'PrestataireView',
    component: PrestataireDetails,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/projet',
    name: 'Projet',
    component: Projet,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/projet/new',
    name: 'ProjetCreate',
    component: ProjetUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/projet/:projetId/edit',
    name: 'ProjetEdit',
    component: ProjetUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/projet/:projetId/view',
    name: 'ProjetView',
    component: ProjetDetails,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/ligne-affectation',
    name: 'LigneAffectation',
    component: LigneAffectation,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/ligne-affectation/new',
    name: 'LigneAffectationCreate',
    component: LigneAffectationUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/ligne-affectation/:ligneAffectationId/edit',
    name: 'LigneAffectationEdit',
    component: LigneAffectationUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/ligne-affectation/:ligneAffectationId/view',
    name: 'LigneAffectationView',
    component: LigneAffectationDetails,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/consultant',
    name: 'Consultant',
    component: Consultant,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/consultant/new',
    name: 'ConsultantCreate',
    component: ConsultantUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/consultant/:consultantId/edit',
    name: 'ConsultantEdit',
    component: ConsultantUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/consultant/:consultantId/view',
    name: 'ConsultantView',
    component: ConsultantDetails,
    meta: { authorities: [Authority.USER] },
  },

  {
    path: '/prestataire',
    name: 'Prestataire',
    component: Prestataire,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/prestataire/new',
    name: 'PrestataireCreate',
    component: PrestataireUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/prestataire/:prestataireId/edit',
    name: 'PrestataireEdit',
    component: PrestataireUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/prestataire/:prestataireId/view',
    name: 'PrestataireView',
    component: PrestataireDetails,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/ligne-affectation',
    name: 'LigneAffectation',
    component: LigneAffectation,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/ligne-affectation/new',
    name: 'LigneAffectationCreate',
    component: LigneAffectationUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/ligne-affectation/:ligneAffectationId/edit',
    name: 'LigneAffectationEdit',
    component: LigneAffectationUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/ligne-affectation/:ligneAffectationId/view',
    name: 'LigneAffectationView',
    component: LigneAffectationDetails,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/entreprise',
    name: 'Entreprise',
    component: Entreprise,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/entreprise/new',
    name: 'EntrepriseCreate',
    component: EntrepriseUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/entreprise/:entrepriseId/edit',
    name: 'EntrepriseEdit',
    component: EntrepriseUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/entreprise/:entrepriseId/view',
    name: 'EntrepriseView',
    component: EntrepriseDetails,
    meta: { authorities: [Authority.USER] },
  },
  // jhipster-needle-add-entity-to-router - JHipster will add entities to the router here
];
