🛠 Backend Requirements (Modular / MVC Pattern)
⚡ Tech Stack

Database: MongoDB (Mongoose for schema modeling).

Architecture: Modular MVC pattern (Controllers, Routes, Models, Middleware).

📚 Schemas

Books

title, author, genre, isbn, description, copies, available.

Borrows

Linked to book.

quantity, dueDate, etc.

📌 Features

Book Management

Full CRUD (create, read, update, delete).

Auto update availability when copies = 0.

Borrow Management

Borrow book with validation (quantity ≤ copies).

Borrow Summary (aggregated report).

Error Handling

Consistent, user-friendly error responses.

Additional

Pagination for book listings.

(Optional) Authentication middleware for private routes.