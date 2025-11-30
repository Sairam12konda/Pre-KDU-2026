filename = "sample.csv"

with open(filename, "r") as file:
    data = file.read()

movies = data.split(",")

movies = [m.strip() for m in movies]

movie_count = {}

for m in movies:
    if m in movie_count:
        movie_count[m] += 1
    else:
        movie_count[m] = 1

top_3 = sorted(movie_count.items(), key=lambda x: x[1], reverse=True)[:3]

print("Top 3 Watched Movies:")
for movie, count in top_3:
    print(movie, ":", count)
