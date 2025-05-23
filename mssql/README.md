# Документация по SQL-скриптам для базы данных MS SQL

## Общее описание

Этот репозиторий содержит три SQL-скрипта для работы с базой данных управления контейнерами в MS SQL Server:

1. Создание таблиц `(01-create-tables.sql)`
2. Вставка тестовых данных `(02-insert-test-data.sql)`
3. Выполнение запросов в формате JSON `(03-json-queries.sql)`

## Описание скриптов

### `01-create-tables.sql`

Скрипт создает две таблицы со следующей структурой:

Таблица `Containers` (Контейнеры)

| Поле  | Тип | Описание |
| ------------- | ------------- | ------------- |
| Id  | UNIQUEIDENTIFIER  | Первичный ключ, GUID |
| Number  | INT  | Номер контейнера |
| Type  | NVARCHAR(50)  | Тип контейнера (например, '20ft') |
| Length  | DECIMAL(10,2)  | Длина контейнера в метрах |
| Width  | DECIMAL(10,2)  | Ширина контейнера в метрах |
| Height  | DECIMAL(10,2)  | Высота контейнера в метрах |
| Weight  | DECIMAL(10,2)  | Вес контейнера в килограммах |
| IsEmpty  | BIT  | Пустой (1) или не пустой (0) |
| ArrivalDate  | DATETIME  | Дата и время прибытия контейнера |

Таблица `Operations` (Операции)

| Поле  | Тип | Описание |
| ------------- | ------------- | ------------- |
| Id  | UNIQUEIDENTIFIER  | Первичный ключ, GUID |
| ContainerId  | UNIQUEIDENTIFIER  | Внешний ключ к таблице Containers |
| OperationStartDate  | DATETIME  | Дата/время начала операции |
| OperationEndDate  | DATETIME  | Дата/время окончания операции |
| OperationType  | NVARCHAR(100)  | Тип операции (например, 'Loading') |
| OperatorFullName  | NVARCHAR(150)  | ФИО оператора |
| InspectionPlace  | NVARCHAR(100)  | Место проведения инспекции |

Скрипт также устанавливает связь между таблицами через внешний ключ.

### `02-insert-test-data.sql`

Скрипт заполняет таблицы тестовыми данными:

**Данные контейнеров**

- 3 тестовых контейнера разных типов
- Различный статус (пустые/не пустые)
- Разные даты прибытия

**Данные операций**

- Автоматически создает операции для каждого контейнера
- Тип операции зависит от статуса контейнера:
  - "Inspection" для пустых контейнеров
  - "Loading" для заполненных
- Даты операций устанавливаются через 1-2 дня после прибытия
- Используется тестовое имя оператора "John Doe"
- Место инспекции - "Warehouse #1"

### `03-json-queries.sql`

Скрипт содержит два запроса, возвращающих данные в формате JSON:

**Запрос 1: Все контейнеры**

Возвращает полную информацию о всех контейнерах в JSON-формате:

- Правильное преобразование типов данных
- Даты в формате ISO 8601
- Логическое значение для поля IsEmpty

**Запрос 2: Операции для непустых контейнеров**

Возвращает только операции для контейнеров с `IsEmpty = 0:`

- Подробности операций
- Даты в правильном формате
- Информация из связанной таблицы контейнеров

Оба запроса формируют JSON вручную без использования встроенных функций SQL Server.

## Порядок выполнения

Для корректной работы скрипты должны выполняться в строгом порядке:

1. `01-create-tables.sql` - Создание структуры базы данных
2. `02-insert-test-data.sql` - Заполнение тестовыми данными
3. `03-json-queries.sql` - Выполнение JSON-запросов
