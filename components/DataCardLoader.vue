<template>
	<TheLoader component="data-card">
		<div class="data-card">
			<slot />
		</div>
	</TheLoader>
</template>

<script>
export default {
	name: "DataCardLoader"
};
</script>
