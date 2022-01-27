<template>
	<div class="wallet">
		<TheButton v-if="!isConnected" title="Click to connect wallet" @click="connect">
			Connect Wallet
		</TheButton>
		<div v-else class="wallet__details">
			<Jazzicon :address="account" :diameter="28" />
			<TheButton title="Click to disconnect wallet" @click="disconnect">
				<span>{{ accountSlice }}</span>
			</TheButton>
		</div>
	</div>
</template>

<script>
import Jazzicon from "vue-jazzicon";

export default {
	name: "TheWallet",
	components: {
		[Jazzicon.name]: Jazzicon,
	},
	data () {
		return {
			web3: null,
			account: null,
			balance: null,
			isConnected: false,
		};
	},

	computed: {
		accountSlice () {
			const addr = this.account;
			if (!addr) {
				return "";
			} else {
				return `${addr.slice(0, 5)}...${addr.slice(38, 42)}`;
			}
		},
	},

	mounted () {
		/**
     * @TODO check if the web3 givenProvider, needs to be changed
     */
		this.$store.dispatch("web3Store/init");

		window.ethereum.on("chainChanged", async (chainId) => {
			this.$store.commit("web3Store/setChainId", parseInt(chainId));
			const balance = await this.web3.eth.getBalance(this.account);
			this.$store.commit("web3Store/setBalance", balance);
		});

		this.$store.watch((state) => {
			this.account = state.web3Store.account;
			this.balance = state.web3Store.balance;
		});
	},

	methods: {
		async connect () {
			await this.$store.dispatch("web3Store/connect");
			this.web3 = this.$store.getters["web3Store/instance"]();
			this.$store.dispatch("erc20Store/initializeBalance", {
				address: this.account,
				chainId: this.$store.getters["web3Store/chainId"],
				web3: this.web3
			});

			this.isConnected = true;
		},

		disconnect () {
			this.isConnected = false;
			this.$store.dispatch("web3Store/disconnect");
		}
	}
};
</script>
