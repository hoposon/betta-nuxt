<template>
	<!-- <div>{{imgSrc}}</div> -->
	<img :src='imgSrc' alt='' />
</template>

<script>
	export default {
		props: [
			'imgSrc'
		]
	}
</script>