import * as path from 'path';
import { createFileSchemaSource } from './workflow/createFileSchemaSource';
import { generateSourceFile } from './workflow/generateSourceFile';
import { writeTypeScript } from './workflow/writeTypeScript';

interface Params {
  schemaDir: string;
  outFile: string;
}

export async function generate({ schemaDir, outFile }: Params) {
  const schemaSource = await createFileSchemaSource(
    path.resolve(process.cwd(), schemaDir),
  );
  const sourceFile = await generateSourceFile(schemaSource);
  writeTypeScript(sourceFile, path.resolve(process.cwd(), outFile));
}
