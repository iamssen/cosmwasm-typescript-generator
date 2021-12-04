import { camelCase } from 'change-case';
import * as fs from 'fs';
import glob from 'glob';
import { JSONSchema7 } from 'json-schema';
import * as path from 'path';
import {
  createPrinter,
  createSourceFile,
  factory,
  InterfaceDeclaration,
  ModuleDeclaration,
  NodeFlags,
  ScriptTarget,
  SyntaxKind,
} from 'typescript';
import { createTypeStore } from './createTypeStore';
import { parseGroupSchema } from './parseGroupSchema';
import { parseSingleSchema } from './parseSingleSchema';

interface Params {
  root: string;
  schema?: string;
  outFile?: string;
}

export async function generate({
  root,
  schema = path.resolve(root, 'schema'),
  outFile = path.resolve(root, 'index.ts'),
}: Params) {
  const contractNames = fs
    .readdirSync(schema)
    .filter((contract) =>
      fs.statSync(path.resolve(schema, contract)).isDirectory(),
    );

  const contractDeclarations: ModuleDeclaration[] = [];
  const { registerDefinitions, getTypeNode, getTypeStatements } =
    createTypeStore();

  for (const contractName of contractNames) {
    const schemaFiles = glob.sync(`${schema}/${contractName}/*.json`);
    const statements: (ModuleDeclaration | InterfaceDeclaration)[] = [];

    for (const schemaFile of schemaFiles) {
      const schema: JSONSchema7 = JSON.parse(
        fs.readFileSync(schemaFile, { encoding: 'utf8' }),
      );

      if (schema.definitions) {
        registerDefinitions(schema.definitions);
      }

      try {
        if (schema.title && Array.isArray(schema.anyOf)) {
          statements.push(parseGroupSchema(schema, getTypeNode));
        } else if (schema.title) {
          statements.push(parseSingleSchema(schema, getTypeNode));
        }
      } catch (error) {
        console.error(
          `Failed to parse ${contractName}/#${schema.title}`,
          error,
        );
      }
    }

    const contractDeclaration = factory.createModuleDeclaration(
      undefined,
      [factory.createModifier(SyntaxKind.ExportKeyword)],
      factory.createIdentifier(camelCase(contractName)),
      factory.createModuleBlock(statements),
      NodeFlags.Namespace,
    );

    contractDeclarations.push(contractDeclaration);
  }

  const source = factory.updateSourceFile(
    createSourceFile('anchor.ts', '', ScriptTarget.ESNext),
    [...getTypeStatements(), ...contractDeclarations],
  );

  const printer = createPrinter();
  const code = [
    `/* eslint-disable @typescript-eslint/no-shadow */`,
    `//noinspection JSUnusedGlobalSymbols`,
    ``,
    printer.printFile(source).replace(/\/\*/g, '/**'),
  ].join('\n');

  fs.writeFileSync(outFile, code, {
    encoding: 'utf8',
  });
}
