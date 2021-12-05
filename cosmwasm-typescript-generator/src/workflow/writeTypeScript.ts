import fs from 'fs';
import { createPrinter, SourceFile } from 'typescript';

export function writeTypeScript(source: SourceFile, outFile: string) {
  const printer = createPrinter();
  const code = [
    `// DO NOT EDIT MANUALLY : THIS FILE IS AUTO CREATED`,
    `/* eslint-disable @typescript-eslint/no-shadow */`,
    `//noinspection JSUnusedGlobalSymbols`,
    ``,
    printer.printFile(source).replace(/\/\*/g, '/**'),
  ].join('\n');

  fs.writeFileSync(outFile, code, {
    encoding: 'utf8',
  });
}
