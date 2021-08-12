<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <div v-if="consultant">
                <h2 class="jh-entity-heading"><span v-text="$t('jhipsterApp.consultant.detail.title')">Consultant</span> {{consultant.id}}</h2>
                <dl class="row jh-entity-details">
                    <dt>
                        <span v-text="$t('jhipsterApp.consultant.nom')">Nom</span>
                    </dt>
                    <dd>
                        <span>{{consultant.nom}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('jhipsterApp.consultant.matricule')">Matricule</span>
                    </dt>
                    <dd>
                        <span>{{consultant.matricule}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('jhipsterApp.consultant.email')">Email</span>
                    </dt>
                    <dd>
                        <span>{{consultant.email}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('jhipsterApp.consultant.prenom')">Prenom</span>
                    </dt>
                    <dd>
                        <span>{{consultant.prenom}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('jhipsterApp.consultant.disponibiliteMax')">Disponibilite Max</span>
                    </dt>
                    <dd>
                        <span>{{consultant.disponibiliteMax}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('jhipsterApp.consultant.prestataire')">Prestataire</span>
                    </dt>
                    <dd>
                        <div v-if="consultant.prestataire">
                            <router-link :to="{name: 'PrestataireView', params: {prestataireId: consultant.prestataire.id}}">{{consultant.prestataire.nom}}</router-link>
                        </div>
                    </dd>
                </dl>
                <button type="submit"
                        v-on:click.prevent="previousState()"
                        class="btn btn-info">
                    <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
                </button>
                <router-link v-if="consultant.id" :to="{name: 'ConsultantEdit', params: {consultantId: consultant.id}}" tag="button" class="btn btn-primary">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.edit')"> Edit</span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./consultant-details.component.ts">
</script>
