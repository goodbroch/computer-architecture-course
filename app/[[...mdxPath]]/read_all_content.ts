import { readdir } from 'fs/promises';

export async function read_content(path: string): Promise<string[][]>
{
    const content = await readdir(path, { withFileTypes: true });

    const result = [];

    for (let file = 0; file < content.length; file++) {
        if (content[file].isDirectory())
        {
            const dir_name = content[file].name;
            const dir_result = await read_content(path + dir_name + '/');
            for (let dir_file = 0; dir_file < dir_result.length; dir_file++) {
                const element = [ dir_name ];
                element.push(...dir_result[dir_file])
                result.push(element);
            }
            continue;
        }

        const file_name = content[file].name;
        const splits = file_name.split('.');
        const extension = splits[splits.length - 1];

        if (extension != 'md' && extension != 'mdx' || splits.length < 2)
            continue;

        const file_name_1 = file_name.substring(0, file_name.length - extension.length - 1);
        if (file_name_1 == 'index')
            result.push([ '' ])
        else
            result.push([ file_name_1 ])
    }

    return result;
}