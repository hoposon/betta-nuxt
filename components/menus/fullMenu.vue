<template>
	<div class="full-menu d-flex -w-100 justify-content-center align-items-center">
		<!-- <img src='~assets/images/svg/logo.svg' alt='brand-logo' class="go-home-logo link align-self-start" @click='goToPage("home")' /> -->
		<button class="go-home-logo align-self-start img-logo" @click='goToPage("home")'></button>
		<div class="d-flex flex-column">
			<div class='full-menu-main d-flex align-items-center'>
				
				<div class="full-menu-main__items">
					<button v-for='menuItem in mainMenu' :key='menuItem.pageId' class="link -white -t35-xlt px-2" @click='goToPage(menuItem.pageHash)'>{{menuItem.pageName}}</button>
				</div>
			</div>
			<div class="full-menu-minor d-flex flex-column align-self-start">
				<button v-for='menuItem in minorMenu' :key='menuItem.pageId' class="link -white -t25-xlt" @click='goToPage(menuItem.pageHash)'>{{menuItem.pageName}}</button>
				<div class="d-flex mt-4">
					<button class="social-icon icon-instagram mr-3"></button>
					<button class="social-icon icon-facebook"></button>
				</div>
			</div>
		</div>
		<span class="full-menu-close align-self-start" @click='set_displayFullMenu(false)'>
			<button class="icon-x"></button>
		</span>
	</div>
</template>

<script>
	import { mapState, mapMutations } from 'vuex';

	export default {
		computed: {
			logoSrc() {
				return '~assets/images/svg/logo.svg'
			},
			mainMenu() {
				return (this.menus['full-menu-main'] && this.menus['full-menu-main'].items && this.menus['full-menu-main'].items) || [];
			},
			minorMenu() {
				return (this.menus['full-menu-minor'] && this.menus['full-menu-minor'].items && this.menus['full-menu-minor'].items) || [];
			},
			...mapState([
				'menus'
			])
		},
		methods: {
			goToPage(pageHash) {
				this.set_displayFullMenu(false);
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
	.full-menu
		position fixed
		background-color rgb(0,0,0)
		z-index 10
		overflow hidden
		// padding-top 40px
		// padding-bottom 40px

	.full-menu-main
		.link:last-child
			padding-right 0 !important
		.link:first-child
			padding-left 0 !important
		.full-menu-main__items
			padding-bottom 15px
			border-bottom 1px solid #46333B

	.full-menu-minor
		padding-top 15px

	.full-menu-close
		// position absolute
		// right 65px
		// top 40px
		margin-top 10px
		margin-left 100px
		margin-right 110px
		padding 10px
		cursor pointer
		button
			cursor pointer
			min-width 20px
			min-height 20px

	.social-icon
		cursor pointer
		background-size cover
		min-width 30px
		min-height 30px
		&:hover
			background-size cover
			min-width 30px
			min-height 30px

	.go-home-logo
		// min-width 50px
		margin-right 100px
		width 140px
		height 80px
		cursor pointer
		background-size contain
		background-repeat no-repeat
		&:hover
			background-size contain
			background-repeat no-repeat

		
</style>