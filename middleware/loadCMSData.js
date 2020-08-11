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

	// let parsedData = menusObj.data.map(menu => {
	// 	let parsedMenu = {
	// 		menuName: menu.menu_name,
	// 		menuItems: []
	// 	}
	// 	parsedMenu.menuItems = menu.menu_items.map(item => {
	// 		return {
	// 			pageName: item.page_id.page_name,
	// 			pageHash: item.page_id.page_hash
	// 		}
	// 	})
	// 	// console.log(menu.menu_items)
	// 	return parsedMenu
	// })
	// return parsedData;
}

export default async function ({ store }) {
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

		(async function() {
			let menusAll = await client.api.get("/items/menus?fields=*.*.*");
			// console.log('menusAll items >>> ', menusAll);
			let parsedData = parseCMSMenusData(menusAll);
			// console.log('parsedData >>> ', parsedData[0].menuItems[0]);
			store.commit('set_menus', parsedData)
		})()
		

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