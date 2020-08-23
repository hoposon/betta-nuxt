<template>
	<!-- <div>{{imgSrc}}</div> -->
	<img :src='imgSrc' alt='' class="gallery-image" :class='imageClass' @click="nextImg()" />
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
	.gallery-image
		height 100vh
		width auto

	.left-img
		display block
		order 1
		cursor pointer

	.middle-img
		display block
		order 2

	.right-img
		display block
		order 3
		cursor pointer

	.img-display-none
		display none
</style>