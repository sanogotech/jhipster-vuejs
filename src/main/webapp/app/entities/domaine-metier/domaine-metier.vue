<template>
    <div>
        <h2 id="page-heading">
            <span v-text="$t('jhipsterApp.domaineMetier.home.title')" id="domaine-metier-heading">Domaine Metiers</span>
            <router-link :to="{name: 'DomaineMetierCreate'}" tag="button" id="jh-create-entity" class="btn btn-primary float-right jh-create-entity create-domaine-metier">
                <font-awesome-icon icon="plus"></font-awesome-icon>
                <span  v-text="$t('jhipsterApp.domaineMetier.home.createLabel')">
                    Create a new Domaine Metier
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
        <div class="alert alert-warning" v-if="!isFetching && domaineMetiers && domaineMetiers.length === 0">
            <span v-text="$t('jhipsterApp.domaineMetier.home.notFound')">No domaineMetiers found</span>
        </div>
        <div class="table-responsive" v-if="domaineMetiers && domaineMetiers.length > 0">
            <table class="table table-striped">
                <thead>
                <tr>
                    <th><span v-text="$t('global.field.id')">ID</span></th>
                    <th><span v-text="$t('jhipsterApp.domaineMetier.nom')">Nom</span></th>
                    <th><span v-text="$t('jhipsterApp.domaineMetier.entreprise')">Entreprise</span></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="domaineMetier in domaineMetiers"
                    :key="domaineMetier.id">
                    <td>
                        <router-link :to="{name: 'DomaineMetierView', params: {domaineMetierId: domaineMetier.id}}">{{domaineMetier.id}}</router-link>
                    </td>
                    <td>{{domaineMetier.nom}}</td>
                    <td>
                        <div v-if="domaineMetier.entreprise">
                            <router-link :to="{name: 'EntrepriseView', params: {entrepriseId: domaineMetier.entreprise.id}}">{{domaineMetier.entreprise.nom}}</router-link>
                        </div>
                    </td>
                    <td class="text-right">
                        <div class="btn-group">
                            <router-link :to="{name: 'DomaineMetierView', params: {domaineMetierId: domaineMetier.id}}" tag="button" class="btn btn-info btn-sm details">
                                <font-awesome-icon icon="eye"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.view')">View</span>
                            </router-link>
                            <router-link :to="{name: 'DomaineMetierEdit', params: {domaineMetierId: domaineMetier.id}}"  tag="button" class="btn btn-primary btn-sm edit">
                                <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.edit')">Edit</span>
                            </router-link>
                            <b-button v-on:click="prepareRemove(domaineMetier)"
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
            <span slot="modal-title"><span id="jhipsterApp.domaineMetier.delete.question" v-text="$t('entity.delete.title')">Confirm delete operation</span></span>
            <div class="modal-body">
                <p id="jhi-delete-domaineMetier-heading" v-text="$t('jhipsterApp.domaineMetier.delete.question', {'id': removeId})">Are you sure you want to delete this Domaine Metier?</p>
            </div>
            <div slot="modal-footer">
                <button type="button" class="btn btn-secondary" v-text="$t('entity.action.cancel')" v-on:click="closeDialog()">Cancel</button>
                <button type="button" class="btn btn-primary" id="jhi-confirm-delete-domaineMetier" v-text="$t('entity.action.delete')" v-on:click="removeDomaineMetier()">Delete</button>
            </div>
        </b-modal>
    </div>
</template>

<script lang="ts" src="./domaine-metier.component.ts">
</script>
