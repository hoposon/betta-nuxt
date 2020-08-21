<template>
	<div class='images-gallery'>
		<galleryImage 
			v-for='(img, index) in images' :key='index' :imgSrc='img' 
			:class='imageClass'	
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
				startIndex: 1
			}
		},
		components: {
			galleryImage
		},
		computed: {
			imageClass(index) {
				if (index === this.startIndex) {
					return {
						'left-ing': true
					}
				} else if (index === this.startIndex+1) {
					return {
						'middle-img': true
					}
				} else if (index === this.startIndex+2) {
					return {
						'right-img': true
					}
				} else {
					return {}
				}
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
</style>
