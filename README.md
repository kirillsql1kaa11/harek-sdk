# Harek SDK

Официальный комплект разработки (SDK) для создания плагинов, виджетов рабочей области и системных расширений микроядра платформы Harek.

Пакет определяет строгие типизированные контракты взаимодействия между микроядром платформы Harek и внешними модулями, реализуя концепцию Contract-First архитектуры.

## Ключевые возможности

- Полная строгая типизация интерфейсов жизненного цикла плагинов, виджетов и системных расширений ядра.
- Спецификация и валидация манифеста плагинов с проверкой версионирования SemVer и гранулярных прав доступа.
- Контракты событийной шины (Event Bus) для организации слабосвязанного взаимодействия между компонентами.
- Контракты реестра сервисов (Service Registry) с поддержкой внедрения зависимостей и переопределения реализаций системными расширениями.
- Система хуков жизненного цикла ядра (Hooks Pipeline) для перехвата этапов инициализации, загрузки и выгрузки модулей.
- Контракты точек расширения пользовательского интерфейса (UI Slots) для интеграции виджетов на холст и в системные панели.
- Изолированный контекст плагина с доступом к хранилищу ключ-значение и структурированному логированию.

## Системные требования

- Node.js 20.0.0 или новее
- npm 10.0.0 или новее
- TypeScript 5.0.0 или новее (при разработке плагинов на TypeScript)

## Быстрый старт

### Установка зависимостей в проекте плагина

```powershell
npm install harek-sdk
```

### Пример 1. Создание прикладного виджета для доски

Манифест `manifest.json`:

```json
{
  "id": "com.developer.network-stat",
  "name": "Сетевая статистика",
  "version": "1.0.0",
  "author": "Developer",
  "type": "board-widget",
  "entry": "dist/index.js",
  "permissions": [
    "network:read",
    "storage:local"
  ],
  "defaultSize": {
    "width": 320,
    "height": 220
  }
}
```

Точка входа `src/index.ts`:

```typescript
import { IWidgetPlugin, IWidgetContext } from 'harek-sdk';

export default class NetworkStatWidget implements IWidgetPlugin {
  private context!: IWidgetContext;

  async onLoad(context: IWidgetContext): Promise<void> {
    this.context = context;
    await this.context.storage.set('initializedAt', Date.now());
  }

  render(container: HTMLElement): void {
    container.className = 'network-stat-container';
    container.innerHTML = '<h2>Сетевой монитор</h2><p>Статус: Активен</p>';
  }

  async onUnload(): Promise<void> {
    await this.context.storage.set('unloadedAt', Date.now());
  }
}
```

### Пример 2. Создание системного расширения ядра

Точка входа `src/index.ts`:

```typescript
import { ICoreExtension, IKernelControl } from 'harek-sdk';

export default class CustomLoggerExtension implements ICoreExtension {
  async onKernelBoot(kernel: IKernelControl): Promise<void> {
    kernel.hooks.get('beforePluginLoad').tap('AuditLogger', async (_, args) => {
      kernel.logger.info(`Загрузка плагина: ${args.pluginId}`);
    });
  }
}
```

## Сборка и проверка

Сборка TypeScript определений и JavaScript модулей:

```powershell
npm run build
```

Проверка типов без генерации файлов:

```powershell
npm run typecheck
```

## Структура каталогов

```text
├── src/
│   ├── context.ts      # Контракты контекстов выполнения (ядро, виджет, плагин)
│   ├── errors.ts       # Иерархия типизированных ошибок платформы
│   ├── events.ts       # Интерфейсы шины сообщений
│   ├── hooks.ts        # Контракты хуков жизненного цикла ядра
│   ├── logger.ts       # Интерфейс структурированного логирования
│   ├── manifest.ts     # Описание типов манифеста и прав доступа
│   ├── plugin.ts       # Интерфейсы жизненного цикла плагинов
│   ├── services.ts     # Контракты реестра сервисов ядра
│   ├── storage.ts      # Интерфейс локального хранилища плагина
│   ├── ui.ts           # Слоты интерфейса и координатная сетка виджетов
│   ├── validator.ts    # Рантайм-валидатор манифеста плагинов
│   └── index.ts        # Единая точка экспорта всех контрактов
├── dist/               # Скомпилированные артефакты сборки (.js, .d.ts)
├── package.json        # Конфигурация пакета и экспорты
├── tsconfig.json       # Строгая конфигурация компилятора TypeScript
├── LICENSE             # Лицензия MIT
└── README.md           # Документация пакета
```

## Лицензия

Проект распространяется под условиями лицензии [MIT](LICENSE).
