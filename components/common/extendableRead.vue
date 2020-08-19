<template>
	<div :class='textStyleClass' class="col-6 d-flex flex-column">
		<div :id='elementId' :style='heightStyle' class="page-text colapsible-text" :class='extendableClass' v-html="text"></div>
		<button class="link" :class='moreStyleClass' @click='moreLess()'>{{ more ? 'Less' : 'More' }}</button>
	</div>
</template>

<script>
	export default {
		props: [
			'elementId',
			'limitedHeight',
			'borderPadding',
			'text',
			'textSize',
			'extendableStyle',
			'moreTextSize',
			'alignment',
			'border'
		],
		data() {
			return {
				more: false,
				prgHeight: null
			}
		},
		computed: {
			heightStyle() {
				return {
					'height': this.limitedHeight
					//!this.more
				}
			},
			textStyleClass() {
				return {
					...this.textSize,
					...this.borderPadding,
					...{
						'border-right': this.alignment === 'right' && this.border,
						'border-left': this.alignment === 'left' && this.border
					}
				}
			},
			extendableClass() {
				return this.extendableStyle;
			},
			moreStyleClass() {
				return {
					...this.moreTextSize,
					...{
						'align-self-start': this.alignment === 'right',
						'align-self-end': this.alignment === 'left'
					}
				}
			}
		},
		methods: {
			moreLess() {
				if (!this.more) this.enter(document.getElementById(this.elementId));
				else this.leave(document.getElementById(this.elementId));
			},
			enter(element) {
				const width = getComputedStyle(element).width;

				element.style.width = width;
				element.style.position = 'absolute';
				element.style.visibility = 'hidden';
				element.style.height = 'auto';

				const prgHeight = getComputedStyle(element).height;

				element.style.width = width;
				element.style.position = 'static';
				element.style.visibility = 'visible';
				element.style.height = this.limitedHeight;

				// // Force repaint to make sure the
				// // animation is triggered correctly.
				getComputedStyle(element).width;
				getComputedStyle(element).position;
				getComputedStyle(element).height;

				// Trigger the animation.
				// We use `requestAnimationFrame` because we need
				// to make sure the browser has finished
				// painting after setting the `height`
				// to `0` in the line above.
				this.more = true;
				requestAnimationFrame(() => {
					element.style.height = prgHeight;
				});
			},
			leave(element) {
				requestAnimationFrame(() => {
					element.style.height = this.limitedHeight;
				});
				this.more = false;
			}
		}
	}
</script>

<style lang="stylus">
	.border-right
		border-right 1px solid #9A1750

	.border-left
		border-left 1px solid #9A1750

	.colapsible-text
		overflow hidden
		transition height .3s ease-in-out
	// .height-limited
	// 	height 150px
</style>