import { JSONSchema7, JSONSchema7Definition } from 'json-schema';
import {
  factory,
  InterfaceDeclaration,
  PropertySignature,
  SyntaxKind,
} from 'typescript';
import { attachComment } from './attachComment';
import { GetTypeNode } from './createTypeStore';

export function parseProperties(
  properties: Record<string, JSONSchema7Definition>,
  required: string[],
  getTypeNode: GetTypeNode,
): PropertySignature[] {
  const propertyNames = Object.keys(properties ?? {});

  return propertyNames.map((propertyName) => {
    const property = properties[propertyName];
    return attachComment(
      factory.createPropertySignature(
        undefined,
        factory.createIdentifier(propertyName),
        required.includes(propertyName)
          ? undefined
          : factory.createToken(SyntaxKind.QuestionToken),
        getTypeNode(property),
      ),
      property,
    );
  });
}

export function parseInterface(
  name: string,
  schema: JSONSchema7,
  getTypeNode: GetTypeNode,
): InterfaceDeclaration {
  return attachComment(
    factory.createInterfaceDeclaration(
      undefined,
      [factory.createModifier(SyntaxKind.ExportKeyword)],
      factory.createIdentifier(name),
      undefined,
      undefined,
      schema.properties
        ? parseProperties(schema.properties, schema.required ?? [], getTypeNode)
        : [],
    ),
    schema,
  );
}

export function parseSingleSchema(
  schema: JSONSchema7,
  getTypeNode: GetTypeNode,
): InterfaceDeclaration {
  const name = schema.title!;
  return parseInterface(name, schema, getTypeNode);
}
