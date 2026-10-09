export type PluginType = 'board-widget' | 'core-extension' | 'background-service';

export type PluginPermission =
  | 'network:read'
  | 'network:write'
  | 'filesystem:read'
  | 'filesystem:write'
  | 'storage:local'
  | 'system:info'
  | 'clipboard:read'
  | 'clipboard:write'
  | 'kernel:internal';

export interface PluginSize {
  width: number;
  height: number;
  minWidth?: number;
  minHeight?: number;
  maxWidth?: number;
  maxHeight?: number;
}

export interface PluginManifest {
  id: string;
  name: string;
  version: string;
  author: string;
  description?: string;
  type: PluginType;
  entry: string;
  permissions?: PluginPermission[];
  minCoreVersion?: string;
  defaultSize?: PluginSize;
  icon?: string;
  tags?: string[];
  homepage?: string;
  repository?: string;
}
