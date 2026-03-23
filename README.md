# Red Bull Webshop - Grupp 17

Detta är ett fullstack-projekt byggt med React (Vite) och Node.js (Express) med en SQLite-databas via Sequelize.

## Installation & Uppstart

För att köra projektet lokalt behöver du installera paket i både frontend och backend:

### 1. Backend
1. Öppna terminalen och gå till mappen: `cd backend`
2. Installera paket: `npm install`
3. Starta servern: `node server.js`
*Servern körs nu på http://localhost:3001*

### 2. Frontend
1. Öppna en ny terminal och gå till mappen: `cd frontend`
2. Installera paket: `npm install`
3. Starta applikationen: `npm run dev`
*Appen körs nu på http://localhost:5173*

## Funktioner
- Dynamisk hämtning av produkter från SQL-databas.
- Möjlighet att ge betyg (Rating) som sparas permanent.
- Admin-panel för att lägga till/ta bort produkter.
- Bilder serveras direkt från backend.
