# Red Bull Webshop - Grupp 17

Detta är en fullstack-applikation för en webbshop, byggd med **React** (Vite) och **Node.js** (Express) med en **SQLite**-databas via **Sequelize**.

## Hur man kör projektet lokalt

För att applikationen ska fungera korrekt måste du installera paket och starta både backend och frontend.

### 1. Starta Backend
1. Öppna en terminal och gå till mappen: `cd backend`
2. Installera nödvändiga paket: `npm install`
3. Starta servern: `node server.js`
*Servern körs nu på http://localhost:3001. Här serveras även produktbilder via mappen /public.*

### 2. Starta Frontend
1. Öppna en **ny** terminal (behåll backend-terminalen igång) och gå till: `cd frontend`
2. Installera nödvändiga paket: `npm install`
3. Starta React-appen: `npm run dev`
*Appen körs nu på http://localhost:5173 (eller den port som visas i terminalen).*

## Funktioner som ingår
- **Persistent Storage:** Alla produkter och betyg (Ratings) sparas i en SQLite-databas.
- **Betygsystem:** Användare kan ge betyg i detaljvyn, vilket sparas asynkront via API.
- **Admin-panel:** Möjlighet att lägga till, redigera och ta bort produkter (CRUD).
- **Backend-bilder:** Alla bilder serveras statiskt från backend-servern enligt projektkraven.