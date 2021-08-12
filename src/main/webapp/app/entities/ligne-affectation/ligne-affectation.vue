<template>
    <div>
        <h2 id="page-heading">
            <span v-text="$t('jhipsterApp.ligneAffectation.home.title')" id="ligne-affectation-heading">Ligne Affectations</span>
            <router-link :to="{name: 'LigneAffectationCreate'}" tag="button" id="jh-create-entity" class="btn btn-primary float-right jh-create-entity create-ligne-affectation">
                <font-awesome-icon icon="plus"></font-awesome-icon>
                <span  v-text="$t('jhipsterApp.ligneAffectation.home.createLabel')">
                    Create a new Ligne Affectation
                </span>
            </router-link>
        </h2>
        <b-alert :show="dismissCountDown"
            dismissible
            :variant="alertType"
            @dismissed="dismissCountDown=0"
            @dismiss-count-down="countDownChanged">
            {{alertMessage}}
        </b-alert>
        <br/>
        <div class="alert alert-warning" v-if="!isFetching && ligneAffectations && ligneAffectations.length === 0">
            <span v-text="$t('jhipsterApp.ligneAffectation.home.notFound')">No ligneAffectations found</span>
        </div>
        <div class="table-responsive" v-if="ligneAffectations && ligneAffectations.length > 0">
            <table class="table table-striped">
                <thead>
                <tr>
                    <th><span v-text="$t('global.field.id')">ID</span></th>
                    <th><span v-text="$t('jhipsterApp.ligneAffectation.typeAffectation')">Type Affectation</span></th>
                    <th><span v-text="$t('jhipsterApp.ligneAffectation.nbjourhome')">Nbjourhome</span></th>
                    <th><span v-text="$t('jhipsterApp.ligneAffectation.projet')">Projet</span></th>
                    <th><span v-text="$t('jhipsterApp.ligneAffectation.consultant')">Consultant</span></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="ligneAffectation in ligneAffectations"
                    :key="ligneAffectation.id">
                    <td>
                        <router-link :to="{name: 'LigneAffectationView', params: {ligneAffectationId: ligneAffectation.id}}">{{ligneAffectation.id}}</router-link>
                    </td>
                    <td>{{ligneAffectation.typeAffectation}}</td>
                    <td>{{ligneAffectation.nbjourhome}}</td>
                    <td>
                        <div v-if="ligneAffectation.projet">
                            <router-link :to="{name: 'ProjetView', params: {projetId: ligneAffectation.projet.id}}">{{ligneAffectation.projet.nom}}</router-link>
                        </div>
                    </td>
                    <td>
                        <div v-if="ligneAffectation.consultant">
                            <router-link :to="{name: 'ConsultantView', params: {consultantId: ligneAffectation.consultant.id}}">{{ligneAffectation.consultant.email}}</router-link>
                        </div>
                    </td>
                    <td class="text-right">
                        <div class="btn-group">
                            <router-link :to="{name: 'LigneAffectationView', params: {ligneAffectationId: ligneAffectation.id}}" tag="button" class="btn btn-info btn-sm details">
                                <font-awesome-icon icon="eye"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.view')">View</span>
                            </router-link>
                            <router-link :to="{name: 'LigneAffectationEdit', params: {ligneAffectationId: ligneAffectation.id}}"  tag="button" class="btn btn-primary btn-sm edit">
                                <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.edit')">Edit</span>
                            </router-link>
                            <b-button v-on:click="prepareRemove(ligneAffectation)"
                                   variant="danger"
                                   class="btn btn-sm"
                                   v-b-modal.removeEntity>
                                <font-awesome-icon icon="times"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.delete')">Delete</span>
                            </b-button>
                        </div>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
        <b-modal ref="removeEntity" id="removeEntity" >
            <span slot="modal-title"><span id="jhipsterApp.ligneAffectation.delete.question" v-text="$t('entity.delete.title')">Confirm delete operation</span></span>
            <div class="modal-body">
                <p id="jhi-delete-ligneAffectation-heading" v-text="$t('jhipsterApp.ligneAffectation.delete.question', {'id': removeId})">Are you sure you want to delete this Ligne Affectation?</p>
            </div>
            <div slot="modal-footer">
                <button type="button" class="btn btn-secondary" v-text="$t('entity.action.cancel')" v-on:click="closeDialog()">Cancel</button>
                <button type="button" class="btn btn-primary" id="jhi-confirm-delete-ligneAffectation" v-text="$t('entity.action.delete')" v-on:click="removeLigneAffectation()">Delete</button>
            </div>
        </b-modal>
    </div>
</template>

<script lang="ts" src="./ligne-affectation.component.ts">
</script>
