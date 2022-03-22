var nombres = document.getElementById('nombres').value;
var email = document.getElementById('email').value;

const botonesCarrito = document.querySelectorAll('.addToCart');
botonesCarrito.forEach((añadirBoton) => {
  añadirBoton.addEventListener('click', presionarBoton);
});

const comprarButton = document.querySelector('.comprarButton');
comprarButton.addEventListener('click', comprarButtonClicked);

const shoppingCartItemsContainer = document.querySelector(
  '.shoppingCartItemsContainer'
);

function presionarBoton(event) {
  const button = event.target;
  const item = button.closest('.item');

  const itemProducto = item.querySelector('.item-Producto').textContent;
  const itemPrecio = item.querySelector('.item-precio').textContent;

  agregarProductoCarrito(itemProducto, itemPrecio);
}

function agregarProductoCarrito(itemProducto, itemPrecio) {
  const producto = shoppingCartItemsContainer.getElementsByClassName(
    'shoppingCartitemProducto'
  );
  for (let i = 0; i < producto.length; i++) {
    if (producto[i].innerText === itemProducto) {
      let elementQuantity = producto[
        i
      ].parentElement.parentElement.parentElement.querySelector(
        '.shoppingCartItemQuantity'
      );
      elementQuantity.value++;
      $('.toast').toast('show');
      updateShoppingCartTotal();
      return;
    }
  }

  const shoppingCartRow = document.createElement('div');
  const shoppingCartContent = `
  <div class="row shoppingCartItem">
        <div class="col-5">
            <div class="shopping-cart-item d-flex align-items-center h-100 border-bottom pb-2 pt-3">
                <h6 class="shopping-cart-item-title shoppingCartitemProducto text-truncate ml-3 mb-0">${itemProducto}</h6>
            </div>
        </div>
        <div class="col-2">
            <div class="shopping-cart-price d-flex align-items-center h-100 border-bottom pb-2 pt-3">
                <p class="item-price mb-0 shoppingCartitemPrecio">${itemPrecio}</p>
            </div>
        </div>
        <div class="col-5">
            <div
                class="shopping-cart-quantity d-flex justify-content-between align-items-center h-100 border-bottom pb-2 pt-3">
                <input class="shopping-cart-quantity-input shoppingCartItemQuantity" type="number"
                    value="1">
                <button class="btn btn-danger buttonDelete" type="button">X</button>
            </div>
        </div>
    </div>`;
  shoppingCartRow.innerHTML = shoppingCartContent;
  shoppingCartItemsContainer.append(shoppingCartRow);

  shoppingCartRow
    .querySelector('.buttonDelete')
    .addEventListener('click', eliminarProducto);

  shoppingCartRow
    .querySelector('.shoppingCartItemQuantity')
    .addEventListener('change', quantityChanged);

  modificarPrecioTotal(); 
}

function modificarPrecioTotal() {
  let total = 0;
  const shoppingCartTotal = document.querySelector('.shoppingCartTotal');

  const shoppingCartItems = document.querySelectorAll('.shoppingCartItem');

  shoppingCartItems.forEach((shoppingCartItem) => {
    const shoppingCartitemPrecioElement = shoppingCartItem.querySelector(
      '.shoppingCartitemPrecio'
    );
    const precioProducto = Number(
      shoppingCartitemPrecioElement.textContent.replace('S/.', '')
    );
    const shoppingCartItemQuantityElement = shoppingCartItem.querySelector(
      '.shoppingCartItemQuantity'
    );
    const cantidadProducto = Number(
      shoppingCartItemQuantityElement.value
    );
    total = total + precioProducto * cantidadProducto;
  });
  shoppingCartTotal.innerHTML = `S/. ${total.toFixed(2)}`;
}

function eliminarProducto(event) {
  const buttonClicked = event.target;
  buttonClicked.closest('.shoppingCartItem').remove();
  modificarPrecioTotal();
}

function quantityChanged(event) {
  const input = event.target;
  input.value <= 0 ? (input.value = 1) : null;
  modificarPrecioTotal();
}

function comprarButtonClicked() {
  shoppingCartItemsContainer.innerHTML = '';
  document.getElementById('nombreCompleto').innerHTML = nombres; 
  document.getElementById('emailUsuario').innerHTML = email; 
  document.getElementById('precioCompra').innerHTML = modificarPrecioTotal(); 

  document.getElementById('nombres').value = "";
  document.getElementById('email').value = "";
  modificarPrecioTotal();
}
