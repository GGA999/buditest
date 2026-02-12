# PROMPT PRINCIPALE - Generazione Progetto Budibase

Leggi TUTTI i file di istruzione in ordine:
1. 01-SYSTEM-PROMPT.md
2. 02-OUTPUT-FORMAT.md
3. 03-TABLE-SCHEMA.md
4. 04-COMPONENTS.md
5. 05-AUTOMATIONS.md
6. 06-ROLES.md
7. 07-BINDINGS.md
8. 08-VALIDATION.md

Poi leggi il documento di specifiche: **GUIDA_PRENOTAZIONE_UFFICI.md**

---

## TASK

Genera un progetto Budibase completo basato su GUIDA_PRENOTAZIONE_UFFICI.md.

## ESTRAZIONE ENTITÀ

Dal documento, estrai:

### Tabelle
- `uffici`: nome, piano, capienza, descrizione, attivo
- `slot_orari`: ora_inizio, ora_fine, descrizione, attivo
- `prenotazioni`: ufficio (link), slot (link), data_prenotazione, utente, stato, note

### Schermate
- Dashboard Prenotazioni (`/dashboard`)
- Form Nuova Prenotazione (`/nuova-prenotazione`)

### Automazioni
- Verifica Disponibilità Slot (ROW_CREATED su prenotazioni)
- Notifica Email Conferma (ROW_CREATED su prenotazioni)

### Ruoli
- BASIC: può vedere e prenotare
- POWER: può vedere tutte le prenotazioni
- ADMIN: può gestire uffici e slot

---

## OUTPUT RICHIESTO

Restituisci ESATTAMENTE questo JSON:

```json
{
  "files": {
    "manifest.json": "<JSON completo>",
    "db.txt": "<NDJSON completo>",
    "budibase-client.js": "<JS completo>"
  },
  "validation": {
    "missingInformation": [],
    "assumptionsMade": []
  }
}
```

## DATI DI ESEMPIO DA INCLUDERE

### Uffici (6 record)
1. Ufficio A1, Piano Terra, capienza 1
2. Ufficio A2, Piano Terra, capienza 2
3. Ufficio B1, Primo Piano, capienza 1
4. Ufficio B2, Primo Piano, capienza 4
5. Ufficio C1, Secondo Piano, capienza 1
6. Sala Conferenze, Piano Terra, capienza 20

### Slot Orari (9 record)
1. 08:00-09:00 Prima mattina
2. 09:00-10:00 Mattina Fascia 1
3. 10:00-11:00 Mattina Fascia 2
4. 11:00-12:00 Mattina Fascia 3
5. 12:00-13:00 Pausa pranzo
6. 14:00-15:00 Pomeriggio Fascia 1
7. 15:00-16:00 Pomeriggio Fascia 2
8. 16:00-17:00 Pomeriggio Fascia 3
9. 17:00-18:00 Tardo pomeriggio

---

## ESEGUI ORA

Genera l'output completo senza spiegazioni.