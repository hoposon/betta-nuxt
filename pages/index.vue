<template>
	<div class="betta container-fluid">
		<scrollMenu v-if='displayScrollMenu' />
		<homeMain />
	</div>
</template>

<script>
	import scrollMenu from '../components/menus/scrollMenu.vue';
	import homeMain from '../components/home/homeMain.vue';
	export default {
		data() {
			return {
				scrollMenuHandler: undefined,
				displayScrollMenu: false,
				lastScrollPosition: 0,
				newScrollPosition: 0,
				scrollProcessing: false
			}
		},
		components: {
			scrollMenu,
			homeMain			
		},
		computed: {
			
		},
		methods: {
			processScroll(e) {
				if (process.client) {
					

					if (!this.scrollProcessing) {
						this.newScrollPosition = window.scrollY;
						// window.requestAnimationFrame(function() {
						// this.evaluateScrollForScrollMenu(newScrollPosition);
						// this.lastScrollPosition = newScrollPosition;
						// this.scrollProcessing = false;
						// });
						window.requestAnimationFrame(this.evaluateScrollForScrollMenu);

						this.scrollProcessing = true;
					}
				}
			},
			evaluateScrollForScrollMenu() {
				if (process.client) {
					console.log('this.lastScrollPosition >>> ', this.lastScrollPosition)
					console.log('this.newScrollPosition >>> ', this.newScrollPosition)
					if (this.newScrollPosition < this.lastScrollPosition && this.newScrollPosition > window.innerHeight) {
						this.displayScrollMenu = true;
					} else {
						this.displayScrollMenu = false;
					}
					this.lastScrollPosition = this.newScrollPosition;
					this.scrollProcessing = false;
				}
			}
		},
		created() {
			if (process.client) {
				this.scrollMenuHandler = this.processScroll.bind(this);
				window.addEventListener('scroll', this.scrollMenuHandler);
			}
		}
	}
</script>

<style lang="stylus">
	@import '~assets/colors.styl'

	/**reset styles */
	body, button {
		margin: 0;
		padding: 0;
		border: 0;
		outline-width: 0;
		font: inherit;
		color: inherit;
		vertical-align: baseline;
	}

	button {
		background: none;
	}

	.betta
		font-family 'Oswald-ExtraLight', "MS UI Gothic", sans-serif
		font-weight 200


		/**main blocks */
		&.container-fluid
			padding-right 0
			padding-left 0

		.page-container
			width 100%
			min-height 150vh

		/**fonts */
		.h1
			font-size 50px
			font-weight 300

		.-t45-xlt
			font-size 45px !important
			font-weight 300 !important

		.-t35-xlt
			font-size 35px !important
			font-weight 200 !important

		/**buttons and links */
		.btn
			cursor pointer
			padding 10px 20px
			min-height 45px
			background-color red
			background-image none
			box-shadow 0 1px 2px 0 rgba(45, 54, 76, 0.3)
			color white
			font-size inherit
			border-radius 2px
			text-transform uppercase
			&:hover
				background-color pink
				background-image none
			&.-disabled
				background-color grey
				background-image none
				box-shadow none
				cursor default
			&.-white
				background-color white
				color gray
				border 1px solid gray
				box-shadow 0 2px 3px 0 rgba(45, 54, 76, 0.12)
				background-image none
				&:hover
					color black
					border-color black
				&.-disabled
					color gray
					border-color gray
					background-image none
					box-shadow none
					cursor default

		.link
			color white
			font-size inherit
			text-decoration none
			cursor pointer
			text-align left
			white-space nowrap
			display inline-block
			line-height 1.1
			border-bottom 1px solid white
			&:hover
				color #EE4C7C
				//text-decoration none
				border-bottom none
			&.-purple
				color #9A1750

		button.link
			background transparent
		a.btn
			display inline-block
			text-decoration none

		/**font modifiers */
		.-white
			color white

		/**modifiers */

		/**widths */
		.-w-100
			width 100% !important
	
</style>