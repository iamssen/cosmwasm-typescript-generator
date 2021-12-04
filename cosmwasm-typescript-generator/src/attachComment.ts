import { JSONSchema7Definition } from 'json-schema';
import { addSyntheticLeadingComment, Node, SyntaxKind } from 'typescript';

export function attachComment<T extends Node>(
  node: T,
  definition: JSONSchema7Definition,
): T {
  if (typeof definition === 'object' && definition.description) {
    addSyntheticLeadingComment(
      node,
      SyntaxKind.MultiLineCommentTrivia,
      definition.description,
      true,
    );
  }

  return node;
}
