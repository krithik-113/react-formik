import React from 'react'

const Books = ({ books, handleYourBooks }) => {
  return (
    <div className="images">
      {books.map((val) => {
        return (
          <div key={val.id} className="content">
            <img src={val.img} alt="pic" width={200} height={300} />
            <p className="title">
              Title:{" "}
              {val.title.length <= 9
                ? val.title
                : val.title.slice(0, 22) + "..."}
            </p>
            <p>Author: {val.author}</p>
            <p>ISBN no.: {val.ISBN}</p>
            <p>Publish Date: {val.PublishDate}</p>
            <button onClick={()=>handleYourBooks(val.id)} className="add">
              Add to Your Books
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default Books