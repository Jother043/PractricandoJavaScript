class Producto {
    // Constructor de la clase Producto
    constructor(nombre, precio, categoria) {
        this.nombre = nombre;
        this.precio = precio;
        this.categoria = categoria;
    }

    // Método para mostrar la información del producto
    mostrarInfo() {
        return `Nombre: ${this.nombre}, Precio: $${this.precio.toFixed(2)}, Categoría: ${this.categoria}`;
    }
}

class GestorProducto {

    // Constructor de la clase GestorProducto
    constructor() {
        this.productos = [];
    }

    //Método para agregar un producto
    agregarProducto(producto) {
        this.productos.push(producto);
        this.renderizarProductos();
    }

    // Método para mostrar los productos
    mostrarProductos() {
        return this.productos.map(producto => producto.mostrarInfo());
    }

    // Método para eliminar un producto
    eliminarProducto(index) {
        if (index >= 0 && index < this.productos.length) {
            this.productos.splice(index, 1);
            this.renderizarProductos();
        } else {
            alert("Índice no válido");
        }
    }

    // Método para renderizar los productos en el DOM
    renderizarProductos() {
        const listaProductos = document.getElementById("productList");
        listaProductos.innerHTML = "";

        this.productos.forEach((producto, index) => {
            const div = document.createElement("div");
            div.className = "product-item";
            div.innerHTML = `
                <p>${producto.mostrarInfo()}</p>
                <button onclick="gestor.eliminarProducto(${index})">Eliminar</button>
            `;
            listaProductos.appendChild(div);
        });
    }
}

// Instancia del gestor
const gestor = new GestorProducto();

// Referencias al DOM
const formulario = document.getElementById("productForm");
const listaProductos = document.getElementById("productList");
const listBtn = document.getElementById("listProducts");

// Evento para agregar un producto
formulario.addEventListener("submit", (e) => {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value;
    const precio = parseFloat(document.getElementById("precio").value);
    const categoria = document.getElementById("categoria").value;

    if (nombre && !isNaN(precio) && categoria) {
        const nuevoProducto = new Producto(nombre, precio, categoria);
        gestor.agregarProducto(nuevoProducto);
        formulario.reset();
    } else {
        alert("Por favor, completa todos los campos correctamente.");
    }
});
