<template>
	<div class="news-item mb-5 p-2">
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
			'id'
		],
		components: {
			extendableRead
		},
		commputed: {
			elementId() {
				return `news-${this.id}`
			}
		}
	}
</script>

<style lang="stylus">
	.news-item
		max-width 70%
		color #46333B
		background-color #F2E8ED

	.news-item__border
		border-bottom 1px solid #46333B
</style>