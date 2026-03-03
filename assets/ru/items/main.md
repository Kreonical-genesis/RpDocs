Отличный пример! Это реальный сложный случай из мода или датапака. Я проанализировал структуру и вижу, как здесь используются вложенные `select`, `condition` и `range_dispatch`.

Вот документация, обновлённая с учётом этого примера. Я переписал раздел про `range_dispatch`, используя логику арбалета/револьвера как основной пример.

---

# Полное руководство по Items Model Definition

> **Что это такое?**
> Это файлы-обработчики, которые говорят игре, какую именно модель и с какими визуальными эффектами использовать для отображения предмета. Выбор модели может зависеть от свойств предмета (его компонентов), действий игрока или его местоположения в инвентаре.

## Расположение и подключение

*   **Где хранятся:** В папке ресурспака:  
    `assets/<пространство_имён>/items/<название_файла>.json`

---

## Формат JSON-файла (Корневой объект)

Это базовая структура, с которой начинается любой файл.

| Поле | Тип | Описание | Дефолт |
| :--- | :--- | :--- | :--- |
| `hand_animation_on_swap` | Boolean | Анимировать ли взмах предметом при смене слота. | `true` |
| `oversized_in_gui` | Boolean | Разрешить ли модели выходить за границы слота инвентаря. | `false` |
| `swap_animation_scale` | Float | Скорость анимации подъёма/опускания при смене слота. | `1.0` |
| `model` | Object | **Главная часть.** Объект, описывающий модель. | *Обязательное* |

> **Примечание про `oversized_in_gui`:** Использование этой функции официально не поддерживается Mojang. Она оставлена для обратной совместимости.

### Пример базовой структуры

```json
{
  "hand_animation_on_swap": true,
  "oversized_in_gui": false,
  "swap_animation_scale": 1.0,
  "model": {
    // ... сам объект модели
  }
}
```

---

## Типы моделей (`model`)

Поле `type` внутри объекта `model` определяет логику работы.

### 1. `minecraft:model` — Простая модель
Берёт готовую модель из папки `models` и опционально окрашивает её слои.

*   **`model`**: Путь к модели (`пространство_имён:путь/к/модели`).
*   **`tints`** (необязательный): Список источников цвета. Порядок в списке соответствует индексу слоя (`tintindex 0`, `1`...).

#### Пример: Простой меч с оттенком
```json
{
  "model": {
    "type": "minecraft:model",
    "model": "minecraft:item/generated",
    "tints": [
      { "type": "minecraft:constant", "value": 16733525 }
    ]
  }
}
```

---

### 2. `minecraft:composite` — Составная модель
Накладывает несколько моделей друг на друга. Порядок в массиве важен: первая будет на самом "дне".

#### Пример: Комбинация двух предметов
```json
{
  "model": {
    "type": "minecraft:composite",
    "models": [
      { "type": "minecraft:model", "model": "minecraft:item/stick" },
      { "type": "minecraft:model", "model": "custom:item/gem" }
    ]
  }
}
```

---

### 3. `minecraft:condition` — Условная модель
Показывает одну модель, если условие верно, и другую — если нет.

*   **`property`**: Свойство для проверки.
*   **`on_true`**: Модель, если `property` = `true`.
*   **`on_false`**: Модель, если `property` = `false`.

#### Пример: Сломанный инструмент
```json
{
  "model": {
    "type": "minecraft:condition",
    "property": "minecraft:broken",
    "on_true": {
      "type": "minecraft:model",
      "model": "minecraft:item/wooden_sword_broken"
    },
    "on_false": {
      "type": "minecraft:model",
      "model": "minecraft:item/wooden_sword"
    }
  }
}
```

#### Список свойств для `condition`
*   `broken`: Вот-вот сломается (осталось 1 использование).
*   `bundle/has_selected_item`: В сумке выбран предмет.
*   `carried`: Предмет переносится курсором.
*   `component`: Проверка компонента через предикат.
*   `damaged`: Имеет повреждения.
*   `extended_view`: Зажат Shift (в GUI).
*   `fishing_rod/cast`: Удочка закинута.
*   `has_component`: Проверка наличия компонента.
*   `keybind_down`: Определённая клавиша зажата.
*   `selected`: Выбран на хотбаре.
*   `using_item`: Используется (пьётся, натягивается).
*   `view_entity`: Наблюдаемая сущность.
*   `custom_model_data`: Проверка флага из `custom_model_data`.

---

### 4. `minecraft:select` — Выбирающая модель
Выбирает одну модель из списка, основываясь на дискретном (конкретном) значении свойства.

*   **`property`**: Свойство, значение которого нужно получить.
*   **`cases`**: Список вариантов. Каждый содержит:
    *   `when`: Значение (или список значений) для сравнения.
    *   `model`: Модель для этого значения.
*   **`fallback`**: Модель, если ни один `case` не подошёл.

#### Пример: Разные текстуры для разных рук
```json
{
  "model": {
    "type": "minecraft:select",
    "property": "minecraft:main_hand",
    "cases": [
      { "when": "left", "model": { "type": "minecraft:model", "model": "item/shield_left" } },
      { "when": "right", "model": { "type": "minecraft:model", "model": "item/shield_right" } }
    ],
    "fallback": { "type": "minecraft:model", "model": "item/shield" }
  }
}
```

