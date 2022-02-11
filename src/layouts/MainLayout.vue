<template>
	<q-layout view="lHr lpR fFf">
		<!-- header -->
		<q-header bordered class="bg-white text-black">
			<q-toolbar>
				<q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

				<q-toolbar-title class="text-weight-bold">
					<!-- Will appear when window is greater than small -->
					<!-- {{$route.name}} gives the name of the file we give it the route.js file -->
					<span class="gt-sm"> {{ $route.name }} </span>
					<q-icon
						name="flight"
						size="sm"
						color="primary"
						class="q-pa-md lt-md header-icon"
					/>
				</q-toolbar-title>
			</q-toolbar>
		</q-header>
		<!-- left drawer -->
		<q-drawer
			show-if-above
			v-model="leftDrawerOpen"
			side="left"
			:width="283"
			bordered
		>
			<q-icon name="flight" size="lg" color="primary" class="q-pa-md" />
			<!-- Left Nav Bar -->
			<q-list>
				<!--Home -->
				<q-item to="/" clickable v-ripple exact>
					<q-item-section avatar>
						<q-icon name="home" size="md" />
					</q-item-section>
					<q-item-section class="text-h6 text-weight-bold">Home</q-item-section>
				</q-item>
				<!-- About, exact filters between the active   -->
				<q-item to="/about" clickable v-ripple exact>
					<q-item-section avatar>
						<q-icon name="help" size="md" />
					</q-item-section>
					<q-item-section class="text-h6 text-weight-bold"
						>About</q-item-section
					>
				</q-item>
			</q-list>
		</q-drawer>
		<!-- Right Drawer -->
		<q-drawer show-if-above v-model="rightDrawerOpen" side="right" bordered>
			<!-- drawer content -->
			<q-input placeholder="Search" dense outlined rounded class="q-ma-md">
				<template v-slot:prepend>
					<q-icon name="search" />
				</template>
			</q-input>
			<!-- News Feed -->
			<q-list padding separator>
				<q-item class="q-pa-md">
					<q-item-section>
						<q-item-label overline class="text-grey">Bird News</q-item-label>
						<q-item-label class="text-weight-bold"
							>Daily Bird Article</q-item-label
						>
						<q-item-label caption
							>Secondary line text. Lorem ipsum dolor sit amet, consectetur
							adipiscit elit.</q-item-label
						>
					</q-item-section>

					<q-item-section side top>
						<q-item-label caption>5 min ago</q-item-label>
					</q-item-section>
				</q-item>
				<q-item class="q-pa-md">
					<q-item-section>
						<q-item-label overline class="text-grey">Bird News</q-item-label>
						<q-item-label class="text-weight-bold"
							>Daily Bird Article</q-item-label
						>
						<q-item-label caption
							>Secondary line text. Lorem ipsum dolor sit amet, consectetur
							adipiscit elit.</q-item-label
						>
					</q-item-section>

					<q-item-section side top>
						<q-item-label caption>5 min ago</q-item-label>
					</q-item-section>
				</q-item>
				<q-item class="q-pa-md">
					<q-item-section>
						<q-item-label overline class="text-grey">Bird News</q-item-label>
						<q-item-label class="text-weight-bold"
							>Daily Bird Article</q-item-label
						>
						<q-item-label caption
							>Secondary line text. Lorem ipsum dolor sit amet, consectetur
							adipiscit elit.</q-item-label
						>
					</q-item-section>

					<q-item-section side top>
						<q-item-label caption>5 min ago</q-item-label>
					</q-item-section>
				</q-item>
			</q-list>
		</q-drawer>

		<q-page-container>
			<keep-alive>
				<router-view />
			</keep-alive>
		</q-page-container>
	</q-layout>
</template>

<script>
import { ref } from 'vue';

export default {
	setup() {
		const leftDrawerOpen = ref(false);
		const rightDrawerOpen = ref(false);

		return {
			leftDrawerOpen,
			toggleLeftDrawer() {
				leftDrawerOpen.value = !leftDrawerOpen.value;
			},

			rightDrawerOpen,
			toggleRightDrawer() {
				rightDrawerOpen.value = !rightDrawerOpen.value;
			},
		};
	},
};
</script>
<style lang="sass">
.header-icon
  position: absolute
  bottom: 0
  left: 50%
  transform: translateX(-50%)
</style>
