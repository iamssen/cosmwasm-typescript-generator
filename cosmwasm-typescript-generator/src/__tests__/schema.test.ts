import { generateTypeScript } from '../workflow/generateTypeScript';
import { generateSourceFile } from '../workflow/generateSourceFile';
import { createFileSchemaSource } from '../workflow/createFileSchemaSource';
import * as path from 'path';

describe('schema test', () => {
  test('should parse counter schema', async () => {
    const schemaSource = await createFileSchemaSource(
      path.resolve(__dirname, '../../__fixtures__/schema/counter'),
    );
    
    const sourceFile = await generateSourceFile(schemaSource);
    
    const code = generateTypeScript(sourceFile);
    
    expect(code).toMatchSnapshot();
  });
});
