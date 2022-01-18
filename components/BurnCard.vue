<template>
	<div class="burn-card">
		<div class="burn-card__addon">
			<h3>{{ title }}</h3>
		</div>
		<div class="input">
			<div class="input__container">
				<input
					v-model="burn.value"
					placeholder="0.0"
					type="number"
					min="0"
					max="79"
					autocomplete="off"
					autocorrect="off"
					spellcheck="false"
					inputmode="decimal"
				>
				<TheButton :disabled="isDisabled" title="Click to burn" @click="burnTokens">
					Burn {{ tokenBurn }}
				</TheButton>

				<TheButton v-if="account !== ''" :disabled="account === '' " title="Click to approve" @click="approveTokens">
					Approve {{ tokenBurn }}
				</TheButton>
			</div>
		</div>
		<div v-if="burn.value > 0" class="burn-card__price">
			<p>You will get <span>{{ numberWithCommas(usxPrice.toFixed(2)) }} {{ tokenReceive }}</span> worth <span>${{ numberWithCommas(dollarPrice.toFixed(2)) }}</span></p>
			<p v-if="account === ''">Please connect your wallet to burn {{ tokenBurn }}.</p>
			<p v-if="tokenBurn === 'USX'">
				Vested until peg is restored earning 236% APY
			</p>
		</div>
	</div>
</template>

<script>
export default {
	name: "BurnCard",
	props: {
		title: {
			type: String,
			required: true
		},
		tokenBurn: {
			type: String,
			required: true
		},
		tokenReceive: {
			type: String,
			required: true
		}
	},
	// @TODO
	data () {
		return {
			burn: {
				value: null,
				usx: 632.29,
				dollar: 675.29
			},
			allowance: {
				usx: 0,
				hx: 0
			},
			account: ""
		};
	},
	computed: {
		isDisabled () {
			return this.burn.value <= 0 || this.account === "";
		},
		dollarPrice () {
			return this.burn.value * this.burn.dollar;
		},
		usxPrice () {
			return this.burn.value * this.burn.usx;
		},
		isApprove () {
			return false;
		}
	},
	mounted() {
		this.$store.watch((state) => {
			this.account = state.web3Store.account;
		});
	},
	methods: {
		async burnTokens() {
			const contractAddress = this.$store.getters["addressStore/stabilityFlash"];

			if (this.tokenBurn === "HX" && this.account !== "") {
				const hydroAllowance = await this.$store.getters["erc20Store/hydro"].methods.allowance(this.account, contractAddress).call();
				this.allowance.hx = hydroAllowance;
				await this.$store.dispatch("stabilityFlashStore/burnHydro", {
					address: this.account,
					amount: this.burn.value
				});
			}

			if (this.tokenBurn === "USX" && this.account !== "") {
				const usxAllowance = await this.$store.getters["erc20Store/usx"].methods.allowance(this.account, contractAddress).call();
				this.allowance.usx = usxAllowance;
				await this.$store.dispatch("stabilityFlashStore/burnUsx", {
					address: this.account,
					amount: this.burn.value
				});
			}
		},

		async approveTokens() {
			if (this.tokenBurn === "HX" && this.account !== "") {
				await this.$store.dispatch("erc20Store/approveHydro", {
					address: this.account,
					chainId: this.$store.getters["web3Store/chainId"]
				});
			}
			if (this.tokenBurn === "USX" && this.account !== "") {
				await this.$store.dispatch("erc20Store/approveUsx", {
					address: this.account,
					chainId: this.$store.getters["web3Store/chainId"]
				});
			}
		}
	}
};
</script>
