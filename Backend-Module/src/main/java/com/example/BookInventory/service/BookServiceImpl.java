package com.example.BookInventory.service;

import java.util.List;
import com.example.BookInventory.model.Book;
import com.example.BookInventory.repository.BookRepository;
import org.springframework.stereotype.Service;

@Service
public class BookServiceImpl implements BookService {

    private final BookRepository repository;

    public BookServiceImpl(BookRepository repository) {
        this.repository = repository;
    }

    @Override
    public Book addBook(Book book) {
        if (book.getTitle() == null || book.getTitle().trim().isEmpty()) {
            throw new IllegalArgumentException("Book title is required");
        }
        if (book.getPrice() != null && book.getPrice().doubleValue() < 0) {
            throw new IllegalArgumentException("Price cannot be negative");
        }
        return repository.save(book);
    }

    @Override
    public Book getBookById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Book not found"));
    }

    @Override
    public List<Book> getBookByAuthor(String author) {
        return repository.findByAuthor(author)
                .orElseThrow(() -> new RuntimeException("Book not found"));
    }
}
