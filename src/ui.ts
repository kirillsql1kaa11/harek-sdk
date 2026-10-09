export type UISlotId =
  | 'slot:workspace'
  | 'slot:toolbar'
  | 'slot:sidebar'
  | 'slot:statusbar'
  | (string & {});

export interface WidgetPosition {
  x: number;
  y: number;
}

export interface WidgetDimension {
  width: number;
  height: number;
}

export interface WidgetBounds extends WidgetPosition, WidgetDimension {}

export interface IUISlotRegistry {
  registerSlotItem(slotId: UISlotId, itemId: string, elementFactory: () => HTMLElement): void;
  unregisterSlotItem(slotId: UISlotId, itemId: string): boolean;
}
