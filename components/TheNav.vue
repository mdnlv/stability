<template>
	<nav class="nav">
		<nuxt-link to="/" title="Click to visit the dashboard">
			Dashboard
		</nuxt-link>
		<nuxt-link to="/caldron" title="Click to visit caldron">
			Caldron
		</nuxt-link>
		<nuxt-link to="/stability-zone" title="Click to visit the stability zone">
			Stability Zone
		</nuxt-link>
		<nuxt-link to="/boardroom" title="Click to visit the boardroom">
			Boardroom
		</nuxt-link>
		<nuxt-link to="/swap" title="Click to visit swap">
			Swap
		</nuxt-link>
		<nuxt-link to="#" title="Click to visit the documentation">
			Documentation <ExternalLinkSvg />
		</nuxt-link>
	</nav>
</template>

<script>
import ExternalLinkSvg from "@/assets/images/svg/svg-external-link.svg";
export default {
	name: "TheNav",
	components: {
		ExternalLinkSvg
	}
};
</script>
