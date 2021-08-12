<template>
    <div>
        <h2 id="page-heading">
            <span v-text="$t('jhipsterApp.consultant.home.title')" id="consultant-heading">Consultants</span>
            <router-link :to="{name: 'ConsultantCreate'}" tag="button" id="jh-create-entity" class="btn btn-primary float-right jh-create-entity create-consultant">
                <font-awesome-icon icon="plus"></font-awesome-icon>
                <span  v-text="$t('jhipsterApp.consultant.home.createLabel')">
                    Create a new Consultant
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
        <div class="alert alert-warning" v-if="!isFetching && consultants && consultants.length === 0">
            <span v-text="$t('jhipsterApp.consultant.home.notFound')">No consultants found</span>
        </div>
        <div class="table-responsive" v-if="consultants && consultants.length > 0">
            <table class="table table-striped">
                <thead>
                <tr>
                    <th v-on:click="changeOrder('id')"><span v-text="$t('global.field.id')">ID</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'id'"></jhi-sort-indicator></th>
                    <th v-on:click="changeOrder('nom')"><span v-text="$t('jhipsterApp.consultant.nom')">Nom</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'nom'"></jhi-sort-indicator></th>
                    <th v-on:click="changeOrder('matricule')"><span v-text="$t('jhipsterApp.consultant.matricule')">Matricule</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'matricule'"></jhi-sort-indicator></th>
                    <th v-on:click="changeOrder('email')"><span v-text="$t('jhipsterApp.consultant.email')">Email</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'email'"></jhi-sort-indicator></th>
                    <th v-on:click="changeOrder('prenom')"><span v-text="$t('jhipsterApp.consultant.prenom')">Prenom</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'prenom'"></jhi-sort-indicator></th>
                    <th v-on:click="changeOrder('disponibiliteMax')"><span v-text="$t('jhipsterApp.consultant.disponibiliteMax')">Disponibilite Max</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'disponibiliteMax'"></jhi-sort-indicator></th>
                    <th v-on:click="changeOrder('prestataire.nom')"><span v-text="$t('jhipsterApp.consultant.prestataire')">Prestataire</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'prestataire.nom'"></jhi-sort-indicator></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="consultant in consultants"
                    :key="consultant.id">
                    <td>
                        <router-link :to="{name: 'ConsultantView', params: {consultantId: consultant.id}}">{{consultant.id}}</router-link>
                    </td>
                    <td>{{consultant.nom}}</td>
                    <td>{{consultant.matricule}}</td>
                    <td>{{consultant.email}}</td>
                    <td>{{consultant.prenom}}</td>
                    <td>{{consultant.disponibiliteMax}}</td>
                    <td>
                        <div v-if="consultant.prestataire">
                            <router-link :to="{name: 'PrestataireView', params: {prestataireId: consultant.prestataire.id}}">{{consultant.prestataire.nom}}</router-link>
                        </div>
                    </td>
                    <td class="text-right">
                        <div class="btn-group">
                            <router-link :to="{name: 'ConsultantView', params: {consultantId: consultant.id}}" tag="button" class="btn btn-info btn-sm details">
                                <font-awesome-icon icon="eye"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.view')">View</span>
                            </router-link>
                            <router-link :to="{name: 'ConsultantEdit', params: {consultantId: consultant.id}}"  tag="button" class="btn btn-primary btn-sm edit">
                                <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.edit')">Edit</span>
                            </router-link>
                            <b-button v-on:click="prepareRemove(consultant)"
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
            <span slot="modal-title"><span id="jhipsterApp.consultant.delete.question" v-text="$t('entity.delete.title')">Confirm delete operation</span></span>
            <div class="modal-body">
                <p id="jhi-delete-consultant-heading" v-text="$t('jhipsterApp.consultant.delete.question', {'id': removeId})">Are you sure you want to delete this Consultant?</p>
            </div>
            <div slot="modal-footer">
                <button type="button" class="btn btn-secondary" v-text="$t('entity.action.cancel')" v-on:click="closeDialog()">Cancel</button>
                <button type="button" class="btn btn-primary" id="jhi-confirm-delete-consultant" v-text="$t('entity.action.delete')" v-on:click="removeConsultant()">Delete</button>
            </div>
        </b-modal>
    </div>
</template>

<script lang="ts" src="./consultant.component.ts">
</script>
