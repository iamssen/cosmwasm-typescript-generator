import { generate } from 'cosmwasm-typescript-generator';

generate({
  schemaDir: path.resolve(__dirname, '../schema'),
  outFile: path.resolve(__dirname, '../anchor.types.ts'),
});
