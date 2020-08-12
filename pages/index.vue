<template>
	<div class="betta container-fluid">
		<transition
			name='showHide'
			v-on:enter="enterScroll"
			v-on:after-enter="afterEnter"
			v-on:leave="leaveScroll"
		>
			<scrollMenu v-if='displayScrollMenu && !displayFullMenu' />
		</transition>
		<transition
			name='showHide'
			v-on:enter="enterMain"
			v-on:after-enter="afterEnter"
			v-on:leave="leaveMain"
		>
			<fullMenu v-if='displayFullMenu' />
		</transition>


		<homeMain />
		
	</div>
</template>

<script>
	import { mapState, mapMutations } from 'vuex';

	import scrollMenu from '../components/menus/scrollMenu.vue';
	import fullMenu from '../components/menus/fullMenu.vue';
	import homeMain from '../components/home/homeMain.vue';

	export default {
		layout: 'default',
		data() {
			return {
				scrollHandler: undefined,

				menusHeights: {
					scrollMenu: 0,
					fullMenu: 0
				},
				menusPaddings: {
					scrollMenu: 15,
					fullMenu: 40
				}
				
			}
		},
		components: {
			scrollMenu,
			fullMenu,
			homeMain			
		},
		computed: {
			...mapState({
				displayScrollMenu: state => state.scrollingAndMenus.displayScrollMenu,
				displayFullMenu: state => state.scrollingAndMenus.displayFullMenu,
				lastScrollPosition: state => state.scrollingAndMenus.lastScrollPosition,
				newScrollPosition: state => state.scrollingAndMenus.newScrollPosition,
				scrollProcessing: state => state.scrollingAndMenus.scrollProcessing
			})
		},
		methods: {
			processScroll(e) {
				if (process.client) {
					if (!this.scrollProcessing) {
						this.set_newScrollPosition(window.scrollY);
						// window.requestAnimationFrame(function() {
						// this.evaluateScrollForScrollMenu(newScrollPosition);
						// this.lastScrollPosition = newScrollPosition;
						// this.scrollProcessing = false;
						// });
						window.requestAnimationFrame(this.callScrollFunctions);
						this.set_scrollProcessing(true);
					}
				}
			},
			callScrollFunctions() {
				this.evaluateScrollForScrollMenu();
				this.evaluateScrollForFullMenu();

				this.set_lastScrollPosition(this.newScrollPosition);
				this.set_scrollProcessing(false);
			},
			evaluateScrollForScrollMenu() {
				if (process.client) {
					// if scrolling up and bellow some limit (eg. bellow home page menu items) -> show scroll menu
					if (this.newScrollPosition < this.lastScrollPosition && this.newScrollPosition > 0) {
						this.set_displayScrollMenu(true);
					} else {
						this.set_displayScrollMenu(false);
					}	
				}
			},
			evaluateScrollForFullMenu() {
				if (process.client) {
					// if scrolling up and bellow some limit (eg. bellow home page menu items) -> show scroll menu
					if (this.newScrollPosition > this.lastScrollPosition) {
						this.set_displayFullMenu(false);
					}
				}
			},
			// transition methods
			enterScroll(element) {
				this.enter(element, 'scrollMenu')
			},
			enterMain(element) {
				this.enter(element, 'fullMenu')
			},
			enter(element, heightId) {
				// console.log('enter >>>>')
				const width = getComputedStyle(element).width;

				element.style.width = width;
				element.style.position = 'absolute';
				element.style.visibility = 'hidden';
				element.style.height = 'auto';

				this.menusHeights[heightId] = parseInt(getComputedStyle(element).height.split('p')[0])+this.menusPaddings[heightId]*2+'px';
				// console.log(`${heightId} >>>`, this.menusHeights[heightId])

				element.style.width = null;
				element.style.position = 'fixed';
				element.style.visibility = 'visible';
				element.style.height = 0;

				// Force repaint to make sure the
				// animation is triggered correctly.
				getComputedStyle(element).height;

				// Trigger the animation.
				// We use `requestAnimationFrame` because we need
				// to make sure the browser has finished
				// painting after setting the `height`
				// to `0` in the line above.
				requestAnimationFrame(() => {
					element.style.height = this.menusHeights[heightId];
					element.style.paddingTop = this.menusPaddings[heightId]+'px';
					element.style.paddingBottom = this.menusPaddings[heightId]+'px';
				});
			},
			afterEnter(element, done) {
				// console.log('afterEnter >>>>')
				element.style.height = 'auto';
				// element.style.paddingTop = '15px';
				// element.style.paddingBottom = '15px';
			},
			leaveScroll(element) {
				this.leave(element, 'scrollMenu')
			},
			leaveMain(element) {
				this.leave(element, 'fullMenu')
			},
			leave(element, heightId) {	
				// console.log('afterEnter >>>>')			
				element.style.height = this.menusHeights[heightId];

				// Force repaint to make sure the
				// animation is triggered correctly.
				getComputedStyle(element).height;
				getComputedStyle(element).paddingTop;
				getComputedStyle(element).paddingBottom;

				requestAnimationFrame(() => {
					element.style.height = 0;
					element.style.paddingTop = 0;
					element.style.paddingBottom = 0;
				});
				// this.menusHeights[heightId] = 0;
			},
			...mapMutations({
				set_displayScrollMenu: 'scrollingAndMenus/set_displayScrollMenu',
				set_displayFullMenu: 'scrollingAndMenus/set_displayFullMenu',
				set_lastScrollPosition: 'scrollingAndMenus/set_lastScrollPosition',
				set_newScrollPosition: 'scrollingAndMenus/set_newScrollPosition',
				set_scrollProcessing: 'scrollingAndMenus/set_scrollProcessing'
			})
		},
		created() {
			if (process.client) {
				this.set_lastScrollPosition(window.scrollY);
				this.scrollHandler = this.processScroll.bind(this);
				window.addEventListener('scroll', this.scrollHandler);
			}
		}
	}
</script>

<style lang="stylus">
	.showHide-enter,
	.showHide-leave-to
		height 0
		padding-top 0
		padding-bottom 0

	.showHide-enter-active,
	.showHide-leave-active
		//transition height 30s, padding-top 30s, padding-bottom 30s ease-in-out
		transition height .3s, padding-top .3s, padding-bottom .3s ease-in-out
</style>

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

		.-t25-xlt
			font-size 25px !important
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
			//line-height 1.2
			border-bottom none
			&:hover
				color #EE4C7C
				//line-height 1.2
				//border-bottom 1px solid #EE4C7C
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