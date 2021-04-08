import "reflect-metadata";

import { Factory, CreateFactory } from "../index";

describe("[Factory]", () => {
  test("instantiate field from decorator", async () => {
    class User {
      @Factory(() => "abc")
      name: number;

      @Factory(() => "def")
      name2: number;
    }

    const userFactory = new CreateFactory<User>(User);

    const user = await userFactory.generate();

    const match = {
      name: "abc",
      name2: "def",
    };

    expect(user).toStrictEqual(match);
  });
});
