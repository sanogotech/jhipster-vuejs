<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <form name="editForm" role="form" novalidate v-on:submit.prevent="save()" >
                <h2 id="jhipsterApp.entreprise.home.createOrEditLabel" v-text="$t('jhipsterApp.entreprise.home.createOrEditLabel')">Create or edit a Entreprise</h2>
                <div>
                    <div class="form-group" v-if="entreprise.id">
                        <label for="id" v-text="$t('global.field.id')">ID</label>
                        <input type="text" class="form-control" id="id" name="id"
                               v-model="entreprise.id" readonly />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('jhipsterApp.entreprise.nom')" for="entreprise-nom">Nom</label>
                        <input type="text" class="form-control" name="nom" id="entreprise-nom"
                            :class="{'valid': !$v.entreprise.nom.$invalid, 'invalid': $v.entreprise.nom.$invalid }" v-model="$v.entreprise.nom.$model"  required/>
                        <div v-if="$v.entreprise.nom.$anyDirty && $v.entreprise.nom.$invalid">
                            <small class="form-text text-danger" v-if="!$v.entreprise.nom.required" v-text="$t('entity.validation.required')">
                                This field is required.
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('jhipsterApp.entreprise.secteur')" for="entreprise-secteur">Secteur</label>
                        <select class="form-control" name="secteur" :class="{'valid': !$v.entreprise.secteur.$invalid, 'invalid': $v.entreprise.secteur.$invalid }" v-model="$v.entreprise.secteur.$model" id="entreprise-secteur"  required>
                            <option value="ELECTRICITE" v-bind:label="$t('jhipsterApp.Secteur.ELECTRICITE')">ELECTRICITE</option>
                            <option value="EAU" v-bind:label="$t('jhipsterApp.Secteur.EAU')">EAU</option>
                            <option value="TELECOM" v-bind:label="$t('jhipsterApp.Secteur.TELECOM')">TELECOM</option>
                            <option value="ENERGIE" v-bind:label="$t('jhipsterApp.Secteur.ENERGIE')">ENERGIE</option>
                        </select>
                        <div v-if="$v.entreprise.secteur.$anyDirty && $v.entreprise.secteur.$invalid">
                            <small class="form-text text-danger" v-if="!$v.entreprise.secteur.required" v-text="$t('entity.validation.required')">
                                This field is required.
                            </small>
                        </div>
                    </div>
                </div>
                <div>
                    <button type="button" id="cancel-save" class="btn btn-secondary" v-on:click="previousState()">
                        <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.cancel')">Cancel</span>
                    </button>
                    <button type="submit" id="save-entity" :disabled="$v.entreprise.$invalid || isSaving" class="btn btn-primary">
                        <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script lang="ts" src="./entreprise-update.component.ts">
</script>
