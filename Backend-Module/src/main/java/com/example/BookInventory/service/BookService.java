package com.example.BookInventory.service;

import java.util.List;

import com.example.BookInventory.model.Book;

public interface BookService {

    Book addBook(Book book);

    Book getBookById(Long id);

    List<Book> getBookByAuthor(String author);

}
