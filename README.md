# 📚 Backend Abschlusstest – Mini-JobBoard

## 🎯 Ziel

Entwickle eine kleine REST-API für ein Jobportal, in dem Unternehmen Stellenanzeigen veröffentlichen und Bewerber sich registrieren und bewerben können.

---

## 🧱 Tech Stack

- **Node.js** mit **Express**
- **MongoDB** mit **Mongoose** (Cloud: MongoDB Atlas)
- **Authentifizierung** mit JWT & Cookies
- **Middleware & Security**: Zugriffskontrolle, Passwort-Hashing, einfache Validierung
- **(Optional)** Datei-Upload via `Multer`

---

## ✅ Aufgabe

Verwende bitte (falls möglich) `.rest/.http` um deine Endpunkte zu testen, damit wir beim Kontrollieren deine vorgefertigten Test-Anfragen ebenfalls nutzen können. Dies erleichtert uns die Kontrolle der Aufgaben. Danke!

Hinweis: Wir sehen die Cookies und dadurch auch das JWT nicht! Aber VS- Code speichert das Cookie Temporär. Das bedeutet solange VS-Code offen ist und auch die .rest Datei nicht geschlossen wird, können wir auch geschützte Routen testen, da nach einem Login VS-Code das Cookie automatisch setzt (wie das Frontend normalerweise).

### Registrierung

1. User und Unternehmen sollen sich mit folgenden Daten registrieren können
   - role: `company` oder `applicant` (mit default role)
   - email (einzigartig)
   - Passwort (min 10 Zeichen, 1 Großbuchsten, 1 Kleinbuchstaben, 1 Sonderzeichen)
   - fullname/companyName (min 3 Zeichen, max 20 Zeichen)
   - Ansprechparter (Company) optional
2. Die Daten sollen Validiert werden
   - Überprüfe ob die eingegebenen Daten Valide sind
3. Datenschutz und Sicherheit
   - Speichere keine Klartext Passwörter in der DB!

### Login

1. Authentifizierung
   - Der User soll maximal 12h eingeloggt bleiben
   - Verwende JWT und Cookies (httpOnly)

### Stellenanzeigen (Company)

1. addJob (single)
2. updateJob (single)
3. deleteJob (single)
4. showJobs (all)
   - Bei den angezeigten Jobs soll der Username und die E-Mail Adresse der Bewerber zu sehen sein
   - Das ganze soll über die UserID geladen werden!

## Stellenanzeigen (User)

1. loadAll - Zeige alle offenen Stellenanzeigen an
2. loadFiltered - Zeige alle offenen Stellenanzeigen an, die 'react' im Titel haben
3. apply - Fügt die UserID zur Stellenanzeige hinzu
