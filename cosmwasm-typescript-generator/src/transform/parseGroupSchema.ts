import { pascalCase } from 'change-case';
import { JSONSchema7 } from 'json-schema';
import {
  factory,
  InterfaceDeclaration,
  ModuleDeclaration,
  NodeFlags,
  SyntaxKind,
} from 'typescript';
import { attachComment } from './attachComment';
import { GetTypeNode } from './createTypeStore';
import { parseInterface } from './parseSingleSchema';

export function parseGroupSchema(
  schema: JSONSchema7,
  getTypeNode: GetTypeNode,
): ModuleDeclaration {
  const name = schema.title!;
  const interfaces: InterfaceDeclaration[] = (schema.anyOf ??
    schema.oneOf)!.map((msg) => {
    if (typeof msg !== 'object') {
      throw new Error(`msg is not a object!`);
    }
    return parseInterface(pascalCase(msg.required![0]), msg, getTypeNode);
  });

  return attachComment(
    factory.createModuleDeclaration(
      undefined,
      [factory.createModifier(SyntaxKind.ExportKeyword)],
      factory.createIdentifier(name),
      factory.createModuleBlock(interfaces),
      NodeFlags.Namespace,
    ),
    schema,
  );
}
