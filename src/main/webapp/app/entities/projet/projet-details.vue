<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <div v-if="projet">
                <h2 class="jh-entity-heading"><span v-text="$t('jhipsterApp.projet.detail.title')">Projet</span> {{projet.id}}</h2>
                <dl class="row jh-entity-details">
                    <dt>
                        <span v-text="$t('jhipsterApp.projet.nom')">Nom</span>
                    </dt>
                    <dd>
                        <span>{{projet.nom}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('jhipsterApp.projet.datedebut')">Datedebut</span>
                    </dt>
                    <dd>
                        <span v-if="projet.datedebut">{{$d(Date.parse(projet.datedebut), 'long') }}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('jhipsterApp.projet.nbjourhome')">Nbjourhome</span>
                    </dt>
                    <dd>
                        <span>{{projet.nbjourhome}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('jhipsterApp.projet.domaineMetier')">Domaine Metier</span>
                    </dt>
                    <dd>
                        <div v-if="projet.domaineMetier">
                            <router-link :to="{name: 'DomaineMetierView', params: {domaineMetierId: projet.domaineMetier.id}}">{{projet.domaineMetier.nom}}</router-link>
                        </div>
                    </dd>
                </dl>
                <button type="submit"
                        v-on:click.prevent="previousState()"
                        class="btn btn-info">
                    <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
                </button>
                <router-link v-if="projet.id" :to="{name: 'ProjetEdit', params: {projetId: projet.id}}" tag="button" class="btn btn-primary">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.edit')"> Edit</span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./projet-details.component.ts">
</script>
