<template>
	<div :id="page.pageHash" class="designer-page page-container d-flex flex-column  align-items-center justify-content-center">
		<div class="content-container d-flex justify-content-center align-items-center">
			<h1 class="h1 -t40-xlt pr-5">{{ page.mainHeading }}</h1>
			<extendableRead 
				:elementId='"designerRead"'
				:limitedHeight='"150px"'
				:text='page.pageDesc'
				:textSize='{"-t20-xlt": true}'
				:moreTextSize='{"-t30-xlt": true}'
				:alignment='"left"'
			/>
			<div class="pl-5">
				<a :href="instagram" rel="noopener noreferrer" class="link social-icon icon-instagram mr-3"></a>
				<a :href="instagram" rel="noopener noreferrer" class="link social-icon icon-facebook"></a>
			</div>
		</div>
		<img :src='src' class="designer-image col-11 mb-5" alt='designer' />
	</div>
</template>

<script>
	import { mapState } from 'vuex';
	import { FACEBOOK_LINK, INSTAGRAM_LINK } from '../../data/links.js';

	import extendableRead from '../common/extendableRead.vue';

	export default {
		components: {
			extendableRead
		},
		data() {
			return {
				facebook: FACEBOOK_LINK,
				instagram: INSTAGRAM_LINK				
			}
		},
		computed: {
			src() {
				let picture = '';
				let screenWidth = false;
				if (process.client) {
					screenWidth = window.screen.availWidth;
				}
				if (screenWidth && screenWidth < 1000) {
					picture = this.page.imagesMb['designer-mb'].url;
				} else {
					picture = this.page.imagesLg['designer-lg'].url;
				}
				return picture;
			},
			...mapState({
				page: store => store.pages['designer']
			})
		},
	}
</script>

<style lang="stylus" scoped>

	.content-container
		width 100%
		margin-top 150px
		margin-bottom 150px

	.social-icon
		background-size cover
		min-width 60px
		min-height 60px
		&:hover
			background-size cover
			min-width 60px
			min-height 60px

</style>