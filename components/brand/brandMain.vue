<template>
	<div :id="page.pageHash" class="brand-page page-container d-flex flex-column  align-items-center justify-content-center">
		<div class="content-container d-flex justify-content-center align-items-center">
			<h1 class="h1 -t40-xlt pr-5">{{ page.mainHeading }}</h1>
			<extendableRead 
				:elementId='"brandRead"'
				:limitedHeight='"150px"'
				:borderPadding='{"pl-5":true}'
				:text='page.pageDesc'
				:textSize='{"-t20-xlt": true}'
				:moreTextSize='{"-t30-xlt": true}'
				:alignment='"left"'
				:border='true'
			/>
			<div class="ml-5 brand-img img-logo"></div>
		</div>
	</div>
</template>

<script>
	import { mapState } from 'vuex';

	import extendableRead from '../common/extendableRead.vue';

	export default {
		components: {
			extendableRead
		},
		data() {
			return {			
			}
		},
		computed: {
			...mapState({
				page: store => store.pages['brand']
			})
		},
	}
</script>

<style lang="stylus" scoped>

	.content-container
		width 100%
		margin-top 150px
		margin-bottom 150px

	.brand-img
		width 200px
		height 100px
		background-size contain
		background-repeat no-repeat

</style>