export interface Type<T> extends Function {
  new (...args: any[]): T;
}

export class Factory<T> {
  target: Type<T>;

  constructor(target: Type<T>) {
    this.target = target;
  }

  async generate(data: Partial<T>): Promise<Partial<T>> {
    return data;
  }
}
