<template>
	<!-- <div>{{imgSrc}}</div> -->
	<div class='gallery-image__env' :class='imageClass' :style='imageStyle'>
		<img :src='imgSrc' alt='' class="gallery-image__img" @click="nextImg()" />
	</div>
</template>

<script>
	export default {
		props: [
			'imgSrc',
			'imgLength',
			'index',
			'currIndex'
		],
		computed: {
			imageStyle() {
				if (this.diff === -1 || this.diff === this.middleDiff) {
					return 'left: 25%'
				} else {
					return ''
				}
			},
			imageClass() {
				if (this.index === this.currIndex) {
					return {
						'left-img': true
					}
				} else if (this.diff === -1 || this.diff === this.middleDiff) {
					return {
						'middle-img': true
					}
				} else if (this.diff === -2 || this.diff === this.rightDiff) {
					return {
						'right-img': true
					}
				} else {
					return {
						'img-display-none': true
					}
				}
			},
			showImg() {

			},
			diff() {
				return this.currIndex - this.index;
			},
			rightDiff() {
				return this.imgLength - 2;
			},
			middleDiff() {
				return this.imgLength - 1;
			}
		},
		methods: {
			nextImg() {
				let newCurrIndex = -1;
				if (this.diff === -1 || this.diff === this.middleDiff) {
					//do nothing
				} else if (this.currIndex === this.index) {
					if (this.currIndex === 0) {
						newCurrIndex = this.imgLength - 1;
					} else {
						newCurrIndex = this.currIndex - 1;
					}
				} else if (this.diff === -2 || this.diff === this.rightDiff) {
					if (this.index === 1) {
						newCurrIndex = 0;
					} else {
						newCurrIndex = this.currIndex + 1;
					}
				}

				this.$emit('currIndexChange', {newCurrIndex});
			}
		} 
	}
</script>

<style lang="stylus" scoped>
	.gallery-image__env
		max-width 80%
		position absolute
		//overflow hidden

	.gallery-image__img
		height auto
		width 100%		

	.left-img
		max-height 90vh
		height 90vh
		display block
		top 3vh
		left 15px
		cursor pointer
		max-width 32%

	.middle-img
		max-height 96vh
		height 96vh
		vertical-align top
		display block
		top 0
		left 50%
		box-shadow 0px 9px 20px 20px rgba(70,51,59,0.66)
		z-index 10000

	.right-img
		max-height 90vh
		height 90vh
		display block
		top 3vh
		right 15px
		cursor pointer
		max-width 32%

	.img-display-none
		display none
</style>