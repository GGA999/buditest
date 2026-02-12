# FORMATO OUTPUT - Struttura File Budibase

## FILE RICHIESTI

### 1. manifest.json
Contiene la definizione completa dell'applicazione Budibase.

```json
{
  "schema_version": "1.0.0",
  "type": "app",
  "version": "2.0.0",
  "app": {
    "id": "app_[nome_app]",
    "name": "[Nome App]",
    "version": "1.0.0",
    "description": "[Descrizione]",
    "icon": "[NomeIcona]",
    "url": "/[url-app]"
  },
  "budibase": { "version": "2.0.0" },
  "features": { ... },
  "theme": "spectrum--light",
  "customTheme": { ... },
  "navigation": { ... },
  "datasources": { ... },
  "tables": { ... },
  "screens": { ... },
  "automations": { ... },
  "roles": { ... }
}
```

### 2. db.txt (formato NDJSON)
Ogni riga è un documento JSON separato. Ordine:
1. Metadata
2. Design document
3. Definizioni tabelle (type: "table")
4. Righe dati (type: "row")

```
{"_id":"_metadata","version":"1.0.0","db_type":"internal",...}
{"_id":"_design/database","views":{...}}
{"_id":"ta_[nome]","type":"table","schema":{...}}
{"_id":"ro_[nome]_1","tableId":"ta_[nome]","type":"row",...}
```

### 3. budibase-client.js
Logica client-side con:
- Costanti (Tables, Screens, Roles, Stati)
- Oggetto BudibaseClient con metodi helper
- Oggetto Bindings per componenti
- Oggetto Transformers per Data Provider
- Export per window e module.exports

## STRUTTURA OUTPUT FINALE

```json
{
  "files": {
    "manifest.json": "{ contenuto JSON completo }",
    "db.txt": "riga1\nriga2\nriga3...",
    "budibase-client.js": "codice JS completo"
  },
  "validation": {
    "missingInformation": ["lista info mancanti dalle specifiche"],
    "assumptionsMade": ["lista assunzioni fatte"]
  }
}
```