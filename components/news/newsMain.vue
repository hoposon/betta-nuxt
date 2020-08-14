<template>
	<div :id="page.pageHash" class="news-page page-container d-flex flex-column mt-5 align-items-center justify-content-center">
		<div class="content-container d-flex justify-content-center align-items-center">
			<!-- <div class="content-container__desc-left pr-5 -t25-xlt col-6 d-flex flex-column">
				<div ref='newsText' :class='heightClass' class="page-text colapsible-text" v-html="page.pageDesc"></div>
				<button class="link -t35-xlt align-self-start" @click='moreLess()'>{{ more ? 'Less' : 'More' }}</button>
			</div> -->
			<extendableRead 
				:elementId='"newsRead"'
				:limitedHeight='"180px"'
				:text='page.pageDesc'
				:textSize='{"-t25-xlt": true}'
				:moreTextSize='{"-t35-xlt": true}'
				:alignment='"right"'
			/>
			<h1 class="h1 pl-5">{{ page.mainHeading }}</h1>
		</div>
		
	</div>
</template>

<script>
	import { mapState } from 'vuex';

	import extendableRead from '../common/extendableRead.vue';

	export default {
		components: {
			extendableRead
		},
		data() {
			return {
				// more: false,
				// prgHeight: null
			}
		},
		computed: {
			
			// heightClass() {
			// 	return {
			// 		'height-limited': !this.more
			// 	}
			// },
			...mapState({
				page: store => store.pages['news']
			})
		},
		// methods: {
		// 	moreLess() {
		// 		if (!this.more) this.enter(this.$refs.newsText);
		// 		else this.leave(this.$refs.newsText);
		// 	},
		// 	enter(element) {
		// 		const width = getComputedStyle(element).width;

		// 		element.style.width = width;
		// 		element.style.position = 'absolute';
		// 		element.style.visibility = 'hidden';
		// 		element.style.height = 'auto';

		// 		const prgHeight = getComputedStyle(element).height;

		// 		element.style.width = width;
		// 		element.style.position = 'static';
		// 		element.style.visibility = 'visible';
		// 		element.style.height = '180px';

		// 		// // Force repaint to make sure the
		// 		// // animation is triggered correctly.
		// 		getComputedStyle(element).width;
		// 		getComputedStyle(element).position;
		// 		getComputedStyle(element).height;

		// 		// Trigger the animation.
		// 		// We use `requestAnimationFrame` because we need
		// 		// to make sure the browser has finished
		// 		// painting after setting the `height`
		// 		// to `0` in the line above.
		// 		this.more = true;
		// 		requestAnimationFrame(() => {
		// 			element.style.height = prgHeight;
		// 		});
		// 	},
		// 	leave(element) {
		// 		requestAnimationFrame(() => {
		// 			element.style.height = '180px';
		// 		});
		// 		this.more = false;
		// 	},
		// }
	}
</script>

<style lang="stylus">

	.news-page
		// background-color #F2E8ED
		background: linear-gradient(to bottom, #F2E8ED 85%, white 15%);

	.content-container
		width 100%
		margin-top 150px
		margin-bottom 150px

	// .content-container__desc-left
	// 	border-right 1px solid #9A1750

	// .colapsible-text
	// 	overflow hidden
	// 	transition height .3s ease-in-out
	// .height-limited
	// 	height 180px

</style>