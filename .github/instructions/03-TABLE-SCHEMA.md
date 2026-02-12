# SCHEMA TABELLE BUDIBASE

## Convenzioni di Naming
- ID tabella: `ta_[nome_tabella]`
- ID riga: `ro_[nome_tabella]_[numero]`
- Datasource interno: `datasource_internal_bb_default`

## Tipi di Campo Supportati

| Tipo Guida | Tipo Budibase | Schema |
|------------|---------------|--------|
| Text | string | `{"type":"string","constraints":{"presence":{"allowEmpty":false}}}` |
| Long Form Text | longform | `{"type":"longform"}` |
| Number | number | `{"type":"number","default":0}` |
| Boolean | boolean | `{"type":"boolean","default":false}` |
| Date | datetime | `{"type":"datetime","constraints":{"presence":{"allowEmpty":false}}}` |
| Options | options | `{"type":"options","constraints":{"inclusion":["val1","val2"]},"default":"val1"}` |
| Link (Many to One) | link | `{"type":"link","tableId":"ta_[target]","relationshipType":"many-to-one","fieldName":"[campo_inverso]"}` |
| Link (One to Many) | link | `{"type":"link","tableId":"ta_[target]","relationshipType":"one-to-many","fieldName":"[campo_inverso]"}` |
| User (Single) | bb_reference_single | `{"type":"bb_reference_single","subtype":"user"}` |
| Auto ID | number | `{"type":"number","autocolumn":true,"subtype":"autoID"}` |
| Created At | datetime | `{"type":"datetime","autocolumn":true,"subtype":"createdAt"}` |
| Updated At | datetime | `{"type":"datetime","autocolumn":true,"subtype":"updatedAt"}` |

## Template Definizione Tabella (db.txt)

```json
{
  "_id": "ta_[nome]",
  "type": "table",
  "name": "[nome]",
  "sourceId": "datasource_internal_bb_default",
  "sourceType": "internal",
  "primaryDisplay": "[campo_display]",
  "schema": {
    "id": {"name":"id","type":"number","autocolumn":true,"subtype":"autoID"},
    "[campo1]": { ... },
    "[campo2]": { ... },
    "created_at": {"name":"created_at","type":"datetime","autocolumn":true,"subtype":"createdAt"}
  }
}
```

## Template Riga Dati (db.txt)

```json
{
  "_id": "ro_[tabella]_[n]",
  "tableId": "ta_[tabella]",
  "type": "row",
  "id": [n],
  "[campo1]": "[valore]",
  "[campo2]": [valore]
}
```