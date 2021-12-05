import * as path from 'path';
import { createFileSchemaSource } from './workflow/createFileSchemaSource';
import { generateSourceFile } from './workflow/generateSourceFile';
import { writeTypeScript } from './workflow/writeTypeScript';

interface Params {
  root: string;
  schema?: string;
  outFile?: string;
}

export async function generate({
  root,
  schema: schemaRoot = path.resolve(root, 'schema'),
  outFile = path.resolve(root, 'index.ts'),
}: Params) {
  const schemaSource = await createFileSchemaSource(schemaRoot);
  const sourceFile = await generateSourceFile(schemaSource);
  writeTypeScript(sourceFile, outFile);
}
