<template>
	<div class="vault">
		<h5>{{ deposit }}</h5>
		<div class="input">
			<div class="input__container">
				<input
					v-model="anyAmount"
					placeholder="0.0"
					type="number"
					min="0"
					max="79"
					autocomplete="off"
					autocorrect="off"
					spellcheck="false"
					inputmode="decimal"
				>
				<TheButton class="btn--token" title="Click to select currency" :disabled="isSwapped" @click="showModal">
					{{ token }}
					<ChevronDown />
				</TheButton>
				<TheModal v-show="isModalVisible" @close-modal="closeModal" />
			</div>
		</div>
		<TheButton class="btn--swap" size="sm" @click="swapInputFields">
			<SwapSvg />
		</TheButton>
		<div class="input">
			<div class="input__container">
				<input
					v-model="usxAmount"
					placeholder="0.0"
					type="number"
					min="0"
					max="79"
					autocomplete="off"
					autocorrect="off"
					spellcheck="false"
					inputmode="decimal"
				>
				<TheButton class="btn--token" :disabled="!isSwapped" @click="showModal">
					{{ usx }}
					<ChevronDown />
				</TheButton>
			</div>
		</div>
	</div>
</template>

<script>
import ChevronDown from "@/assets/images/svg/svg-chevron-down.svg";
import SwapSvg from "@/assets/images/svg/svg-swap.svg";
export default {
	name: "TheCaldron",
	components: {
		ChevronDown,
		SwapSvg
	},
	data () {
		return {
			anyAmount: 1,
			usxAmount: 0,
			isModalVisible: false,
			deposit: "Deposit",
			redeem: "Redeem",
			isSwapped: false,
			token: "Eth",
			usx: "USX"
		};
	},
	methods: {
		showModal () {
			this.isModalVisible = true;
			document.body.classList.add("is-active");
		},
		closeModal () {
			this.isModalVisible = false;
			document.body.classList.remove("is-active");
		},
		swapInputFields () {
			const anyAmount = this.anyAmount;
			const deposit = this.deposit;
			const token = this.token;
			this.anyAmount = this.usxAmount;
			this.usxAmount = anyAmount;
			this.deposit = this.redeem;
			this.redeem = deposit;
			this.token = this.usx;
			this.usx = token;
			this.isSwapped = !this.isSwapped;
		}
	}
};
</script>
