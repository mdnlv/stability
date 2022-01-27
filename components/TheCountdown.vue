<template>
	<div>
		<TheLoader v-if="!isLoaded" />
		<div v-if="isLoaded && !readyToClaim" class="countdown">
			<div class="countdown__block">
				<h3>{{days}}</h3>
				<p>Days</p>
			</div>
			<div class="countdown__block">
				<h3>{{hours}}</h3>
				<p>Hours</p>
			</div>
			<div class="countdown__block">
				<h3>{{minutes}}</h3>
				<p>Mins</p>
			</div>
			<div class="countdown__block">
				<h3>{{seconds}}</h3>
				<p>Secs</p>
			</div>
		</div>
		<h3 v-if="readyToClaim">Claim now</h3>
	</div>
</template>

<script>
export default {
	name: "TheCountdown",
	data () {
		return {
			days: 0,
			hours: 0,
			minutes: 0,
			seconds: 0,
			isLoaded: false
		};
	},

	computed: {
		readyToClaim() {
			return this.$store.getters["stabilityFlashStore/getReadyToClaim"];
		}
	},

	mounted() {
		this.showRemaining();
	},

	methods: {
		formatNum(num) {
			return num < 10 ? "0" + num : num;
		},
		showRemaining() {
			const timer = setInterval(() => {
				const now = new Date();
				const end = new Date(2022, 0, 25, 13, 51, 10, 10);
				const distance = end.getTime() - now.getTime();

				if(distance < 0) {
					clearInterval(timer);
					this.$store.commit("stabilityFlashStore/setReadyToClaim", true);
					this.isLoaded = true;
					return;
				}

				const _days = 86400000;
				const _hours = 3600000;
				const _minutes = 60000;
				const _seconds = 1000;

				const days = Math.floor(distance / _days);
				const hours = Math.floor((distance % _days) / _hours);
				const minutes = Math.floor((distance % _hours) / _minutes);
				const seconds = Math.floor((distance % _minutes) / _seconds);

				this.days = this.formatNum(days);
				this.hours = this.formatNum(hours);
				this.minutes = this.formatNum(minutes);
				this.seconds = this.formatNum(seconds);
				this.isLoaded = true;
			}, 1000);
		}
	}
};
</script>
