// Function to fetch JSON data
function fetchData(callback) {
   fetch('data.json')
     .then(response => response.json())
     .then(data => callback(data))
     .catch(error => console.error('Error fetching JSON:', error));
 }
 
 // Function to display all content on the main page
 function displayAllContent() {
   fetchData(data => {
     const productContainer = document.getElementById('product-container');
 
     // Create a div for each product
     data.forEach(item => {
       const productDiv = document.createElement('div');
       productDiv.className = 'product';
 
       // Create image element
       const imageElement = document.createElement('img');
       imageElement.src = item.image;
       imageElement.alt = `${item.Name} Image`;
       imageElement.style.maxWidth = '300px';
       imageElement.style.maxHeight = '300px';
 
       // Create div for product info
       const infoDiv = document.createElement('div');
       infoDiv.className = 'product-info';
 
       // Create heading for product name
       const nameHeading = document.createElement('h2');
       nameHeading.textContent = item.Name;

       const nameDesciption = document.createElement('h5');
       nameDesciption.textContent = item.Description;
 
       // Create button for each product
       const buttonElement = document.createElement('button');
       buttonElement.textContent = `View recepie`;
       buttonElement.onclick = () => showProduct(item.id);
 
       // Append elements to the product div
       infoDiv.appendChild(nameHeading);
       infoDiv.appendChild(nameDesciption);
       productDiv.appendChild(imageElement);
       productDiv.appendChild(infoDiv);
       productDiv.appendChild(buttonElement);
       productContainer.appendChild(productDiv);
     });
   });
 }
 
 // Function to display specific content on the product page
 function displayProductContent() {
  const selectedId = sessionStorage.getItem('selectedId');

  if (!selectedId) {
    alert('No product selected.');
    window.location.href = 'main.html'; // Redirect back to main page if no product selected
    return;
  }

  fetchData(data => {
    const specificItem = data.find(item => item.id === parseInt(selectedId, 10));

    if (specificItem) {
      const productContainer = document.getElementById('product-container');
      const ingredientsList = Object.entries(specificItem.ingredients).map(([ingredient, quantity]) => `<li>${ingredient}: ${quantity}</li>`).join('');
      const imageHTML = `<img src="${specificItem.image}" alt="${specificItem.Name} Image" style="max-width: 300px; max-height: 300px;">`;
      const nameHTML = `<h1>${specificItem.Name}</h1>`;
      const recipeHTML = `<ul class="align-right">${ingredientsList}</ul><p style="text-align: left;">Recipe: ${specificItem.Recipe}</p>`;

      // Set image, name, and recipe in the desired order
      productContainer.innerHTML = imageHTML + nameHTML + recipeHTML;
    } else {
      alert('Product not found for the specified ID.');
      window.location.href = 'main.html'; // Redirect back to the main page if the product is not found
    }
  });
}
 
 
 // Function to go to the product page
 function showProduct(id) {
   // Save the selected ID in sessionStorage
   sessionStorage.setItem('selectedId', id);
 
   // Redirect to product.html
   window.location.href = 'product.html';
 }
 
 // Function to go back to the main page
 function goToMainPage() {
   window.location.href = 'main.html';
 }
 
 // Check if on product.html and display content
 if (window.location.pathname.includes('product.html')) {
   displayProductContent();
 } else {
   // Call the displayAllContent function to populate the main page
   displayAllContent();
 }
 