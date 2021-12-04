# cosmwasm-typescript-generator

Create a typescript file from the cosmwasm schemes.

```js
import { generate } from 'cosmwasm-typescript-generator'

// Schema files must be prepared in your project (~/schema/{contract}/*.json)
// This script will make the index.ts file
generate({
  root: __dirname
})
```

Please refer <https://github.com/iamssen/cosmwasm-typescript-generator/examples/anchor>