<template>
	<div>
		<div>{{images}}</div>
		<galleryImage v-for='(img, index) in images' :key='index' :imgSrc='img' />
	</div>	
</template>

<script>
	import galleryImage from './galleryImage.vue';

	export default {
		props: [
			'images'
		],
		components: {
			galleryImage
		}
	}
</script>
