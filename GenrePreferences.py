
genres = []

print("Enter 10 movie genres:")
for i in range(10):
    g = input(f"Genre {i+1}: ")
    genres.append(g)


unique_genres = set(genres)

genre_count = {}

for g in genres:
    if g in genre_count:
        genre_count[g] += 1
    else:
        genre_count[g] = 1

print("\nList:", genres)
print("Set:", unique_genres)
print("Dictionary:", genre_count)
