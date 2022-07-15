import React from "react";
import Masonry from "react-masonry-css";
import "../styles/ImageList.scss";
import InfiniteScroll from "react-infinite-scroll-component";

function ImageList({ images, fetchImages }) {
  const breakpoints = {
    default: 3,
    1100: 2,
    750: 1,
  };
  return (
    <div className="result">
      <InfiniteScroll
        dataLength={images.length}
        next={fetchImages}
        hasMore={true}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>No more images</b>
          </p>
        }
      >
        <Masonry
          breakpointCols={breakpoints}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {images.map((image, index) => (
            <div key={index}>
              <a
                href={image.urls.full}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={image.urls.small} alt={image.alt_description} />
              </a>
            </div>
          ))}
        </Masonry>
      </InfiniteScroll>
    </div>
  );
}

export default ImageList;
