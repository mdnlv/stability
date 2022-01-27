import { GetterTree, ActionTree, MutationTree } from "vuex";

export const state = () => ({
	isLoaded: false
});

export type RootState = ReturnType<typeof state>

export const mutations: MutationTree<RootState> = {
	setIsLoaded (state, payload) {
		state.isLoaded = payload;
	},
};

export const actions: ActionTree<RootState, RootState> = {};

export const getters: GetterTree<RootState, RootState> = {
	getIsLoaded: state => state.isLoaded,
};
