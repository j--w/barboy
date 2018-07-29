<template>
	<!-- <div id="nav">
      <router-link to="/">Home</router-link> |
    </div> -->
	<nav
		class="navbar is-fixed-top is-primary"
		role="navigation">
		<div class="navbar-brand">
			<router-link
				to="/"
				tag="a"
				class="navbar-item">
				<img
					src="@/assets/logo.png"
					alt="Barboy Logo">
			</router-link>
      <a
        role="button"
        class="navbar-burger"
        :class="menuClasses"
        @click.prevent="toggleNav()">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
		</div>
		<div
			class="navbar-menu"
      :class="menuClasses">
			<div class="navbar-start">
				<router-link
					v-for="route in routes"
					:key="route.name"
					:to="route.path"
					tag="a"
					class="navbar-item">
					{{route.label || route.name.toUpperCase()}}
				</router-link>
			</div>
		</div>
	</nav>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { routes, BarboyRoute } from '@/router';

@Component
export default class Nav extends Vue {
  private routes: BarboyRoute[] = routes;
  private isActive: boolean = false;

  get menuClasses() {
    return {
      'is-active': this.isActive,
    };
  }

  public toggleNav() {
    this.isActive = !this.isActive;
  }
}
</script>