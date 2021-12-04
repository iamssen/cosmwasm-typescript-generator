import {
  factory,
  ModuleDeclaration,
  NodeFlags,
  Statement,
  SyntaxKind,
} from 'typescript';

export function toNamespace(
  ns: string,
  statements: Statement[],
): ModuleDeclaration {
  const names = ns.split('.').reverse();
  const root = names.reduce((prev, nsName) => {
    return [
      factory.createModuleDeclaration(
        undefined,
        [factory.createModifier(SyntaxKind.ExportKeyword)],
        factory.createIdentifier(nsName),
        factory.createModuleBlock(prev),
        NodeFlags.Namespace,
      ),
    ];
  }, statements);

  return root[0] as unknown as ModuleDeclaration;
}
