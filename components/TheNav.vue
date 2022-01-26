<template>
	<ul class="nav">
		<li v-for="(link, index) in links" :key="index">
			<nuxt-link :to="link.url" :title="`Click to visit the ${link.name}`">{{ link.name }}</nuxt-link>
		</li>
		<a href="https://hydrolabs.gitbook.io/inflation-adjusted-algorithmic-stablecoin/" title="Click to visit the documentation" target="_blank" rel="noopener noreferrer">Documentation <ExternalLinkSvg /></a>
	</ul>
</template>

<script>
import ExternalLinkSvg from "@/assets/images/svg/svg-external-link.svg";
export default {
	name: "TheNav",
	components: {
		ExternalLinkSvg
	},
	data() {
		return {
			links: [
				{
					name: "Dashboard",
					url: "/"
				},
				{
					name: "Caldron",
					url: "/caldron"
				},
				{
					name: "Stability Zone",
					url: "/stability-zone"
				},
				{
					name: "Boardroom",
					url: "/boardroom"
				},
				{
					name: "Swap",
					url: "/swap"
				}
			]
		};
	},
};
</script>
