<template>
	<div class="scroll-menu d-flex -w-100 justify-content-center align-items-center">
		<button class="link -t35-xlt" @click='showFullMenu()'>{{menuItem}}</button>
	</div>
</template>

<script>
	import { mapState, mapMutations } from 'vuex';
	export default {
		computed: {
			menuItem() {
				return (this.menus['scroll-menu'] && this.menus['scroll-menu'].items && this.menus['scroll-menu'].items[0].pageName) || 'Menu';
			},
			...mapState([
				'menus'
			])
		},
		methods: {
			showFullMenu() {
				this.set_displayScrollMenu(false);
				this.set_displayFullMenu(true);
			},
			...mapMutations({
				set_displayScrollMenu: 'scrollingAndMenus/set_displayScrollMenu',
				set_displayFullMenu: 'scrollingAndMenus/set_displayFullMenu'
			})
		}
	}
</script>

<style lang="stylus">
	.scroll-menu
		position fixed
		background-color rgb(0,0,0)
		z-index 10
		overflow hidden

</style>