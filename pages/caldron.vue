<template>
	<div>
		<div class="l-stat-bar">
			<StatCard>
				<h5>Total Collateral Value</h5>
				<p>{{ numberWithCommas(value.toFixed(2)) }} USX</p>
			</StatCard>
			<StatCard>
				<h5>Collateral APY</h5>
				<p>{{ apy.toFixed(2) }}%</p>
			</StatCard>
			<StatCard>
				<h5>Inflation AirDrop APR</h5>
				<p>{{ apr.toFixed(2) }}%</p>
			</StatCard>
			<StatCard>
				<h5>Collateralization Ratio</h5>
				<p>{{ ratio.toFixed(2) }}</p>
			</StatCard>
		</div>
		<div class="l-container l-container--sm">
			<h3>Caldron</h3>
			<TheCaldron />
		</div>
	</div>
</template>

<script>
export default {
	name: "TheCollateralVault",
	data () {
		return {
			value: 10288626657,
			apy: 247.05,
			apr: 3.09,
			ratio: 1.00
		};
	},
	head () {
		return {
			title: "Collateral Vault | Ultrastable Money"
		};
	}
};
</script>
