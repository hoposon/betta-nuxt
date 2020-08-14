<template>
	<div :id="page.pageHash" class="news-page page-container d-flex flex-column mt-5 align-items-center justify-content-center">
		<div class="content-container d-flex justify-content-center align-items-center">
			<extendableRead 
				:elementId='"newsRead"'
				:limitedHeight='"180px"'
				:borderPadding='{"pl-5":true}'
				:text='page.pageDesc'
				:textSize='{"-t25-xlt": true}'
				:moreTextSize='{"-t35-xlt": true}'
				:alignment='"right"'
				:border='true'
			/>
			<h1 class="h1 pl-5">{{ page.mainHeading }}</h1>
		</div>
		<div class="news-container col-11 d-flex flex-column">
			<newsRow v-for='(oneNews, index) in news' :key='oneNews.id' :heading="oneNews.heading" :text="oneNews.description" :src='oneNews[`image-${imageSrc}`]' :id='oneNews.id' :index='index'/>
		</div>
	</div>
</template>

<script>
	import { mapState } from 'vuex';

	import newsRow from './newsRow.vue';
	import extendableRead from '../common/extendableRead.vue';

	export default {
		components: {
			newsRow,
			extendableRead
		},
		data() {
			return {
			}
		},
		computed: {
			imageSrc() {
				let picture = '';
				let screenWidth = false;
				if (process.client) {
					screenWidth = window.screen.availWidth;
				}
				if (screenWidth && screenWidth < 1000) {
					picture = 'mb';
				} else {
					picture = 'lg';
				}
				return picture;
			},
			...mapState({
				page: store => store.pages['news'],
				news: store => store.news
			})
		},
	}
</script>

<style lang="stylus">

	.news-page
		background: linear-gradient(to bottom, #F2E8ED 85%, white 15%);

	.content-container
		width 100%
		margin-top 150px
		margin-bottom 150px

	.news-container
		background-color #9A1750
		padding 80px
		.news-item:last-child
			margin-bottom 0 !important

</style>