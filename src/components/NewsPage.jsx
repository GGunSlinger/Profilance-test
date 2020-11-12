import React, { useEffect, useState } from 'react';
import { Box, TextField } from '@material-ui/core';
import ListItem from './ListItem'
import {
  selectUserRole,
  selectPostModal,
  selectRefreshedPost
} from '../Reducers/loginReducer';
import { useSelector } from 'react-redux';
import debounce from './utils/debounce'


function NewsPage() {

  const userRole = useSelector(selectUserRole)
  const postModal = useSelector(selectPostModal)
  const refreshPost = useSelector(selectRefreshedPost)
  const [posts, setPosts] = useState([])
  const [search, setSearch] = useState('')
  const [searchPosts, setSearchPosts] = useState([])


  // Задержка запросов для поиска
  const callApi = value => setSearch(value)
  const [debouncedCallApi] = useState(() => debounce(value => callApi(value), 500))
  const searchDelay = event => {
    debouncedCallApi(event.target.value)
  }

  useEffect(() => {
    fetch('http://localhost:8080/posts', { method: 'GET' })
      .then(response => response.json())
      .then(data => {
        if (userRole === 'guest') {
          let guestData = data.filter(e => e.approved === true)
          setPosts(guestData)
        }
        if (userRole === 'user' || userRole === 'admin') setPosts(data)
      })
      userRole === 'guest' && setSearch('')
  }, [userRole, postModal, refreshPost])

  useEffect(() => {
    const result = posts.filter(element => 
      element.post_text.toLowerCase().indexOf(search.trim().toLowerCase()) > -1
      || element.name.toLowerCase().indexOf(search.trim().toLowerCase()) > -1
    )
    setSearchPosts(result)  
  }, [search]) // eslint-disable-line

  const combinedPost = search.length > 1 ? searchPosts : posts

  return (
    <Box display='flex' justifyContent='center' flexDirection='column' alignItems='center'>
      <Box width="35vw" mt="10px">
        <TextField id="standard-search" label="Поиск" type="search" fullWidth={true} onChange={searchDelay} />
      </Box>
      {combinedPost.map(e => (
        <ListItem
          key={e.id}
          img={e.img}
          name={e.name}
          post_text={e.post_text}
          id={e.id}
          date={e.date}
          approved={e.approved}
          userRole={userRole} />
      ))}
    </Box>
  );
}

export default NewsPage;