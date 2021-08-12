<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <form name="editForm" role="form" novalidate v-on:submit.prevent="save()" >
                <h2 id="jhipsterApp.prestataire.home.createOrEditLabel" v-text="$t('jhipsterApp.prestataire.home.createOrEditLabel')">Create or edit a Prestataire</h2>
                <div>
                    <div class="form-group" v-if="prestataire.id">
                        <label for="id" v-text="$t('global.field.id')">ID</label>
                        <input type="text" class="form-control" id="id" name="id"
                               v-model="prestataire.id" readonly />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('jhipsterApp.prestataire.nom')" for="prestataire-nom">Nom</label>
                        <input type="text" class="form-control" name="nom" id="prestataire-nom"
                            :class="{'valid': !$v.prestataire.nom.$invalid, 'invalid': $v.prestataire.nom.$invalid }" v-model="$v.prestataire.nom.$model"  required/>
                        <div v-if="$v.prestataire.nom.$anyDirty && $v.prestataire.nom.$invalid">
                            <small class="form-text text-danger" v-if="!$v.prestataire.nom.required" v-text="$t('entity.validation.required')">
                                This field is required.
                            </small>
                            <small class="form-text text-danger" v-if="!$v.prestataire.nom.minLength" v-text="$t('entity.validation.minlength', {min: 3})">
                                This field is required to be at least 3 characters.
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('jhipsterApp.prestataire.commune')" for="prestataire-commune">Commune</label>
                        <input type="text" class="form-control" name="commune" id="prestataire-commune"
                            :class="{'valid': !$v.prestataire.commune.$invalid, 'invalid': $v.prestataire.commune.$invalid }" v-model="$v.prestataire.commune.$model"  required/>
                        <div v-if="$v.prestataire.commune.$anyDirty && $v.prestataire.commune.$invalid">
                            <small class="form-text text-danger" v-if="!$v.prestataire.commune.required" v-text="$t('entity.validation.required')">
                                This field is required.
                            </small>
                            <small class="form-text text-danger" v-if="!$v.prestataire.commune.minLength" v-text="$t('entity.validation.minlength', {min: 2})">
                                This field is required to be at least 2 characters.
                            </small>
                        </div>
                    </div>
                </div>
                <div>
                    <button type="button" id="cancel-save" class="btn btn-secondary" v-on:click="previousState()">
                        <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.cancel')">Cancel</span>
                    </button>
                    <button type="submit" id="save-entity" :disabled="$v.prestataire.$invalid || isSaving" class="btn btn-primary">
                        <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script lang="ts" src="./prestataire-update.component.ts">
</script>
