# Mind Reader

A shopping website that allows you to shop multiple categories of products at multiple stores on one page.

## Live Demo

https://mindreaders.herokuapp.com

## Technologies Used
* Amazon API
* Walmart API
* AJAX
* Express
* JSON
* jQuery
* JavaScript
* Bootstrap
* Velocity.js

## Documentation of API
* GET /api/categories
  - Queries the Walmart API for all the categories of their products to be rendered as tabs
* GET /api/getproducts
  - Queries the Walmart API for products based on the selected categories or from a a specific search term
* GET /api/products/amazon
  - Queries the Amazon API for products based on a search term
  
## Walkthrough
User can select categories that they would like to search stores for. 
![Home](https://github.com/mmacdonald1/Mind-Reader/blob/master/assets/img/home.png)

User can search Walmart more specifically by typing in the search bar or they can click the tabs to see Walmart products from those categories. 
![Walmart](https://github.com/mmacdonald1/Mind-Reader/blob/master/assets/img/walmart.png)

To search Amazon click the Amazon button to render the Amazon search bar. Search for a product and the associated product results will render.
![Amazon](https://github.com/mmacdonald1/Mind-Reader/blob/master/assets/img/amazon.png)
