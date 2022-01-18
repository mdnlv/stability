<template>
	<div>
		<div class="l-stat-bar">
			<StatCard>
				<h5>USX Price</h5>
				<p>{{ numberWithCommas(price.usx.toFixed(2)) }} USX</p>
			</StatCard>
			<StatCard>
				<h5>HX Price</h5>
				<p>{{ numberWithCommas(price.hx.toFixed(2)) }} HX</p>
			</StatCard>
			<StatCard v-if="price.usx > tolerance.high">
				<h5>Tolerance High</h5>
				<p>{{ tolerance.high }} USX - Above peg zone enabled</p>
				<div class="indicator" />
			</StatCard>
			<StatCard v-else-if="price.usx < tolerance.low">
				<h5>Tolerance Low</h5>
				<p>{{tolerance.low}} USX - Below peg zone enabled</p>
				<div class="indicator" />
			</StatCard>
			<StatCard v-else>
				<h5>Tolerance Within Range</h5>
				<p>{{ numberWithCommas(price.usx.toFixed(2)) }} USX - There is nothing to do</p>
				<div class="indicator" />
			</StatCard>
			<StatCard>
				<h5>Rebalance fees in % of USX/HX</h5>
				<p>{{ rebalanceFee }}%</p>
			</StatCard>
		</div>
		<div class="l-container">
			<h3>Stability Zone</h3>
			<div class="l-data-card-container">
				<div class="l-data-card">
					<DataCard>
						<p>USX balance:</p>
						<h3>{{ numberWithCommas(usxBalance.toFixed(2)) }}<sup>USX</sup></h3>
						<h5>${{ numberWithCommas(getUSXDollar(usxBalance).toFixed(2)) }}</h5>
					</DataCard>
					<DataCard>
						<p>HX balance:</p>
						<h3>{{ numberWithCommas(hxBalance.toFixed(2)) }}<sup>HX</sup></h3>
						<h5>${{ numberWithCommas(getHydroDollar(hxBalance).toFixed(2)) }}</h5>
					</DataCard>
					<DataCard v-if="price.usx < tolerance.low">
						<p>Staked in vesting: </p>
						<h3>{{ numberWithCommas(stakedBalance.toFixed(2)) }}<sup>HX</sup></h3>
						<h5>${{ numberWithCommas(getStakedDollar(stakedBalance).toFixed(2)) }}</h5>
					</DataCard>
					<DataCard v-if="price.usx > tolerance.high">
						<p>Pending to claim:</p>
						<h3>{{ numberWithCommas(claimBalance.toFixed(2)) }}<sup>HX</sup></h3>
						<h5>${{ numberWithCommas(getClaimDollar(claimBalance).toFixed(2)) }}</h5>
					</DataCard>
					<DataCard v-if="price.usx > tolerance.low">
						<p>Your current claim ratio:</p>
						<h3>{{ claimRatio }}%</h3>
					</DataCard>
					<DataCard v-if="price.usx > tolerance.high">
						<p>Next claim date:</p>
						<TheCountdown />
					</DataCard>
					<DataCard v-if="price.usx > tolerance.high">
						<p>Claim your profits:</p>
						<TheButton :disabled="account === '' " @click="showModal">
							Claim
						</TheButton>
					</DataCard>
					<TheModal v-if="price.usx > tolerance.high" v-show="isModalVisible" @close-modal="closeModal" />
				</div>
				<h4 v-if="price.usx <= tolerance.high && price.usx >= tolerance.low" class="in-range">
					USX is within tolerance range. There is nothing to do.
				</h4>
				<BurnCard v-if="price.usx > tolerance.high" title="USX is above the peg" token-burn="HX" token-receive="USX" />
				<BurnCard v-if="price.usx < tolerance.low" title="USX is below the peg" token-burn="USX" token-receive="HX" />
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "TheStabilityZone",
	data () {
		return {
			price: {
				usx: 0,
				hx: 0
			},
			stakedBalance: 0,
			claimBalance: 0,
			claimRatio: 0,
			usxBalance: 0,
			hxBalance: 0,
			rebalanceFee: 0,
			isModalVisible: false,
			tolerance: {
				high: 0,
				low: 0
			},
			account: "",
		};
	},
	head () {
		return {
			title: "Stability Zone | Ultrastable Money"
		};
	},
	async mounted () {
		this.rebalanceFee = await this.$store.getters["stabilityFlashStore/getRebalanceFees"];
		this.price.usx = parseFloat(await this.$store.getters["stabilityFlashStore/getUSXPriceInUSDC"]);
		this.price.hx = parseFloat(await this.$store.getters["stabilityFlashStore/getHydroPriceInUSDC"]);
		this.claimRatio = await this.$store.getters["stabilityFlashStore/getClaimRatio"];
		this.tolerance.high = await this.$store.getters["stabilityFlashStore/getToleranceHigh"];
		this.stakedBalance = parseFloat(await this.$store.getters["stabilityFlashStore/getStakedBalance"]);
		this.tolerance.low = await this.$store.getters["stabilityFlashStore/getToleranceLow"];

		this.$store.watch((state) => {
			const web3 = this.$store.getters["web3Store/instance"]();
			this.hxBalance = +web3.utils.fromWei(state.erc20Store.hydro.balance.toString(), "ether");
			this.usxBalance = +web3.utils.fromWei(state.erc20Store.usx.balance.toString(), "ether");
			this.account = state.web3Store.account;
		});
	},
	methods: {
		showModal () {
			this.isModalVisible = true;
			document.body.classList.add("is-active");
		},
		closeModal () {
			this.isModalVisible = false;
			document.body.classList.remove("is-active");
		},
		getUSXDollar(val) {
			return val * this.price.usx;
		},
		getHydroDollar(val) {
			return val * this.price.hx;
		},
		getStakedDollar(val) {
			return val * this.price.hx;
		},
		getClaimDollar(val) {
			return val * this.price.hx;
		},
	}
};
</script>
