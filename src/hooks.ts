export type HookHandler<TContext, TArgs> = (context: TContext, args: TArgs) => Promise<void> | void;

export interface IHook<TContext = unknown, TArgs = unknown> {
  tap(name: string, handler: HookHandler<TContext, TArgs>): void;
  call(context: TContext, args: TArgs): Promise<void>;
}

export interface CoreLifecycleHooks {
  beforePluginLoad: IHook<unknown, { pluginId: string; archivePath: string }>;
  afterPluginLoad: IHook<unknown, { pluginId: string; manifest: unknown }>;
  beforePluginUnload: IHook<unknown, { pluginId: string }>;
  onKernelReady: IHook<unknown, void>;
  onKernelShutdown: IHook<unknown, void>;
}

export interface IHookRegistry {
  get<TContext, TArgs>(name: string): IHook<TContext, TArgs>;
  register<TContext, TArgs>(name: string): IHook<TContext, TArgs>;
}
