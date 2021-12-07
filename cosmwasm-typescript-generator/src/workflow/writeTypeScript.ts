import fs from 'fs';
import { SourceFile } from 'typescript';
import { generateTypeScript } from './generateTypeScript';

export function writeTypeScript(
  source: SourceFile,
  outFile: string | string[],
) {
  const code = generateTypeScript(source);
  const files = Array.isArray(outFile) ? outFile : [outFile];

  for (const file of files) {
    fs.writeFileSync(file, code, {
      encoding: 'utf8',
    });
  }
}
