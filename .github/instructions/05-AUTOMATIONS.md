# AUTOMAZIONI BUDIBASE

## Struttura Automazione (manifest.json)

```json
{
  "auto_[nome]": {
    "_id": "auto_[nome]",
    "name": "[Nome Automazione]",
    "definition": {
      "trigger": {
        "id": "trigger_[tipo]",
        "stepId": "[TRIGGER_TYPE]",
        "inputs": { ... }
      },
      "steps": [ ... ]
    }
  }
}
```

## Tipi di Trigger

| Trigger | stepId | inputs |
|---------|--------|--------|
| Row Created | ROW_CREATED | `{"tableId":"ta_[nome]"}` |
| Row Updated | ROW_UPDATED | `{"tableId":"ta_[nome]"}` |
| Row Deleted | ROW_DELETED | `{"tableId":"ta_[nome]"}` |
| Webhook | WEBHOOK | `{"schemaUrl":"..."}` |
| Cron | CRON | `{"cron":"0 9 * * *"}` |
| App Action | APP | `{"fields":{}}` |

## Tipi di Step

### QUERY_ROWS
```json
{
  "id": "step_query",
  "stepId": "QUERY_ROWS",
  "inputs": {
    "tableId": "ta_[nome]",
    "filters": {
      "[campo]": "{{ trigger.row.[campo] }}"
    }
  }
}
```

### CONDITION
```json
{
  "id": "step_condition",
  "stepId": "CONDITION",
  "inputs": {
    "condition": "{{ steps.[step_id].rows.length > 0 }}"
  },
  "branches": {
    "true": [ ... steps ... ],
    "false": [ ... steps ... ]
  }
}
```

### DELETE_ROW
```json
{
  "id": "step_delete",
  "stepId": "DELETE_ROW",
  "inputs": {
    "tableId": "ta_[nome]",
    "rowId": "{{ trigger.row._id }}"
  }
}
```

### UPDATE_ROW
```json
{
  "id": "step_update",
  "stepId": "UPDATE_ROW",
  "inputs": {
    "tableId": "ta_[nome]",
    "rowId": "{{ trigger.row._id }}",
    "row": {
      "[campo]": "[valore]"
    }
  }
}
```

### CREATE_ROW
```json
{
  "id": "step_create",
  "stepId": "CREATE_ROW",
  "inputs": {
    "tableId": "ta_[nome]",
    "row": {
      "[campo]": "{{ binding }}"
    }
  }
}
```

### SEND_EMAIL_SMTP
```json
{
  "id": "step_email",
  "stepId": "SEND_EMAIL_SMTP",
  "inputs": {
    "to": "{{ trigger.row.utente.email }}",
    "subject": "[Oggetto]",
    "contents": "<h2>Titolo</h2><p>{{ binding }}</p>"
  }
}
```

## Accesso ai Dati negli Step

| Contesto | Sintassi |
|----------|----------|
| Trigger row | `{{ trigger.row.[campo] }}` |
| Step precedente | `{{ steps.[step_id].rows }}` |
| Primo risultato | `{{ steps.[step_id].rows[0].[campo] }}` |
| Conteggio | `{{ steps.[step_id].rows.length }}` |