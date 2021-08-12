<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <div v-if="ligneAffectation">
                <h2 class="jh-entity-heading"><span v-text="$t('jhipsterApp.ligneAffectation.detail.title')">LigneAffectation</span> {{ligneAffectation.id}}</h2>
                <dl class="row jh-entity-details">
                    <dt>
                        <span v-text="$t('jhipsterApp.ligneAffectation.typeAffectation')">Type Affectation</span>
                    </dt>
                    <dd>
                        <span>{{ligneAffectation.typeAffectation}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('jhipsterApp.ligneAffectation.nbjourhome')">Nbjourhome</span>
                    </dt>
                    <dd>
                        <span>{{ligneAffectation.nbjourhome}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('jhipsterApp.ligneAffectation.projet')">Projet</span>
                    </dt>
                    <dd>
                        <div v-if="ligneAffectation.projet">
                            <router-link :to="{name: 'ProjetView', params: {projetId: ligneAffectation.projet.id}}">{{ligneAffectation.projet.nom}}</router-link>
                        </div>
                    </dd>
                    <dt>
                        <span v-text="$t('jhipsterApp.ligneAffectation.consultant')">Consultant</span>
                    </dt>
                    <dd>
                        <div v-if="ligneAffectation.consultant">
                            <router-link :to="{name: 'ConsultantView', params: {consultantId: ligneAffectation.consultant.id}}">{{ligneAffectation.consultant.email}}</router-link>
                        </div>
                    </dd>
                </dl>
                <button type="submit"
                        v-on:click.prevent="previousState()"
                        class="btn btn-info">
                    <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
                </button>
                <router-link v-if="ligneAffectation.id" :to="{name: 'LigneAffectationEdit', params: {ligneAffectationId: ligneAffectation.id}}" tag="button" class="btn btn-primary">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.edit')"> Edit</span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./ligne-affectation-details.component.ts">
</script>
