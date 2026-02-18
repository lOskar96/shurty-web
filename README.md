# 🔗 Shurty – URL Shortener Frontend

Shurty is a modern URL shortener web application built with **React**.
It allows users to create, manage, and track shortened URLs with a clean and responsive UI.

This project was built as a portfolio-ready application with production-oriented architecture and best practices.

---

## 🚀 Live Features

- 🔗 Create shortened URLs
- ✏️ Edit existing URLs
- 🗑 Delete URLs
- 📊 Track click counts
- 📱 Generate QR codes
- 🔐 Authentication required for persistence
- ⚡ Optimistic UX with loading states
- 🎯 Clean modal-based flows
- 🧠 Global state management

---

## 🏗 Tech Stack

- **React (Vite)**
- **TypeScript**
- **Ant Design**
- **React Query (@tanstack/react-query)**
- **Zustand**
- **React Router**
- REST API backend (Node.js + Express)

---

## 📂 Project Structure

```
src/
 ├── components/
 ├── pages/
 ├── services/        # API logic (React Query)
 ├── zustand/         # Global state
 ├── hooks/
 └── utils/
```

Architecture is separated by responsibility:

- UI components
- Server state (React Query)
- Client state (Zustand)
- Routing
- Services layer abstraction

---

## ⚙️ Environment Variables

Create a `.env` file in the root:

```
VITE_API_URL=https://shurty.up.railway.app
```

---

## 🛠 Installation

```bash
# Clone the repository
git clone https://github.com/lOskar96/url-shortener-react.git

# Enter the project
cd url-shortener-react

# Install dependencies
npm install

# Run development server
npm run dev
```

---

## 🔄 Authentication Flow

1. User attempts to create a shortened URL.
2. If not authenticated → login/register modal opens.
3. After successful authentication → URL creation resumes automatically.
4. User is redirected to dashboard.

This flow ensures smooth UX without losing user intent.

---

## 📊 State Management Strategy

- **React Query** → server state (API calls, caching, mutations)
- **Zustand** → authentication & client-side global state
- Local component state → UI interactions (modals, forms)

---

## 🎯 Key Architectural Decisions

- Mutation logic isolated in service hooks (`useCreateUrl`, `useEditUrl`)
- Modals are controlled components
- Avoided unnecessary re-renders using `useCallback` & memoization
- Declarative form validation with Ant Design
- Clean separation between UI and data layer

---

## 🧪 Potential Improvements

- Unit tests with Vitest
- E2E tests with Playwright
- Rate limiting feedback UI
- Analytics dashboard
- Public link preview
- Custom domain support

---

## 📎 Backend Repository

The backend for this project can be found here:

👉 https://github.com/lOskar96/url-shortener-node

---

## 👨‍💻 Author

**Oscar Marmol Calle**

Frontend-focused developer building production-ready SaaS applications.

---

## 📄 License

This project is for educational and portfolio purposes.
