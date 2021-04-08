import "reflect-metadata";

import { Factory, CreateFactory } from "./factory";

describe("[Factory]", () => {
  test("instantiate name from generator", async () => {
    const name = "test";

    class User {
      name: string;
    }

    expect(
      await new CreateFactory<User>(User).generate({ name })
    ).toStrictEqual({
      name,
    });
  });

  test("instantiate name from decorator", async () => {
    const name = "test";
    class User {
      @Factory(() => name)
      name: string;
    }

    expect(await new CreateFactory<User>(User).generate()).toStrictEqual({
      name,
    });
  });
});
