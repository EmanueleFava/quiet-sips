# Quiet Sips

**Quiet Sips** è un'applicazione web per la gestione della tua lista di libri da leggere e recensire. Puoi: aggiungere libri alla tua lista personale, rimuoverli, visualizzare i dettagli di ciascun libro, visualizzare l'autore e la sua lista di libri, scrivere recensioni, leggere le recensioni degli altri utenti e tenere traccia dei tuoi progressi di lettura.

> ⚠️ _Solo gli utenti loggati possono aggiungere libri alla propria lista e scrivere recensioni._

## Funzionalità principali

- **Aggiungi libri**: Inserisci nuovi libri nella tua lista personale _(disponibile solo per utenti loggati)_.
- **Gestione disponibilità**: Checka quali libri sono già letti o disponibili nel sito.
- **Recensioni**: Scrivi le tue recensioni e visualizza quelle degli altri utenti per ogni libro, con rating calcolato in base alle valutazioni di tutti gli utenti _(scrittura disponibile solo per utenti loggati)_.
- **Lista personalizzata**: Organizza e visualizza facilmente i tuoi libri e le tue recensioni.
- **Interfaccia responsive**: Utilizzando i media queries per poter visualizzare i contenuti anche da mobile.

## Tecnologie utilizzate

- **Angular** per lo sviluppo del frontend
- **RxJS** per la gestione della programmazione reattiva e degli stream di dati
- **HttpClientModule** di Angular per le chiamate REST
- **json-server** per simulare un backend e gestire i dati tramite file JSON

## Come avviare l'applicazione

Assicurati di avere [Node.js](https://nodejs.org/) installato.

1. **Clona il repository**

   ```bash
   git clone <repo-url>
   cd quiet-sips
   ```

2. **Installa le dipendenze**

   ```bash
   npm install
   ```

3. **Avvia il server di sviluppo**
   In una finestra del terminale, esegui:

   ```bash
   json-server --watch db.json --port 3000
   ```

   In un'altra finestra del terminale, esegui:

   ```bash
   ng serve
   ```

4. **Apri l'app nel browser**
   Visita `http://localhost:4200` per vedere l'app in azione.

## Licenza

Questo progetto è sotto licenza MIT. Vedi il file LICENSE per i dettagli.
Per le immagini ho utilizzato [Freepik](https://it.freepik.com/)
