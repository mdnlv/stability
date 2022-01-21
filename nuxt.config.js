export default {
	// Global page headers: https://go.nuxtjs.dev/config-head
	head: {
		title: "Hydro Ultrastable",
		htmlAttrs: {
			lang: "en"
		},
		meta: [
			{ charset: "utf-8" },
			{ name: "viewport", content: "width=device-width, initial-scale=1" },
			{ hid: "description", name: "description", content: "" },
			{ name: "format-detection", content: "telephone=no" }
		],
		link: [
			{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }
		]
	},

	// Global CSS: https://go.nuxtjs.dev/config-css
	css: [
		"@/assets/stylesheets/main.scss"
	],

	// Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
	plugins: [
		"~/plugins/helpers",
		"~/plugins/floating-vue"
	],

	// Auto import components: https://go.nuxtjs.dev/config-components
	components: true,

	// Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
	buildModules: [
		// https://go.nuxtjs.dev/typescript
		"@nuxt/typescript-build",
		// https://typed-vuex.roe.dev/getting-started/getting-started-nuxt
		"nuxt-typed-vuex"
	],

	// Modules: https://go.nuxtjs.dev/config-modules
	modules: [
	],

	// Build Configuration: https://go.nuxtjs.dev/config-build
	build: {
		loaders: {
			sass: {
				implementation: require("sass")
			},
			scss: {
				implementation: require("sass")
			}
		},
		extend: (config, ctx) => {
			const svgRule = config.module.rules.find(rule => rule.test.test(".svg"));

			if (ctx.isDev) {
        config.devtool = ctx.isClient ? 'source-map' : 'inline-source-map'
      }
			
			svgRule.test = /\.(png|jpe?g|gif|webp)$/;

			config.module.rules.push({
				test: /\.svg$/,
				use: ["babel-loader", "vue-svg-loader"]
			});
		}
	},
	vue: {
		config: {
			productionTip: false,
			devtools: true
		}
	}
};
