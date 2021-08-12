<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <form name="editForm" role="form" novalidate v-on:submit.prevent="save()" >
                <h2 id="jhipsterApp.ligneAffectation.home.createOrEditLabel" v-text="$t('jhipsterApp.ligneAffectation.home.createOrEditLabel')">Create or edit a LigneAffectation</h2>
                <div>
                    <div class="form-group" v-if="ligneAffectation.id">
                        <label for="id" v-text="$t('global.field.id')">ID</label>
                        <input type="text" class="form-control" id="id" name="id"
                               v-model="ligneAffectation.id" readonly />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('jhipsterApp.ligneAffectation.typeAffectation')" for="ligne-affectation-typeAffectation">Type Affectation</label>
                        <input type="text" class="form-control" name="typeAffectation" id="ligne-affectation-typeAffectation"
                            :class="{'valid': !$v.ligneAffectation.typeAffectation.$invalid, 'invalid': $v.ligneAffectation.typeAffectation.$invalid }" v-model="$v.ligneAffectation.typeAffectation.$model"  required/>
                        <div v-if="$v.ligneAffectation.typeAffectation.$anyDirty && $v.ligneAffectation.typeAffectation.$invalid">
                            <small class="form-text text-danger" v-if="!$v.ligneAffectation.typeAffectation.required" v-text="$t('entity.validation.required')">
                                This field is required.
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('jhipsterApp.ligneAffectation.nbjourhome')" for="ligne-affectation-nbjourhome">Nbjourhome</label>
                        <input type="number" class="form-control" name="nbjourhome" id="ligne-affectation-nbjourhome"
                            :class="{'valid': !$v.ligneAffectation.nbjourhome.$invalid, 'invalid': $v.ligneAffectation.nbjourhome.$invalid }" v-model.number="$v.ligneAffectation.nbjourhome.$model"  required/>
                        <div v-if="$v.ligneAffectation.nbjourhome.$anyDirty && $v.ligneAffectation.nbjourhome.$invalid">
                            <small class="form-text text-danger" v-if="!$v.ligneAffectation.nbjourhome.required" v-text="$t('entity.validation.required')">
                                This field is required.
                            </small>
                            <small class="form-text text-danger" v-if="!$v.ligneAffectation.nbjourhome.numeric" v-text="$t('entity.validation.number')">
                                This field should be a number.
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('jhipsterApp.ligneAffectation.projet')" for="ligne-affectation-projet">Projet</label>
                        <select class="form-control" id="ligne-affectation-projet" name="projet" v-model="ligneAffectation.projet">
                            <option v-bind:value="null"></option>
                            <option v-bind:value="ligneAffectation.projet && projetOption.id === ligneAffectation.projet.id ? ligneAffectation.projet : projetOption" v-for="projetOption in projets" :key="projetOption.id">{{projetOption.nom}}</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('jhipsterApp.ligneAffectation.consultant')" for="ligne-affectation-consultant">Consultant</label>
                        <select class="form-control" id="ligne-affectation-consultant" name="consultant" v-model="ligneAffectation.consultant">
                            <option v-bind:value="null"></option>
                            <option v-bind:value="ligneAffectation.consultant && consultantOption.id === ligneAffectation.consultant.id ? ligneAffectation.consultant : consultantOption" v-for="consultantOption in consultants" :key="consultantOption.id">{{consultantOption.email}}</option>
                        </select>
                    </div>
                </div>
                <div>
                    <button type="button" id="cancel-save" class="btn btn-secondary" v-on:click="previousState()">
                        <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.cancel')">Cancel</span>
                    </button>
                    <button type="submit" id="save-entity" :disabled="$v.ligneAffectation.$invalid || isSaving" class="btn btn-primary">
                        <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script lang="ts" src="./ligne-affectation-update.component.ts">
</script>
