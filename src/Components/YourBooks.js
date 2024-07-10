import React, {  useState } from "react";
import { Link } from "react-router-dom";

const YourBooks = ({ ids, handleDelete, books, detailsRef }) => {
  let [detail, setDetail] = useState({});

  function handleDetail(id) {
    let obj = {};
    ids.map((val) => {
      if (val.id === id) {
        console.log("real", val);
        obj.author = val.author;
        obj.DOB = val.DOB;
        obj.bio = val.bio;
      }
    });
    console.log("reel", obj);
    setDetail(obj);
    detailsRef.current.style.display = "block";
    detailsRef.current.style.display = "sticky";
  }

  return (
    <div className="shelf">
      <div className="heading">
        <Link to="/books">
          <h1>&larr; Back to library</h1>
        </Link>
      </div>
      <div className="aside">
        <div className="library">
          {ids.map((val, index) => {
            return (
              <div key={index} className="books">
                <img src={val.img} alt="pic" width={200} height={300} />
                <div onClick={() => handleDetail(val.id)}>
                  <p className="title">
                    Title: <span>{val.title}</span>
                  </p>
                  <p>
                    Author: <span>{val.author}</span>
                  </p>
                  <p>
                    ISBN no.: <span>{val.ISBN}</span>
                  </p>
                  <p>
                    Publish Date: <span>{val.PublishDate}</span>
                  </p>
                </div>
                <button onClick={() => handleDelete(val.id)}>Delete</button>
              </div>
            );
          })}
        </div>

        <div id="details" ref={detailsRef} style={{ display: "none" }}>
          <div>
            <p>{detail.author}</p>
            <p>{detail.DOB}</p>
            <p>{detail.bio}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YourBooks;
