<template>
	<div :id="page.pageHash" class="designer-page page-container d-flex justify-content-center" ref='designer-page'>
		<div class="content-container d-flex justify-content-center align-items-center">
			<h1 class="h1 pr-5">{{ page.mainHeading }}</h1>
			<p class="content-container__desc pl-5 -t25-xlt col-8 d-flex flex-column">
				<transition
					name='showHide'
					v-on:enter="enter"
					v-on:after-enter="afterEnter"
					v-on:leave="leave"
				>
					<span :class='heightClass' v-html="page.pageDesc"></span>
				</transition>
				<button class="link -t35-xlt align-self-end" @click='moreLess()'>{{ more ? 'Less' : 'More' }}</button>
			</p>
			<div class="pl-5">
				<a :href="instagram" rel="noopener noreferrer" class="link social-icon icon-instagram mr-3"></a>
				<a :href="instagram" rel="noopener noreferrer" class="link social-icon icon-facebook"></a>
			</div>
		</div>
	</div>
</template>

<script>
	import { mapState } from 'vuex';
	import { FACEBOOK_LINK, INSTAGRAM_LINK } from '../../data/links.js';

	export default {
		data() {
			return {
				more: false,
				facebook: FACEBOOK_LINK,
				instagram: INSTAGRAM_LINK,
				prgHeight: null
			}
		},
		computed: {
			heightClass() {
				return {
					'height-limited': !this.more,
					'height-auto': this.more
				}
			},
			...mapState({
				page: store => store.pages['designer']
			})
		},
		methods: {
			moreLess() {
				this.more = !this.more;
			},
			enter(element) {
				// console.log('enter >>>>')
				const width = getComputedStyle(element).width;

				element.style.width = width;
				element.style.position = 'absolute';
				element.style.visibility = 'hidden';
				element.style.height = 'auto';

				this.prgHeight = parseInt(getComputedStyle(element).height.split('p')[0])+'px';
				// console.log(`${heightId} >>>`, this.menusHeights[heightId])

				element.style.width = null;
				element.style.position = 'fixed';
				element.style.visibility = 'visible';
				element.style.height = '150px';

				// Force repaint to make sure the
				// animation is triggered correctly.
				getComputedStyle(element).height;

				// Trigger the animation.
				// We use `requestAnimationFrame` because we need
				// to make sure the browser has finished
				// painting after setting the `height`
				// to `0` in the line above.
				requestAnimationFrame(() => {
					element.style.height = this.prgHeight;
				});
			},
			afterEnter(element, done) {
				// console.log('afterEnter >>>>')
				element.style.height = 'auto';
				// element.style.paddingTop = '15px';
				// element.style.paddingBottom = '15px';
			},
			leave(element) {	
				// console.log('afterEnter >>>>')			
				element.style.height = this.prgHeight;

				// Force repaint to make sure the
				// animation is triggered correctly.
				getComputedStyle(element).height;

				requestAnimationFrame(() => {
					element.style.height = '150px';
				});
			},
		}
	}
</script>

<style lang="stylus">

	.content-container
		margin-top 150px
		margin-bottom 150px

	.content-container__desc
		border-left 1px solid #9A1750

	.social-icon
		background-size cover
		min-width 60px
		min-height 60px
		&:hover
			background-size cover
			min-width 60px
			min-height 60px

	.height-limited
		height 150px
		overflow hidden
	.heigh-auto
		height auto

	.showHide-enter,
	.showHide-leave-to
		height 150px

	.showHide-enter-active,
	.showHide-leave-active
		transition height .3s ease-in-out
</style>