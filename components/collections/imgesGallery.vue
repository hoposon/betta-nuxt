<template>
	<div class='images-gallery'>
		<galleryImage 
			v-for='(img, index) in images' :key='index' :imgSrc='img.url' 
			:imgLength="imgLength"
			:index="index"
			:parentWidth='parentWidth'
			:imgWidth='img.width'
			:imgHeight='img.height'
			:currIndex="currIndex"
			v-on:currIndexChange='nextImg($event)'
		/>
		<!-- <div class="test-trans" :class='testClass' @click="change()">
			<div style='height:96vh'></div>
		</div> -->
	</div>	
</template>

<script>
	import galleryImage from './galleryImage.vue';

	export default {
		props: [
			'images'
		],
		data() {
			return {
				currIndex: 0,
				t: false
			}
		},
		components: {
			galleryImage
		},
		computed: {
			imgLength() {
				return this.images.length
			},
			parentWidth() {
				if (process.client) {
					return document.getElementsByClassName('images-gallery')[0].offsetWidth
				} else {
					return 0
				}
			},
			testClass() {
				return {
					'test': !this.t,
					'test-two': this.t
				}
			}
		},
		methods: {
			nextImg(event) {
				if (event.newCurrIndex !== -1) this.currIndex = event.newCurrIndex;
			},
			change() {
				this.t = !this.t
			}
		} 
	}
</script>

<style lang="stylus" scoped>
	.test-trans
		transition max-height 2s linear
	.test
		width 500px
		background-color red
		max-height 80vh

	.test-two
		width 500px
		background-color red
		max-height 72vh


	.images-gallery
		display flex
		max-width 98%
		// padding 2vh 2vh
		justify-content center
		align-items center
		overflow hidden
		position relative
		width 100%
		height 92vh
		max-height 92vh

	// .left-img
	// 	display block
	// 	order 1

	// .middle-img
	// 	display block
	// 	order 2

	// .right-img
	// 	display block
	// 	order 3

	// .img-display-none
	// 	display none
	
</style>
