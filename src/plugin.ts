import { IWidgetContext, IKernelControl, IPluginContext } from './context.js';
import { WidgetBounds } from './ui.js';

export interface IWidgetPlugin {
  onLoad(context: IWidgetContext): Promise<void> | void;
  render(container: HTMLElement): void;
  onUnload?(): Promise<void> | void;
  onResize?(bounds: WidgetBounds): void;
}

export interface ICoreExtension {
  onKernelBoot(kernel: IKernelControl): Promise<void> | void;
  onKernelShutdown?(): Promise<void> | void;
}

export interface IBackgroundService {
  onStart(context: IPluginContext): Promise<void> | void;
  onStop(): Promise<void> | void;
}

export type HarekPlugin = IWidgetPlugin | ICoreExtension | IBackgroundService;
