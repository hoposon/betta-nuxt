<template>
	<div class='images-gallery'>
		<galleryImage 
			v-for='(img, index) in images' :key='index' :imgSrc='img' 
			:imgLength="imgLength"
			:index="index"
			:currIndex="currIndex"
			v-on:currIndexChange='nextImg($event)'
		/>
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
				currIndex: 0
			}
		},
		components: {
			galleryImage
		},
		computed: {
			imgLength() {
				return this.images.length
			}
		},
		methods: {
			nextImg(event) {
				if (event.newCurrIndex !== -1) this.currIndex = event.newCurrIndex;
			}
		} 
	}
</script>

<style lang="stylus" scoped>
	.images-gallery
		display flex
		overflow hidden
		max-width 100%
		// max-height 100vh

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
