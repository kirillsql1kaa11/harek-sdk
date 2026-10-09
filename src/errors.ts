export class HarekError extends Error {
  constructor(message: string) {
    super(message);
    this.name = new.target.name;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export class ManifestValidationError extends HarekError {
  constructor(message: string, readonly errors: string[] = []) {
    super(message);
  }
}

export class PluginPermissionError extends HarekError {
  constructor(readonly permission: string, readonly pluginId: string) {
    super(`Плагин '${pluginId}' запросил операцию без необходимого разрешения '${permission}'`);
  }
}

export class PluginLifecycleError extends HarekError {
  constructor(readonly pluginId: string, readonly stage: string, originalError?: unknown) {
    const details = originalError instanceof Error ? `: ${originalError.message}` : '';
    super(`Ошибка жизненного цикла плагина '${pluginId}' на этапе '${stage}'${details}`);
  }
}

export class ServiceNotFoundError extends HarekError {
  constructor(readonly serviceId: string | symbol) {
    super(`Сервис '${String(serviceId)}' не найден в реестре сервисов`);
  }
}
