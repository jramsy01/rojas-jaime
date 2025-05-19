document.addEventListener("DOMContentLoaded", () => {
  const booksGrid = document.getElementById("booksGrid");

  if (!booksGrid) {
    console.error("Error: No se encontró el elemento con id 'booksGrid'.");
    return;
  }

  const libros = JSON.parse(localStorage.getItem("libros")) || [];

  if (libros.length === 0) {
    booksGrid.innerHTML = "<p>No hay libros publicados aún.</p>";
    return;
  }

  libros.forEach((libro) => {
    const card = document.createElement("div");
    card.className = "book-card";

    const imagen = libro.imagen && libro.imagen.trim() !== "" ? libro.imagen : "img/default-book.jpg";
    const titulo = libro.titulo || "Título desconocido";
    const autor = libro.autor || "Autor desconocido";

    card.innerHTML = `
      <img src="${imagen}" alt="Portada de ${titulo}">
      <h3>${titulo}</h3>
      <p><strong>Autor:</strong> ${autor}</p>
    `;

    booksGrid.appendChild(card);
  });
});
