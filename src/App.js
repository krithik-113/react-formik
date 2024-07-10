
import { Link, Route, Routes } from "react-router-dom";
import SignIn from "./Components/SignIn";
import Register from "./Components/Register";
import { useEffect, useRef, useState } from "react";
import Books from "./Components/Books";
import axios from "axios";
import YourBooks from "./Components/YourBooks";

function App() {
  const detailsRef = useRef();
  let data = localStorage.getItem("userID")
  data = JSON.parse(data)
  const [userID, setUserID] = useState(data || {})
  const [books, setBooks] = useState([])
  const API_URL = `${process.env.PUBLIC_URL}/db.json`
  useEffect(() => {
    axios.get(API_URL).then((response) => setBooks(response.data.books))
      .catch((err) => console.log(err))
  }, [])

  const [ids, setID] = useState([])
  
  function handleYourBooks(id) {
    let listItems = [...books];
    listItems = listItems.filter((val) => (val.id === id ? val : false))
    let lists = [...ids]
    listItems.map((val) => {
      lists.push({
        id: ids.length?ids[ids.length-1].id+1:1,
        img: val.img,
        title: val.title,
        author: val.author,
        ISBN: val.ISBN,
        PublishDate: val.PublishDate,
        DOB: val.DOB,
        bio:val.bio
      });
      setID(lists)
      console.log(ids);
    })
}
  function handleDelete(id) {
    let lists = [...ids]
    lists = lists.filter((val) => val.id != id)
    setID(lists)
    if (lists.length) {
      
    } else {
      detailsRef.current.style.display = "none";
    }
  }
  const headingRef = useRef()
  function SiginView() {
    headingRef.current.style.display = "block"
  }
  function ReturnToLogInPage() {
    headingRef.current.style.display = "none"
  }
  return (
    <div className="App">
      <header id="nav-header" ref={headingRef} style={{ display: "none" }}>
        <h2>Library Managment Sysytem</h2>
        <nav>
          <ul>
            <Link to="/yourbooks">
              <li>Your Books</li>
            </Link>
            <Link to="/">
              <li onClick={ReturnToLogInPage}>Log out</li>
            </Link>
          </ul>
        </nav>
      </header>

      <Routes>
        <Route
          path="/"
          element={<SignIn userID={userID} SiginView={SiginView} />}
        />
        <Route
          path="/register"
          element={<Register userID={userID} setUserID={setUserID} />}
        />
        <Route
          path="/books"
          element={<Books books={books} handleYourBooks={handleYourBooks} />}
        />
        <Route
          path="/yourbooks"
          element={
            <YourBooks
              ids={ids}
              handleDelete={handleDelete}
              books={books}
              detailsRef={detailsRef}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
