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
function parsePages(pagesObj) {
	let parsedPages = {};
	// console.log('pagesObj >>>> ', pagesObj.data)
	pagesObj.data.forEach(page => {
		parsedPages[page.page_hash] = {
			"id": page.id,
			"status": page.status,
			"mainHeading": page.main_heading,
			"pageDesc": page.page_desc,
			"pageName": page.page_name,
			"pageHash": page.page_hash,
			"background_pic_lg_url": page.background_pic_lg && page.background_pic_lg.data.full_url || null,
			"background_pic_lg_data": {
				tags: page.background_pic_lg && page.background_pic_lg.data.tags || null
			},
			"background_pic_mb_url": page.background_pic_mb && page.background_pic_mb.data.full_url || null,
			"background_pic_mb_data": {
				tags: page.background_pic_mb && page.background_pic_mb.data.tags || null
			}
		}
	})

	return parsedPages;
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
				client.api.get("/items/pages?fields=*.*")
			]);

			let parsedMenuData = parseCMSMenusData(results[0]);
			commit('set_menus', parsedMenuData);

			// console.log('pages >>>> ', results[1])
			let parsedPagesData = parsePages(results[1]);
			commit('set_pages', parsedPagesData);
			
		} catch(e) {
			console.log('exception >>>', e)
		}
	}
}