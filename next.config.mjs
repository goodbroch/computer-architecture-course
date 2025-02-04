import nextra from 'nextra'
 
const withNextra = nextra({
	contentDirBasePath: '/',
	staticImage: true
})

export default withNextra({
	output: 'export',
	images: {
		unoptimized: true
	},
})