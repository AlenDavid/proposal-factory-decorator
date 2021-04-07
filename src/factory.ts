import "reflect-metadata";

export function FactoryDecorator(resolve: () => any) {
  return function (target: Object, propertyKey: string | symbol) {
    Reflect.defineMetadata(
      "Factory:FactoryDecorator",
      { resolve },
      target,
      propertyKey
    );
  };
}

function getDecorators(target: any, propertyName: string | symbol): any[] {
  // get info about keys that used in current property
  const keys: any[] = Reflect.getMetadataKeys(target, propertyName);
  const decorators = keys
    // filter your custom decorators
    .filter((key) => key.toString().startsWith("Factory:FactoryDecorator"))
    .reduce((values, key) => {
      // get metadata value.
      const currValues = Reflect.getMetadata(key, target, propertyName);
      return values.concat(currValues);
    }, []);

  return decorators;
}

export class Factory<T> {
  target: T;

  constructor(target: { new (): T }) {
    this.target = new target();
  }

  async generate(data: Partial<T> = {}): Promise<Partial<T>> {
    const keys = Reflect.ownKeys(this.target.constructor).filter(
      (key) => Object.keys({ ...data }).indexOf(key.toString()) === -1
    );

    for (let key of keys) {
      const fromMetadata = getDecorators(this.target, key);
      console.log(key, fromMetadata);

      if (fromMetadata.length > 0) {
        fromMetadata.forEach(({ resolve }) => {
          data[key] = resolve();
        });
      }
    }

    return data;
  }
}
