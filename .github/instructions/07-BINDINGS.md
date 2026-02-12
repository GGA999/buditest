# BINDINGS E SINTASSI BUDIBASE

## Sintassi Handlebars
Tutti i binding usano doppie graffe: `{{ espressione }}`

## Contesti Disponibili

### Current User
| Binding | Descrizione |
|---------|-------------|
| `{{ Current User._id }}` | ID utente |
| `{{ Current User.email }}` | Email |
| `{{ Current User.firstName }}` | Nome |
| `{{ Current User.lastName }}` | Cognome |
| `{{ Current User.roleId }}` | Ruolo (BASIC/POWER/ADMIN) |

### State (Variabili di Stato)
| Binding | Descrizione |
|---------|-------------|
| `{{ State.[nome] }}` | Valore variabile di stato |

### Repeater / Data Provider
| Binding | Descrizione |
|---------|-------------|
| `{{ Repeater._id }}` | ID riga corrente |
| `{{ Repeater.[campo] }}` | Valore campo riga |
| `{{ Repeater.[relazione]._id }}` | ID entità collegata |
| `{{ Repeater.[relazione].[campo] }}` | Campo entità collegata |

### Form
| Binding | Descrizione |
|---------|-------------|
| `{{ Form.Fields.[campo] }}` | Valore campo form |

### Event Context
| Binding | Descrizione |
|---------|-------------|
| `{{ eventContext.value }}` | Valore evento (onChange) |
| `{{ eventContext.row }}` | Riga selezionata |

## Operatori Condizionali

```javascript
// Ternario
{{ condizione ? "valore_true" : "valore_false" }}

// Confronti
{{ Repeater.campo === "valore" }}
{{ Repeater.numero > 10 }}
{{ Repeater.campo !== null }}

// Logici
{{ condizione1 && condizione2 }}
{{ condizione1 || condizione2 }}
{{ !condizione }}
```

## Esempi Comuni

### Visibilità condizionale
```json
"_conditions": [
  { "visible": "{{ Repeater.disponibile === true }}" }
]
```

### Stile condizionale
```json
"_styles": {
  "normal": {
    "background": "{{ Repeater.attivo ? '#e8f5e9' : '#ffebee' }}"
  }
}
```

### Testo dinamico
```json
"text": "{{ Repeater.ora_inizio }} - {{ Repeater.ora_fine }}"
```

### Filtro Data Provider
```json
"filter": {
  "field": "utente",
  "operator": "equal",
  "value": "{{ Current User._id }}"
}
```