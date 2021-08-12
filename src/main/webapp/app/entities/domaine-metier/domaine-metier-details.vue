<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <div v-if="domaineMetier">
                <h2 class="jh-entity-heading"><span v-text="$t('jhipsterApp.domaineMetier.detail.title')">DomaineMetier</span> {{domaineMetier.id}}</h2>
                <dl class="row jh-entity-details">
                    <dt>
                        <span v-text="$t('jhipsterApp.domaineMetier.nom')">Nom</span>
                    </dt>
                    <dd>
                        <span>{{domaineMetier.nom}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('jhipsterApp.domaineMetier.entreprise')">Entreprise</span>
                    </dt>
                    <dd>
                        <div v-if="domaineMetier.entreprise">
                            <router-link :to="{name: 'EntrepriseView', params: {entrepriseId: domaineMetier.entreprise.id}}">{{domaineMetier.entreprise.nom}}</router-link>
                        </div>
                    </dd>
                </dl>
                <button type="submit"
                        v-on:click.prevent="previousState()"
                        class="btn btn-info">
                    <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
                </button>
                <router-link v-if="domaineMetier.id" :to="{name: 'DomaineMetierEdit', params: {domaineMetierId: domaineMetier.id}}" tag="button" class="btn btn-primary">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.edit')"> Edit</span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./domaine-metier-details.component.ts">
</script>
