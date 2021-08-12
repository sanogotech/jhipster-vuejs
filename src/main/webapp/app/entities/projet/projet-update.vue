<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <form name="editForm" role="form" novalidate v-on:submit.prevent="save()" >
                <h2 id="jhipsterApp.projet.home.createOrEditLabel" v-text="$t('jhipsterApp.projet.home.createOrEditLabel')">Create or edit a Projet</h2>
                <div>
                    <div class="form-group" v-if="projet.id">
                        <label for="id" v-text="$t('global.field.id')">ID</label>
                        <input type="text" class="form-control" id="id" name="id"
                               v-model="projet.id" readonly />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('jhipsterApp.projet.nom')" for="projet-nom">Nom</label>
                        <input type="text" class="form-control" name="nom" id="projet-nom"
                            :class="{'valid': !$v.projet.nom.$invalid, 'invalid': $v.projet.nom.$invalid }" v-model="$v.projet.nom.$model"  required/>
                        <div v-if="$v.projet.nom.$anyDirty && $v.projet.nom.$invalid">
                            <small class="form-text text-danger" v-if="!$v.projet.nom.required" v-text="$t('entity.validation.required')">
                                This field is required.
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('jhipsterApp.projet.datedebut')" for="projet-datedebut">Datedebut</label>
                        <div class="d-flex">
                            <input id="projet-datedebut" type="datetime-local" class="form-control" name="datedebut" :class="{'valid': !$v.projet.datedebut.$invalid, 'invalid': $v.projet.datedebut.$invalid }"
                             required
                            :value="convertDateTimeFromServer($v.projet.datedebut.$model)"
                            @change="updateInstantField('datedebut', $event)"/>
                        </div>
                        <div v-if="$v.projet.datedebut.$anyDirty && $v.projet.datedebut.$invalid">
                            <small class="form-text text-danger" v-if="!$v.projet.datedebut.required" v-text="$t('entity.validation.required')">
                                This field is required.
                            </small>
                            <small class="form-text text-danger" v-if="!$v.projet.datedebut.ZonedDateTimelocal" v-text="$t('entity.validation.ZonedDateTimelocal')">
                                This field should be a date and time.
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('jhipsterApp.projet.nbjourhome')" for="projet-nbjourhome">Nbjourhome</label>
                        <input type="number" class="form-control" name="nbjourhome" id="projet-nbjourhome"
                            :class="{'valid': !$v.projet.nbjourhome.$invalid, 'invalid': $v.projet.nbjourhome.$invalid }" v-model.number="$v.projet.nbjourhome.$model"  required/>
                        <div v-if="$v.projet.nbjourhome.$anyDirty && $v.projet.nbjourhome.$invalid">
                            <small class="form-text text-danger" v-if="!$v.projet.nbjourhome.required" v-text="$t('entity.validation.required')">
                                This field is required.
                            </small>
                            <small class="form-text text-danger" v-if="!$v.projet.nbjourhome.numeric" v-text="$t('entity.validation.number')">
                                This field should be a number.
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('jhipsterApp.projet.domaineMetier')" for="projet-domaineMetier">Domaine Metier</label>
                        <select class="form-control" id="projet-domaineMetier" name="domaineMetier" v-model="projet.domaineMetier">
                            <option v-bind:value="null"></option>
                            <option v-bind:value="projet.domaineMetier && domaineMetierOption.id === projet.domaineMetier.id ? projet.domaineMetier : domaineMetierOption" v-for="domaineMetierOption in domaineMetiers" :key="domaineMetierOption.id">{{domaineMetierOption.nom}}</option>
                        </select>
                    </div>
                </div>
                <div>
                    <button type="button" id="cancel-save" class="btn btn-secondary" v-on:click="previousState()">
                        <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.cancel')">Cancel</span>
                    </button>
                    <button type="submit" id="save-entity" :disabled="$v.projet.$invalid || isSaving" class="btn btn-primary">
                        <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script lang="ts" src="./projet-update.component.ts">
</script>
