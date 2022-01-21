<template>
	<div>
		<LayoutContainer>
			<h3>Dashboard</h3>
			<LayoutDataCardContainer>
				<LayoutDataCard>
					<DataCard>
						<p>USX price:</p>
						<h3>{{ numberWithCommas(price.usx.toFixed(2)) }}</h3>
					</DataCard>
					<DataCard>
						<p>HX price:</p>
						<h3>{{ numberWithCommas(price.hx.toFixed(2)) }}</h3>
					</DataCard>
					<DataCard v-for="(item, index) in items" :key="index">
						<p>{{ item.label }}:</p>
						<h3>{{ item.statistic }}</h3>
					</DataCard>
				</LayoutDataCard>
			</LayoutDataCardContainer>
		</LayoutContainer>
	</div>
</template>

<script>
export default {
	name: "TheDashboard",
	data () {
		return {
			price: {
				usx: 0,
				hx: 0
			},
			items: [
				{
					label: "Tolerance range",
					statistic: "5% around the peg"
				},
				{
					label: "HX minted last year",
					statistic: "8,302"
				},
				{
					label: "USX volatility last year",
					statistic: "2%"
				},
				{
					label: "HX burnt last year",
					statistic: "10,479"
				},
				{
					label: "USX time in tolerance range",
					statistic: "97%"
				},
				{
					label: "Average APY on vested HX",
					statistic: "917%"
				},
				{
					label: "Average ROI by stability arbitragers",
					statistic: "369%"
				}
			]
		};
	},
	head () {
		return {
			title: "Dashboard | Ultrastable Money"
		};
	},
	async mounted () {
		this.price.usx = parseFloat(await this.$store.getters["stabilityFlashStore/getUSXPriceInUSDC"]);
		this.price.hx = parseFloat(await this.$store.getters["stabilityFlashStore/getHydroPriceInUSDC"]);
	},
	methods: {
		/**
     * @TODO Hydro testnet requires https
     */
		// async requestNetwork () {
		//   await window.ethereum.request({
		//     method: 'wallet_addEthereumChain',
		//     params: [{
		//       chainId: 46292,
		//       chainName: 'HYDRO Testnet',
		//       nativeCurrency: {
		//         name: 'HYDRO Coin',
		//         symbol: 'tHYDRO',
		//         decimals: 18
		//       },
		//       rpcUrls: ['http://34.209.136.11:8545/'],
		//       blockExplorerUrls: ['http://34.209.136.11:8082/']
		//     }]
		//   })
		// }
	}
};
</script>
