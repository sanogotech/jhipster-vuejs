<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <form name="editForm" role="form" novalidate v-on:submit.prevent="save()" >
                <h2 id="jhipsterApp.consultant.home.createOrEditLabel" v-text="$t('jhipsterApp.consultant.home.createOrEditLabel')">Create or edit a Consultant</h2>
                <div>
                    <div class="form-group" v-if="consultant.id">
                        <label for="id" v-text="$t('global.field.id')">ID</label>
                        <input type="text" class="form-control" id="id" name="id"
                               v-model="consultant.id" readonly />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('jhipsterApp.consultant.nom')" for="consultant-nom">Nom</label>
                        <input type="text" class="form-control" name="nom" id="consultant-nom"
                            :class="{'valid': !$v.consultant.nom.$invalid, 'invalid': $v.consultant.nom.$invalid }" v-model="$v.consultant.nom.$model"  required/>
                        <div v-if="$v.consultant.nom.$anyDirty && $v.consultant.nom.$invalid">
                            <small class="form-text text-danger" v-if="!$v.consultant.nom.required" v-text="$t('entity.validation.required')">
                                This field is required.
                            </small>
                            <small class="form-text text-danger" v-if="!$v.consultant.nom.minLength" v-text="$t('entity.validation.minlength', {min: 2})">
                                This field is required to be at least 2 characters.
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('jhipsterApp.consultant.matricule')" for="consultant-matricule">Matricule</label>
                        <input type="text" class="form-control" name="matricule" id="consultant-matricule"
                            :class="{'valid': !$v.consultant.matricule.$invalid, 'invalid': $v.consultant.matricule.$invalid }" v-model="$v.consultant.matricule.$model"  required/>
                        <div v-if="$v.consultant.matricule.$anyDirty && $v.consultant.matricule.$invalid">
                            <small class="form-text text-danger" v-if="!$v.consultant.matricule.required" v-text="$t('entity.validation.required')">
                                This field is required.
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('jhipsterApp.consultant.email')" for="consultant-email">Email</label>
                        <input type="text" class="form-control" name="email" id="consultant-email"
                            :class="{'valid': !$v.consultant.email.$invalid, 'invalid': $v.consultant.email.$invalid }" v-model="$v.consultant.email.$model"  required/>
                        <div v-if="$v.consultant.email.$anyDirty && $v.consultant.email.$invalid">
                            <small class="form-text text-danger" v-if="!$v.consultant.email.required" v-text="$t('entity.validation.required')">
                                This field is required.
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('jhipsterApp.consultant.prenom')" for="consultant-prenom">Prenom</label>
                        <input type="text" class="form-control" name="prenom" id="consultant-prenom"
                            :class="{'valid': !$v.consultant.prenom.$invalid, 'invalid': $v.consultant.prenom.$invalid }" v-model="$v.consultant.prenom.$model"  required/>
                        <div v-if="$v.consultant.prenom.$anyDirty && $v.consultant.prenom.$invalid">
                            <small class="form-text text-danger" v-if="!$v.consultant.prenom.required" v-text="$t('entity.validation.required')">
                                This field is required.
                            </small>
                            <small class="form-text text-danger" v-if="!$v.consultant.prenom.minLength" v-text="$t('entity.validation.minlength', {min: 2})">
                                This field is required to be at least 2 characters.
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('jhipsterApp.consultant.disponibiliteMax')" for="consultant-disponibiliteMax">Disponibilite Max</label>
                        <input type="number" class="form-control" name="disponibiliteMax" id="consultant-disponibiliteMax"
                            :class="{'valid': !$v.consultant.disponibiliteMax.$invalid, 'invalid': $v.consultant.disponibiliteMax.$invalid }" v-model.number="$v.consultant.disponibiliteMax.$model"  required/>
                        <div v-if="$v.consultant.disponibiliteMax.$anyDirty && $v.consultant.disponibiliteMax.$invalid">
                            <small class="form-text text-danger" v-if="!$v.consultant.disponibiliteMax.required" v-text="$t('entity.validation.required')">
                                This field is required.
                            </small>
                            <small class="form-text text-danger" v-if="!$v.consultant.disponibiliteMax.numeric" v-text="$t('entity.validation.number')">
                                This field should be a number.
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('jhipsterApp.consultant.prestataire')" for="consultant-prestataire">Prestataire</label>
                        <select class="form-control" id="consultant-prestataire" name="prestataire" v-model="consultant.prestataire">
                            <option v-bind:value="null"></option>
                            <option v-bind:value="consultant.prestataire && prestataireOption.id === consultant.prestataire.id ? consultant.prestataire : prestataireOption" v-for="prestataireOption in prestataires" :key="prestataireOption.id">{{prestataireOption.nom}}</option>
                        </select>
                    </div>
                </div>
                <div>
                    <button type="button" id="cancel-save" class="btn btn-secondary" v-on:click="previousState()">
                        <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.cancel')">Cancel</span>
                    </button>
                    <button type="submit" id="save-entity" :disabled="$v.consultant.$invalid || isSaving" class="btn btn-primary">
                        <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script lang="ts" src="./consultant-update.component.ts">
</script>
