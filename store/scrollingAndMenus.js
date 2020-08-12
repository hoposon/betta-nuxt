export const state = () => ({
	displayScrollMenu: false,
	lastScrollPosition: 0,
	newScrollPosition: 0,
	scrollProcessing: false,
	displayFullMenu: true
})

export const mutations = {
	set_displayScrollMenu(state, value) {
		state.displayScrollMenu = value;
	},
	set_lastScrollPosition(state, value) {
		state.lastScrollPosition = value;
	},
	set_newScrollPosition(state, value) {
		state.newScrollPosition = value;
	},
	set_scrollProcessing(state, value) {
		state.scrollProcessing = value;
	},
	set_displayFullMenu(state, value) {
		state.displayFullMenu = value;
	}
}