<template>
	<LayoutContent>
		<TheHeader />
		<LayoutMain>
			<Nuxt />
		</LayoutMain>
		<TheFooter />
	</LayoutContent>
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
