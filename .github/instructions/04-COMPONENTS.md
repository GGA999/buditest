# COMPONENTI BUDIBASE

## Namespace Componenti
Tutti i componenti usano il prefisso: `@budibase/standard-components/`

## Componenti Principali

### Layout
| Componente | ID | Props Principali |
|------------|-----|------------------|
| Container | container | direction, hAlign, vAlign, gap |
| Section | section | |
| Form | form | dataSource, disabled |

### Testo
| Componente | ID | Props Principali |
|------------|-----|------------------|
| Heading | heading | text, size (XS/S/M/L/XL) |
| Paragraph | paragraph | text |
| Text | text | text |

### Input
| Componente | ID | Props Principali |
|------------|-----|------------------|
| Text Field | stringfield | field, label, placeholder |
| Number Field | numberfield | field, label, min, max |
| Date Picker | datepicker | field, label, enableTime |
| Options Picker | optionspicker | field, label, dataProvider, labelColumn, valueColumn |
| Relationship Field | relationshipfield | field, label |
| Checkbox | checkbox | field, label |
| Long Form Field | longformfield | field, label |

### Dati
| Componente | ID | Props Principali |
|------------|-----|------------------|
| Data Provider | dataprovider | dataSource, filter, sortColumn, sortOrder |
| Repeater | repeater | dataProvider, direction, hAlign, vAlign |
| Table | table | dataProvider, columns |

### Azioni
| Componente | ID | Props Principali |
|------------|-----|------------------|
| Button | button | text, type (primary/secondary/cta), onClick |
| Link | link | text, url |

### Display
| Componente | ID | Props Principali |
|------------|-----|------------------|
| Card | card | title, subtitle, description |
| Tag | tag | text, color |

## Struttura Componente (manifest.json)

```json
{
  "_id": "[id_univoco]",
  "_component": "@budibase/standard-components/[tipo]",
  "_styles": {
    "normal": { "css_property": "value" }
  },
  "_conditions": [
    { "visible": "{{ condizione }}" }
  ],
  "_children": [ ... ],
  "[prop]": "valore o {{ binding }}"
}
```

## Event Handlers

```json
{
  "onClick": [
    {
      "##eventHandlerType": "Save Row",
      "parameters": {
        "tableId": "ta_[nome]",
        "fields": { "[campo]": "{{ binding }}" }
      }
    },
    {
      "##eventHandlerType": "Update State",
      "parameters": {
        "key": "[nome_stato]",
        "value": "{{ eventContext.value }}"
      }
    },
    {
      "##eventHandlerType": "Navigate To",
      "parameters": { "url": "/[route]" }
    },
    {
      "##eventHandlerType": "Show Notification",
      "parameters": { "message": "[testo]", "type": "success|info|warning|error" }
    },
    {
      "##eventHandlerType": "Refresh Data Provider"
    }
  ]
}
```