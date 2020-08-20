<template>
	<div :id="page.pageHash" class="collections-page page-container d-flex flex-column  align-items-center justify-content-center">
		<div class="content-container d-flex flex-column justify-content-center align-items-center">
			<h1 class="h1 -pink">{{ page.mainHeading }}</h1>
			<extendableRead 
				:elementId='"collectionsRead"'
				:limitedHeight='"150px"'
				:borderPadding='{}'
				:text='page.pageDesc'
				:textSize='{"-t30-xlt": true, "-pink": true}'
				:extendableStyle='{"-text-align-center": true}'
				:moreTextSize='{"-t30-xlt": true, "-text-align-center": true}'
				:alignment='""'
				:border='true'
			/>
		</div>
		<div class="d-flex">
			<button v-for='(coll, index) in collections' :key='index' @click='setCollection(index)' class="link -purple">{{coll.collectionName}}</button>
		</div>
		<imagesGallery :images='collections[currentIndex].images' />
	</div>
</template>

<script>
	import { mapState } from 'vuex';

	import extendableRead from '../common/extendableRead.vue';
	import imagesGallery from './imgesGallery.vue';

	export default {
		components: {
			extendableRead,
			imagesGallery
		},
		data() {
			return {
				currentIndex: 0		
			}
		},
		computed: {
			...mapState({
				page: store => store.pages['collections'],
				collections: store => store.collections
			})
		},
		methods: {
			setCollection(index) {
				this.currentIndex = index;
			}
		}
	}
</script>

<style lang="stylus" scoped>

	.collections-page
		background-color #46333B

	.content-container
		width 100%
		margin-top 150px
		margin-bottom 150px

</style>