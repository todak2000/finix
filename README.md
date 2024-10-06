# Finix: Digital Dollar Access - Technical Documentation

## Introduction

### Purpose
Finix is a web application designed to provide global access to digital dollars, enabling users to hold and transact in USDC (USD Coin) without needing a traditional bank account. 

### Scope
This document outlines the technical requirements and architecture for the Minimum Viable Product (MVP) of Finix, focusing on core functionalities that leverage Circle's blockchain technology.


## Product Overview

### Product Vision
To democratize access to stable digital currency, providing a secure and user-friendly platform for holding, sending, and receiving USDC globally.

### Key Features
1. User-controlled USDC wallets
2. Social login authentication
3. USDC transactions (send/receive)
4. Fiat currency on/off ramps
5. Transaction history and analytics
6. Admin dashboard for enterprise clients (TODO)

## Technical Architecture

### Frontend
- **Framework**: Next.js
- **Styling**: Tailwind CSS
- **Language**: TypeScript

### Backend
- **Runtime**: Node.js
- **Framework**: Next.js (API routes)
- **Key Libraries**:
  - Circle's APIs for USDC transactions and account management
  - Firebase for user data and transaction records

### Database
- **Database**: Firebase
- **Data Management**: User data and transaction records are stored securely with data encryption at rest.

### Hosting and Deployment
- **Platform**: Vercel
- **CI/CD**: Implemented for automated testing and deployment.

## Functional Requirements

### User Authentication
- Implement social login (Google only) using Firebase.
- Support email and password registration as a fallback. (TODO)
- Implement two-factor authentication (2FA) for added security such as email verification or OTP (TODO)

### Wallet Management
- Create and manage developer-controlled USDC wallets using Circle Mint.
- Display real-time USDC balance.

### Transactions
- Enable sending USDC to other users on Finix using their emails just like PayPal.
- Enable sending USDC to external addresses like bank accounts.
- Support receiving USDC from other users on Finix.
- Support receiving USDC from other users via bank or external sources. (TODO)
- Implement transaction list/table.
- Implement transaction confirmation and receipt generation. (TODO)

### Fiat On/Off Ramps
- Integrate Circle's Payments API for buying/minting USDC with local currencies via bank.
- Support withdrawal of USDC to local bank accounts or payment systems. (TODO)

### Analytics and Reporting (TODO)
- Provide detailed transaction history with search and filter capabilities.
- Generate basic financial reports (e.g., monthly summaries).

### Admin Dashboard (TODO)
- Create user management tools for enterprise clients.
- Implement role-based access control.

## Development Guidelines

### Setting Up the Development Environment
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/todak2000/finix.git
   cd finix
   ```

2. **Install Dependencies**:
   ```bash
   pnpm install
   ```

3. **Environment Variables**:
   - Create a `.env.local` file in the root directory and add the necessary environment variables for Circle's API and Firebase configuration.

   #### Firebase API Keys
   To obtain your Firebase API keys:
   - Go to the [Firebase Console](https://console.firebase.google.com/).
   - Create a new project or select an existing one.
   - Navigate to **Project Settings** (gear icon).
   - Under the **General** tab, find your **Web Apps** section and click on your app.
   - Copy the following configuration values and add them to your `.env.local` file:
     ```
     NEXT_PUBLIC_API_KEY=your_firebase_api_key
     NEXT_PUBLIC_AUTH_DOMAIN=your_project_id.firebaseapp.com
     NEXT_PUBLIC_PROJECT_ID=your_project_id
     NEXT_PUBLIC_STORAGE_BUCKET=your_project_id.appspot.com
     NEXT_PUBLIC_MESSAGING_SENDER_ID=your_messaging_sender_id
     NEXT_PUBLIC_APP_ID=your_app_id
     ```

   #### Circle API Keys
   To obtain your Circle API keys:
   - Go to the [Circle Developer Dashboard](https://dashboard.circle.com/).
   - Sign up or log in to your account.
   - Create a new application in the dashboard.
   - Once created, navigate to the application settings to find your API keys.
   - Copy the following configuration value and add it to your `.env.local` file:
     ```
     NEXT_PUBLIC_CIRCLE_API_KEY=your_circle_api_key
     ```

   #### Example `.env.local` File
   ```plaintext
   NEXT_PUBLIC_API_KEY=your_firebase_api_key
   NEXT_PUBLIC_AUTH_DOMAIN=your_project_id.firebaseapp.com
   NEXT_PUBLIC_PROJECT_ID=your_project_id
   NEXT_PUBLIC_STORAGE_BUCKET=your_project_id.appspot.com
   NEXT_PUBLIC_MESSAGING_SENDER_ID=your_messaging_sender_id
   NEXT_PUBLIC_APP_ID=your_app_id
   NEXT_PUBLIC_DOMAIN=<your_deployed_url_link>
   NEXT_PUBLIC_CIRCLE_API_KEY=your_circle_api_key
   ```

4. **Run the Development Server**:
   ```bash
   pnpm dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

### Code Structure
- **Frontend**: Located in the `src` directory, with pages and components organized for easy navigation.
- **Backend**: API routes are defined in the `src/app/api` directory, handling requests related to user authentication, wallet management, and transactions.

