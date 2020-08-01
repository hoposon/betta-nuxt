<template>
	<div class="container-fluid">
		<homeMain />
	</div>
</template>

<script>
	import homeMain from '../components/home/homeMain.vue';
	export default {
		components: {
			homeMain
		}
	}
</script>

<style lang="stylus">
	.page-container
		width 100%
		min-height 150vh
	
</style>