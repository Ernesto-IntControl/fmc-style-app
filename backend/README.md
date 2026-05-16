# Backend FMC Style

API Node.js + Express + MySQL pour le salon FMC Style.

## Installation

```bash
npm install
cp .env.example .env
```

Creer la base MySQL :

```sql
CREATE DATABASE fmc_style CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

Puis lancer l'API :

```bash
npm run dev
```

## Donnees de demonstration

Avec MySQL lance localement :

```bash
npm run seed
```

Comptes crees :

- Admin : `admin@fmc-style.test` / `password`
- Client : `client@fmc-style.test` / `password`

## Assistant virtuel OpenAI

Ajouter votre cle dans `.env` :

```env
OPENAI_API_KEY=sk-...
OPENAI_MODEL=gpt-4.1-mini
```

La route `POST /api/chat` utilise la Responses API avec une sortie JSON stricte. Si la cle OpenAI est absente ou si l'appel echoue, le backend utilise automatiquement une logique simple par regles pour garder la demonstration fonctionnelle.

## Tables principales

- `utilisateurs`
- `services`
- `employes`
- `competences_employes`
- `rendez_vous`
- `promotions`
- `promotions_services`
- `paiements`
- `conversations`

## Routes principales

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/services`
- `GET /api/availability?date=YYYY-MM-DD&serviceId=ID`
- `POST /api/appointments`
- `POST /api/payments`
- `POST /api/chat`
- `POST /api/upload`
