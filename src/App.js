import { useEffect, useState } from "react";
import StarRating from "./StarRating";

// const tempMovieData = [
//   {
//     imdbID: "tt15398776",
//     Title: "Oppenheimer",
//     Year: "2013",
//     Poster: "https://m.media-amazon.com/images/M/MV5BMDBmYTZjNjUtN2M1MS00MTQ2LTk2ODgtNzc2M2QyZGE5NTVjXkEyXkFqcGdeQXVyNzAwMjU2MTY@._V1_SX300.jpg",
//   },
//   {
//     imdbID: "tt1517268",
//     Title: "Barbie",
//     Year: "2023",
//     Poster: "https://m.media-amazon.com/images/M/MV5BNjU3N2QxNzYtMjk1NC00MTc4LTk1NTQtMmUxNTljM2I0NDA5XkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_SX300.jpg",
//   },
//   {
//     imdbID: "tt8589698",
//     Title: "Teenage Mutant Ninja Turtles: Mutant Mayhem",
//     Year: "2023",
//     Poster: "https://m.media-amazon.com/images/M/MV5BYzE4MTllZTktMTIyZS00Yzg1LTg1YzAtMWQwZTZkNjNkODNjXkEyXkFqcGdeQXVyMTUzMTg2ODkz._V1_SX300.jpg",
//   },
// ];

const tempWatchedData = [
  {
    imdbID: "tt15398776",
    Title: "Oppenheimer",
    Year: "2013",
    Poster: "https://m.media-amazon.com/images/M/MV5BMDBmYTZjNjUtN2M1MS00MTQ2LTk2ODgtNzc2M2QyZGE5NTVjXkEyXkFqcGdeQXVyNzAwMjU2MTY@._V1_SX300.jpg",
    runtime: 180,
    imdbRating: 8.6,
    userRating: 10,
  },
  {
    imdbID: "tt1517268",
    Title: "Barbie",
    Year: "2023",
    Poster: "https://m.media-amazon.com/images/M/MV5BNjU3N2QxNzYtMjk1NC00MTc4LTk1NTQtMmUxNTljM2I0NDA5XkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_SX300.jpg",
    runtime: 114,
    imdbRating: 7.2,
    userRating: 8,
  },
];

const average = (arr) => arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

function Logo() {
  return (
    <div className="logo">
      <span role="img">🎫</span>
      <h1>Movie</h1>
    </div>
  );
}

function Search({ query, setQuery }) {
  // const [query, setQuery] = useState("");
  return <input className="search" type="text" placeholder="Search movies..." value={query} onChange={(e) => setQuery(e.target.value)} />;
}

function NumResult({ movies }) {
  return (
    <p className="num-results">
      Found <strong>{movies.length}</strong> results
    </p>
  );
}

function NavBar({ children }) {
  return <nav className="nav-bar">{children}</nav>;
}

function MovieItem({ movie, onSelectedMovieId, selectedMovieId }) {
  return (
    <li key={movie.imdbID} onClick={() => onSelectedMovieId(movie.imdbID)} className={selectedMovieId === movie.imdbID ? "select-movie" : ""}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>📅</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}

function MovieList({ movies, onSelectedMovieId, selectedMovieId }) {
  return (
    <ul className="list list-movies">
      {movies?.map((movie, index) => (
        <MovieItem movie={movie} key={index} onSelectedMovieId={onSelectedMovieId} selectedMovieId={selectedMovieId} />
      ))}
    </ul>
  );
}

function WatchedItem({ movie, onDeleteWatchedMovie }) {
  return (
    <li key={movie.imdbID}>
      <img src={movie.poster} alt={`${movie.title} poster`} />
      <h3>{movie.title}</h3>
      <div>
        <p>
          <span>🎬</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>
        <p>
          <button className="btn-delete" onClick={() => onDeleteWatchedMovie(movie.imdbID)}>
            &times;
          </button>
        </p>
      </div>
    </li>
  );
}

function WatchedList({ watched, onDeleteWatchedMovie }) {
  return (
    <ul className="list">
      {watched.map((movie, index) => (
        <WatchedItem movie={movie} key={index} onDeleteWatchedMovie={onDeleteWatchedMovie} />
      ))}
    </ul>
  );
}

function WatchedSummary({ watched }) {
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));

  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>🎬</span>
          <span>{avgImdbRating.toFixed(1)}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating.toFixed(1)}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{Math.trunc(avgRuntime)} min</span>
        </p>
      </div>
    </div>
  );
}

function Main({ children }) {
  return <main className="main">{children}</main>;
}

function BoxMovies({ children }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="box">
      <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? "–" : "+"}
      </button>
      {isOpen && children}
    </div>
  );
}

function Loader() {
  return (
    <div className="loader">
      <div className="loading-bar">
        <div className="bar"></div>
      </div>
    </div>
  );
}

function ErrorMessage({ message }) {
  return <div className="error">{message}</div>;
}

