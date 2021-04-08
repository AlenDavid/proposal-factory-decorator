type Property = {
  target: Object;
  propertyKey: string | symbol;
  resolver: () => any;
};

class FactoryStorage {
  private static propertiesRef: Property[] = [];

  static add(property: Property) {
    this.propertiesRef.push(property);
  }

  static get() {
    return this.propertiesRef;
  }

  static find(target: Object) {
    return this.propertiesRef.filter((val) => val.target === target);
  }
}

export function Factory(resolver: () => any) {
  return function (target: Object, propertyKey: string | symbol) {
    FactoryStorage.add({ target: target.constructor, propertyKey, resolver });
  };
}

export class CreateFactory<T> {
  target: T;

  constructor(target: { new (): T }) {
    this.target = new target();
  }

  async generate(data: Partial<T> = {}): Promise<Partial<T>> {
    for (const props of FactoryStorage.find(this.target.constructor)) {
      data[props.propertyKey] = props.resolver();
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
