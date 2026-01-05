package com.example.BookInventory.repository;

import com.example.BookInventory.model.Book;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Repository
public class BookRepository {
// uuid 
    private final Map<Long, Book> store = new HashMap<>();
    private Long idCounter = 1L;

    public Book save(Book book) {
        book.setId(idCounter++);
        store.put(book.getId(), book);
        return book;
    }

    public Optional<Book> findById(Long id) {
        return Optional.ofNullable(store.get(id));
    }

    public Optional<List<Book>> findByAuthor(String author) {
        return Optional.ofNullable(store.values().stream()
                .filter(book -> book.getAuthor().equalsIgnoreCase(author))
                .toList());
    }
}
