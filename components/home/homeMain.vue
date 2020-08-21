<template>
	<div :id='page.pageHash' class="home-page page-container" ref='home-page' :style='pageBackground'>
		<div class="home-control d-flex -w-100">
			<button class="brand-logo -with-hover img-logo" @click='goToPage("home")'></button>
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
			pageBackground() {
				// let element = this.$refs['home-page'];
				let picture = '';
				let screenWidth = false;
				if (process.client) {
					screenWidth = window.screen.availWidth
				}
				if (screenWidth && screenWidth < 1000) {
					picture = this.pages['home'].background_pic_mb_url;
				} else {
					picture = this.pages['home'].background_pic_lg_url;
				}
				return {
					'background-image': `url(${picture})`,
					'background-repeat': 'no-repeat',
					'background-size': 'cover'
				}
			},
			homeMenu() {
				// console.log('home menu >>>> ', this.menus['home-menu'])
				return (this.menus['home-menu'] && this.menus['home-menu'].items && this.menus['home-menu'].items) || [];
			},
			page() {
				return this.pages['home'];
			},
			...mapState([
				'menus',
				'pages'
			])
		},
		methods: {
			goToPage(pageHash) {
				if (pageHash === 'full-menu') {
					this.set_displayFullMenu(true);
					this.set_displayScrollMenu(false);
				}
				let element = document.getElementById(pageHash);
				element && element.scrollIntoView();
			},
			...mapMutations({
				set_displayFullMenu: 'scrollingAndMenus/set_displayFullMenu',
				set_displayScrollMenu: 'scrollingAndMenus/set_displayScrollMenu'
			})
		}
	}
</script>

<style lang="stylus">
	.home-page
		min-height 180vh

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
		&.-with-hover:hover
			background-size contain
			background-repeat no-repeat
</style>