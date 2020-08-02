<template>
	<div class="betta container-fluid">
		<scrollMenu />
		<homeMain />
	</div>
</template>

<script>
	import scrollMenu from '../components/menus/scrollMenu.vue';
	import homeMain from '../components/home/homeMain.vue';
	export default {
		components: {
			scrollMenu,
			homeMain			
		}
	}
</script>

<style lang="stylus">
	@import '~assets/colors.styl'

	/**reset styles */
	button {
		margin: 0;
		padding: 0;
		border: 0;
		outline-width: 0;
		font: inherit;
		color: inherit;
		vertical-align: baseline;
	}

	button {
		background: none;
	}

	/**fonts family*/
	@font-face {
		font-family: 'Oswald-Bold';
		font-style: normal;
		font-weight: 700;
		src: url('~assets/fonts/Oswald-Bold.ttf') format('ttf');
	}
	@font-face {
		font-family: 'Oswald-ExtraLight';
		font-style: normal;
		font-weight: 200;
		src: url('~assets/fonts/Oswald-Bold.ttf') format('ttf');
	}
	@font-face {
		font-family: 'Oswald-Light';
		font-style: bold;
		font-weight: 300;
		src: url('~assets/fonts/Oswald-Bold.ttf') format('ttf');
	}

	@font-face {
		font-family: 'Oswald-Medium';
		font-style: normal;
		font-weight: 500;
		src: url('~assets/fonts/Oswald-Bold.ttf') format('ttf');
	}
	@font-face {
		font-family: 'Oswald-Regular';
		font-style: normal;
		font-weight: 400;
		src: url('~assets/fonts/Oswald-Bold.ttf') format('ttf');
	}
	@font-face {
		font-family: 'Oswald-SemiBold';
		font-style: bold;
		font-weight: 600;
		src: url('~assets/fonts/Oswald-Bold.ttf') format('ttf');
	}

	.betta
		font-family 'Oswald-Light', "MS UI Gothic", sans-serif
		font-weight 300


		/**main blocks */
		.page-container
			width 100%
			min-height 150vh

		/**fonts */
		.h1
			font-size 50px
			font-weight 300

		.-t45-lt
			font-size 45px !important
			font-weight 300 !important

		.-t35-lt
			font-size 35px !important
			font-weight 300 !important

		/**buttons and links */
		.btn
			cursor pointer
			padding 10px 20px
			min-height 45px
			background-color red
			background-image none
			box-shadow 0 1px 2px 0 rgba(45, 54, 76, 0.3)
			color white
			font-size inherit
			border-radius 2px
			text-transform uppercase
			&:hover
				background-color pink
				background-image none
			&.-disabled
				background-color grey
				background-image none
				box-shadow none
				cursor default
			&.-white
				background-color white
				color gray
				border 1px solid gray
				box-shadow 0 2px 3px 0 rgba(45, 54, 76, 0.12)
				background-image none
				&:hover
					color black
					border-color black
				&.-disabled
					color gray
					border-color gray
					background-image none
					box-shadow none
					cursor default

		a.btn
			display inline-block
			text-decoration none

		.link
			color purple
			font-size inherit
			text-decoration underline
			cursor pointer
			text-align left
			white-space nowrap
			&:hover
				color pink
				text-decoration none
			&.-disabled
				color: gray
				text-decoration none
				&:hover
					color gray
					cursor default
			button.link
				background transparent

		/**font modifiers */
		.-white
			color white
	
</style>