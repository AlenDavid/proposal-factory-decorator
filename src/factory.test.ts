import { Factory } from "./factory";

describe("[Factory]", () => {
  test("instantiate name from generator", async () => {
    const name = "test";

    class User {
      name: string;
    }

    expect(
      await Factory.generate<User>({ name })
    ).toStrictEqual({ name });
  });

  test("instantiate name from decorator", async () => {
    function propertyDecorator(setValue): PropertyDecorator {
      return function (target: Object, propertyKey: string | symbol): void {
        console.log(target);
      };
    }

    const name = "test";

    class User {
      @propertyDecorator(name)
      name: string;
    }

    expect(await Factory.generate<User>()).toStrictEqual({ name });
  });
});
