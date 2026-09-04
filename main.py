from math import ceil
from typing import List, Dict, Any
from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Allow cross-origin requests from the frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Hardcoded dataset (25 rows, 4 fields per row)
BOOKS: List[Dict[str, Any]] = [
    {"id": 1, "title": "To Kill a Mockingbird", "author": "Harper Lee", "year": 1960},
    {"id": 2, "title": "1984", "author": "George Orwell", "year": 1949},
    {"id": 3, "title": "The Great Gatsby", "author": "F. Scott Fitzgerald", "year": 1925},
    {"id": 4, "title": "One Hundred Years of Solitude", "author": "Gabriel García Márquez", "year": 1967},
    {"id": 5, "title": "Moby-Dick", "author": "Herman Melville", "year": 1851},
    {"id": 6, "title": "War and Peace", "author": "Leo Tolstoy", "year": 1869},
    {"id": 7, "title": "The Catcher in the Rye", "author": "J.D. Salinger", "year": 1951},
    {"id": 8, "title": "The Hobbit", "author": "J.R.R. Tolkien", "year": 1937},
    {"id": 9, "title": "Fahrenheit 451", "author": "Ray Bradbury", "year": 1953},
    {"id": 10, "title": "Jane Eyre", "author": "Charlotte Brontë", "year": 1847},
    {"id": 11, "title": "Pride and Prejudice", "author": "Jane Austen", "year": 1813},
    {"id": 12, "title": "The Book Thief", "author": "Markus Zusak", "year": 2005},
    {"id": 13, "title": "Animal Farm", "author": "George Orwell", "year": 1945},
    {"id": 14, "title": "Crime and Punishment", "author": "Fyodor Dostoevsky", "year": 1866},
    {"id": 15, "title": "Brave New World", "author": "Aldous Huxley", "year": 1932},
    {"id": 16, "title": "The Alchemist", "author": "Paulo Coelho", "year": 1988},
    {"id": 17, "title": "The Brothers Karamazov", "author": "Fyodor Dostoevsky", "year": 1880},
    {"id": 18, "title": "Wuthering Heights", "author": "Emily Brontë", "year": 1847},
    {"id": 19, "title": "Don Quixote", "author": "Miguel de Cervantes", "year": 1605},
    {"id": 20, "title": "The Odyssey", "author": "Homer", "year": -800},
    {"id": 21, "title": "Frankenstein", "author": "Mary Shelley", "year": 1818},
    {"id": 22, "title": "Slaughterhouse-Five", "author": "Kurt Vonnegut", "year": 1969},
    {"id": 23, "title": "The Catch-22", "author": "Joseph Heller", "year": 1961},
    {"id": 24, "title": "Beloved", "author": "Toni Morrison", "year": 1987},
    {"id": 25, "title": "The Grapes of Wrath", "author": "John Steinbeck", "year": 1939},
]

@app.get("/items")
def get_items(page: int = Query(1, ge=1), limit: int = Query(5, ge=1)):
    total_items = len(BOOKS)
    total_pages = ceil(total_items / limit) if total_items > 0 else 1
    
    start_idx = (page - 1) * limit
    end_idx = start_idx + limit
    
    paginated_items = BOOKS[start_idx:end_idx]
    
    return {
        "items": paginated_items,
        "total": total_items,
        "page": page,
        "limit": limit,
        "total_pages": total_pages
    }