# RUOLI E PERMESSI BUDIBASE

## Ruoli Standard

| Ruolo | ID | Descrizione |
|-------|-----|-------------|
| Public | PUBLIC | Utenti non autenticati |
| Basic | BASIC | Utenti autenticati base |
| Power | POWER | Utenti con permessi avanzati |
| Admin | ADMIN | Amministratori completi |

## Struttura Ruoli (manifest.json)

```json
{
  "roles": {
    "BASIC": {
      "_id": "BASIC",
      "name": "Basic",
      "inherits": [],
      "permissionId": "read_only",
      "permissions": {
        "ta_[tabella1]": ["read"],
        "ta_[tabella2]": ["read", "write"]
      }
    },
    "POWER": {
      "_id": "POWER",
      "name": "Power",
      "inherits": ["BASIC"],
      "permissionId": "power",
      "permissions": {
        "ta_[tabella1]": ["read"],
        "ta_[tabella2]": ["read", "write"]
      }
    },
    "ADMIN": {
      "_id": "ADMIN",
      "name": "Admin",
      "inherits": ["POWER"],
      "permissionId": "admin",
      "permissions": {
        "ta_[tabella1]": ["read", "write", "delete"],
        "ta_[tabella2]": ["read", "write", "delete"]
      }
    }
  }
}
```

## Permessi Disponibili

| Permesso | Descrizione |
|----------|-------------|
| read | Lettura righe |
| write | Creazione e modifica righe |
| delete | Eliminazione righe |

## Routing per Ruolo (Schermate)

```json
{
  "routing": {
    "route": "/[percorso]",
    "roleId": "BASIC",
    "homeScreen": true
  }
}
```

## Condizioni Visibilità per Ruolo

```json
{
  "_conditions": [
    {
      "visible": "{{ Current User.roleId === 'ADMIN' }}"
    }
  ]
}
```

## Filtri Dati per Ruolo

### Solo propri dati (BASIC)
```json
{
  "filter": {
    "field": "utente",
    "operator": "equal",
    "value": "{{ Current User._id }}"
  }
}
```

### Tutti i dati (ADMIN/POWER)
```json
{
  "filter": {}
}
```