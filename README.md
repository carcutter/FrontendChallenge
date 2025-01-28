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

## Test Description

### Challenges
The mission of this test was to develop a fully functional app capable of performing CRUD (Create, Read, Update, Delete) operations for employees. Below are some of the challenges I faced during the process, especially related to the dummy API and working with Next.js:

- **Proxy Setup for Employee Data:**
Configuring the proxy to fetch employee data correctly from the [dummy API](http://dummy.restapiexample.com/) was initially challenging. It took some time to understand the correct way to fetch data.
- **Dummy API Limitations:**
The dummy API presented several challenges. While it was clear that the API had a slow rate limit, it also failed to process changes consistently. Even with a correct payload and a successful response, the API often did not reflect the updates, making it difficult to evaluate the CRUD actions reliably.
- **Learning Next.js:**
This test was my first experience with Next.js, and it turned out to be a rewarding learning opportunity. I enjoyed exploring the framework and its features throughout this project.

### Results
This test took around 7-8 hours for me to finish.

What has beed done in this test?

- Emphasized **code quality** by addressing all linting errors and ensuring code readability.
- Implemented **CRUD operations** for managing employee data.
- Wrote **test cases to validate** and ensure the functionality of the app. Used **vitest** and jest.

To run tests
```bash
$ npm run test
```

> [!TIP]
> Don't forget to install the node packages:

```bash
$ npm i
```

### Approach
My approach to tackling this test was straightforward and organized:

1. **Brainstorming:**
I took time to plan and analyze the requirements and challenges before starting.

2. **Problem-Solving:**
I addressed technical challenges early on, such as understanding the API limitations and setting up the environment properly.

3. **Development:**
I wrote clean, readable code and made meaningful commits throughout the development process.

4. **Testing and Learning:**
I implemented test cases to validate the app's functionality and took the opportunity to learn new concepts and techniques along the way.