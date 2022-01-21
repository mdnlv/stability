<template>
	<LayoutFooter>
		<p>&copy; {{ currentYear }} <TheLogo /> | {{ appVersion }}</p>
		<p class="block-number">Latest Block: <a :href="`https://etherscan.io/block/${blockNumber}`" title="Click to view the latest block" target="_blank" rel="noopener noreferrer">{{ blockNumber }}</a></p>
		<ul class="social-icons">
			<li>
				<a href="https://twitter.com/ultra_stable" target="_blank" rel="noopener noreferrer" title="Click to follow us on Twitter">
					<TwitterLogo />
				</a>
			</li>
			<li>
				<a href="https://t.me/ultrastable_money" target="_blank" rel="noopener noreferrer" title="Click to chat with us on Telegram"><TelegramLogo /></a>
			</li>
		</ul>
	</LayoutFooter>
</template>

<script>
import { version } from "../package.json";
import TwitterLogo from "@/assets/images/svg/svg-twitter.svg";
import TelegramLogo from "@/assets/images/svg/svg-telegram.svg";

export default {
	name: "TheFooter",
	components: {
		TwitterLogo,
		TelegramLogo
	},
	data () {
		return {
			currentYear: new Date().getFullYear(),
			blockNumber: 0,
			appVersion: version
		};
	},
	async mounted() {
		web3 = this.$store.getters["web3Store/instance"]();
		this.blockNumber = await web3.eth.getBlockNumber();
	}
};
</script>
