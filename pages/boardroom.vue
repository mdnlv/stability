<template>
	<div>
		<LayoutStatBar columns="4">
			<StatCard>
				<h5>Rewards earned</h5>
				<TheLoader>
					<p>{{ numberWithCommas(earned.toFixed(2)) }} HX</p>
				</TheLoader>
			</StatCard>
		</LayoutStatBar>
		<LayoutContainer>
			<h3>Boardroom</h3>
		</LayoutContainer>
	</div>
</template>

<script>
export default {
	name: "TheBoardroom",

	data() {
		return {
			earned: 0
		};
	},

	head() {
		return {
			title: "Boardroom | Ultrastable Money"
		};
	},

	async mounted() {
		this.earned = parseFloat(await this.$store.getters["boardroomStore/getEarned"]);
		this.$store.commit("rootStore/setIsLoaded", true);

		this.$store.watch((state) => state.web3Store.account,
			async ()=> {
				this.earned = parseFloat(await this.$store.getters["boardroomStore/getEarned"]);
			}
		);
	}
};
</script>
