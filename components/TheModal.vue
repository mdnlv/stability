<template>
	<transition name="modal-fade" @after-enter="focusInput">
		<div class="modal" role="dialog" aria-labelledby="modalTitle" aria-describedby="modalDescription">
			<div class="modal__overlay" @click="closeModal"></div>
			<div class="modal__container">
				<header id="modalTitle" class="modal__header">
					<div class="modal__subheader">
						<h4>Select a token</h4>
						<TheButton title="Click to close modal" size="icon" aria-label="Close modal" @click="closeModal">
							<CloseIcon />
						</TheButton>
					</div>
					<div class="modal__filter">
						<input ref="searchtoken" v-model="search" type="text" placeholder="Search name of token" autocomplete="off">
					</div>
				</header>
				<section id="modalDescription" class="modal__body">
					<div v-for="(token, index) in filteredTokens" :key="index" class="token" @click="transaction(token)">
						<img :src="require(`~/assets/images/tokens/${token.name}.png`)" :alt="`${token.name} logo`">
						<div class="token__body">
							<h5>{{ token.symbol }}</h5>
							<p>{{ token.name }}</p>
						</div>
					</div>
					<div v-if="filteredTokens.length <= 0" class="modal__results">
						No results found.
					</div>
				</section>
			</div>
		</div>
	</transition>
</template>

<script>
import CloseIcon from "@/assets/images/svg/svg-close.svg";
import TokenData from "@/assets/images/tokens/token-data.json";

export default {
	name: "TheModal",
	components: {
		CloseIcon
	},
	data () {
		return {
			tokens: TokenData,
			search: ""
		};
	},
	computed: {
		filteredTokens () {
			return this.tokens.filter((token) => {
				const filterTokenByName = token.name.toLowerCase().includes(this.search.toLowerCase());
				const filterTokenBySymbol = token.symbol.toLowerCase().includes(this.search.toLowerCase());
				return filterTokenByName || filterTokenBySymbol;
			});
		}
	},
	mounted () {
		document.addEventListener("keyup", (e) => {
			if (e.key === "Escape" || e.key === "Esc" || e.key === 27) {
				this.closeModal();
			}
		});
	},
	methods: {
		focusInput() {
			this.$nextTick(() => this.$refs.searchtoken.focus());
		},
		closeModal () {
			this.$emit("close-modal");
			this.search = "";
		},
		closeToast () {
			this.isToastVisible = false;
			this.search = "";
			document.body.classList.remove("is-active");
		},
		transaction (token) {
			console.log(token);
			this.claimHYDROProfits(true, "0x", "0x");
			this.closeModal();
			this.$emit("show-toast", "alert");
		},
		claimHYDROProfits(_claimInHYDRO, _paidIn, _HYDROToChosenRoute){
			console.log(_claimInHYDRO, _paidIn, _HYDROToChosenRoute);
		}
	}
};
</script>
