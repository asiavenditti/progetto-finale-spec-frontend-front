# 🚗 CarCompare

## Descrizione del Progetto
CarCompare è un'applicazione web frontend sviluppata in **React** per la visualizzazione e il confronto di automobili. Permette agli utenti di esplorare un catalogo di vetture, aggiungere auto ai preferiti, confrontare fino a due modelli contemporaneamente e visualizzare dettagli specifici di ciascun veicolo. L'app è progettata per offrire un'esperienza **intuitiva e moderna**, con interfaccia responsive per dispositivi mobili e desktop. Il progetto è stato realizzato come esercizio finale per il corso **Boolean**, con focus su **best practices frontend**, gestione dello stato globale e integrazione con API esterne.

## 🎯 Obiettivo dell'Applicazione
Fornire uno strumento semplice ed efficace per aiutare gli utenti a scegliere l'auto più adatta. Funzionalità principali: Ricerca e filtro delle auto, confronto diretto fino a due modelli, visualizzazione dettagliata delle caratteristiche tecniche e dei prezzi.

## 🛠️ Tecnologie Utilizzate
### Frontend
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=fff)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=fff)
![Bootstrap](https://img.shields.io/badge/Bootstrap-7952B3?style=for-the-badge&logo=bootstrap&logoColor=fff)
![React Bootstrap Icons](https://img.shields.io/badge/React_Bootstrap_Icons-563D7C?style=for-the-badge&logo=bootstrap&logoColor=fff)
![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=fff)

### Backend / API
L'app si collega a un'**API esterna** per recuperare dati delle auto. L'URL è configurato tramite variabile d'ambiente `VITE_API_URL`. I dati sono in formato JSON: modello, categoria, prezzo, caratteristiche tecniche.


```md
## 🚀 Comandi Disponibili
- `npm run dev` → Avvia server di sviluppo con hot reload  
- `npm run build` → Build produzione nella cartella `dist`  
- `npm run preview` → Anteprima build produzione  
- `npm run lint` → Controllo qualità codice con ESLint  

## 🌟 Funzionalità Principali
- **Homepage**: Pagina di benvenuto con CTA per esplorare il catalogo  
- **Catalogo Auto**: Lista filtrabile e ordinabile con ricerca e filtro per categoria  
- **Dettagli Auto**: Info tecniche, colori disponibili e dotazioni  
- **Preferiti**: Aggiunta/rimozione con persistenza in localStorage  
- **Confronto**: Confronto diretto fino a due auto con barra flottante  
- **Responsive Design**: Mobile, tablet e desktop  
- **Gestione Stato**: Context API per preferiti, confronto e dati API  
- **Caricamento Asincrono**: Hook personalizzato con gestione errori e loading  

## 🔮 Possibili Miglioramenti Futuri
- Autenticazione Utente (login/registrazione)  
- Ricerca avanzata (prezzo, anno, potenza…)  
- Recensioni e valutazioni  
- Backend completo con Node.js/Express  
- Test unitari (Jest / React Testing Library)  
- Ottimizzazione performance (lazy loading, virtualizzazione)  
- Internazionalizzazione  
- PWA (Progressive Web App)
