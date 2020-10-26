<template>
	<!-- <div>{{imgSrc}}</div> -->
	<div :id='"img-"+index' class='gallery-image__wrap' :class='imageClass' :style='imageStyle'>
		<button class="next-img-arrow link" @click="nextImg()"></button>
		<img :src='imgSrc' alt='' class="gallery-image__img" @click="nextImg()" />
	</div>
</template>

<script>
	export default {
		props: [
			'imgSrc',
			'imgLength',
			'index',
			'parentWidth',
			'imgWidth',
			'imgHeight',
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

				if (process.client) {
					if (this.index === this.currIndex) {
						return {
							'left': 0
						}		
					} else if (this.diff === -1 || this.diff === this.middleDiff) {
						let pr = ((this.parentWidth - this.imgWidth)/2)/this.parentWidth*100;
						// console.log('middle >>> ', (this.parentWidth - width))
						console.log('middle >>> ', this.parentWidth)
						console.log('middle >>> ', this.imgWidth)
						console.log('middle >>> ', pr)
						return {
							'left': `${pr}%`
						}
					} else if (this.diff === -2 || this.diff === this.rightDiff) {
						let pr = (this.parentWidth - this.imgWidth)/this.parentWidth*100;
						console.log('right >>> ', this.parentWidth)
						console.log('right >>> ', this.imgWidth)
						console.log('right >>> ', pr)
						return {
							'left': `${pr}%`
						}
					} else {
						let pr = ((this.parentWidth - this.imgWidth)/2)/this.parentWidth*100;
						return {
							'left': `${pr}%`
						}
					}
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
		transition top 0.5s linear, bottom 0.5s linear, left 0.5s linear, z-index 0.5s linear, visibility 0.5s linear, opacity 0.5s linear
		img
			height auto
			// height 100%
			

	.left-img
		top 6vh
		bottom 6vh
		z-index 5
		opacity 1
		visibility visible
		cursor pointer
		// .next-img-arrow
		// 	z-index 10
		// 	position absolute
		// 	top 50%
		// 	left 2%
			

	.middle-img
		top 0
		bottom 0
		z-index 10
		opacity 1
		visibility visible
		box-shadow 0 0 15px 15px #46333B
		.next-img-arrow
			display none

	.right-img
		top 6vh
		bottom 6vh
		z-index 5
		opacity 1
		visibility visible
		cursor pointer
		// .next-img-arrow
		// 	z-index 10
		// 	position absolute
		// 	top 50%
		// 	right 2%
			
			
	.img-display-none
		top 15vh
		bottom 15vh
		z-index 0
		opacity 0
		visibility hidden

	
	// .gallery-image__img

</style>