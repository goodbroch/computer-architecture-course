import { Footer, Layout, Navbar } from 'nextra-theme-docs'
import { Head } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'
import 'nextra-theme-docs/style.css'
 
export const metadata = { }

const navbar = (<Navbar logo={<b>Аппаратное обеспечение вычислительных систем</b>} />)

const footer = <Footer>MIT 2023-{new Date().getFullYear()} © ФИТиП ИТМО.</Footer>
 
const themeSwitch = {
	dark: 'Темный',
    light: 'Светлый',
    system: 'Системный'
}

const toc = {
	title: 'Навигация'
}

const feedback = {
	content: '',
	labels: ''
}

export default async function RootLayout({ children }) {
	return (
	<html
		lang="ru"
		dir="ltr"
		suppressHydrationWarning
	>
		<Head />
		<body>
			<Layout
				navbar={navbar}
				pageMap={await getPageMap()}
				docsRepositoryBase="https://github.com/goodbroch/computer-architecture-course"
				footer={footer}
				themeSwitch={themeSwitch}
				toc={toc}
				feedback={feedback}
				editLink={''}
			>
				{children}
			</Layout>
		</body>
	</html>
	)
}