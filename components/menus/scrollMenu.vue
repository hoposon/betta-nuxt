<template>
	<div class="scroll-menu d-flex -w-100 justify-content-center align-items-center">
		<button class="link -t35-xlt">{{menuItem}}</button>
	</div>
</template>

<script>
	import { mapState } from 'vuex';
	export default {
		props: [
			'scrollMenu'
		],
		computed: {
			menuItem() {
				console.log('menu store >>> ', this.menus)
				// return this.menus
				// console.log('menu store >>> ', this.$store.state.menus)
				// console.log('menu >>> ', this.menus['scroll-menu'])
				// console.log('scroll menu >>>> ', this.scrollMenu);
				return this.menus['scroll-menu'] && this.menus['scroll-menu'].items && this.menus['scroll-menu'].items[0].pageName || 'TEST';
			},
			// ...mapState({
			// 	menus: state => state.menus
			// })
			...mapState([
				'menus'
			])
		}
	}
</script>

<style lang="stylus">
	.scroll-menu
		position fixed
		background-color rgb(0,0,0)
		// padding 15px 0
		z-index 10
		overflow hidden

</style>