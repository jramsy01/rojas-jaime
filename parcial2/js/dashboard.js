document.addEventListener('DOMContentLoaded', () => {
  const links = document.querySelectorAll('nav a[data-section]');
  const sections = document.querySelectorAll('.section');
  const currentUser = localStorage.getItem('currentUser');

  links.forEach(link => {
    link.addEventListener('click', event => {
      event.preventDefault();
      const targetSectionId = link.getAttribute('data-section');

      sections.forEach(section => section.classList.remove('active'));
      const targetSection = document.getElementById(targetSectionId);
      if (targetSection) {
        targetSection.classList.add('active');

        if (targetSectionId === 'user') {
          showUserInfo();
        } else if (targetSectionId === 'books') {
          loadUserBooksTable();
        } else if (targetSectionId === 'dashboard') {
          updateDashboardCounts();
        }
      }
    });
  });

  function loadUserBooksTable() {
    if (!currentUser) return;

    const booksKey = `books_${currentUser}`;
    const books = JSON.parse(localStorage.getItem(booksKey)) || [];
    const tbody = document.querySelector('#booksTable tbody');
    tbody.innerHTML = '';

    books.forEach((book, index) => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.date}</td>
        <td>${book.pages}</td>
        <td>${book.recommend ? 'Yes' : 'No'}</td>
        <td><button data-index="${index}" class="deleteBookBtn">Delete</button></td>
      `;
      tbody.appendChild(tr);
    });

    tbody.querySelectorAll('.deleteBookBtn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const idx = e.target.getAttribute('data-index');
        deleteBook(idx);
      });
    });
  }

  function deleteBook(index) {
    if (!currentUser) return;

    const booksKey = `books_${currentUser}`;
    let books = JSON.parse(localStorage.getItem(booksKey)) || [];

    books.splice(index, 1);
    localStorage.setItem(booksKey, JSON.stringify(books));

    loadUserBooksTable();
    loadUserInfoBooksTable();
    updateDashboardCounts();
    generateRecommendationChart();
  }

  const addBookForm = document.getElementById('addBookForm');
  if (addBookForm) {
    addBookForm.addEventListener('submit', (e) => {
      e.preventDefault();

      if (!currentUser) {
        alert('You must be logged in to add books.');
        return;
      }

      const title = document.getElementById('bookTitle').value.trim();
      const author = document.getElementById('bookAuthor').value.trim();
      const date = document.getElementById('bookDate').value;
      const pages = parseInt(document.getElementById('bookPages').value);
      const recommend = document.getElementById('bookRecommend').checked;

      if (!title || !author || !date || !pages || pages <= 0) {
        alert('Please fill out all fields correctly.');
        return;
      }

      const newBook = { title, author, date, pages, recommend };
      const booksKey = `books_${currentUser}`;
      const books = JSON.parse(localStorage.getItem(booksKey)) || [];

      books.push(newBook);
      localStorage.setItem(booksKey, JSON.stringify(books));

      addBookForm.reset();

      loadUserBooksTable();
      loadUserInfoBooksTable();
      updateDashboardCounts();
      generateRecommendationChart();
    });
  }

  function showUserInfo() {
    const nameInput = document.getElementById('editUserName');
    const bookCountDisplay = document.getElementById('userBookCount');
    const displayUserName = document.getElementById('displayUserName');

    if (!currentUser) {
      if (nameInput) {
        nameInput.value = '';
        nameInput.disabled = true;
      }
      if (bookCountDisplay) bookCountDisplay.textContent = '⚠️ You are not logged in.';
      if (displayUserName) displayUserName.textContent = '';
      clearUserBooksTable();
      return;
    }

    if (nameInput) {
      const userData = JSON.parse(localStorage.getItem(`user_${currentUser}`)) || { username: currentUser };
      nameInput.value = userData.username || currentUser;
      nameInput.disabled = false;
    }

    if (displayUserName) displayUserName.textContent = currentUser;

    const booksKey = `books_${currentUser}`;
    const books = JSON.parse(localStorage.getItem(booksKey)) || [];
    if (bookCountDisplay) bookCountDisplay.textContent = `Books added: ${books.length}`;

    loadUserInfoBooksTable();
    generateRecommendationChart();
  }

  function loadUserInfoBooksTable() {
    if (!currentUser) return;

    const booksKey = `books_${currentUser}`;
    const books = JSON.parse(localStorage.getItem(booksKey)) || [];
    const tbody = document.querySelector('#userBooksTable tbody');
    if (!tbody) return;
    tbody.innerHTML = '';

    books.forEach((book, index) => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.date}</td>
        <td>${book.pages}</td>
        <td>${book.recommend ? 'Yes' : 'No'}</td>
        <td><button data-index="${index}" class="deleteUserBookBtn">Delete</button></td>
      `;
      tbody.appendChild(tr);
    });

    tbody.querySelectorAll('.deleteUserBookBtn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const idx = e.target.getAttribute('data-index');
        deleteBook(idx);
      });
    });
  }

  function clearUserBooksTable() {
    const tbody = document.querySelector('#userBooksTable tbody');
    if (tbody) tbody.innerHTML = '';
  }

  function updateDashboardCounts() {
    let totalBooks = 0;
    let totalUsers = 0;
    let totalBooksBorrowed = 0;

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key.startsWith('books_')) {
        const userBooks = JSON.parse(localStorage.getItem(key)) || [];
        totalBooks += userBooks.length;
        totalUsers++;
      }
    }

    document.getElementById('booksAvailableCount').textContent = totalBooks;
    document.getElementById('booksBorrowedCount').textContent = totalBooksBorrowed;
    document.getElementById('totalUsersCount').textContent = totalUsers;
  }

  function generateRecommendationChart() {
    if (!currentUser) return;

    const booksKey = `books_${currentUser}`;
    const books = JSON.parse(localStorage.getItem(booksKey)) || [];

    const svg = document.getElementById('booksChart');
    svg.innerHTML = '';

    const width = svg.getAttribute('width');
    const height = svg.getAttribute('height');

    const pointSpacing = width / (books.length + 1);
    const baseY = height - 40;

    let prevX = null;
    let prevY = null;

    books.forEach((book, index) => {
      const x = (index + 1) * pointSpacing;
      const y = book.recommend ? 40 : baseY;

      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      circle.setAttribute('cx', x);
      circle.setAttribute('cy', y);
      circle.setAttribute('r', 6);
      circle.setAttribute('fill', book.recommend ? 'green' : 'red');
      svg.appendChild(circle);

      if (prevX !== null && prevY !== null) {
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', prevX);
        line.setAttribute('y1', prevY);
        line.setAttribute('x2', x);
        line.setAttribute('y2', y);
        line.setAttribute('stroke', 'gray');
        line.setAttribute('stroke-width', 2);
        svg.appendChild(line);
      }

      prevX = x;
      prevY = y;
    });
  }

  updateDashboardCounts();
  document.getElementById('dashboard').classList.add('active');
});
