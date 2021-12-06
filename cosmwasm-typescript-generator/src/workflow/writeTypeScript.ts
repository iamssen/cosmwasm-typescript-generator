import fs from 'fs';
import { SourceFile } from 'typescript';
import { generateTypeScript } from './generateTypeScript';

export function writeTypeScript(source: SourceFile, outFile: string) {
  const code = generateTypeScript(source);

  fs.writeFileSync(outFile, code, {
    encoding: 'utf8',
  });
}
