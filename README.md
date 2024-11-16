# RecycleChain 🌱

**RecycleChain** is a blockchain-based platform that enables manufacturers to track products throughout their entire lifecycle—from creation to recycling. By logging each stage and detailing toxic contents, **RecycleChain** promotes eco-consciousness, transparency, and accountability. This platform redefines sustainable production, contributing to a greener future.

🚀 **Live Application**: [RecycleChain App](https://recyclechain.onrender.com/)  
📜 **API Documentation**: [RecycleChain Swagger API](https://recyclechain-production.up.railway.app/)  
🔗 **Smart Contract Verified Source Code (Polygon Amoy Testnet)**: [RecycleChain Contract on PolygonScan](https://amoy.polygonscan.com/address/0x9CAE363Fc7154114C10D279bc14198DBAA5AB6b1)

## 🌍 Project Overview

The RecycleChain ecosystem includes multiple components designed to facilitate the tracking of products, ensuring transparency and efficiency in manufacturing, recycling, and sustainability efforts.

### Key Features:
- **Blockchain Integration**: Immutable logging of product lifecycle stages using smart contracts.
- **Eco-conscious Production**: Detailing toxic contents for each product and ensuring safe recycling.
- **Transparency & Accountability**: Full visibility of product journey from creation to recycling.
  
This project incorporates various technologies and tools, including **Solidity**, **React Native**, **Next.js**, **NestJS**, and **Prisma**, creating a powerful and scalable platform.

---

## 📦 Tech Stack

The project is built using the following technologies:

- **Blockchain & Smart Contracts**:
  - **Solidity**: For developing smart contracts that govern product lifecycle tracking.
  - **Polygon (Amoy Testnet)**: The blockchain network for deploying smart contracts.
    
- **Smart Contract Development Tools**
  - **Hardhat**: A development environment for Ethereum that facilitates compiling, deploying, testing, and debugging smart contracts.
  - **OpenZeppelin**: A library of secure and reusable smart contract components, ensuring best practices and security in smart contract development.
  - **Mocha/Chai**: Testing frameworks used with Hardhat to run unit tests and assertions for smart contracts.
  - **Solidity Coverage**: Provides test coverage reports for smart contracts to ensure code quality and reliability.
  - **Solhint**: A Solidity linter that helps identify security vulnerabilities and coding standard issues.
  - **Solidity Metrics**: A tool to analyze and generate metrics for Solidity code to track code quality and complexity.
  - **Gas Reporter**: A Hardhat plugin that reports the gas usage of smart contract deployments and transactions to optimize for gas efficiency.
  
- **Backend**:
  - **NestJS**: A progressive Node.js framework for building scalable backend services, especially useful for GraphQL and REST APIs.
  - **GraphQL**: For flexible, efficient querying of data.
  - **Prisma**: ORM for database interactions, providing an abstraction over PostgreSQL.
  - **PostgreSQL**: The database used to store product lifecycle and manufacturer data.
  - **TypeScript**: Ensures type safety across both frontend and backend.
  - **Jest**: A testing framework for unit and integration tests.
  - **Prisma Migrations**: For database schema management.

- **Frontend**:
  - **Next.js**: A React framework that provides server-side rendering and static site generation for the frontend.
  - **React Native**: For building mobile applications for both Android and iOS platforms.
  - **React**: JavaScript library for building user interfaces.
  - **Tailwind CSS**: Utility-first CSS framework for styling the frontend.
  - **TypeScript**: Ensures type safety across frontend components.

- **Libraries**:
  - **@recycle-chain/forms**: Custom form library for handling form data across applications.
  - **@recycle-chain/util**: Utility library with common helper functions for various tasks.
  - **D3.js**: A JavaScript library for creating data visualizations, used for graphical representation of product lifecycle.
  - **React Spring**: A spring-physics-based animation library for React.
  - **React Toastify**: For showing non-blocking notifications on the frontend.
  - **Apollo Server**: For building GraphQL servers in the backend.
  - **GraphQL Apollo Client**: For handling GraphQL queries in the frontend.
  - **Swagger**: To document and test the REST APIs.
  
- **DevOps & Deployment**:
  - **Docker**: For containerization of the PostgreSQL database and services.
  - **GitHub Actions**: For CI/CD pipelines to automate testing and deployment.
  - **Render**: For deploying both frontend and backend services.
  - **Railway**: For hosting the backend services, including the API and smart contract event listeners.

---

## 📦 Monorepo Contents

The **RecycleChain** project is organized as a monorepo with the following structure:

- **Smart Contracts**:
  - **RecycleChain Smart Contract** (Solidity): The core smart contract governing the RecycleChain platform, deployed on Polygon Amoy Testnet.

- **Web Application**:
  - **Next.js Frontend**: A web application frontend developed using Next.js.

- **Backend Application**:
  - **NestJS API**: A robust backend application featuring:
    - **GraphQL API**: Flexible querying and mutation of product lifecycle data.
    - **REST API** with Swagger documentation: Exposes RecycleChain data and functions.
    - **Smart Contract Event Listeners**: Listen to blockchain events for real-time updates.

- **Libraries**: Supporting libraries for various functionalities:
  - **Forms**
  - **Network**
  - **UI components**
  - **3D graphics**

---

## 🛠️ Prerequisites

Before you start, ensure you have the following installed on your system:

- **Node.js** (>= 14.x)
- **Yarn** (>= 1.22.x)
- **Docker** (for local database setup)
- **Git** (to clone the repository)

---

## 🚀 Getting Started

Follow these steps to set up the RecycleChain project locally.

### 1. Clone the Repository

Clone the repository to your local machine:

```bash
git clone https://github.com/Shahnawazkhan83/RecycleChain
cd recycle-chain-workshop
```

### 2. Install Dependencies

Install project dependencies using Yarn:

```bash
yarn install
```
### 3. Set Up Environment Variables
Create a .env file in the root directory and add the necessary environment variables. You can reference .env.example for the required variables.

4. Run the Database with Docker Compose
Start the PostgreSQL database using Docker Compose:

```bash
docker-compose up -d
```
### 5. Run Prisma Migrations
Apply Prisma migrations to set up the database schema:

```bash
yarn prisma migrate dev
```
### 6. Run the Applications
Now, you can run the individual applications. Follow the steps for each:

**API Application (NestJS Backend)**
Navigate to the apps/api directory and start the API server:

```bash
cd apps/api
yarn dev
```

**Web Application (Next.js Frontend)**
Navigate to the apps/web directory and start the web server:

```bash
cd apps/web
yarn dev
```
---

## 🛠️ Features Under Development

The following features are currently under development to enhance the RecycleChain platform:

### 1. **NFT-Based Product Ownership**
   - **Objective**: Utilize NFTs (Non-Fungible Tokens) to represent product ownership, allowing users to track, transfer, and verify ownership of items easily.
   - **Technology**: Smart contracts using ERC-721 standard for NFTs.

### 2. **Decentralized Marketplace Integration**
   - **Objective**: Build a decentralized marketplace where users can buy, sell, or recycle products in a trustless environment, all transactions secured by smart contracts.
   - **Technology**: Decentralized exchange (DEX) protocols integrated with the RecycleChain platform.

### 3. **AI-Powered Recycling Suggestions**
   - **Objective**: Implement AI algorithms to provide suggestions for the optimal recycling methods based on product type, usage, and lifecycle data stored on the blockchain.
   - **Technology**: AI/ML models integrated with blockchain data and smart contracts.

### 4. **Carbon Footprint Tracker**
   - **Objective**: Introduce a carbon footprint tracker to assess the environmental impact of manufacturing and recycling activities, helping users make more eco-friendly decisions.
   - **Technology**: Data-driven approach combining blockchain and external environmental data sources.

---

## 🔮 Future Aspects

In the future, RecycleChain aims to expand and introduce the following key features:

### 1. **Real-time Product Tracking**
   - **Objective**: Implement real-time product tracking using IoT devices that can update product status on the blockchain, ensuring immediate visibility of product lifecycle stages.
   - **Technology**: Integration with IoT APIs and real-time data processing.

### 2. **Toxicity Level Monitoring**
   - **Objective**: Develop a system to track and report the toxicity level of products in real-time, making the supply chain more transparent and safe.
   - **Technology**: Blockchain-based reporting system integrated with product sensors.

### 3. **Global Network Expansion**
   - **Objective**: Expand the platform’s blockchain network to more geographic regions, supporting a wide array of manufacturers, consumers, and recycling centers.
   - **Technology**: Multi-chain support and integration with global blockchain networks.

### 4. **Cross-Industry Integration**
   - **Objective**: Enable seamless integration with various industries like electronics, textiles, and food, to enable a broad spectrum of recycling and lifecycle management.
   - **Technology**: Industry-specific modules and smart contract standards.

### 5. **Tokenized Recycling Incentives**
   - **Objective**: Introduce token-based rewards for users who participate in recycling activities, incentivizing eco-friendly behavior and making recycling more rewarding.
   - **Technology**: Integration with a native cryptocurrency or token on the Polygon network.

### 6. **Advanced Product Lifecycle Analytics**
   - **Objective**: Provide manufacturers with advanced analytics tools to assess the lifecycle of their products, improving the design for sustainability.
   - **Technology**: Blockchain-based data visualization and machine learning models.

### 7. **Supply Chain Optimization with Blockchain**
   - **Objective**: Enhance the supply chain by providing transparent and immutable records of product origin, movement, and recycling status, improving operational efficiency.
   - **Technology**: Advanced smart contract logic and supply chain management tools.

### 8. **Decentralized Autonomous Organization (DAO) for Governance**
   - **Objective**: Implement a DAO system to allow the community to vote on key platform decisions, ensuring decentralized governance and user-driven development.
   - **Technology**: DAO frameworks integrated with the smart contracts and governance tokens.

---

These upcoming features aim to make RecycleChain a powerful tool for product lifecycle management, with an emphasis on sustainability, transparency, and innovation.


## 🤝 Contributing
We welcome contributions to RecycleChain! Please fork the repository, make your changes, and submit a pull request.
