import * as fs from 'fs';
import * as glob from 'glob';
import * as path from 'path';
import { SchemaSource } from '../types';

export async function createFileSchemaSource(
  schemaRoot: string,
): Promise<SchemaSource> {
  const contractNames = fs
    .readdirSync(schemaRoot)
    .filter((contract) =>
      fs.statSync(path.resolve(schemaRoot, contract)).isDirectory(),
    );

  return contractNames.map((contract) => {
    return {
      contract,
      schema: async () => {
        const schemaFiles = glob.sync(`${schemaRoot}/${contract}/*.json`);
        const sources = await Promise.all(
          schemaFiles.map((schemaFile) =>
            fs.readFileSync(schemaFile, { encoding: 'utf8' }),
          ),
        );
        return sources.map((jsonSource) => JSON.parse(jsonSource));
      },
    };
  });
}
