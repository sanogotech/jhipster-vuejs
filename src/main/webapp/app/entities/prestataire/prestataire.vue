<template>
    <div>
        <h2 id="page-heading">
            <span v-text="$t('jhipsterApp.prestataire.home.title')" id="prestataire-heading">Prestataires</span>
            <router-link :to="{name: 'PrestataireCreate'}" tag="button" id="jh-create-entity" class="btn btn-primary float-right jh-create-entity create-prestataire">
                <font-awesome-icon icon="plus"></font-awesome-icon>
                <span  v-text="$t('jhipsterApp.prestataire.home.createLabel')">
                    Create a new Prestataire
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
        <div class="alert alert-warning" v-if="!isFetching && prestataires && prestataires.length === 0">
            <span v-text="$t('jhipsterApp.prestataire.home.notFound')">No prestataires found</span>
        </div>
        <div class="table-responsive" v-if="prestataires && prestataires.length > 0">
            <table class="table table-striped">
                <thead>
                <tr>
                    <th><span v-text="$t('global.field.id')">ID</span></th>
                    <th><span v-text="$t('jhipsterApp.prestataire.nom')">Nom</span></th>
                    <th><span v-text="$t('jhipsterApp.prestataire.commune')">Commune</span></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="prestataire in prestataires"
                    :key="prestataire.id">
                    <td>
                        <router-link :to="{name: 'PrestataireView', params: {prestataireId: prestataire.id}}">{{prestataire.id}}</router-link>
                    </td>
                    <td>{{prestataire.nom}}</td>
                    <td>{{prestataire.commune}}</td>
                    <td class="text-right">
                        <div class="btn-group">
                            <router-link :to="{name: 'PrestataireView', params: {prestataireId: prestataire.id}}" tag="button" class="btn btn-info btn-sm details">
                                <font-awesome-icon icon="eye"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.view')">View</span>
                            </router-link>
                            <router-link :to="{name: 'PrestataireEdit', params: {prestataireId: prestataire.id}}"  tag="button" class="btn btn-primary btn-sm edit">
                                <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.edit')">Edit</span>
                            </router-link>
                            <b-button v-on:click="prepareRemove(prestataire)"
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
            <span slot="modal-title"><span id="jhipsterApp.prestataire.delete.question" v-text="$t('entity.delete.title')">Confirm delete operation</span></span>
            <div class="modal-body">
                <p id="jhi-delete-prestataire-heading" v-text="$t('jhipsterApp.prestataire.delete.question', {'id': removeId})">Are you sure you want to delete this Prestataire?</p>
            </div>
            <div slot="modal-footer">
                <button type="button" class="btn btn-secondary" v-text="$t('entity.action.cancel')" v-on:click="closeDialog()">Cancel</button>
                <button type="button" class="btn btn-primary" id="jhi-confirm-delete-prestataire" v-text="$t('entity.action.delete')" v-on:click="removePrestataire()">Delete</button>
            </div>
        </b-modal>
    </div>
</template>

<script lang="ts" src="./prestataire.component.ts">
</script>
