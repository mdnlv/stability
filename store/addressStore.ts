import { GetterTree } from "vuex";
import { Web3State } from "./web3Store";

export const state = () => ({
	addr: {
		/**
     * @dev Hydro Testnet
     */
		 31010: {
			stabilityFlash: "0x89C6a7995f63FB9b4BB5b75D72eeBf022F388452", // StabilityFlash.sol
			hydro: "0x80dA9DF7EE07C8dE71725f62451A6623B79a4b53", // HydroToken.sol
			usx: "0xba51Cf0C48407beeed64C524eFc51d57891AfEd1",
			router: "0xa9AEF39f1BCe4f72F9043902447ce1AB924e9C23", // UniswapV2Router02.sol
			controller: "0x346A078CF3AC9b3325623593980709aefCc1654a", // USXController.sol
			oracle: "0x23115c52172446b61C3CeF06D88B8E5AAb1BcF1B", // USXETHOracle.sol
			weth: "0xee9A7849f0bB033562f02fe0F08FBcea1292434b" // WETH.sol
		},
	}
});

export type ContractState = ReturnType<typeof state>

export const getters: GetterTree<ContractState, Web3State> = {
	stability: (state: any, _getters, store: any) => {
		const addr = state.addr[store.web3Store.chainId as number].stability;
		return addr;
	},

	stabilityFlash: (state: any, _getters, store: any) => {
		const addr = state.addr[store.web3Store.chainId as number].stabilityFlash;
		return addr;
	},

	hydro: (state: any, _getters, store: any) => {
		const addr = state.addr[store.web3Store.chainId as number].hydro;
		return addr;
	},

	router: (state: any, _getters, store: any) => {
		const addr = state.addr[store.web3Store].router;
		return addr;
	},

	controller: (state: any, _getters, store: any) => {
		const addr = state.addr[store.web3Store].controller;
		return addr;
	},

	oracle: (state: any, _getters, store: any) => {
		const addr = state.addr[store.web3Store].oracle;
		return addr;
	},

	weth: (state: any, _getters, store: any) => {
		const addr = state.addr[store.web3Store].weth;
		return addr;
	}
};
