# Amazonia Travel e Events - Project Specifications

## 1. Project Overview
A React/Vite-based modern web application designed for a regional tourism agency in Amazonas, Brazil. The site allows users to browse tour packages, view details, switch between regional or executive pricing models, add extras, and reserve via WhatsApp.

## 2. Tech Stack
- **Framework**: React 18
- **Build Tool**: Vite
- **Routing**: React Router DOM v6
- **Styling**: Vanilla CSS (`index.css`) + Inline React Styles + Local assets
- **Icons**: `lucide-react`
- **State Management**: React Context (`CartContext.jsx`) + Local State (`useState`)

## 3. Key Directories & Patterns
- `src/assets/`: All local imagery (tours, features, gallery, partners).
- `src/components/`: Reusable pieces (Header, Footer, Floating WhatsApp button).
- `src/context/`: Context Providers (Cart, which simulates a shopping cart before redirecting to checkout/WhatsApp).
- `src/data/`: Static data sources (`toursData.js` exports the `packagesData` array).
- `src/pages/`: Main application routes (Home, About, Blog, Contact, Packages/Destinations, TourDetails, HowToBuy).

## 4. Design Guidelines
- **Primary Colors**: Dark theme base (`#000`), with Gold/Yellow highlights (`#FFD700`) and slight Green accents (`#7EB53F` / `#16a34a`).
- **Typography**: Modern sans-serif (Inter/Roboto), with varied weights (700-900 for headings, 400-600 for body).
- **Layout**: CSS Grid and Flexbox heavily used. Container max-width usually constrained around 1200px.
- **Responsiveness**: Handled mostly via media queries in `index.css` or embedded `<style>` tags within components (`@media (max-width: 991px)` or `768px`).

## 5. Components Overview
- **Header**: Navigation bar with animated transparent-to-solid background on scroll. Includes Cart icon and Mobile menu logic.
- **Footer**: Brand info, contacts, payment method badges, partner logos (Cadastur, Tripadvisor, Asaas).
- **Home (`Home.jsx`)**: Complex landing page. Uses an automatic hero carousel, an interactive gallery (zoom modal), and a packages slider.
- **Packages (`Packages.jsx`)**: The "Destinations" list filterable by category and sortable.
- **TourDetails (`TourDetails.jsx`)**: Dynamic page based on `id` route param. Renders specific `packagesData` item. Includes sticky booking widget indicating varying pricing based on license/guests.

## 6. Development Instructions
- Run locally: `npm run dev`
- Build for production: `npm run build`
- Install dependencies: `npm install`
