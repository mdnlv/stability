<template>
	<aside class="l-sidebar" :class="{ 'is-active': isNavClosed }">
		<TheLogo />
		<TheHamburger />
		<TheNav />
		<TheFooter />
	</aside>
</template>

<script>
export default {
	name: "LayoutSidebar",
	computed: {
		isNavClosed() {
			return this.$store.getters["nav/isActive"];
		}
	},
};
</script>
