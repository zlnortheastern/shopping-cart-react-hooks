## Project: shopping-cart-react-hooks

**Author:** Zhi Ling

**Description:** This is a project a [React](https://react.dev/) [vite](https://vitejs.dev/) web application project. The application design a simple basic shopping application for user to perform operations on adding products into shopping cart, create products, edit products, and delete products.

**Here is the** [**video**](https://youtu.be/rGIWtSphT_0) **for demo.**

### Project setup

You can direcly view the page by [Firebase deploy](https://shopping-cart-react-hooks.web.app) OR you can colone this repository by:

```plaintext
https://github.com/zlnortheastern/shopping-cart-react-hooks.git
```

Make sure you have installed [Node.js](https://nodejs.org/en).

Then install packages:

```plaintext
npm install
```

These are packages I used in this project:

```plaintext
npm install -g vite
```

```plaintext
npm install firebase
```

```plaintext
npm install prop-types
```

To run the application locally:

```plaintext
npm run dev
```

Then you can visit [http://localhost:5173/](http://localhost:5173/).

### Methods to build project

Project is created by:

```plaintext
npm create vite@latest shopping-cart-react-hooks
```

Then I build `App.jsx`, `ShoppingCart.jsx`, `ProductList.jsx`, `Product.jsx`, and `CreateProductForm.jsx` by Professor's recordings and scratch.

Implemented `MyFirebase.js` and firebase module by [Firestore documentation](https://firebase.google.com/docs/firestore?authuser=0&hl=en).

Implemented ProductList with pagination by learning from this [video](https://www.youtube.com/watch?v=IYCa1F-OWmk).

Implemented product card with editing option by learning from ChatGPT 3.5 with prompt:

> How can I handle product information update in firebase very easily like to edit product name and price in a product card with popup window or somethingelse?

Designed pagination with bootstrap by learning from ChatGPT 3.5 with prompt:

> Generate a nice pgination jsx with bootstrap style from https://getbootstrap.com/docs/5.3/components/pagination/#disabled-and-active-states
