<template>
	<!-- <div>{{imgSrc}}</div> -->
	<img :src='imgSrc' alt='' class="gallery-image" />
</template>

<script>
	export default {
		props: [
			'imgSrc'
		]
	}
</script>

<style lang="stylus" scoped>
	.gallery-image
		height 100vh
		width auto
</style>