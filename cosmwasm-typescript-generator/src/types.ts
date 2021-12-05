import { JSONSchema7 } from 'json-schema';

export type SchemaSource = Array<{
  contract: string;
  schema: () => Promise<JSONSchema7[]>;
}>;
