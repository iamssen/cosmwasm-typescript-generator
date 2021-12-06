import { JSONSchema7Definition } from 'json-schema';
import { factory, Statement, SyntaxKind, TypeNode } from 'typescript';
import { attachComment } from './attachComment';
import { parseInterface, parseProperties } from './parseSingleSchema';

export type GetTypeNode = (property: JSONSchema7Definition) => TypeNode;

const IS_RESPONSE = /Response$/;

export function createTypeStore(): {
  registerDefinitions: (
    definitions: Record<string, JSONSchema7Definition>,
  ) => void;
  getTypeNode: GetTypeNode;
  getTypeStatements: () => Statement[];
} {
  const types = new Map<string, Statement>();

  function registerDefinitions(
    definitions: Record<string, JSONSchema7Definition>,
  ) {
    const names = Object.keys(definitions);

    for (const name of names) {
      if (IS_RESPONSE.test(name) || types.has(name)) {
        continue;
      }

      const definition = definitions[name];

      if (typeof definition !== 'object') {
        continue;
      }

      if (definition.type === 'string') {
        // export type T = 'a' | 'b' | 'c'
        if (Array.isArray(definition.enum)) {
          types.set(
            name,
            attachComment(
              factory.createTypeAliasDeclaration(
                undefined,
                [factory.createModifier(SyntaxKind.ExportKeyword)],
                factory.createIdentifier(name),
                undefined,
                factory.createUnionTypeNode(
                  definition.enum.map((enumValue) => {
                    let literal;

                    if (typeof enumValue === 'string') {
                      literal = factory.createStringLiteral(enumValue);
                    } else {
                      throw new Error(`Unknown enum literal "${enumValue}"`);
                    }

                    return factory.createLiteralTypeNode(literal);
                  }),
                ),
              ),
              definition,
            ),
          );
        }
        // export type T = string
        else {
          types.set(
            name,
            attachComment(
              factory.createTypeAliasDeclaration(
                undefined,
                [factory.createModifier(SyntaxKind.ExportKeyword)],
                factory.createIdentifier(name),
                undefined,
                factory.createKeywordTypeNode(SyntaxKind.StringKeyword),
              ),
              definition,
            ),
          );
        }
      }
      // export interface T { ... }
      else if (definition.type === 'object') {
        types.set(name, parseInterface(name, definition, getTypeNode));
      } else {
        throw new Error(
          `Unknown case: definition.type is "${definition.type}"`,
        );
      }
    }
  }

  function getTypeNode(property: JSONSchema7Definition): TypeNode {
    if (typeof property !== 'object') {
      throw new Error(`property is not a object!`);
    }

    if (Array.isArray(property.type)) {
      return factory.createUnionTypeNode(
        property.type.map((item) => {
          switch (item) {
            case 'number':
            case 'integer':
              if (property.format) {
                if (!types.has(property.format)) {
                  types.set(
                    property.format,
                    factory.createTypeAliasDeclaration(
                      undefined,
                      [factory.createModifier(SyntaxKind.ExportKeyword)],
                      factory.createIdentifier(property.format),
                      undefined,
                      factory.createKeywordTypeNode(SyntaxKind.NumberKeyword),
                    ),
                  );
                }

                return factory.createTypeReferenceNode(property.format);
              } else {
                return factory.createKeywordTypeNode(SyntaxKind.NumberKeyword);
              }
            case 'null':
              return factory.createLiteralTypeNode(factory.createNull());
            case 'string':
              return factory.createKeywordTypeNode(SyntaxKind.StringKeyword);
            case 'array':
              if (Array.isArray(property.items)) {
                return factory.createUnionTypeNode(
                  property.items.map((itemsItem) => getTypeNode(itemsItem)),
                );
              } else if (property.items) {
                return getTypeNode(property.items);
              } else {
                throw new Error(
                  `Unknown case: property.type includes array, but can't find property.items`,
                );
              }
          }

          throw new Error(
            `Unknown case: property.type includes unknown type "${item}"`,
          );
        }),
      );
    } else if (Array.isArray(property.allOf)) {
      if (property.allOf.length > 1) {
        return factory.createIntersectionTypeNode(
          property.allOf.map((item) => getTypeNode(item)),
        );
      } else {
        return getTypeNode(property.allOf[0]);
      }
    } else if (Array.isArray(property.anyOf)) {
      return factory.createUnionTypeNode(
        property.anyOf.map((item) => getTypeNode(item)),
      );
    } else if (property.$ref) {
      return factory.createTypeReferenceNode(
        property.$ref.split('/').reverse()[0],
      );
    } else if (property.type === 'array' && property.items) {
      if (Array.isArray(property.items)) {
        return factory.createArrayTypeNode(
          factory.createParenthesizedType(
            factory.createUnionTypeNode(
              property.items.map((item) => getTypeNode(item)),
            ),
          ),
        );
      } else if (
        typeof property.items === 'object' &&
        property.items.type === 'array' &&
        Array.isArray(property.items.items)
      ) {
        return factory.createTupleTypeNode(
          property.items.items.map((itemsItem) => getTypeNode(itemsItem)),
        );
      } else {
        return factory.createArrayTypeNode(getTypeNode(property.items));
      }
    } else if (property.type === 'object') {
      return factory.createTypeLiteralNode(
        property.properties
          ? parseProperties(
              property.properties,
              property.required ?? [],
              getTypeNode,
            )
          : undefined,
      );
    } else if (property.type === 'null') {
      return factory.createLiteralTypeNode(factory.createNull());
    } else if (property.type === 'string') {
      if (Array.isArray(property.enum)) {
        return factory.createUnionTypeNode(
          property.enum.map((enumValue) => {
            let literal;

            if (typeof enumValue === 'string') {
              literal = factory.createStringLiteral(enumValue);
            } else {
              throw new Error(`Unknown enum literal "${enumValue}"`);
            }

            return factory.createLiteralTypeNode(literal);
          }),
        );
      } else {
        return factory.createKeywordTypeNode(SyntaxKind.StringKeyword);
      }
    } else if (property.type === 'integer' || property.type === 'number') {
      if (property.format) {
        if (!types.has(property.format)) {
          types.set(
            property.format,
            factory.createTypeAliasDeclaration(
              undefined,
              [factory.createModifier(SyntaxKind.ExportKeyword)],
              factory.createIdentifier(property.format),
              undefined,
              factory.createKeywordTypeNode(SyntaxKind.NumberKeyword),
            ),
          );
        }

        return factory.createTypeReferenceNode(property.format);
      } else {
        return factory.createKeywordTypeNode(SyntaxKind.NumberKeyword);
      }
    }

    throw new Error(
      `Unknown case: property is """\n${JSON.stringify(
        property,
        null,
        2,
      )}\n"""`,
    );
  }

  function getTypeStatements() {
    return Array.from(types.values());
  }

  return {
    registerDefinitions,
    getTypeNode,
    getTypeStatements,
  };
}
