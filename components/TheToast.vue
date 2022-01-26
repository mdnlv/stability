<template>
	<transition name="modal-fade">
		<div class="modal" role="dialog" aria-labelledby="modalTitle" aria-describedby="modalDescription">
			<div class="toast__overlay" @click="closeToast"></div>
			<div class="toast__container">
				<header id="toastTitle" class="toast__header">
					<div class="toast__subheader">
						<div class="toast__titleheader">
							<AlertIcon v-show="toastType === 'alert'"/>
							<SuccessIcon v-show="toastType === 'success'"/>
							<h4 style="margin-left: 0.3em">{{toastType === "success" ? "Success" : "Error"}}</h4>
						</div>
						<TheButton title="Click to close toast" size="icon" aria-label="Close toast" @click="closeToast">
							<CloseIcon />
						</TheButton>
					</div>
				</header>

				<section id="toastDescription" class="toast__body">
				</section>
			</div>
		</div>
	</transition>
</template>

<script>
import CloseIcon from "@/assets/images/svg/svg-close.svg";
import AlertIcon from "@/assets/images/svg/svg-alert.svg"; 	
import SuccessIcon from "@/assets/images/svg/svg-success.svg";
import TokenData from "@/assets/images/tokens/token-data.json";

export default {
	name: "TheToast",
	components: {
		AlertIcon,
		SuccessIcon,
		CloseIcon
	},
	props: ["toastType"],
	data () {
		return {
			tokens: TokenData
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
				this.closeToast();
			}
		});
	},
	methods: {
		closeToast () {
			this.$emit("close-toast");
		},
	}
};
</script>
