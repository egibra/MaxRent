// Menu
export interface Menu {
  path?: string;
  title?: string;
  type?: string;
  megaMenu?: boolean;
  megaMenuType?: string; // small, medium, large
  image?: string;
  children?: Menu[];
}

export const MENUITEMS: Menu[] = [
	{
		title: 'home', type: 'sub', children: [
	      { path: 'home/one', title: 'Fashion-01', type: 'extTabLink' },          
	      { path: 'home/two', title: 'Fashion-02', type: 'extTabLink'},         
	      { path: 'home/three', title: 'Fashion-03', type: 'extTabLink' },         
	      { path: 'home/four', title: 'vegetable', type: 'extTabLink' },        
	      { path: 'home/five', title: 'watch', type: 'extTabLink' },        
	      { path: 'home/six', title: 'furniture', type: 'extTabLink' },        
	      { path: 'home/seven', title: 'flower', type: 'extTabLink' },    
	      { path: 'home/eight', title: 'beauty', type: 'extTabLink' },   
	      { path: 'home/nine', title: 'electronics', type: 'extTabLink' },   
	      { path: 'home/ten', title: 'pets', type: 'extTabLink' },   
	      { path: 'home/eleven', title: 'metro', type: 'extTabLink' },   
	      { path: 'home/twelve', title: 'gym', type: 'extTabLink' },   
	      { path: 'home/thirteen', title: 'tools', type: 'extTabLink' },   
	      { path: 'home', title: 'marijuana', type: 'extTabLink' }  
	    ]
	},
	{
		title: 'admin-pages', type: 'sub', megaMenu: true, megaMenuType: 'small', children: [
			{ path: 'expenses-chart', title: 'expenses-chart', type: 'link' },        
			{ path: 'profit-chart', title: 'profit-chart', type: 'link' },        
			{ path: 'expenses-list', title: 'expenses-list', type: 'link' },        
	    ]
	},
	{
		title: 'pages', type: 'sub', children: [
	      { path: '/about-us', title: 'about-us', type: 'link' },          
	      { path: '/lookbook', title: 'lookbook', type: 'link' },         
	      { path: '/typography', title: 'Typography', type: 'link' }, 
	      { 
	      	title: 'Portfolio',  type: 'sub', children: [
		      	{ path: '/grid/two/column', title: 'Portfolio-2-Grid',  type: 'link' },
		      	{ path: '/grid/three/column', title: 'Portfolio-3-Grid',  type: 'link' },
		      	{ path: '/grid/four/column', title: 'Portfolio-4-Grid',  type: 'link' },
		      	{ path: '/grid/two/masonary', title: 'Masonary-2-Grid',  type: 'link' },
		      	{ path: '/grid/three/masonary', title: 'Masonary-3-Grid',  type: 'link' },
		      	{ path: '/grid/four/masonary', title: 'Masonary-4-Grid',  type: 'link' },
		      	{ path: '/fullwidth/masonary', title: 'Masonary-Fullwidth',  type: 'link' }
	      	]
	      },         
	      { path: '/dashboard', title: 'dashboard', type: 'link' },  
	      { path: '/cart', title: 'cart', type: 'link' },  
	      { path: '/wishlist', title: 'wishlist', type: 'link' },    
	      { path: '/compare', title: 'compare', type: 'link' },  
	      { path: '/checkout', title: 'checkout', type: 'link' },  
	      { path: '/login', title: 'login', type: 'link' },        
	      { path: '/register', title: 'register', type: 'link' },        
	      { path: '/forgetpassword', title: 'forget-password', type: 'link' },  
	      { path: '/search', title: 'search', type: 'link' },        
	      { path: '/collection', title: 'collection', type: 'link' },  
	      { path: '/order-success', title: 'order-success', type: 'link' },  
	      { path: '/contact', title: 'contact', type: 'link' },  
	      { path: '/faq', title: 'FAQ', type: 'link' },  
	      { path: '/404', title: '404', type: 'link'}        
	    ]
	},
	{
		title: 'shop', type: 'sub', megaMenu: true, megaMenuType: 'large', children: [
	      { 
	      	title: 'mens-fashion',  type: 'link', children: [
		      	{ path: '/home/left-sidebar/collection/all', title: 'sports-wear',  type: 'link' },
		      	{ path: '/home/left-sidebar/collection/all', title: 'top',  type: 'link' },
		      	{ path: '/home/left-sidebar/collection/all', title: 'bottom',  type: 'link' },
		      	{ path: '/home/left-sidebar/collection/all', title: 'ethic-wear',  type: 'link' },
		      	{ path: '/home/left-sidebar/collection/all', title: 'sports-wear',  type: 'link' },
		      	{ path: '/home/left-sidebar/collection/all', title: 'shirts',  type: 'link' }
	      	]
	      },
	      { 
	      	title: 'women-fashion',  type: 'link', children: [
		      	{ path: '/home/left-sidebar/collection/all', title: 'dresses',  type: 'link' },
		      	{ path: '/home/left-sidebar/collection/all', title: 'skirts',  type: 'link' },
		      	{ path: '/home/left-sidebar/collection/all', title: 'westarn-wear',  type: 'link' },
		      	{ path: '/home/left-sidebar/collection/all', title: 'ethic-wear',  type: 'link' },
		      	{ path: '/home/left-sidebar/collection/all', title: 'sports-wear',  type: 'link' },
		      	{ path: '/home/left-sidebar/collection/all', title: 'bottom-wear',  type: 'link' }
	      	]
	      },
	      { 
	      	title: 'kids-fashion',  type: 'link', children: [
		      	{ path: '/home/left-sidebar/collection/all', title: 'sports-wear',  type: 'link' },
		      	{ path: '/home/left-sidebar/collection/all', title: 'ethic-wear',  type: 'link' },
		      	{ path: '/home/left-sidebar/collection/all', title: 'sports-wear',  type: 'link' },
		      	{ path: '/home/left-sidebar/collection/all', title: 'top',  type: 'link' },
		      	{ path: '/home/left-sidebar/collection/all', title: 'bottom-wear',  type: 'link' },
		      	{ path: '/home/left-sidebar/collection/all', title: 'ethic-wear',  type: 'link' }
	      	]
	      },
	      { 
	      	title: 'accessories',  type: 'link', children: [
		      	{ path: '/home/left-sidebar/collection/all', title: 'fashion-jewellery',  type: 'link' },
		      	{ path: '/home/left-sidebar/collection/all', title: 'caps-and-hats',  type: 'link' },
		      	{ path: '/home/left-sidebar/collection/all', title: 'precious-jewellery',  type: 'link' },
		      	{ path: '/home/left-sidebar/collection/all', title: 'necklaces',  type: 'link' },
		      	{ path: '/home/left-sidebar/collection/all', title: 'earrings',  type: 'link' },
		      	{ path: '/home/left-sidebar/collection/all', title: 'rings-wrist-wear',  type: 'link' }
	      	]
	      },
	      { 
	      	title: 'men-accessories',  type: 'link', children: [
		      	{ path: '/home/left-sidebar/collection/all', title: 'ties',  type: 'link' },
		      	{ path: '/home/left-sidebar/collection/all', title: 'cufflinks',  type: 'link' },
		      	{ path: '/home/left-sidebar/collection/all', title: 'pockets-squares',  type: 'link' },
		      	{ path: '/home/left-sidebar/collection/all', title: 'helmets',  type: 'link' },
		      	{ path: '/home/left-sidebar/collection/all', title: 'scarves',  type: 'link' },
		      	{ path: '/home/left-sidebar/collection/all', title: 'phone-cases',  type: 'link' }
	      	]
	      },
	    ]
	},
]