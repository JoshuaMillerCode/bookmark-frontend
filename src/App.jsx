import { useState, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [bookmarks, setBookmarks] = useState([])
  const [deleteToggle, setDeleteToggle] = useState(false)
  const nameRef = useRef(null)
  const desRef = useRef(null)
  const linkRef = useRef(null)

  useEffect(() => {

    const getBookmarks = async () => {
      try {
        const response = await fetch("http://localhost:8000/bookmarks")
        const data = await response.json()
        setBookmarks(data)
      } catch (err) {
        console.log(err)
      }
    }

    getBookmarks()

  }, [deleteToggle])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const body = {
        name: nameRef.current.value,
        description: desRef.current.value,
        link: linkRef.current.value
      }

      const response = await fetch("http://localhost:8000/bookmarks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
      })
      const data = await response.json()

      setBookmarks([...bookmarks, data])

    } catch (err) {
      console.log(err)
    }
  }


  return (
    <>
      <h1>Bookmarks</h1>
      <form style={{textAlign: "left"}} onSubmit={handleSubmit}>
        Name: <input type="text" ref={nameRef} />
        <br />
        Description: <input type="text" ref={desRef} />
        <br />
        Link: <input type="text" ref={linkRef} />
        <br />
        <input type="submit" value="Create Bookmark" />
      </form>

      <ul>
        {
          bookmarks.length ?
            bookmarks.map((b) => {
              return <div key={b._id}  style={{border: "2px solid white", margin: "5px", padding: "10px"}}>
                <a href={b.link}>{b.name} Link</a>
                <p>{b.description}</p>
                <button onClick={async () => {
                  try {
                    await fetch("http://localhost:8000/bookmarks/" + b._id, {
                      method: "DELETE",
                    })
                    setDeleteToggle(!deleteToggle)
                  } catch (err) {
                    console.log(err)
                  }
                }}>Delete</button>
              </div>
            })
          :
            <p>No bookmarks found :/</p>
        }
      </ul>
    </>
  )
}

export default App
