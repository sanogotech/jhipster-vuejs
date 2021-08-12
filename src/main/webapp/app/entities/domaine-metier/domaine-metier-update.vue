<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <form name="editForm" role="form" novalidate v-on:submit.prevent="save()" >
                <h2 id="jhipsterApp.domaineMetier.home.createOrEditLabel" v-text="$t('jhipsterApp.domaineMetier.home.createOrEditLabel')">Create or edit a DomaineMetier</h2>
                <div>
                    <div class="form-group" v-if="domaineMetier.id">
                        <label for="id" v-text="$t('global.field.id')">ID</label>
                        <input type="text" class="form-control" id="id" name="id"
                               v-model="domaineMetier.id" readonly />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('jhipsterApp.domaineMetier.nom')" for="domaine-metier-nom">Nom</label>
                        <input type="text" class="form-control" name="nom" id="domaine-metier-nom"
                            :class="{'valid': !$v.domaineMetier.nom.$invalid, 'invalid': $v.domaineMetier.nom.$invalid }" v-model="$v.domaineMetier.nom.$model"  required/>
                        <div v-if="$v.domaineMetier.nom.$anyDirty && $v.domaineMetier.nom.$invalid">
                            <small class="form-text text-danger" v-if="!$v.domaineMetier.nom.required" v-text="$t('entity.validation.required')">
                                This field is required.
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('jhipsterApp.domaineMetier.entreprise')" for="domaine-metier-entreprise">Entreprise</label>
                        <select class="form-control" id="domaine-metier-entreprise" name="entreprise" v-model="domaineMetier.entreprise">
                            <option v-bind:value="null"></option>
                            <option v-bind:value="domaineMetier.entreprise && entrepriseOption.id === domaineMetier.entreprise.id ? domaineMetier.entreprise : entrepriseOption" v-for="entrepriseOption in entreprises" :key="entrepriseOption.id">{{entrepriseOption.nom}}</option>
                        </select>
                    </div>
                </div>
                <div>
                    <button type="button" id="cancel-save" class="btn btn-secondary" v-on:click="previousState()">
                        <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.cancel')">Cancel</span>
                    </button>
                    <button type="submit" id="save-entity" :disabled="$v.domaineMetier.$invalid || isSaving" class="btn btn-primary">
                        <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script lang="ts" src="./domaine-metier-update.component.ts">
</script>
