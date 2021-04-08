import "reflect-metadata";

export function Factory(resolve: () => any) {
  return function (target: Object, propertyKey: string | symbol) {
    Reflect.defineMetadata(
      "Factory:FactoryDecorator:" + target.constructor.name,
      { resolve },
      target,
      propertyKey
    );
  };
}

function getDecorators(target: Object, propertyName: string | symbol): any[] {
  // get info about keys that used in current property
  const keys: any[] = Reflect.getMetadataKeys(target, propertyName);
  const decorators = keys
    // filter your custom decorators
    .filter((key) =>
      key
        .toString()
        .startsWith("Factory:FactoryDecorator:" + target.constructor.name)
    )
    .reduce((values, key) => {
      // get metadata value.
      const currValues = Reflect.getMetadata(key, target, propertyName);
      return values.concat(currValues);
    }, []);

  return decorators;
}

export class CreateFactory<T> {
  target: T;

  constructor(target: { new (): T }) {
    this.target = new target();
  }

  async generate(data: Partial<T> = {}): Promise<Partial<T>> {
    const keys = Reflect.ownKeys(this.target.constructor).filter(
      (key) => Object.keys({ ...data }).indexOf(key.toString()) === -1
    );

    // for each ket that is declare at @Factory
    for (let key of keys) {
      const fromMetadata = getDecorators(this.target, key);

      if (fromMetadata.length > 0) {
        fromMetadata.forEach(({ resolve }) => {
          data[key] = resolve();
        });
      }
    }

    return data;
  }

  async generateMany(
    count: number,
    data: Partial<T> = {}
  ): Promise<Partial<T>[]> {
    const arr: Partial<T>[] = [];

    for (let index = 0; index < count; index++) {
      this.generate(data).then((value) => (arr[index] = value));
    }

    return arr;
  }
}