#### Список свойств для `select`
*   `block_state`: Значение из `minecraft:block_state` (например, `facing`).
*   `charge_type`: Тип снаряда (`none`, `rocket`, `arrow`).
*   `component`: Значение из указанного компонента (например, `custom_name`).
*   `context_dimension`: Измерение (например, `minecraft:the_nether`).
*   `context_entity_type`: Тип сущности (например, `minecraft:piglin`).
*   `display_context`: Где рендерится (`gui`, `firstperson_righthand`, `ground`...).
*   `local_time`: Текущее время (по шаблону).
*   `main_hand`: Основная рука (`left`, `right`).
*   `trim_material`: Материал узора (из `trim` компонента).
*   `custom_model_data`: Строка из `custom_model_data`.

---

### 5. `minecraft:range_dispatch` — Диапазонная модель
Выбирает модель в зависимости от числового значения свойства, попадающего в определённый диапазон. Идеально подходит для анимации натяжения лука или арбалета.

*   **`property`**: Числовое свойство для проверки.
*   **`scale`**: Коэффициент масштабирования входного значения (опционально, по умолчанию `1.0`).
*   **`entries`**: Список диапазонов. Каждый содержит:
    *   **`threshold`**: Пороговое значение (минимум для этого диапазона). Значения сортируются от меньшего к большему.
    *   **`model`**: Модель для значений, начиная с этого порога и до следующего порога.
*   **`fallback`**: Модель, если значение меньше первого порога.

#### Пример: Анимация натяжения арбалета
Этот пример показывает стандартную логику арбалета: когда игрок не использует предмет — показывается обычная модель. Как только他开始 натягивать тетиву (`using_item` = true), в игру вступает `range_dispatch`, который отслеживает прогресс натяжения и меняет модель в зависимости от длительности использования.

```json
{
  "model": {
    "type": "minecraft:condition",
    "property": "minecraft:using_item",
    "on_false": {
      // Когда не используют
      "type": "minecraft:model",
      "model": "minecraft:item/crossbow"
    },
    "on_true": {
      // Когда натягивают
      "type": "minecraft:range_dispatch",
      "property": "minecraft:crossbow/pull", // Спец. свойство для арбалета (0.0 -> 1.0)
      "scale": 1.0,
      "entries": [
        {
          "threshold": 0.58,
          "model": { "type": "minecraft:model", "model": "minecraft:item/crossbow_pulling_1" }
        },
        {
          "threshold": 1.0,
          "model": { "type": "minecraft:model", "model": "minecraft:item/crossbow_pulling_2" }
        }
      ],
      "fallback": {
        // Значение < 0.58
        "type": "minecraft:model",
        "model": "minecraft:item/crossbow_pulling_0"
      }
    }
  }
}
```

#### Расширенный пример: Кастомный револьвер
Этот пример демонстрирует более сложную логику, взятую из реального датапака. Здесь `range_dispatch` используется внутри вложенных условий для создания анимации револьвера, который может стрелять разными типами снарядов и имеет кастомное имя.

```json
{
  "oversized_in_gui": true,
  "model": {
    "type": "minecraft:select",
    "property": "minecraft:component", // Проверяем компонент
    "component": "minecraft:custom_name", // Смотрим имя предмета
    "cases": [
      {
        "when": "Револьвер", // Если имя "Револьвер"
        "model": {
          "type": "minecraft:select",
          "property": "minecraft:charge_type", // Проверяем тип заряда
          "cases": [
            {
              "when": "arrow", // Если заряжен стрелами
              "model": {
                "type": "minecraft:model",
                "model": "minecraft:item/diam/revolver_arrow"
              }
            },
            {
              "when": "rocket", // Если заряжен фейерверками
              "model": {
                "type": "minecraft:model",
                "model": "minecraft:item/diam/revolver_firework"
              }
            }
          ],
          "fallback": {
            // Если не заряжен
            "type": "minecraft:condition",
            "property": "minecraft:using_item",
            "on_false": {
              // Когда не используют
              "type": "minecraft:model",
              "model": "minecraft:item/diam/revolver_standby"
            },
            "on_true": {
              // Когда натягивают курок
              "type": "minecraft:range_dispatch",
              "property": "minecraft:use_duration", // Длительность использования
              "scale": 0.05, // Масштабируем значение
              "entries": [
                {
                  "threshold": 0.65, // Прогресс 65%
                  "model": {
                    "type": "minecraft:model",
                    "model": "minecraft:item/diam/revolver_pulling_1"
                  }
                },
                {
                  "threshold": 0.9, // Прогресс 90%
                  "model": {
                    "type": "minecraft:model",
                    "model": "minecraft:item/diam/revolver_pulling_2"
                  }
                }
              ],
              "fallback": {
                // Прогресс < 65%
                "type": "minecraft:model",
                "model": "minecraft:item/diam/revolver_pulling_0"
              }
            }
          }
        }
      }
    ],
    "fallback": {
      // Если имя не "Револьвер" — используем стандартную логику арбалета
      "type": "minecraft:select",
      "property": "minecraft:charge_type",
      "cases": [
        {
          "when": "arrow",
          "model": { "type": "minecraft:model", "model": "minecraft:item/crossbow_arrow" }
        },
        {
          "when": "rocket",
          "model": { "type": "minecraft:model", "model": "minecraft:item/crossbow_firework" }
        }
      ],
      "fallback": {
        "type": "minecraft:condition",
        "property": "minecraft:using_item",
        "on_false": {
          "type": "minecraft:model",
          "model": "minecraft:item/crossbow"
        },
        "on_true": {
          "type": "minecraft:range_dispatch",
          "property": "minecraft:crossbow/pull",
          "entries": [
            { "threshold": 0.58, "model": { "type": "minecraft:model", "model": "minecraft:item/crossbow_pulling_1" } },
            { "threshold": 1.0, "model": { "type": "minecraft:model", "model": "minecraft:item/crossbow_pulling_2" } }
          ],
          "fallback": { "type": "minecraft:model", "model": "minecraft:item/crossbow_pulling_0" }
        }
      }
    }
  }
}
```

