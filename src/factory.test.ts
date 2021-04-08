import "reflect-metadata";

import { Factory, CreateFactory } from "./factory";

describe("[Factory]", () => {
  test("instantiate field from generator", async () => {
    const field = "test";

    class User {
      field: string;
    }

    expect(
      await new CreateFactory<User>(User).generate({ field })
    ).toStrictEqual({
      field,
    });
  });

  test("instantiate field from decorator", async () => {
    class User {
      @Factory(() => "test")
      field: string;
    }

    expect(await new CreateFactory<User>(User).generate()).toStrictEqual({
      field: "test",
    });
  });
});
