import { GetterTree, ActionTree, MutationTree } from "vuex";
import { Web3State } from "./web3Store";
import boardroom from "./abi/boardroom.json";

export const state = () => ({
	addr: {
		31010: {
			boardroom: "0xF1DbE13275E34E0aB19395E89b56a5d94C573552"
		}
	},
});

export type BoardroomState = ReturnType<typeof state>;

export const mutations: MutationTree<BoardroomState> = {};

export const actions: ActionTree<BoardroomState, BoardroomState> = {};

export const getters: GetterTree<BoardroomState, Web3State> = {
	instance: (state: any, _getters: any, store: any) => {
		const web3 = store.web3Store.instance();
		const addr = state.addr[store.web3Store.chainId as number].boardroom;
		return new web3.eth.Contract(boardroom, addr);
	},

	getEarned: async (_state: any, getters: any, store: any ) => {
		const web3 = store.web3Store.instance();
		/** @TODO Change address to current user connected **/
		return web3.utils.fromWei(await getters.instance.methods.earned("0x0e11924EE7DA81B3d9aBcc2339e562fc3747B3Bf").call());
	}
};
