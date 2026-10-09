export interface ServiceToken<T> {
  readonly id: string | symbol;
  readonly __serviceType?: T;
}

export type ServiceIdentifier<T> = string | symbol | ServiceToken<T>;

export interface IServiceRegistry {
  register<T>(id: ServiceIdentifier<T>, implementation: T): void;
  get<T>(id: ServiceIdentifier<T>): T;
  has(id: ServiceIdentifier<unknown>): boolean;
  override<T>(id: ServiceIdentifier<T>, implementation: T): void;
  unregister(id: ServiceIdentifier<unknown>): boolean;
}
