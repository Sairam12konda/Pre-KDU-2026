CREATE DATABASE streamflix;

use streamflix;
-- Categories table (Movies, Series, Documentaries, etc.)
CREATE TABLE category (
    category_id INTEGER PRIMARY KEY auto_increment,
    category_name VARCHAR(100) NOT NULL,
    description TEXT
);
drop table content;
-- Content table (individual shows/movies)
CREATE TABLE content (
    content_id integer auto_increment PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    rating DECIMAL(3,1) CHECK (rating >= 0 AND rating <= 10),
    views_in_millions DECIMAL(10,2),
    release_year INTEGER,
    category_id INTEGER,
    FOREIGN KEY (category_id) REFERENCES category(category_id)
);


create TABLE user_watchlist(
	user_id int PRIMARY KEY auto_increment,
    content_id INTEGER,
    added_date date,
    FOREIGN KEY(content_id) REFERENCES content(content_id)
);


-- Insert categories
INSERT INTO category (category_name, description) VALUES
('Movies', 'Feature-length films'),
('Series', 'Multi-episode TV shows'),
('Documentaries', 'Non-fiction educational content'),
('Anime', 'Japanese animated content');

-- Insert content
INSERT INTO content (title, rating, views_in_millions, release_year, category_id) VALUES
('Stranger Adventures', 8.7, 142.50, 2023, 2),
('The Cosmic Heist', 7.9, 89.30, 2024, 1),
('Planet Earth: Oceans', 9.2, 201.75, 2023, 3),
('Code Warriors', 8.1, 67.20, 2024, 2),
('Attack on Mars', 9.0, 156.80, 2023, 4),
('The Algorithm', 7.5, 45.60, 2024, 1),
('Wildlife Mysteries', 8.8, 178.90, 2024, 3),
('Cyberpunk Chronicles', 8.4, 123.45, 2023, 4);

INSERT INTO user_watchlist(content_id,added_date) VALUES
(1,'2025-12-10'),
(5,'2025-01-01'),
(3,'2025-02-01');
-- 1) Basic JOIN - Show All Content with Categories
SELECT c.content_id, c.title, cat.category_name
FROM content c
JOIN category cat
    ON c.category_id = cat.category_id;

-- 2) Top Performers — Sorted by Popularity
SELECT title, rating, views_in_millions
FROM content
ORDER BY views_in_millions DESC;

-- 3)  Category Analytics - Average Rating per Category	
SELECT cat.category_name,
       ROUND(AVG(c.rating), 2) AS average_rating
FROM category cat
LEFT JOIN content c
       ON cat.category_id = c.category_id
GROUP BY cat.category_name
ORDER BY average_rating DESC;


-- 4) High-Rated Content with Filters
SELECT c.title, c.rating, c.views_in_millions, cat.category_name
FROM content c
JOIN category cat
    ON c.category_id = cat.category_id
WHERE c.rating > 8.5
  AND c.views_in_millions > 100;

-- 5) Index Demonstration
EXPLAIN ANALYZE
SELECT c.content_id, c.title, cat.category_name
FROM content c
JOIN category cat
    ON c.category_id = cat.category_id;

CREATE INDEX idx_category_id ON content(category_id);

EXPLAIN ANALYZE
SELECT c.content_id, c.title, cat.category_name
FROM content c
JOIN category cat
    ON c.category_id = cat.category_id;

select user_id,title,category_name from
user_watchlist as u JOIN content as c ON u.content_id = c.content_id
JOIN category as cat ON c.category_id = cat.category_id; 

CREATE INDEX idx_release_year ON content(release_year);

EXPLAIN ANALYZE
SELECT 
    c.content_id,
    c.title,
    c.release_year
FROM content AS c
WHERE c.release_year = 2025;


-- The index improved performance because MySQL no longer had to scan the entire content table for each category during the 
-- JOIN. Instead, it used the index to quickly locate matching rows, reducing lookup time significantly. As a result, 
-- the overall query execution became faster, especially noticeable as the dataset grows. 

-- #1) Foreign keys ensure tables are properly linked and keep relationships consistent. 
-- They also protect the database from invalid entries by requiring every category_id in the content 
-- table to match an existing category.

-- #2) ACID is important because it ensures that multiple users updating the view count at the same time do not 
-- corrupt or lose data. Without ACID, simultaneous updates could overwrite each other, 
-- leading to inaccurate or inconsistent view counts in the database.

#3) Creating an index on category_id speeds up searches by letting MySQL jump directly to matching rows. 
-- This greatly improves homepage performance, since it relies on many queries that filter content by category.


-- Examination
-- New Queries

-- Request A (Category Audit): "Get a list of all content titles that belong to the 'Documentaries' 
-- category, was released in 2024 and has a rating higher than 8.0. We need the Title and the 
-- Category Name in the final report." 

select c.title as title, cat.category_name as category_name
FROM content c JOIN category cat
WHERE  cat.category_name = 'Documentaries' AND c.release_year = 2024 AND c.rating > 8.0;

SELECT title, (rating + views_in_millions) AS success_score
FROM content
WHERE (rating + views_in_millions) > 100;
