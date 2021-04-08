# Class Factory Generator (Proposal)

Install via:

```bash
npm i --save proposal-factory-decorator
```

Example code:

```ts
import { Factory, CreateFactory } from "proposal-factory-decorator";

class User {
  @Factory(() => "name")
  field: string;

  @Factory(() => false)
  isTrue: boolean;
}

const userFact = new CreateFactory() < User > User;

(async () => {
  const user = await userFact.generate(); // Creates an user

  console.log(user); // {field: "name", isTrue: false}
})();
```