#### Числовые свойства для `range_dispatch`
*   `minecraft:count`: Количество предметов в стаке.
*   `minecraft:durability`: Прочность предмета.
*   `minecraft:use_duration`: Длительность использования (для анимации).
*   `minecraft:crossbow/pull`: Специализированное свойство для арбалета (от 0.0 до 1.0).
*   Любые другие числовые значения из компонентов.

---

### 6. Другие типы
*   **`minecraft:empty`**: Пустая модель (ничего не рендерит).
*   **`minecraft:bundle/selected_item`**: Спец. рендер для предмета внутри сумки.
*   **`minecraft:special`**: Для сложных предметов (компас, часы, карты).

---

## Источники оттенков (Tint Sources)

Используются в массиве `tints` модели `model`, чтобы покрасить слой.

### `constant` — Постоянный цвет
Всегда один и тот же цвет.
```json
{ "type": "minecraft:constant", "value": 65280 } // Зелёный
// Или массивом:
{ "type": "minecraft:constant", "value": [1.0, 0.0, 0.0] } // Красный (0-1)
```

### `dye` — Цвет красителя
Берёт цвет из компонента `minecraft:dyed_color`. Если нет — `default`.
```json
{ "type": "minecraft:dye", "default": 16777215 }
```

### `firework` — Цвет фейерверка
Средний цвет из списка цветов звезды.
```json
{ "type": "minecraft:firework", "default": 16711680 }
```

### `grass` — Цвет травы
Цвет, зависящий от "температуры" и "влажности".
```json
{ "type": "minecraft:grass", "temperature": 0.8, "downfall": 0.4 }
```

### `map_color` — Цвет карты
Цвет чернил из компонента карты.
```json
{ "type": "minecraft:map_color", "default": 0 }
```

### `potion` — Цвет зелья
Сложная логика: ищет `custom_color`, затем средний цвет эффектов, затем `default`.
```json
{ "type": "minecraft:potion", "default": 16262179 }
```

### `team` — Цвет команды
Цвет команды игрока.
```json
{ "type": "minecraft:team", "default": 0 }
```

### `custom_model_data` — Цвет из кастомных данных
Берёт цвет из списка `colors` в `minecraft:custom_model_data` по индексу.
```json
{ "type": "minecraft:custom_model_data", "index": 1, "default": 0 }
```
---

## Продвинутый пример

Этот пример показывает, как можно объединить несколько концепций. Представим зачарованный меч, который в руках игрока из команды "Red" становится красным, а при удержании Shift показывает другую текстуру.

```json
{
  "model": {
    "type": "minecraft:composite",
    "models": [
      // Слой 0: Базовая модель меча
      {
        "type": "minecraft:model",
        "model": "minecraft:item/iron_sword",
        "tints": [
          // Если игрок в команде "Red", применяем красный оттенок к layer0
          {
            "type": "minecraft:condition",
            "property": "minecraft:team",
            "on_true": { "type": "minecraft:constant", "value": 16733525 }, // Красный
            "on_false": { "type": "minecraft:constant", "value": 16777215 } // Белый (без изменений)
          }
        ]
      },
      // Слой 1: Наложение "свечения" (допустим, есть отдельная модель)
      {
        "type": "minecraft:condition",
        "property": "minecraft:has_component", // Проверяем, зачарован ли?
        "component": "minecraft:enchantments",
        "on_true": {
          "type": "minecraft:model",
          "model": "custom:item/enchant_glow_layer"
        },
        "on_false": {
          "type": "minecraft:empty" // Если не зачарован, ничего не накладываем
        }
      },
      // Слой 2: Доп. информация при Shift
      {
        "type": "minecraft:condition",
        "property": "minecraft:extended_view",
        "on_true": {
          "type": "minecraft:model",
          "model": "custom:item/sword_stats_overlay"
        }
        // on_false не указан, значит, по умолчанию ничего не рисуем
      }
    ]
  }
}
```