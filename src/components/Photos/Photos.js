import React, { useEffect, useState } from "react";

import "./Photos.css";
import Loader from "../Loader/Loader";
import axios from "axios";
import Card from "../Card/Card";
import Lightbox from "yet-another-react-lightbox";
import { useLocation } from "react-router-dom";

const Photos = ({ searchQuery }) => {
  const [loading, setLoading] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [favPhotos, setFavPhotos] = useState([]);
  const location = useLocation();
  const [page, setPage] = useState(1);
  const [lightbox, setLightBox] = useState({
    isOpen: false,
    URL: "",
  });
  const openLightBox = (photoURL) => {
    setLightBox({ URL: photoURL, isOpen: true });
  };
  const closeLightBox = () => {
    setLightBox({ URL: "", isOpen: false });
  };
  //To like the photo
  const handleFav = (photo) => {
    const tempPhotos = [...photos];
    const tempFav = [...favPhotos];

    const indexInFav = tempFav.findIndex(
      (favPhoto) => favPhoto.id === photo.id
    );

    if (indexInFav !== -1) {
      tempFav.splice(indexInFav, 1);
    } else {
      tempFav.push(photo);
    }
    setFavPhotos(tempFav);
    setPhotos(tempPhotos);
  };

  //To share the photo
  const handleShare = (photoURL) => {
    const shareURL = `https://api.whatsapp.com/send?text=${encodeURIComponent(
      `Awesome photo - ${photoURL}`
    )}`;

    window.open(shareURL, "_blank");
  };

  //To download the photo
  const handleDownload = (photoURL, photoId) => {
    const link = document.createElement("a");
    link.href = photoURL;
    link.download = `photo_${photoId}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  //To fetch the photo
  useEffect(() => {
    const fetchPhotos = async () => {
      setLoading(true);
      let url =
        "https://api.unsplash.com/photos/?client_id=wCQ2NvxfS1yTw0Z0bYnqfSRLWUtNTgdEK0GI0yi2aPU";

      if (searchQuery) {
        console.log(searchQuery);
        url = `https://api.unsplash.com/search/photos/?client_id=wCQ2NvxfS1yTw0Z0bYnqfSRLWUtNTgdEK0GI0yi2aPU&query=${searchQuery}`;
      }

      url += `&page=${page}`;

      try {
        const res = await axios.get(`${url}`);
        setPhotos(res.data.results || res.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };
    fetchPhotos();
  }, [searchQuery, page]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        !loading &&
        window.innerHeight + window.scrollY >= document.body.scrollHeight - 100
      ) {
        setPage((prev) => prev + 1);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading]);

  const renderPhotos = location.pathname === "/fav" ? favPhotos : photos;
  return (
    <>
      <div className="photoBody">
        {loading ? (
          <Loader />
        ) : (
          <>
            {renderPhotos.map((photo) => {
              const isFav = favPhotos.some(
                (favPhoto) => favPhoto.id === photo.id
              );
              return (
                <Card
                  key={photo.id}
                  photo={photo}
                  isFav={isFav}
                  handleFav={handleFav}
                  handleShare={handleShare}
                  handleDownload={handleDownload}
                  openLightBox={openLightBox}
                />
              );
            })}
          </>
        )}
      </div>
      <Lightbox
        open={lightbox.isOpen}
        close={closeLightBox}
        slides={[{ src: lightbox.URL }]}
      />
    </>
  );
};

export default Photos;
