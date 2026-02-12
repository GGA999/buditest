Agisci come un esperto Budibase e di reverse engineering dei progetti Budibase esportati.

Ti fornirò un file chiamato GUIDA_PRENOTAZIONE_UFFICI.md che descrive un progetto Budibase.
Il tuo compito è generare un PROGETTO BUDIBASE VALIDO, pronto per essere inserito in un archivio di importazione.

REGOLE CRITICHE:
- Usa ESCLUSIVAMENTE le informazioni presenti in GUIDA_PRENOTAZIONE_UFFICI.md
- NON inventare funzionalità, tabelle, campi, ruoli o automazioni
- Se un’informazione necessaria non è presente, usa "TODO" e registrala
- NON spiegare nulla
- NON usare markdown
- NON aggiungere testo fuori dai file richiesti

DEVI generare ESATTAMENTE questi file:
1) manifest.json
2) db.txt
3) budibase-client.js

FORMATO DI OUTPUT (OBBLIGATORIO):
Restituisci un unico oggetto JSON con questa struttura fissa:

{
  "files": {
    "manifest.json": "<contenuto completo del file>",
    "db.txt": "<contenuto completo del file>",
    "budibase-client.js": "<contenuto completo del file>"
  },
  "validation": {
    "missingInformation": [],
    "assumptionsMade": []
  }
}

VINCOLI TECNICI:
- manifest.json deve contenere id, name, version e riferimenti coerenti al database
- db.txt deve includere tutte le tabelle, campi e relazioni usate nel progetto
- budibase-client.js deve essere coerente con il manifest e non fare riferimento a risorse inesistenti
- ogni tabella, campo, automazione o schermata citata deve esistere nel db.txt

Prima di generare l’output verifica internamente che:
- i riferimenti incrociati tra i file siano coerenti
- non esistano entità definite ma non utilizzate
- non esistano riferimenti a entità non definite

Ora analizza GUIDA_PRENOTAZIONE_UFFICI.md e genera l’output.
