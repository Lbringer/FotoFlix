import React from "react";

//Image , Name of the photographer , share , download , number of likes , profile button and liked button

import "./Card.css";

const Card = ({
  photo,
  isFav,
  handleFav,
  handleShare,
  handleDownload,
  openLightBox,
}) => {
  return (
    <div className="cardCon">
      <img
        src={photo.urls.regular}
        alt={photo.alt_description}
        className="disImg"
        onClick={() => openLightBox(photo.urls.full)}
      />
      <div className="cover">
        <div className="row">
          <span className="name">{photo.user.name}</span>
          <span className="icon_pack">
            <img
              src="./icons/share-fill.svg"
              alt="share"
              className="icon"
              onClick={() => handleShare(photo.urls.regular)}
            />
            <img
              src="./icons/box-arrow-down.svg"
              alt="download"
              className="icon"
              onClick={() => handleDownload(photo.urls.full, photo.id)}
            />
          </span>
        </div>
        <div className="row">
          <span>
            <img src="./icons/hand-thumbs-up-fill.svg" alt="likes" />
            <span className="likes">{photo.likes}</span>
          </span>
        </div>
        <div className="row last">
          <a
            href={
              photo.user.portfolio_url != null
                ? `${photo.user.portfolio_url}`
                : "#"
            }
            className="profile-a"
          >
            <img
              src={photo.user.profile_image.medium}
              alt="user-im"
              className="profile-img"
            />
          </a>
          <img
            src={!isFav ? "./icons/star.svg" : "./icons/star-fill.svg"}
            alt="star"
            className="icon"
            onClick={() => handleFav(photo)}
          />
        </div>
      </div>
    </div>
  );
};

export default Card;
