package com.example.BookInventory.controller;

import com.example.BookInventory.model.Book;
import com.example.BookInventory.service.BookService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/books")
public class BookController {

    private final BookService service;

    public BookController(BookService service) {
        this.service = service;
    }

    // POST API - Add book
    @PostMapping
    public ResponseEntity<Book> addBook(@RequestBody Book book) {
        Book savedBook = service.addBook(book);
        return new ResponseEntity<>(savedBook, HttpStatus.CREATED);
    }

    // GET API - Get book by ID
    @GetMapping("/{id}")
    public ResponseEntity<Book> getBook(@PathVariable Long id) {
        Book book = service.getBookById(id);
        return ResponseEntity.ok(book);
    }

    // GET API - Get Book by Author
    @GetMapping("/author/{author}")
    public ResponseEntity<List<Book>> getBooksByAuthor(@PathVariable String author) {
        List<Book> books = service.getBookByAuthor(author);
        return ResponseEntity.ok(books);
    }

}
