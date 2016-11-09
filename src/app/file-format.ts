export class FileFormat {
	name: string;
	mime: string;
	extension: string;
}

export const FILEFORMATS: FileFormat[] = [
	{name: 'CSV', mime: 'text/csv', extension: '.csv'},
	{name: 'JSON', mime: 'application/json', extension: '.json'}
]