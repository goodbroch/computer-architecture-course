import { importPage } from 'nextra/pages'
import { useMDXComponents } from '../../mdx-components'
import { read_content } from './read_all_content';

//export const generateStaticParams = generateStaticParamsFor('mdxPath')
 
export async function generateStaticParams()
{
	const paths = [];

	const path_list = await read_content('./content/');

	for (let p = 0; p < path_list.length; p++) {
		const element = path_list[p];
		paths.push({ mdxPath: element })
	}
	return paths;
}

export async function generateMetadata(props) {
	const params = await props.params;
	const { metadata } = await importPage(params.mdxPath);
	return metadata;
}
 
const Wrapper = useMDXComponents().wrapper;
 
export default async function Page(props) {
	const params = await props.params;
	console.log(`Prepare file ${params.mdxPath}`)
	const result = await importPage(params.mdxPath);
	const { default: MDXContent, toc, metadata } = result;


	return (
	<Wrapper toc={toc} metadata={metadata}>
		<MDXContent {...props} params={params} />
	</Wrapper>
	)
}