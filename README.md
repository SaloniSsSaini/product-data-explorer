# 📦 Product Data Explorer – Full Stack Application

A full-stack product exploration platform built using **Next.js**, **NestJS**, **Prisma**, **PostgreSQL**, and a custom **web scraper** powered by **Crawlee + Playwright**.

This project demonstrates real-world full-stack development, including data scraping, API design, database modeling, caching, pagination, and a modern frontend architecture.

---

## 🚀 Features

### 🔹 Frontend (Next.js)
- Navigation menu powered by backend APIs
- Category-wise product listing
- Product detail page with description & reviews
- Pagination for large product lists
- View History (recently viewed products)
- Data caching & refetching using **React Query**
- Responsive UI with reusable components

### 🔹 Backend (NestJS)
- REST APIs for navigation, categories, products, and product details
- Prisma ORM with PostgreSQL
- Modular architecture (Navigation, Category, Product, Scrape, History)
- Background scrape job handling
- Input validation using DTOs & pipes

### 🔹 Scraper (Crawlee + Playwright)
- Scrapes real product navigation & data
- Normalizes titles, slugs, and URLs
- Sends scraped data directly to backend APIs
- Configurable delay for polite scraping

---

## 🧱 Tech Stack

| Layer        | Technology |
|-------------|------------|
| Frontend     | Next.js (App Router), React Query, Tailwind CSS |
| Backend      | NestJS, Prisma ORM |
| Database     | PostgreSQL |
| Scraper      | Crawlee, Playwright |
| Language     | TypeScript |
| Tooling      | Axios, Zod, ESLint |

---

## 📂 Project Structure

product-data-explorer/
│
├── frontend/ # Next.js application
├── backend/ # NestJS API + Prisma
├── scraper/ # Crawlee + Playwright scraper
└── README.md

yaml
Copy code

---

## ⚙️ Environment Setup

### 🔹 Backend (`backend/.env`)
```env
DATABASE_URL=postgresql://user:password@localhost:5432/product_explorer
PORT=4000
🔹 Frontend (frontend/.env)
env
Copy code
NEXT_PUBLIC_API_URL=http://localhost:4000
🔹 Scraper (scraper/.env)
env
Copy code
BASE_URL=https://www.worldofbooks.com
SCRAPE_DELAY_MS=200
▶️ Running the Project Locally
1️⃣ Backend
bash
Copy code
cd backend
npm install
npx prisma migrate dev
npx prisma generate
npm run start:dev
Backend runs on: http://localhost:4000

2️⃣ Frontend
bash
Copy code
cd frontend
npm install
npm run dev
Frontend runs on: http://localhost:3000

3️⃣ Scraper
bash
Copy code
cd scraper
npm install
npx playwright install chromium
npm run start
This will scrape navigation data and send it to the backend.

🔗 API Endpoints (Sample)
Method	Endpoint	Description
GET	/navigation	Fetch navigation menu
GET	/categories/:navigationSlug	Category list
GET	/products	Paginated products
GET	/products/:sourceId	Product detail
POST	/scrape/navigation	Save scraped navigation
POST	/history	Store view history

🚧 Deployment Status
Live deployment could not be completed due to environment-specific build and configuration issues on the hosting platform.

However:

✅ Frontend runs correctly in local development

✅ Backend APIs are fully functional

✅ Database schema & relations are complete

✅ Scraper successfully fetches and sends data

Clear setup instructions are provided to run the project locally without issues.

🎯 Learning Outcomes
Full-stack architecture design

Prisma relational schema modeling

Real-world web scraping

Pagination & caching strategies

Clean modular backend structure

Frontend performance optimization with React Query

👩‍💻 Author
Saloni Saini
Aspiring Full Stack Developer
GitHub: https://github.com/SaloniSsSaini
