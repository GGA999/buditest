# 📋 Istruzioni per Claude Opus 4.5 - Generatore Budibase

## Panoramica

Questi file di istruzione guidano Claude Opus 4.5 nella generazione di progetti Budibase completi partendo da documentazione di specifiche.

## Struttura File

| File | Contenuto |
|------|-----------|
| `01-SYSTEM-PROMPT.md` | Identità e comportamento del modello |
| `02-OUTPUT-FORMAT.md` | Struttura dei file di output |
| `03-TABLE-SCHEMA.md` | Tipi di campo e convenzioni tabelle |
| `04-COMPONENTS.md` | Componenti UI Budibase |
| `05-AUTOMATIONS.md` | Trigger e step automazioni |
| `06-ROLES.md` | Ruoli e permessi |
| `07-BINDINGS.md` | Sintassi Handlebars e contesti |
| `08-VALIDATION.md` | Checklist di validazione |
| `09-MAIN-PROMPT.md` | Prompt principale di esecuzione |

## Come Usare

### Opzione 1: File Separati
Invia a Claude tutti i file in ordine (01 → 09) seguito dal documento di specifiche.

### Opzione 2: File Unificato
Usa `FULL-INSTRUCTIONS.md` che contiene tutto in un unico file.

### Opzione 3: Prompt Rapido
```
Leggi i file di istruzione in .github/instructions/ (da 01 a 09),
poi genera il progetto Budibase basato su GUIDA_PRENOTAZIONE_UFFICI.md
```

## Output Generato

Claude produrrà:
- **manifest.json** - Definizione app completa
- **db.txt** - Database in formato NDJSON
- **budibase-client.js** - Logica client-side

## Personalizzazione

Per un nuovo progetto:
1. Crea un nuovo file di specifiche (es. `GUIDA_NUOVO_PROGETTO.md`)
2. Modifica `09-MAIN-PROMPT.md` per referenziarlo
3. Aggiorna la sezione "ESTRAZIONE ENTITÀ" con le nuove tabelle/schermate

## Best Practices

- ✅ Fornisci specifiche dettagliate con tabelle e campi chiari
- ✅ Includi esempi di dati desiderati
- ✅ Specifica ruoli e permessi esplicitamente
- ❌ Evita descrizioni vaghe tipo "qualche campo"
- ❌ Non omettere tipi di dati per i campi