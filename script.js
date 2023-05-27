document.addEventListener("DOMContentLoaded", function() {
  const listaPedido = document.getElementById("lista-pedido");
  const totalSpan = document.getElementById("total");
  const volverButton = document.getElementById("volver");
  const confirmarButton = document.getElementById("confirmar");
  const combosButtons = document.querySelectorAll("#combos button");
  const armarButton = document.getElementById("armar");
  const eliminarUltimoButton = document.getElementById("eliminar-ultimo");
  const limpiarCarritoButton = document.getElementById("limpiar-carrito");
  
  const precios = {
    pan: 75.00,
    hamburguesa: 80.00,
    lechuga: 40.00,
    tomate: 60.00,
    queso: 70.00,
    panceta: 90.00,
    papas: 150.00,
    gaseosa: 250.00
  };

  let pedido = [];

  function agregarProducto(nombre, cantidad, precio) {
    const producto = {
      nombre: nombre,
      cantidad: cantidad,
      precio: precio
    };
    pedido.push(producto);
  }

  function actualizarPedido() {
    listaPedido.innerHTML = "";
    let total = 0;
    pedido.forEach(function(producto) {
      const item = document.createElement("li");
      item.textContent = producto.cantidad + "x " + producto.nombre + " - $" + (producto.cantidad * producto.precio).toFixed(2);
      listaPedido.appendChild(item);
      total += producto.cantidad * producto.precio;
    });
    totalSpan.textContent = total.toFixed(2);

    // Guardar el pedido en el almacenamiento local
    localStorage.setItem("pedido", JSON.stringify(pedido));
  }

  volverButton.addEventListener("click", function() {
    pedido = [];
    actualizarPedido();
    document.getElementById("pedido").style.display = "none";
  });

  confirmarButton.addEventListener("click", function() {
    // Enviar el pedido al servidor o realizar alguna acción adicional
    alert("¡Pedido confirmado! Gracias por tu compra.");
    pedido = [];
    actualizarPedido();
    document.getElementById("pedido").style.display = "none";

    // Eliminar el pedido del almacenamiento local
    localStorage.removeItem("pedido");
  });

  // Verificar si hay un pedido guardado en el almacenamiento local
  if (localStorage.getItem("pedido")) {
    pedido = JSON.parse(localStorage.getItem("pedido"));
    actualizarPedido();
    document.getElementById("pedido").style.display = "block";
  }

  combosButtons.forEach(function(button) {
    button.addEventListener("click", function() {
      const comboId = button.id;
      switch (comboId) {
        case "combo1":
          agregarProducto("Combo 1", 1, precios.hamburguesa + precios.papas + precios.gaseosa);
          break;
        case "combo2":
          agregarProducto("Combo 2", 1, (precios.hamburguesa * 2) + precios.papas + precios.gaseosa);
          break;
      }
      actualizarPedido();
      document.getElementById("pedido").style.display = "block";
    });
  });

  armarButton.addEventListener("click", function() {
    const cantidadPan = parseInt(document.getElementById("cantidad-pan").value);
    const cantidadHamburguesas = parseInt(document.getElementById("cantidad-hamburguesas").value);
    const cantidadLechuga = parseInt(document.getElementById("cantidad-lechuga").value);
    const cantidadTomate = parseInt(document.getElementById("cantidad-tomate").value);
    const cantidadQueso = parseInt(document.getElementById("cantidad-queso").value);
    const cantidadPanceta = parseInt(document.getElementById("cantidad-panceta").value);
  
    if (cantidadPan > 0) {
      agregarProducto("Pan", cantidadPan, precios.pan);
    }
    if (cantidadHamburguesas > 0) {
      agregarProducto("Hamburguesa", cantidadHamburguesas, precios.hamburguesa);
    }
    if (cantidadLechuga > 0) {
      agregarProducto("Lechuga", cantidadLechuga, precios.lechuga);
    }
    if (cantidadTomate > 0) {
      agregarProducto("Tomate", cantidadTomate, precios.tomate);
    }
    if (cantidadQueso > 0) {
      agregarProducto("Queso", cantidadQueso, precios.queso);
    }
    if (cantidadPanceta > 0) {
      agregarProducto("Panceta", cantidadPanceta, precios.panceta);
    }
  
    actualizarPedido();
    document.getElementById("pedido").style.display = "block";
  
    // Restablecer valores a 0
    document.getElementById("cantidad-pan").value = 0;
    document.getElementById("cantidad-hamburguesas").value = 0;
    document.getElementById("cantidad-lechuga").value = 0;
    document.getElementById("cantidad-tomate").value = 0;
    document.getElementById("cantidad-queso").value = 0;
    document.getElementById("cantidad-panceta").value = 0;
  });
  

  eliminarUltimoButton.addEventListener("click", function() {
    pedido.pop();
    actualizarPedido();
    if (pedido.length === 0) {
      document.getElementById("pedido").style.display = "none";
    }
  });

  limpiarCarritoButton.addEventListener("click", function() {
    pedido = [];
    actualizarPedido();
    document.getElementById("pedido").style.display = "none";
  });
});
