import DirectusSDK from "@directus/sdk-js";
const client = new DirectusSDK();

function parseCMSMenusData(menusObj) {
	// console.log('menusAll items >>> ', menusObj.data);
	let parsedMenus = {};
	menusObj.data.forEach(menu => {
		parsedMenus[menu.menu_name] = {items: []};
		menu.menu_items.forEach(item => {
			parsedMenus[menu.menu_name].items.push({
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
		console.log('set_menus >>>>', data['scroll-menu'])
		state.menus = data;
		console.log('set_menus >>>>', state.menus['scroll-menu'])
	},
	set_pages(state, data) {
		state.pages = data;
	}
}

export const actions = {
	async nuxtServerInit ({ dispatch, commit }) {
		await dispatch('loadCMS');
		// commit('set_menus', {'scroll-menu': {items: [{pageName: 'test'}]}})
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
			
			// let menusAll = await client.api.get("/items/menus?fields=*.*.*");
			// console.log('menusAll items >>> ', menusAll);
	
			// (async function() {
			// 	let menusAll = await client.api.get("/items/menus?fields=*.*.*");
			// 	// console.log('menusAll items >>> ', menusAll);
			// 	let parsedData = parseCMSMenusData(menusAll);
			// 	// console.log('parsedData >>> ', parsedData[0].menuItems[0]);
			// 	commit('set_menus', parsedData)
			// })()

			let menusAll = await client.api.get("/items/menus?fields=*.*.*");
			// console.log('menusAll items >>> ', menusAll);
			let parsedData = parseCMSMenusData(menusAll);
			// console.log('parsedData >>> ', parsedData[0].menuItems[0]);
			commit('set_menus', parsedData)
			
	
			// let menus = await client.getItems('menus');
			// let pages = await client.getItems('pages');
			// let menusJunc = await client.getItems('menus_junction');
			// console.log('menus items >>>', menus)
			// console.log('pages items >>> ', pages);
			// console.log('menusJunc items >>> ', menusJunc);
	
			// let kolekce = await client.getItems('kolekce');
			// console.log('kolekce items >>> ', kolekce);
			// let kolekceAll = await client.api.get("/items/kolekce?fields=*.*.*");
			// console.log('kolekceAll items >>> ', kolekceAll);
	
		} catch(e) {
			console.log('exception >>>', e)
		}
	}
}

// export const state = () => ({
// 	announcement: null
//   })
  
//   export const mutations = {
// 	SET_ANNOUNCEMENT(state, message){
// 	  state.announcement = message
// 	}
//   }
  
//   export const actions = {
// 	async nuxtServerInit({ commit }) {
// 	  const { body } = await fetch('https://jsonplaceholder.typicode.com/posts/1')
// 	.then(response => response.json())
// 	commit('SET_ANNOUNCEMENT', body)
//   }
// }