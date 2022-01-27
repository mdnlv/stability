import { GetterTree, ActionTree, MutationTree } from "vuex";
import { Web3State } from "./web3Store";
import stabilityFlash from "./abi/stability_flash.json";

/**
 * @dev Smart contracts being exposed from:
 * Hydro-Ecosystem: contracts/USX/StabilityFlash.sol
 */
export const state = () => ({
	addr: {
		/**
     * @dev Hydro Testnet
     */
		31010: {
			stabilityFlash: "0x89C6a7995f63FB9b4BB5b75D72eeBf022F388452"
		}
	},

	readyToClaim: false
});

export type StabilityState = ReturnType<typeof state>

export const mutations: MutationTree<StabilityState> = {
	setReadyToClaim (state, payload) {
		state.readyToClaim = payload;
	},
};

export const actions: ActionTree<StabilityState, StabilityState> = {
	async getuser(ctx: any, { address }) {
		const getUser = await ctx.getters.instance.methods.getUser(address).call();
		console.log(getUser);
	},

	async getViewEarned(ctx: any, { address }) {
		const viewEarned = await ctx.getters.instance.methods.viewEarned(address).call();
		console.log(viewEarned);
	},

	async burnHydro(ctx: any, { address, amount }) {
		const web3 = ctx.rootGetters["web3Store/instance"]();
		await ctx.getters.instance.methods.burnHYDRO(
			web3.utils.toWei(amount.toString())
		).send({from: address});
	},

	async burnUsx(ctx: any, { address, amount }) {
		const web3 = ctx.rootGetters["web3Store/instance"]();
		await ctx.getters.instance.methods.burnUSX(
			web3.utils.toWei(amount.toString())
		).send({from: address});
	},

	async claimHydroProfits(ctx: any, {_claimInHYDRO, _paidIn, _HYDROToChosenRoute}) {
		await ctx.getters.instance.methods.claimHYDROProfits(_claimInHYDRO, _paidIn, _HYDROToChosenRoute);
	},
};

export const getters: GetterTree<StabilityState, Web3State> = {
	instance: (state: any, _getters: any, store: any) => {
		const web3 = store.web3Store.instance();
		const addr = state.addr[store.web3Store.chainId as number].stabilityFlash;
		return new web3.eth.Contract(stabilityFlash, addr);
	},

	getToleranceHigh: async (_state: any, getters: any, store: any) => {
		const web3 = store.web3Store.instance();
		return web3.utils.fromWei(await getters.instance.methods.toleranceHigh().call());
	},

	getToleranceLow: async (_state: any, getters: any, store: any) => {
		const web3 = store.web3Store.instance();
		return web3.utils.fromWei(await getters.instance.methods.toleranceLow().call());
	},

	getRebalanceFees: async (_state: any, getters: any, _store: any) => {
		return await getters.instance.methods.mintingFees().call();
	},

	getStakedBalance: async (_state: any, getters: any, store: any) => {
		const web3 = store.web3Store.instance();
		return store.web3Store.account ? web3.utils.fromWei(await getters.instance.methods.viewStakedBalance(store.web3Store.account).call()) : 0;
	},

	getClaimRatio: async (_state: any, getters: any, _store: any) => {
		return await getters.instance.methods.claimRatio().call();
	},

	getHydroPriceInUSDC: async (_state: any, getters: any, store: any) => {
		const web3 = store.web3Store.instance();
		return web3.utils.fromWei(await getters.instance.methods.getHYDROPriceInUSDC().call());
	},

	getUSXPriceInUSDC: async (_state: any, getters: any, store: any) => {
		const web3 = store.web3Store.instance();
		return web3.utils.fromWei(await getters.instance.methods.getUSXPriceInUSDC().call());
	},

	getViewRatio: (_state: any, getters: any, _store: any) => {
		return getters.instance.methods;
	},

	getReadyToClaim: state => state.readyToClaim,
};
