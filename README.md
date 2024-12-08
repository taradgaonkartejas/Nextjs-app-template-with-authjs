# Nextjs app template with authjs
Initial setup of Nextjs app with prisma ORM and authjs authentication

# Prerequisites
Ensure you have the following installed on your system:

Node.js (v16 or later)

npm or yarn

PostgreSQL (Ensure a running instance)

Git (for version control)


# Installation
1. Clone the Repository

```
git clone https://github.com/taradgaonkartejas/Nextjs-app-template-with-authjs.git
cd Nextjs-app-template-with-authjs
```

2. Install Dependencies
```
npm install
```
or
```
yarn
```
3. Create a .env file in the root directory of the project and add the following environment variables:


env
```
# Prisma
DATABASE_URL=postgresql://<username>:<password>@<host>:<port>/<database_name>

# Auth.js
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=<your_nextauth_secret>
```

# Database Setup

4. Initialize Prisma
Run the following command to initialize Prisma in the project:
```
npx prisma init
npx prisma migrate dev --name init
npx prisma generate