function MovieDetail({ selectedMovieId, onAddWatched, onCloseSelectMovieId, watched }) {
  const [movie, setMovie] = useState({});
  const [userRating, setUserRating] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // distruct ini untuk mengubah props yg uppercase menjadi lowercase
  const { Title: title, Released: released, Year: year, Poster: poster, imdbID: id, imdbRating: rating, Runtime: runtime, Plot: plot, Genre: genre, Actors: actors, Director: director } = movie;

  // melakukan pengecekan apakah watched.id sama dengan id movie yg diklik
  const isWatched = watched.some((watched) => watched.imdbID === selectedMovieId);
  const isUserRating = watched.find((watched) => watched.imdbID === selectedMovieId)?.userRating;

  function HandleAddWatch() {
    const addNewWatched = {
      imdbID: id,
      title,
      year,
      poster,
      imdbRating: Number(rating),
      runtime: Number(runtime.split(" ").at(0)),
      userRating: Number(userRating),
    };
    onAddWatched(addNewWatched);
    onCloseSelectMovieId();
  }

  useEffect(() => {
    // asyncronus
    async function getMovieDetails() {
      try {
        // loading
        setIsLoading(true);

        const res = await fetch(`http://www.omdbapi.com/?i=${selectedMovieId}&apikey=${apikey}`);
        if (!res.ok) throw new Error("Something Went Wrong!"); // error jika tidak ada koneksi atau yg lainnya

        const data = await res.json();

        setMovie(data);
      } catch (err) {
        setError(err.message);

        // finally ini untuk aksi terakhir jika logikanya mau itu success atau error maka setIsLoadingnya menjadi false
      } finally {
        setIsLoading(false);
      }
    }

    getMovieDetails();
  }, [selectedMovieId, title]);

  useEffect(() => {
    if (!title) return;
    document.title = `PopMovie | ${title}`;

    // mengembalikan title ke defaultnya
    return () => {
      document.title = "PopMovie";
      console.log(`clear movie ${title}`);
    };
  }, [title]);

  return (
    <div className="details">
      {isLoading && <Loader />}
      {!isLoading && error && <ErrorMessage message={error} />}
      {!isLoading && !error && (
        <>
          <header>
            <img src={poster} alt={title} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                <span>Released :</span>
                <span>{released}</span>
              </p>
              <p>
                <span>Time :</span>
                <span>{runtime}</span>
              </p>
              <p>
                <span>Rating :</span>
                <span>{rating}</span>
              </p>
            </div>
          </header>
          <section>
            <p>
              <em>{plot}</em>
            </p>
            <p>
              <b>Genre :</b> {genre}
            </p>
            <p>
              <b>Starring :</b> {actors}
            </p>
            <p>
              <b>Directed by :</b> {director}
            </p>
            <div className="rating">
              {!isWatched ? (
                <>
                  <StarRating max={10} size={24} color="yellow" onSetUserRating={setUserRating} />
                  {userRating > 0 && (
                    <button className="btn-add" onClick={HandleAddWatch}>
                      + Add To Watched
                    </button>
                  )}
                </>
              ) : (
                <p>You have watched this movie with a rating of {isUserRating} / 10</p>
              )}
            </div>
          </section>
        </>
      )}
    </div>
  );
}

const apikey = "6671dc14";

export default function App() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("naruto");
  const [selectedMovieId, setSelectedMovieId] = useState(null);

  const tempQuery = "naruto";

  // useEffect(() => {
  //   console.log(1);
  // }, []);

  // useEffect tanpa depedency array [] maka akan memiliki sinkronisasi ke semua event termasuk state update dan render juga
  // useEffect(() => {
  //   console.log(2);
  // });

  // console.log(3);

  // untuk mendapatkan id movie
  function HandleSelectedMovieid(id) {
    setSelectedMovieId((selectedMovieId) => (selectedMovieId === id ? null : id));
  }

  // untuk menutup/close movie dengan mengembalikan nilainya menjadi null
  function HandleCloseSelectedMovieid() {
    setSelectedMovieId(null);
  }

  // untuk menambahkan/add data movie
  function HandleAddWatahedMovie(movie) {
    setWatched((watched) => [...watched, movie]);
  }

  // untuk delete data watched movie
  function HandleDeleteWatchedMOvie(id) {
    if (window.confirm("Apakah kamu yakin ingin menghapus movie ini dari daftar?")) {
      setWatched((watched) => watched.filter((watched) => watched.imdbID !== id));
    }
  }

  // useEffect untuk mencegah infinite loop
  useEffect(() => {
    const controller = new AbortController();

    // asyncronus
    async function fetchMovie() {
      try {
        // loading
        setIsLoading(true);
        setError("");

        const res = await fetch(`http://www.omdbapi.com/?s=${query}&apikey=${apikey}`, { signal: controller.signal });
        if (!res.ok) throw new Error("Something Went Wrong!"); // error jika tidak ada koneksi atau yg lainnya

        const data = await res.json();
        if (data.Response === "False") throw new Error(data.Error); // erro jika yg disearch tidak ditemukan

        setMovies(data.Search);
        setError("");
      } catch (err) {
        // if (err.name === "AbortError") return;
        setError(err.message);

        // finally ini untuk aksi terakhir jika logikanya mau itu success atau error maka setIsLoadingnya menjadi false
      } finally {
        setIsLoading(false);
      }
    }

    if (query.length < 3) {
      setMovies([]);
      setError("");
      return;
    }

    fetchMovie();
    return function () {
      controller.abort();
    };
  }, [query]);

  return (
    <>
      <NavBar>
        <Logo />
        <Search query={query} setQuery={setQuery} />
        <NumResult movies={movies} />
      </NavBar>
      <Main>
        <BoxMovies>
          {isLoading && <Loader />}
          {!isLoading && error && <ErrorMessage message={error} />}
          {!isLoading && !error && <MovieList movies={movies} onSelectedMovieId={HandleSelectedMovieid} selectedMovieId={selectedMovieId} />}
        </BoxMovies>
        <BoxMovies>
          {selectedMovieId ? (
            <MovieDetail key={selectedMovieId} watched={watched} selectedMovieId={selectedMovieId} onAddWatched={HandleAddWatahedMovie} onCloseSelectMovieId={HandleCloseSelectedMovieid} />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedList watched={watched} onDeleteWatchedMovie={HandleDeleteWatchedMOvie} />
            </>
          )}
        </BoxMovies>
      </Main>
    </>
  );
}
