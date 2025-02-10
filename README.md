# Frontend Challenge

## Build a web app with Next.js 13

As a frontend developer you get the task to implement a frontend for an employee API, where you can
list, create, read, update and delete employees.

### API

Use [restapiexample.com](https://dummy.restapiexample.com)

> [!WARNING]
> API has a rate limit

A base structure is already implemented.
Feel free to improve the current implementation whenever you see potential or let us know what you
would do differently in your pull requests description.

Please fork our repo and implement the missing features. Also track time and let us know how long it
took you to finish the challenge.

### Run It

```bash
$ nvm exec 20.9 npm run dev
```

By default, the app is reachable at `http://127.0.0.1:3000`

### Setup

Currently we are using node `20.9` so we recommend to use `nvm`.

Install `nvm` by following this
[guide](https://www.freecodecamp.org/news/node-version-manager-nvm-install-guide/).

Install and use node `20.9`:

```bash
$ nvm use
```

> [!TIP]
> Don't forget to install the node packages:

```bash
$ npm i
```

### Formatting

Prettier is our formatter of choice. We added some settings for VSCode. If you use a different IDE please adapt the settings.

---

## ✨ Features Implemented

### ✅ **Employee Management (CRUD)**

- 📌 **List employees** with pagination.
- 📌 **Create a new employee**.
- 📌 **View employee details**.
- 📌 **Update employee information**.
- 📌 **Delete an employee**.

### ✅ **Backend Server (`employee-api` folder)**

- 🟢 Added a **local Express.js server** to avoid API rate limit issues.
- 🟢 Supports **CRUD operations** for employees.

### ✅ **Pagination**

- 🔄 Implemented **pagination** for the employee list.
- 🔄 Users can **load more employees dynamically**.

### ✅ **Testing with Cypress**

- 🧪 Integrated **Cypress** for End-to-End (E2E) testing.
- 🧪 Added **one automated test**

### ✅ **Navigation Enhancements**

- 🔙 Added a **Back button (←) on employee detail and edit pages** for a better user experience.

---

📌 Run the Local API Server (Optional)
To avoid API rate limits, you can start the local API server:

```bash
cd employee-api
npm install
npm run dev
```

The local API runs at:
http://127.0.0.1:3001.

🧪 Running Cypress Tests
To execute the Cypress End-to-End tests, run:

```bash
npx cypress run
```

This will open the Cypress UI for interactive testing.
