<template>
	<div>
		<LayoutStatBar>
			<StatCard>
				<h5>USX Price</h5>
				<TheLoader width="u-w-68">
					<p>{{ numberWithCommas(price.usx.toFixed(2)) }} USX</p>
				</TheLoader>
			</StatCard>
			<StatCard>
				<h5>HX Price</h5>
				<TheLoader width="u-w-59">
					<p>{{ numberWithCommas(price.hx.toFixed(2)) }} HX</p>
				</TheLoader>
			</StatCard>
			<StatCard>
				<h5>Rebalance fees in % of USX/HX</h5>
				<TheLoader width="u-w-24">
					<p>{{ rebalanceFee }}%</p>
				</TheLoader>
			</StatCard>
		</LayoutStatBar>
		<LayoutContainer>
			<LayoutTolerance>
				<StatCard>
					<h5>Peg In Range: <span>1.00 USX <TooltipIcon v-tooltip="'There is nothing to do when the price of USX is in range'" /></span></h5>
				</StatCard>
				<StatCard>
					<h5>Peg High: <TheLoader width="u-w-90"><span>{{ tolerance.high }} USX <TooltipIcon v-tooltip="'When the price of USX is above ' + tolerance.high + ', the above peg zone is enabled. You will be able to claim your rewards and burn HX'" /></span></TheLoader></h5>
				</StatCard>
				<StatCard>
					<h5>Peg Low: <TheLoader width="u-w-95"><span>{{ tolerance.low }} USX <TooltipIcon v-tooltip="'When the price of USX is below ' + tolerance.low + ', the below peg zone is enabled. You will be able to burn USX'" /></span></TheLoader></h5>
				</StatCard>
			</LayoutTolerance>
			<LayoutDataCardContainer>
				<TheLoader v-if="price.usx > tolerance.high" component="data-card-header">
					<DataCardHeader>
						<h3>Above peg zone is enabled</h3>
						<h5>Peg high: <span>Peg is above {{ tolerance.high }} USX</span></h5>
					</DataCardHeader>
				</TheLoader>
				<TheLoader v-else-if="price.usx < tolerance.low" component="data-card-header">
					<DataCardHeader>
						<h3>Below peg zone is enabled</h3>
						<h5>Peg low: <span>Peg is below {{ tolerance.low }} USX</span></h5>
					</DataCardHeader>
				</TheLoader>
				<TheLoader v-else component="data-card-header">
					<DataCardHeader>
						<h3>Peg zone is in range</h3>
						<h5>Peg normal: <span>Peg is 1.00 USX</span></h5>
					</DataCardHeader>
				</TheLoader>
				<LayoutDataCard>
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
					<DataCardLoader v-if="price.usx < tolerance.low && account !== ''">
						<p>Staked in vesting: </p>
						<h3>{{ numberWithCommas(stakedBalance.toFixed(2)) }}<sup>HX</sup></h3>
						<h5>${{ numberWithCommas(getStakedDollar(stakedBalance).toFixed(2)) }}</h5>
					</DataCardLoader>
					<DataCardLoader v-if="price.usx > tolerance.high && account !== ''">
						<p>Pending to claim:</p>
						<h3>{{ numberWithCommas(claimBalance.toFixed(2)) }}<sup>HX</sup></h3>
						<h5>${{ numberWithCommas(getClaimDollar(claimBalance).toFixed(2)) }}</h5>
					</DataCardLoader>
					<DataCardLoader v-if="price.usx > tolerance.low">
						<p>Your current claim ratio:</p>
						<h3>{{ claimRatio }}%</h3>
					</DataCardLoader>
					<DataCardLoader v-if="price.usx > tolerance.high">
						<p>Next claim date:</p>
						<TheCountdown v-if="account !== ''"/>
					</DataCardLoader>
					<DataCardLoader v-if="price.usx > tolerance.high">
						<p>Claim your profits:</p>
						<TheButton :disabled="account === '' || numberWithCommas(claimBalance.toFixed(2)) == 0 || !readyToClaim" @click="showModal">
							Claim
						</TheButton>
					</DataCardLoader>
					<TheModal v-if="price.usx > tolerance.high" v-show="isModalVisible" @close-modal="closeModal" @show-toast="showToast" />
					<TheToast v-show="isToastVisible" :toast-type="toastType" @close-toast="closeToast" />
				</LayoutDataCard>
				<TheLoader component="burn-card">
					<h4 v-if="price.usx <= tolerance.high && price.usx >= tolerance.low" class="in-range">
						USX is within peg range. There is nothing to do.
					</h4>
					<BurnCard v-if="price.usx > tolerance.high" title="USX is above the peg" token-burn="HX" token-receive="USX" />
					<BurnCard v-if="price.usx < tolerance.low" title="USX is below the peg" token-burn="USX" token-receive="HX" />
				</TheLoader>
			</LayoutDataCardContainer>
		</LayoutContainer>
	</div>
</template>

<script>
import TooltipIcon from "@/assets/images/svg/svg-tooltip.svg";

export default {
	name: "TheStabilityZone",
	components: {
		TooltipIcon
	},
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
			isToastVisible: false,
			tolerance: {
				high: 0,
				low: 0
			},
			account: "",
			toastType: ""
		};
	},
	head () {
		return {
			title: "Stability Zone | Ultrastable Money"
		};
	},
	computed: {
		readyToClaim() {
			return this.$store.getters["stabilityFlashStore/getReadyToClaim"];
		},
	},
	async mounted () {
		this.rebalanceFee = await this.$store.getters["stabilityFlashStore/getRebalanceFees"];
		this.price.usx = parseFloat(await this.$store.getters["stabilityFlashStore/getUSXPriceInUSDC"]);
		this.price.hx = parseFloat(await this.$store.getters["stabilityFlashStore/getHydroPriceInUSDC"]);
		this.claimRatio = await this.$store.getters["stabilityFlashStore/getClaimRatio"];
		this.tolerance.high = await this.$store.getters["stabilityFlashStore/getToleranceHigh"];
		this.stakedBalance = parseFloat(await this.$store.getters["stabilityFlashStore/getStakedBalance"]);
		this.tolerance.low = await this.$store.getters["stabilityFlashStore/getToleranceLow"];
		this.$store.commit("rootStore/setIsLoaded", true);

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
		showToast (type) {
			this.toastType = type;
			this.isToastVisible = true;
			document.body.classList.add("is-active");
		},
		closeToast () {
			this.isToastVisible = false;
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
