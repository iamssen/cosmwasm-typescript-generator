import { createPrinter, SourceFile } from 'typescript';

export function generateTypeScript(source: SourceFile): string {
  const printer = createPrinter();
  return [
    `// DO NOT EDIT MANUALLY : THIS FILE IS AUTO CREATED`,
    `/* eslint-disable */`,
    `// prettier-ignore`,
    `// noinspection JSUnusedGlobalSymbols`,
    ``,
    printer.printFile(source).replace(/\/\*/g, '/**'),
  ].join('\n');
}