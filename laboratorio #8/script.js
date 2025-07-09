const apiURL = '/productos';

async function cargarProductos() {
  const res = await fetch(apiURL);
  const data = await res.json();
  const contenedor = document.getElementById('productos');
  contenedor.innerHTML = '';
  data.forEach(p => {
    contenedor.innerHTML += `
      <div class="card">
        <b>${p.nombre}</b> - $${p.precio}
        <button onclick="editar('${p.id}')">Editar</button>
        <button onclick="eliminar('${p.id}')">Eliminar</button>
      </div>
    `;
  });
}

document.getElementById('formulario').addEventListener('submit', async e => {
  e.preventDefault();
  const id = document.getElementById('id').value;
  const nombre = document.getElementById('nombre').value;
  const precio = parseFloat(document.getElementById('precio').value);

  const datos = { nombre, precio };

  if (id) {
    await fetch(`${apiURL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(datos)
    });
  } else {
    await fetch(apiURL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(datos)
    });
  }

  e.target.reset();
  cargarProductos();
});

async function editar(id) {
  const res = await fetch(`${apiURL}/${id}`);
  const data = await res.json();
  document.getElementById('id').value = data.id;
  document.getElementById('nombre').value = data.nombre;
  document.getElementById('precio').value = data.precio;
}

async function eliminar(id) {
  await fetch(`${apiURL}/${id}`, { method: 'DELETE' });
  cargarProductos();
}

cargarProductos();
