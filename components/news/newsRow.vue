<template>
	<div class="news-item mb-5 p-2" :class="position">
		<h2 class="h2 m-0 pb-2 news-item__border">{{ heading }}</h2>
		<extendableRead 
			:elementId='elementId' 
			:limitedHeight='"80px"'
			:borderPadding='{"pl-0":true}'
			:text='text'
			:textSize='{"-t20-reg": true}'
			:moreTextSize='{"-t25-xlt": true}'
			:alignment='"left"'
			class="pt-2"
		/>
		<img :src='src' class="-w-100 mt-3" alt='image' />
	</div>
</template>

<script>
	import extendableRead from '../common/extendableRead.vue';

	export default {
		props: [
			'heading',
			'text',
			'src',
			'id',
			'index'
		],
		components: {
			extendableRead
		},
		computed: {
			elementId() {
				return `news-${this.id}`
			},
			position() {
				return this.index%2 === 0 ? 'align-self-start' : 'align-self-end'
			}
		}
	}
</script>

<style lang="stylus">
	.news-item
		max-width 70%
		// max-height 500px
		color #46333B
		background-color #F2E8ED

	.news-item__border
		border-bottom 1px solid #46333B
</style>