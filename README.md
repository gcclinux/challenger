# Getting Started with Challenger React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Require for cross platforms
`npm install --save-dev cross-env`

## Available Scripts

In the project directory, you can run:

```
npm create vite@latest

√ Project name: ... vite-project
√ Select a framework: » React
√ Select a variant: » JavaScript + SWC

cd vite-project
npm install
npm run dev
```

## To run the project

```
cd vite-project
npm run dev
```

## Update server port

To change the port for a React application that uses Vite, you can set the port option in the vite.config.js file. If you don't have a vite.config.js file in your project root, you can create one.

## Example:
```
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3001
  },
})
```

Another way is using npm run dev, you can modify the script in your package.json file to include the --port option. Here's how you can do it:

## Example (added line "test": "vite --port 3024",):

```
  "scripts": {
    "dev": "vite",
    "test": "vite --port 3024",
    "build": "vite build",
    "lint": "eslint . --ext js,jsx --report-unused-disable-directives --max-warnings 0",
    "preview": "vite preview"
  },
  ```
  With the above example you can run your project like this:

```
cd vite-project
npm run test
```

Example Screenshot 1
![Image 1](images/image1.png)

Example Screenshot 2
![Image 2](images/image2.png)