<template>
	<!-- <div>{{imgSrc}}</div> -->
	<div class='gallery-image__wrap' :class='imageClass' :style='imageStyle'>
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
		data() {
			return {
				leftClicked: false,
				rightClicked: false,
			}
		},
		computed: {
			imageStyle() {
				// if (this.diff === -1 || this.diff === this.middleDiff) {
				// 	return 'left: 25%'
				// } else {
				// 	return ''
				// }
				return ''
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
				} else if (this.currIndex === this.index) { // left click
					if (this.currIndex === 0) {
						newCurrIndex = this.imgLength - 1;
					} else {
						newCurrIndex = this.currIndex - 1;
					}
					this.leftClicked = true;
					this.rightClicked = false;
				} else if (this.diff === -2 || this.diff === this.rightDiff) { // right click
					if (this.index === 1) {
						newCurrIndex = 0;
					} else {
						newCurrIndex = this.currIndex + 1;
					}
					this.leftClicked = false;
					this.rightClicked = true;
				}

				this.$emit('currIndexChange', {newCurrIndex});
			}
		} 
	}
</script>

<style lang="stylus" scoped>
	.gallery-image__wrap
		position absolute
		overflow hidden
		// transition transform 1s linear, max-width 1s linear, max-heigh 1s linear, top 1s linear, bottom 1s linear, visibility 0.5s linear 0.5s, opacity  0.5s linear 0.5s
		transition max-height 1s linear, z-index 1s linear
		img
			height auto
			// width 100%
			// transition width 1s linear
			

	.left-img
		max-width 32%
		max-height 90vh
		// height 90vh
		display block
		top 3vh
		bottom 3vh
		left 50%
		transform: translate(-150%,0)
		cursor pointer
		visibility visible
		opacity 1
		z-index 5
		// &.-leftClicked
		// 	transition visibility 0.5s linear 0.5s, opacity 0.5s linear 0.5s
		// &.-rightClicked
		// 	transition visibility 0.5s linear, opacity 0.5s linear


	.middle-img
		max-width 80%
		max-height 96vh
		// max-width 32%
		vertical-align top
		display block
		top 0
		bottom 0
		left 50%
		transform: translate(-50%,0)
		box-shadow 0px 9px 20px 20px rgba(70,51,59,0.66)
		z-index 10
		visibility visible
		opacity 1

	.right-img
		max-width 32%
		max-height 90vh
		display block
		top 3vh
		bottom 3vh
		left 50%
		transform: translate(50%,0)
		cursor pointer
		visibility visible
		opacity 1
		z-index 5
		// &.-leftClicked
		// 	transition visibility 0.5s linear, opacity 0.5s linear
		// &.-rightClicked
		// 	transition visibility 0.5s linear 0.5s, opacity 0.5s linear 0.5s
			

	.img-display-none
		// transform: scale(0.9)
		left 50%
		transform: translate(-50%,0)
		max-width 32%
		max-height 90vh
		visibility hidden
		opacity 0
		z-index 0

	
	// .gallery-image__img

</style>