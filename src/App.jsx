import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios'
import { Container, Pagination, TextField, Stack, Link, Typography, Box } from "@mui/material"

import logo from "./img/logo.svg"

const BASE_URL = "http://hn.algolia.com/api/v1/search?"


function App() {

  const [posts, setPosts] = useState([])
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)
  const [pageQty, setPageQty] = useState(0)

  useEffect(() => {
    axios.get(BASE_URL + `query=${query}&page=${page - 1}`).then(
      ({data}) => {
        console.log(data)
        setPosts(data.hits)
        setPageQty(data.nbPages)

        if(data.nbPages < page) {
          setPage(1)
        }
      }
    )
  }, [query, page])

  return (
    <Container sx={{marginTop: 1, color: "#fff"}} maxWidth="md">
      <Container variant="h5" color="#00ff00" sx={{marginBottom: 4}}>
        <Box
          component="img"
          sx={{
            height: 50,
            width: 200,
            maxHeight: { xs: 233, md: 167 },
            maxWidth: { xs: 350, md: 250 },
            margin: 0,
          }}
          alt="logo"
          src={logo}
        />
      </Container>
      <TextField
        fullWidth
        label="Search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      /> 
      <Stack spacing={2}>
        {!!pageQty && (
          <Pagination 
            count={pageQty}
            page={page}
            onChange={(_, num) => setPage(num)}
            sx={{marginY: 3, marginX: 'auto'}}
          />
        )}
        {
          posts.map(post => (
            <Link
              key={post.objectID}
              href={post.url}
              color="#000"
            >
              {post.title || post.story_title}
            </Link>
          ))
        }
      </Stack>
    </Container>
  )
}

export default App
