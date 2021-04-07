export class Factory {
  static async generate<T>(data?: Partial<T>) {
    return data;
  }
}
