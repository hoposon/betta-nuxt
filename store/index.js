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
	// console.log('pagesObj >>>> ', JSON.stringify(pagesObj))
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
		parsedPages[page.page_hash].imagesLg = {};
		page.images_lg.forEach(image => {
			// console.log(JSON.stringify(image))
			parsedPages[page.page_hash].imagesLg[image.directus_files_id.title] = {
				title: image.directus_files_id.title,
				url: image.directus_files_id.data.full_url,
				tags: image.directus_files_id.data.tags
			}
		});
		parsedPages[page.page_hash].imagesMb = {};
		page.images_mb.forEach(image => {
			parsedPages[page.page_hash].imagesMb[image.directus_files_id.title] = {
				title: image.directus_files_id.title,
				url: image.directus_files_id.data.full_url,
				tags: image.directus_files_id.data.tags
			}
		})
	})
	// console.log(JSON.stringify(parsedPages))
	return parsedPages;
}

function parsedNews(newsObj) {
	let parsedNews = [];
	// console.log('pagesObj >>>> ', JSON.stringify(pagesObj))
	newsObj.data.forEach(news => {
		let tempNews = {
			id: news.id,
			heading: news.heading,
			description: news.description,
			'image-lg': news.image_lg && news.image_lg.data.full_url || '',
			'image-mb': news.image_mb && news.image_mb.data.full_url || ''
		}
		parsedNews.push(tempNews)
	})
	// console.log(JSON.stringify(parsedPages))
	return parsedNews;
}

function parseKolekce(kolekceObj) {
	// console.log(results[3].data[0].collection_images[0].image_id.data);
	let parsedKolekce = [];
	kolekceObj.data.forEach(kol => {
		let tempCollection = {
			collectionName: kol.collection_name,
			priority: kol.collection_priority,
			images: []
		}
		kol.collection_images.forEach(img => {
			// console.log('img >>> ', img.image_id)
			tempCollection.images.push({
					url: img.image_id.data.full_url,
					width: img.image_id.width,
					height: img.image_id.height
				}
			)
		})
		parsedKolekce.push(tempCollection);
	})

	//sort collections
	parsedKolekce.sort((a,b) => {
		return a.priority - b.priority;
	})

	return parsedKolekce;
}

export const state = () => ({
	menus: {},
	pages: {},
	news: {},
	collections: []
})

export const mutations = {
	set_menus(state, data) {
		state.menus = data;
	},
	set_pages(state, data) {
		state.pages = data;
	},
	set_news(state, data) {
		state.news = data;
	},
	set_collections(state, data) {
		state.collections = data;
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
				client.api.get("/items/pages?fields=*.*.*"),
				client.api.get("/items/news?fields=*.*"),
				client.api.get("/items/kolekce?fields=*.*.*"),
			]);

			let parsedMenuData = parseCMSMenusData(results[0]);
			commit('set_menus', parsedMenuData);

			// console.log('pages >>>> ', results[1])
			let parsedPagesData = parsePages(results[1]);
			commit('set_pages', parsedPagesData);

			// console.log(results[2].data[0]);
			let parsedNewsData = parsedNews(results[2])
			commit('set_news', parsedNewsData);

			// console.log(results[3].data[0].collection_images[0].image_id.data);
			let parsedCollections = parseKolekce(results[3])
			commit('set_collections', parsedCollections);
			
			
		} catch(e) {
			console.log('exception >>>', e)
		}
	}
}