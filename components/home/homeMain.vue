<template>
	<div id="home-page" class="page-container">
		<div class="home-control d-flex -w-100">
			<button class="brand-logo img-logo" @click='goToPage("home")'></button>
			<div class="home-menu ml-auto -t35-xlt d-flex flex-column">
				<button v-for='menuItem in homeMenu' 
					:key='menuItem.pageId' 
					class="link -t35-xlt px-2" 
					:class="menuItem.pageHash === 'full-menu' ? '-dark' : '-purple'" 
					@click='goToPage(menuItem.pageHash)'>
						{{menuItem.pageName}}
				</button>
			</div>
		</div>

	</div>
</template>

<script>
	import { mapState, mapMutations } from 'vuex';

	export default {
		computed: {
			homeMenu() {
				// console.log('home menu >>>> ', this.menus['home-menu'])
				return (this.menus['home-menu'] && this.menus['home-menu'].items && this.menus['home-menu'].items) || [];
			},
			...mapState([
				'menus'
			])
		},
		methods: {
			goToPage(pageHash) {
				if (pageHash === 'full-menu') {
					this.set_displayFullMenu(true);
				}
				let element = document.getElementById(pageHash);
				element && element.scrollIntoView();
			},
			...mapMutations({
				set_displayFullMenu: 'scrollingAndMenus/set_displayFullMenu'
			})
		}
	}
</script>

<style lang="stylus">
	.home-control
		padding-top 170px

	.home-menu
		margin-right 250px
	
	.brand-logo
		margin-left 250px
		width 300px
		height 158px
		cursor pointer
		background-size contain
		background-repeat no-repeat
		&:hover
			background-size contain
			background-repeat no-repeat
</style>