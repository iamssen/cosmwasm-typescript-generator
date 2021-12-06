import { camelCase } from 'change-case';
import {
  createSourceFile,
  factory,
  InterfaceDeclaration,
  ModuleDeclaration,
  NodeFlags,
  ScriptTarget,
  SourceFile,
  SyntaxKind,
} from 'typescript';
import { createTypeStore } from '../transform/createTypeStore';
import { parseGroupSchema } from '../transform/parseGroupSchema';
import { parseSingleSchema } from '../transform/parseSingleSchema';
import { SchemaSource } from '../types';

export async function generateSourceFile(
  source: SchemaSource,
): Promise<SourceFile> {
  const contractDeclarations: ModuleDeclaration[] = [];
  const { registerDefinitions, getTypeNode, getTypeStatements } =
    createTypeStore();

  for (const { contract: contractName, schema: getSchemas } of source) {
    const statements: (ModuleDeclaration | InterfaceDeclaration)[] = [];
    const schemas = await getSchemas();

    for (const schema of schemas) {
      if (schema.definitions) {
        registerDefinitions(schema.definitions);
      }

      try {
        if (
          schema.title &&
          (Array.isArray(schema.anyOf) || Array.isArray(schema.oneOf))
        ) {
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

  return factory.updateSourceFile(
    createSourceFile('source.ts', '', ScriptTarget.ESNext),
    [...getTypeStatements(), ...contractDeclarations],
  );
}
