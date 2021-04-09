# Class Factory Decorators

This package is aimed to testing and seeding at your projects. It's easy to implement and create your own class factory.

<a class="github-button" href="https://github.com/AlenDavid" aria-label="Follow @AlenDavid on GitHub">Follow @AlenDavid</a>
<a class="github-button" href="https://github.com/AlenDavid/proposal-factory-decorator" data-icon="octicon-star" aria-label="Star AlenDavid/proposal-factory-decorator on GitHub">Star</a>

- [Class Factory Decorators](#class-factory-decorators)
  - [Install through cli via command](#install-through-cli-via-command)
  - [Example code](#example-code)
  - [Recommends](#recommends)
  - [Caution](#caution)

## Install through cli via command

You might want to use this quick cli command to install the package.

```bash
npm i --save proposal-factory-decorator
```

## Example code

In this example, we can see how the @Factory decorator works. It's quite simple and easy to duplicate.

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
  const user = await userFact.generate(); // Creates an User

  console.log(user); // { field: "name", isTrue: false }
})();
```

## Recommends

It's highly recommended to use faker package. The faker package provides useful evaluations to our @Factory method.

```bash
npm i --save faker @types/faker
```

One simple example (extending the example above) to use faker lib

```ts
import { Factory, CreateFactory } from "proposal-factory-decorator";
import faker from "faker";

class User {
  @Factory(() => faker.name.findName())
  name: string;

  @Factory(() => faker.internet.email())
  email: boolean;
}

const userFact = new CreateFactory() < User > User;

(async () => {
  const user = await userFact.generate(); // Creates a faker User

  console.log(user); // { name: "Some random name", email: "some@random.email" }
})();
```

## Caution

The @Factory decorator only works with the CreateFactory class.
If you try to do something like

```ts
class DontWork {
  @Factory(() => somevalue)
  field: any;
}

console.log(new DontWork()); // it will print this empty value {}
```

If you want to support me, go check my [Patreon](https://www.patreon.com/davidalen)!

Happy coding you all 🖥️🙇!
