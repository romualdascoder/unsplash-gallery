import React, { useState, useEffect } from "react";
import axios from "axios";
import ImageList from "../components/ImageList";
import SearchBar from "../components/SearchBar";
import Loader from "../helpers/Loader";

function Home() {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("landscape");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const clientId = process.env.REACT_APP_UNSPLASH_KEY;
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${query}&client_id=${clientId}&per_page=30`;

  const fetchImages = () => {
    setLoading(true);
    axios
      .get(url)
      .then((response) => {
        setImages([...images, ...response.data.results]);
      })
      .catch((error) => console.log(error))
      .finally(() => {
        setLoading(false);
      });
    setPage(page + 1);
  };

  useEffect(() => {
    fetchImages();
    setQuery("");
  }, []);

  return (
    <div>
      <SearchBar
        fetchImages={fetchImages}
        query={query}
        setQuery={setQuery}
        setImages={setImages}
        setPage={setPage}
      />
      {loading && <Loader />}
      <ImageList images={images} fetchImages={fetchImages} />
    </div>
  );
}

export default Home;
