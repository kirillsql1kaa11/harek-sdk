export type EventCallback<T = unknown> = (payload: T) => void | Promise<void>;

export interface EventSubscription {
  unsubscribe(): void;
}

export interface IEventBus {
  on<T = unknown>(event: string, callback: EventCallback<T>): EventSubscription;
  once<T = unknown>(event: string, callback: EventCallback<T>): EventSubscription;
  off<T = unknown>(event: string, callback: EventCallback<T>): void;
  emit<T = unknown>(event: string, payload?: T): void;
  clear(event?: string): void;
}
