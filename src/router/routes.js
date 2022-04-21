
export const routes = [
	{
		path:"/",
		name:"党建大数据",
		meta: {
			title: '党建大数据',
		},
		component:() => import("@/views/index")
	}
]