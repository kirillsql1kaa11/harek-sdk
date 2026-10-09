import { ManifestValidationError } from './errors.js';
import { PluginManifest, PluginType, PluginPermission } from './manifest.js';

const VALID_PLUGIN_TYPES: ReadonlySet<string> = new Set<PluginType>([
  'board-widget',
  'core-extension',
  'background-service'
]);

const VALID_PERMISSIONS: ReadonlySet<string> = new Set<PluginPermission>([
  'network:read',
  'network:write',
  'filesystem:read',
  'filesystem:write',
  'storage:local',
  'system:info',
  'clipboard:read',
  'clipboard:write',
  'kernel:internal'
]);

const PLUGIN_ID_REGEX = /^[a-z0-9]+(-[a-z0-9]+)*(\.[a-z0-9]+(-[a-z0-9]+)*)+$/;
const SEMVER_REGEX = /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$/;

export function validateManifest(data: unknown): PluginManifest {
  if (typeof data !== 'object' || data === null || Array.isArray(data)) {
    throw new ManifestValidationError('Манифест плагина должен являться JSON объектом');
  }

  const raw = data as Record<string, unknown>;
  const errors: string[] = [];

  if (typeof raw['id'] !== 'string' || !PLUGIN_ID_REGEX.test(raw['id'])) {
    errors.push("Поле 'id' обязательно и должно соответствовать формату идентификатора (например: 'com.developer.my-plugin')");
  }

  if (typeof raw['name'] !== 'string' || raw['name'].trim().length === 0) {
    errors.push("Поле 'name' обязательно и не должно быть пустым");
  }

  if (typeof raw['version'] !== 'string' || !SEMVER_REGEX.test(raw['version'])) {
    errors.push("Поле 'version' обязательно и должно соответствовать формату SemVer (например: '1.0.0')");
  }

  if (typeof raw['author'] !== 'string' || raw['author'].trim().length === 0) {
    errors.push("Поле 'author' обязательно и не должно быть пустым");
  }

  if (typeof raw['type'] !== 'string' || !VALID_PLUGIN_TYPES.has(raw['type'])) {
    errors.push(`Поле 'type' обязательно и должно принимать одно из значений: ${Array.from(VALID_PLUGIN_TYPES).join(', ')}`);
  }

  if (typeof raw['entry'] !== 'string' || raw['entry'].trim().length === 0) {
    errors.push("Поле 'entry' обязательно и должно указывать на точку входа (например: 'index.js')");
  }

  if ('permissions' in raw && raw['permissions'] !== undefined) {
    if (!Array.isArray(raw['permissions'])) {
      errors.push("Поле 'permissions' должно являться массивом строк");
    } else {
      for (const perm of raw['permissions']) {
        if (typeof perm !== 'string' || !VALID_PERMISSIONS.has(perm)) {
          errors.push(`Недопустимое разрешение '${String(perm)}' в списке 'permissions'`);
        }
      }
    }
  }

  if ('defaultSize' in raw && raw['defaultSize'] !== undefined) {
    if (typeof raw['defaultSize'] !== 'object' || raw['defaultSize'] === null || Array.isArray(raw['defaultSize'])) {
      errors.push("Поле 'defaultSize' должно являться объектом");
    } else {
      const size = raw['defaultSize'] as Record<string, unknown>;
      if (typeof size['width'] !== 'number' || size['width'] <= 0) {
        errors.push("Поле 'defaultSize.width' должно являться положительным числом");
      }
      if (typeof size['height'] !== 'number' || size['height'] <= 0) {
        errors.push("Поле 'defaultSize.height' должно являться положительным числом");
      }
    }
  }

  if (errors.length > 0) {
    throw new ManifestValidationError('Ошибка валидации манифеста плагина', errors);
  }

  return raw as unknown as PluginManifest;
}
