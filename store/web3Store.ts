import { GetterTree, ActionTree, MutationTree } from "vuex";
import Web3 from "web3";

declare let window: any;
declare let ethereum: any;

export const state = () => ({
	instance: () => (
		new Web3(new Web3.providers.HttpProvider("https://eth-private-testnet-poa.hydrogenx.tk/"))
	),
	balance: 0,
	account: "",
	error: null,
	chainId: null,
});

export type Web3State = ReturnType<typeof state>

export const mutations: MutationTree<Web3State> = {
	setWeb3 (state, payload) {
		state.instance = payload;
	},
	setBalance (state, payload) {
		state.balance = payload;
	},
	setAccount (state, payload) {
		state.account = payload;
	},
	setChainId (state, payload) {
		state.chainId = payload;
	},
};

export const actions: ActionTree<Web3State, Web3State> = {
	/**
   * @dev initialize with default web3 values
   */
	init ({ commit }) {
		if (window.ethereum) {
			// const chainId = 46292;
			const chainId = 31010;
			/**
       * @TODO use correct `HttpProvider` for production
       */
			const web3 = new Web3(new Web3.providers.HttpProvider("https://eth-private-testnet-poa.hydrogenx.tk/"));

			commit("setWeb3", () => web3);
			commit("setChainId", chainId);
		}
	},

	async connect ({ commit }) {
		if (window.ethereum) {
			try {
				const [account] = await window.ethereum.request({ method: "eth_requestAccounts" });
				const chainId = await window.ethereum.request({ method: "eth_chainId" });
				const web3 = new Web3(Web3.givenProvider);
				const balance = await web3.eth.getBalance(account);

				commit("setAccount", account);
				commit("setWeb3", () => web3);
				commit("setBalance", balance);
				commit("setChainId", parseInt(chainId));

				ethereum.on("accountsChanged", async (accounts: string[]) => {
					const balance = await web3.eth.getBalance(accounts[0]);
					commit("setAccount", accounts[0]);
					commit("setBalance", balance);
				});
				/**
       * @TODO implement error handling
       */
			} catch (e) {
				console.log(e);
			}
		}
	},

	disconnect ({ commit }) {
		commit("setAccount", "");
	}
};

export const getters: GetterTree<Web3State, Web3State> = {
	instance: state => state.instance,
	balance: state => state.balance,
	account: (state) => {
		if (state.account === "") {
			return "";
		}
		return state.account;
	},
	chainId: state => state.chainId,
};
