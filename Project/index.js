console.log('JavaScript is connected!');


fetch("data.json")
.then(function(response){
   return response.json();
})
.then(function(products){
   let placeholder = document.querySelector("#data-output");
   let out = "";
   for(let product of products){
      out += `
         <tr>
            <td> <img src='${product.image}'> </td>
            <td>${product.name}</td>
            <td>${product.Ingredtians}</td>
         </tr>
      `;
   }
 
   placeholder.innerHTML = out;
});