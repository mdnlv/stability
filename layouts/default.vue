<template>
	<div id="l-content">
		<TheHeader />
		<div class="l-main">
			<Nuxt />
		</div>
		<TheFooter />
	</div>
</template>

<script>
export default {
	name: "TheDefault",
	layout: "default",
	head () {
		return {
			title: "Dashboard - Ultrastable Money",
			meta: [
				{
					hid: "description",
					name: "description",
					content: "Dashboard description"
				}
			]
		};
	}
};
</script>

<style lang="scss">
@import "~/assets/stylesheets/main";
</style>
