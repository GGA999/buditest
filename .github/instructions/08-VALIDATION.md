# CHECKLIST VALIDAZIONE

## Prima di generare l'output, verifica:

### 1. Coerenza Tabelle
- [ ] Ogni tabella in manifest.json esiste in db.txt
- [ ] Ogni tabella in db.txt ha almeno una definizione schema
- [ ] I campi link hanno tableId valido verso tabella esistente
- [ ] I fieldName delle relazioni inverse esistono nella tabella target

### 2. Coerenza Schermate
- [ ] Ogni schermata referenzia tabelle esistenti
- [ ] I Data Provider usano tableId validi
- [ ] I filtri usano campi esistenti nelle tabelle
- [ ] I binding {{ Repeater.[campo] }} usano campi esistenti

### 3. Coerenza Automazioni
- [ ] Ogni automazione referenzia tabelle esistenti
- [ ] I trigger usano tableId validi
- [ ] Gli step QUERY_ROWS usano campi esistenti nei filtri
- [ ] I binding {{ trigger.row.[campo] }} usano campi esistenti

### 4. Coerenza Ruoli
- [ ] Ogni ruolo in manifest.json ha permessi su tabelle esistenti
- [ ] Le schermate hanno roleId validi (BASIC/POWER/ADMIN)

### 5. Coerenza Client JS
- [ ] Le costanti Tables usano gli stessi ID di manifest.json
- [ ] Le costanti Screens usano le stesse route di manifest.json
- [ ] I metodi helper usano nomi campi esistenti

### 6. Dati di Esempio
- [ ] Ogni tabella ha almeno 1 riga di esempio in db.txt
- [ ] Le righe di esempio hanno tutti i campi required
- [ ] I valori rispettano i constraints (options, boolean, etc.)

## Errori Comuni da Evitare

| Errore | Soluzione |
|--------|-----------|
| tableId non corrispondente | Usare sempre "ta_[nome]" |
| Campo relazione senza fieldName | Aggiungere campo inverso nella tabella target |
| Filtro su campo inesistente | Verificare schema tabella |
| Binding con nome campo errato | Usare esattamente il nome dallo schema |
| Ruolo inesistente in routing | Usare solo BASIC/POWER/ADMIN |
| Step automazione senza id univoco | Usare "step_[descrizione]" |