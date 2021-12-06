# cosmwasm-typescript-generator

Create a typescript file from the cosmwasm schemes.

```js
import { generate } from 'cosmwasm-typescript-generator';

// Schema files must be prepared in your project (e.g. ~/schema/{contract}/*.json)
// This script will make the index.ts file
generate({
  schemaDir: './schema',
  outFile: './index.ts',
});
```

Please refer <https://github.com/iamssen/cosmwasm-typescript-generator/examples/anchor>

# Customize workflow

```js
import { SourceFile } from 'typescript';
import {
  createFileSchemaSource,
  generateSourceFile,
  writeTypeScript,
  SchemaSource,
} from 'cosmwasm-typescript-generator';

// const schemaSource: SchemaSource = await createFileSchemaSource('./schema')
const schemaSource: SchemaSource = await yourCustomCreateSchemaSource();

const sourceFile: SourceFile = await generateSourceFile(schemaSource);

// writeTypeScript(sourcFile, './index.ts')
yourCustomWriteSourceFile();
```
