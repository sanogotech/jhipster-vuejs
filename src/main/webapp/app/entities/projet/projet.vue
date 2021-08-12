<template>
    <div>
        <h2 id="page-heading">
            <span v-text="$t('jhipsterApp.projet.home.title')" id="projet-heading">Projets</span>
            <router-link :to="{name: 'ProjetCreate'}" tag="button" id="jh-create-entity" class="btn btn-primary float-right jh-create-entity create-projet">
                <font-awesome-icon icon="plus"></font-awesome-icon>
                <span  v-text="$t('jhipsterApp.projet.home.createLabel')">
                    Create a new Projet
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
        <div class="alert alert-warning" v-if="!isFetching && projets && projets.length === 0">
            <span v-text="$t('jhipsterApp.projet.home.notFound')">No projets found</span>
        </div>
        <div class="table-responsive" v-if="projets && projets.length > 0">
            <table class="table table-striped">
                <thead>
                <tr>
                    <th v-on:click="changeOrder('id')"><span v-text="$t('global.field.id')">ID</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'id'"></jhi-sort-indicator></th>
                    <th v-on:click="changeOrder('nom')"><span v-text="$t('jhipsterApp.projet.nom')">Nom</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'nom'"></jhi-sort-indicator></th>
                    <th v-on:click="changeOrder('datedebut')"><span v-text="$t('jhipsterApp.projet.datedebut')">Datedebut</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'datedebut'"></jhi-sort-indicator></th>
                    <th v-on:click="changeOrder('nbjourhome')"><span v-text="$t('jhipsterApp.projet.nbjourhome')">Nbjourhome</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'nbjourhome'"></jhi-sort-indicator></th>
                    <th v-on:click="changeOrder('domaineMetier.nom')"><span v-text="$t('jhipsterApp.projet.domaineMetier')">Domaine Metier</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'domaineMetier.nom'"></jhi-sort-indicator></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="projet in projets"
                    :key="projet.id">
                    <td>
                        <router-link :to="{name: 'ProjetView', params: {projetId: projet.id}}">{{projet.id}}</router-link>
                    </td>
                    <td>{{projet.nom}}</td>
                    <td>{{projet.datedebut ? $d(Date.parse(projet.datedebut), 'short') : ''}}</td>
                    <td>{{projet.nbjourhome}}</td>
                    <td>
                        <div v-if="projet.domaineMetier">
                            <router-link :to="{name: 'DomaineMetierView', params: {domaineMetierId: projet.domaineMetier.id}}">{{projet.domaineMetier.nom}}</router-link>
                        </div>
                    </td>
                    <td class="text-right">
                        <div class="btn-group">
                            <router-link :to="{name: 'ProjetView', params: {projetId: projet.id}}" tag="button" class="btn btn-info btn-sm details">
                                <font-awesome-icon icon="eye"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.view')">View</span>
                            </router-link>
                            <router-link :to="{name: 'ProjetEdit', params: {projetId: projet.id}}"  tag="button" class="btn btn-primary btn-sm edit">
                                <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.edit')">Edit</span>
                            </router-link>
                            <b-button v-on:click="prepareRemove(projet)"
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
                <infinite-loading
                    ref="infiniteLoading"
                    v-if="totalItems > itemsPerPage"
                    :identifier="infiniteId"
                    slot="append"
                    @infinite="loadMore"
                    force-use-infinite-wrapper=".el-table__body-wrapper"
                    :distance='20'>
                </infinite-loading>
            </table>
        </div>
        <b-modal ref="removeEntity" id="removeEntity" >
            <span slot="modal-title"><span id="jhipsterApp.projet.delete.question" v-text="$t('entity.delete.title')">Confirm delete operation</span></span>
            <div class="modal-body">
                <p id="jhi-delete-projet-heading" v-text="$t('jhipsterApp.projet.delete.question', {'id': removeId})">Are you sure you want to delete this Projet?</p>
            </div>
            <div slot="modal-footer">
                <button type="button" class="btn btn-secondary" v-text="$t('entity.action.cancel')" v-on:click="closeDialog()">Cancel</button>
                <button type="button" class="btn btn-primary" id="jhi-confirm-delete-projet" v-text="$t('entity.action.delete')" v-on:click="removeProjet()">Delete</button>
            </div>
        </b-modal>
    </div>
</template>

<script lang="ts" src="./projet.component.ts">
</script>
