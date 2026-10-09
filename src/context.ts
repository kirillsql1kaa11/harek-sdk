import { PluginManifest } from './manifest.js';
import { IEventBus } from './events.js';
import { IPluginStorage } from './storage.js';
import { ILogger } from './logger.js';
import { IServiceRegistry } from './services.js';
import { IHookRegistry } from './hooks.js';
import { IUISlotRegistry, WidgetBounds } from './ui.js';

export interface IPluginContext {
  readonly manifest: Readonly<PluginManifest>;
  readonly events: IEventBus;
  readonly storage: IPluginStorage;
  readonly logger: ILogger;
}

export interface IWidgetContext extends IPluginContext {
  readonly widgetId: string;
  getBounds(): WidgetBounds;
  setBounds(bounds: Partial<WidgetBounds>): void;
}

export interface IKernelControl extends IPluginContext {
  readonly services: IServiceRegistry;
  readonly hooks: IHookRegistry;
  readonly slots: IUISlotRegistry;
  readonly installedPlugins: ReadonlyArray<PluginManifest>;
}
