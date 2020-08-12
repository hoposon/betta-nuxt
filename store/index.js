import DirectusSDK from "@directus/sdk-js";
const client = new DirectusSDK();

function parseCMSMenusData(menusObj) {
	// console.log('menusObj >>>>', JSON.stringify(menusObj.data[0]));
	let parsedMenus = {};
	menusObj.data.forEach(menu => {
		parsedMenus[menu.menu_name] = {items: []};
		menu.menu_items.forEach(item => {
			parsedMenus[menu.menu_name].items.push({
				pageId: item.page_id.id,
				pageName: item.page_id.page_name,
				pageHash: item.page_id.page_hash
			})
		})
	});
	return parsedMenus;
}

export const state = () => ({
	menus: {},
	pages: {}
})

export const mutations = {
	set_menus(state, data) {
		state.menus = data;
	},
	set_pages(state, data) {
		state.pages = data;
	}
}

export const actions = {
	async nuxtServerInit ({ dispatch }) {
		await dispatch('loadCMS');
	},
	async loadCMS ({commit}) {
		try {
			await client.login({
				email: 'betta@betta.com',
				password: 'betta',
				url: 'http://directus.recycles.cz',
				project: 'betta',
				//storage: window.localStorage
			});
			
			let results = await Promise.all([
				client.api.get("/items/menus?fields=*.*.*"),
			]);

			let parsedMenuData = parseCMSMenusData(results[0]);
			commit('set_menus', parsedMenuData)
			
		} catch(e) {
			console.log('exception >>>', e)
		}
	}
}