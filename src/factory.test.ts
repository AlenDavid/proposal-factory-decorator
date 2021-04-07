import "reflect-metadata";

import { Factory, FactoryDecorator } from "./factory";

describe("[Factory]", () => {
  test("instantiate name from generator", async () => {
    const name = "test";

    class User {
      name: string;
    }

    expect(await new Factory<User>(User).generate({ name })).toStrictEqual({
      name,
    });
  });

  test("instantiate name from decorator", async () => {
    const name = "test";
    class User {
      @FactoryDecorator(() => name)
      name: string;
    }

    expect(await new Factory<User>(User).generate()).toStrictEqual({ name });
  });
});
