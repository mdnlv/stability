import Vue from "vue";

Vue.mixin({
	computed: {
		isLoaded() {
			return this.$store.getters["rootStore/getIsLoaded"];
		}
	},
	methods: {
		numberWithCommas (x) {
			return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		}
	}
});
