# 🏢 Guida Prenotazione Uffici - Budibase

## Panoramica del Progetto
Sistema di prenotazione uffici dove:
- Gli utenti possono vedere gli slot disponibili
- Se uno slot è vuoto, l'utente può prenotarlo
- Gli slot occupati mostrano chi ha prenotato
- Ogni utente vede le proprie prenotazioni

---

## 📊 STEP 1: Creazione Database in Budibase

### Opzione A: Database Interno Budibase
1. Vai su **Data** → **+ Add source** → **Budibase DB**
2. Crea le seguenti tabelle:

#### Tabella: `uffici`
| Campo | Tipo | Configurazione |
|-------|------|----------------|
| nome | Text | Required |
| piano | Text | - |
| capienza | Number | Default: 1 |
| descrizione | Long Form Text | - |
| attivo | Boolean | Default: true |

#### Tabella: `slot_orari`
| Campo | Tipo | Configurazione |
|-------|------|----------------|
| ora_inizio | Text | Required (es. "09:00") |
| ora_fine | Text | Required (es. "10:00") |
| descrizione | Text | - |
| attivo | Boolean | Default: true |

#### Tabella: `prenotazioni`
| Campo | Tipo | Configurazione |
|-------|------|----------------|
| ufficio | Link | Relazione a `uffici` (Many to One) |
| slot | Link | Relazione a `slot_orari` (Many to One) |
| data_prenotazione | Date | Required |
| utente | User | Single User |
| stato | Options | Valori: "confermata", "cancellata" |
| note | Long Form Text | - |

### Opzione B: Database Esterno (PostgreSQL/MySQL)
Usa lo script SQL nel file `prenotazione_uffici_db.sql`

---

## 🎨 STEP 2: Creazione Schermate

### Schermata 1: Dashboard Prenotazioni

**Componenti da aggiungere:**

```
Container (Layout principale)
├── Headline: "Prenotazione Uffici"
├── Form (Filtri)
│   ├── Date Picker: "Seleziona Data" → {{ State.dataSelezionata }}
│   └── Select: "Seleziona Ufficio" → {{ State.ufficioSelezionato }}
├── Data Provider (slot disponibili)
│   └── Repeater (Griglia Slot)
│       └── Card per ogni slot
│           ├── Text: Orario (ora_inizio - ora_fine)
│           ├── Tag: "Disponibile" / "Occupato"
│           └── Button: "Prenota" (visibile se disponibile)
└── Data Provider (Le mie prenotazioni)
    └── Table: prenotazioni dell'utente corrente
```

### Schermata 2: Form Prenotazione

**Componenti:**
```
Container
├── Headline: "Nuova Prenotazione"
├── Form
│   ├── Date Picker: Data
│   ├── Select: Ufficio (da tabella uffici)
│   ├── Select: Slot Orario (filtrato per disponibilità)
│   ├── Text Area: Note (opzionale)
│   └── Button: "Conferma Prenotazione"
└── Button: "Torna alla Dashboard"
```

---

## ⚙️ STEP 3: Automazioni

### Automazione 1: Verifica Disponibilità Slot
```
Trigger: Row Created (prenotazioni)
Steps:
1. Query Rows: cerca prenotazioni esistenti con stesso ufficio + slot + data
2. Condition: se count > 1
   → Delete Row (elimina la nuova)
   → Send Notification: "Slot già occupato"
3. Else
   → Send Notification: "Prenotazione confermata!"
```

### Automazione 2: Notifica Email Conferma
```
Trigger: Row Created (prenotazioni)
Steps:
1. Query Row: ottieni dettagli ufficio
2. Query Row: ottieni dettagli slot
3. Send Email:
   To: {{ trigger.row.utente.email }}
   Subject: "Conferma Prenotazione Ufficio"
   Body: Template con dettagli
```

---

## 🔍 STEP 4: Query per Slot Disponibili

### Query: Slot Disponibili per Data e Ufficio
Crea una **View** o **Query** personalizzata:

```javascript
// Binding per Data Provider - Slot Disponibili
// Filtra slot che NON hanno prenotazioni per data/ufficio selezionati

// In Budibase, usa il filtro:
{
  "slot_orari": {
    // tutti gli slot
  },
  "filter": {
    // Escludi slot già prenotati
    "NOT IN": {
      "prenotazioni": {
        "data_prenotazione": "{{ State.dataSelezionata }}",
        "ufficio": "{{ State.ufficioSelezionato }}",
        "stato": "confermata"
      }
    }
  }
}
```

### Alternativa con JavaScript (Transformer)
```javascript
// Nel Data Provider, aggiungi un Transformer:
const tuttiSlot = $("slot_orari");
const prenotazioni = $("prenotazioni").filter(p => 
  p.data_prenotazione === $("State.dataSelezionata") &&
  p.ufficio._id === $("State.ufficioSelezionato") &&
  p.stato === "confermata"
);

const slotOccupati = prenotazioni.map(p => p.slot._id);

return tuttiSlot.map(slot => ({
  ...slot,
  disponibile: !slotOccupati.includes(slot._id),
  prenotatoDa: prenotazioni.find(p => p.slot._id === slot._id)?.utente?.firstName || null
}));
```

---

## 🎯 STEP 5: Binding e Azioni

### Azione Bottone "Prenota"
```javascript
// On Click del bottone Prenota:
1. Save Row (prenotazioni):
   - ufficio: {{ State.ufficioSelezionato }}
   - slot: {{ Repeater.slot._id }}
   - data_prenotazione: {{ State.dataSelezionata }}
   - utente: {{ Current User._id }}
   - stato: "confermata"

2. Update State:
   - Refresh Data Provider

3. Show Notification:
   - "Prenotazione effettuata con successo!"
```

### Condizione Visibilità Bottone
```javascript
// Mostra bottone solo se slot disponibile:
{{ Repeater.slot.disponibile === true }}
```

### Stile Card in base a disponibilità
```javascript
// Background color condizionale:
{{ Repeater.slot.disponibile ? "#e8f5e9" : "#ffebee" }}
```

---

## 📱 STEP 6: Permessi e Ruoli

### Configurazione Ruoli:
1. **Basic**: può vedere e prenotare
2. **Power**: può vedere tutte le prenotazioni
3. **Admin**: può gestire uffici e slot

### Filtri per Ruolo:
```javascript
// Nella tabella "Le mie prenotazioni":
Filter: utente equals {{ Current User._id }}

// Per Admin (tutte le prenotazioni):
Filter: none (mostra tutto)
```

---

## ✅ Checklist Finale

- [ ] Tabelle create (uffici, slot_orari, prenotazioni)
- [ ] Dati di esempio inseriti
- [ ] Relazioni configurate
- [ ] Schermata Dashboard creata
- [ ] Form prenotazione funzionante
- [ ] Query slot disponibili configurata
- [ ] Automazione verifica duplicati attiva
- [ ] Permessi configurati
- [ ] Test prenotazione completato

---

## 🐛 Troubleshooting

**Problema: Slot appare disponibile ma è già prenotato**
→ Verifica il filtro sulla data (formato corretto)

**Problema: Utente non associato alla prenotazione**
→ Usa `{{ Current User._id }}` nel binding

**Problema: Doppia prenotazione possibile**
→ Aggiungi constraint UNIQUE nel database o automazione di verifica
