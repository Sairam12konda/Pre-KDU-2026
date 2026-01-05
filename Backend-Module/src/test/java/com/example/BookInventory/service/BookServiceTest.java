package com.example.BookInventory.service;

import com.example.BookInventory.model.Book;
import com.example.BookInventory.repository.BookRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.math.BigDecimal;

import static org.junit.jupiter.api.Assertions.*;

class BookServiceTest {

    
    private BookService bookService;

    @BeforeEach
    void setUp() {
        bookService = new BookServiceImpl(new BookRepository());
    }

    @Test
    void addBook_shouldSaveBookSuccessfully() {
        Book book = new Book(null, "Java Basics", "James", BigDecimal.valueOf(500), "ISBN001");

        Book saved = bookService.addBook(book);

        assertNotNull(saved.getId());
        assertEquals("Java Basics", saved.getTitle());
    }

    @Test
    void getBookById_shouldReturnBook_whenBookExists() {
        Book saved = bookService.addBook(
                new Book(null, "Spring Boot", "Rod", BigDecimal.valueOf(600), "ISBN002")
        );

        Book found = bookService.getBookById(saved.getId());

        assertEquals(saved.getId(), found.getId());
    }

    @Test
    void getBookById_shouldThrowException_whenBookNotFound() {
        assertThrows(RuntimeException.class,
                () -> bookService.getBookById(999L));
    }

    @Test
    void addBook_shouldFail_whenTitleIsEmpty() {
        Book book = new Book(null, "", "Unknown", BigDecimal.valueOf(100), "ISBN003");

        assertThrows(IllegalArgumentException.class,
                () -> bookService.addBook(book));
    }
}
