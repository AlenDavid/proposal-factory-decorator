import { Factory } from "./factory";

describe("[Factory]", () => {
  test("instantiate name from generator", async () => {
    const name = "test";

    class User {
      name: string;
    }

    expect(await new Factory(User).generate({ name })).toStrictEqual({ name });
  });

  test("instantiate name from decorator", async () => {
    function propertyDecorator(setValue: () => string): PropertyDecorator {
      return function (target: Object, propertyKey: string | symbol): void {
        console.log("setValue: ", setValue);
        console.log("propertyKey: ", propertyKey);

        target[propertyKey] = setValue();
        console.log("target: ", target);
      };
    }

    const name = "test";

    class User {
      @propertyDecorator(() => name)
      name: string;
    }

    expect(await new Factory(User).generate()).toStrictEqual({ name });
  });
});
