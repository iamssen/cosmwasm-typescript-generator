import * as path from 'path';
import { createFileSchemaSource } from './workflow/createFileSchemaSource';
import { generateSourceFile } from './workflow/generateSourceFile';
import { writeTypeScript } from './workflow/writeTypeScript';

interface Params {
  schemaDir: string;
  outFile: string | string[];
}

export async function generate({ schemaDir, outFile }: Params) {
  const schemaSource = await createFileSchemaSource(
    path.resolve(process.cwd(), schemaDir),
  );
  const sourceFile = await generateSourceFile(schemaSource);

  const files = Array.isArray(outFile) ? outFile : [outFile];
  writeTypeScript(
    sourceFile,
    files.map((file) => path.resolve(process.cwd(), file)),
  );
}
