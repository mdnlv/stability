import { GetterTree, ActionTree, MutationTree } from "vuex";
import { Web3State } from "./web3Store";
import erc20 from "./abi/erc20.json";

interface TokenInfo {
	allowance: number;
	balance: number;
}

/**
 * @TODO required to refactor, to accept any ERC20
 */
export const state = () => ({
	addr: {
		31010: {
			usx: "0xba51Cf0C48407beeed64C524eFc51d57891AfEd1",
			hydro: "0x80dA9DF7EE07C8dE71725f62451A6623B79a4b53",
			stabilityFlash: "0x89C6a7995f63FB9b4BB5b75D72eeBf022F388452"
		}
	},
	hydro: {
		allowance: 0,
		balance: 0
	},
	usx: {
		allowance: 0,
		balance: 0
	}
});

export type Erc20State = ReturnType<typeof state>

export const mutations: MutationTree<Erc20State> = {
	setHydro(state, payload: TokenInfo) {
		state.hydro = payload;
	},

	setUsx(state, payload: TokenInfo) {
		state.usx = payload;
	}
};

export const actions: ActionTree<Erc20State, Erc20State> = {
	async initializeBalance (ctx: any, {address, chainId}) {
		const contractAddress = ctx.state.addr[chainId as number].stabilityFlash;

		const getUsxBalance = await ctx.getters.usx.methods.balanceOf(address).call();
		const getHydroBalance = await ctx.getters.hydro.methods.balanceOf(address).call();

		const getUsxAllowance = await ctx.getters.usx.methods.allowance(address, contractAddress).call();
		const getHydroAllowance = await ctx.getters.hydro.methods.allowance(address, contractAddress).call();

		ctx.commit("setHydro", {
			allowance: getHydroAllowance,
			balance: getHydroBalance
		});

		ctx.commit("setUsx", {
			allowance: getUsxAllowance,
			balance: getUsxBalance
		});
	},

	/**
	 * @dev approve max allowance for USX & Hydro
	 * 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF = 2**256 - 1
	 */
	async approveUsx(ctx: any, { address, chainId }) {
		const web3 = ctx.rootGetters["web3Store/instance"]();
		const contractAddress = ctx.state.addr[chainId as number].stabilityFlash;
		const MAX_VALUE = new web3.utils.BN("0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF");
		await ctx.getters.usx.methods.approve(contractAddress, MAX_VALUE).send({from: address});
	},

	async approveHydro(ctx: any, { address, chainId }) {
		const web3 = ctx.rootGetters["web3Store/instance"]();
		const contractAddress = ctx.state.addr[chainId as number].stabilityFlash;
		const MAX_VALUE = new web3.utils.BN("0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF");
		await ctx.getters.hydro.methods.approve(contractAddress, MAX_VALUE).send({from: address});
	}
};

export const getters: GetterTree<Erc20State, Web3State> = {

	/**
	 * @TODO implement abstract ERC20 store
	 */
	// instance: (state: any, _getters: any, store: any) => {
	// 	const web3 = store.web3Store.instance();
	// 	const addr = state.addr[store.web3Store.chainId as number].erc20;
	// 	return new web3.eth.Contract(erc20, addr);
	// },
	hydro: (state: any, _getters: any, store: any) => {
		const web3 = store.web3Store.instance();
		const addr = state.addr[store.web3Store.chainId as number].hydro;
		return new web3.eth.Contract(erc20, addr);
	},

	usx: (state: any, _getters: any, store: any) => {
		const web3 = store.web3Store.instance();
		const addr = state.addr[store.web3Store.chainId as number].usx;
		return new web3.eth.Contract(erc20, addr);
	},

	getHydroInfo: (state: any) => state.hydro,

	getUsxInfo: (state: any) => state.usx,

	getName: async (_state: any, getters: any, _store: any) => {
		return await getters.instance.methods.name().call();
	},

	getSymbol: async (_state: any, getters: any, _store: any) => {
		return await getters.instance.methods.symbol().call();
	},

};
