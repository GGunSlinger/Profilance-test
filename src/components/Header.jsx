import React, { useEffect} from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { Box } from '@material-ui/core';
import styles from './css/HeaderStyles'
import {
  selectLoginModal,
  selectUserIsAuth,
  selectUserRole,
  selectLoading,
  loginModalChange,
  userAuthStatus,
  setUserRole,
  setUserLogin,
  initialAuth,
  disableLoading,
  createPostModal
} from '../Reducers/loginReducer';
import { useSelector, useDispatch } from 'react-redux';

const Header = ({ classes }) => {
  const dispatch = useDispatch()
  const userIsAuth = useSelector(selectUserIsAuth)
  const LoginModal = useSelector(selectLoginModal)
  const loading = useSelector(selectLoading)
  const userRole = useSelector(selectUserRole)

  const loginHandler = () => {
    if (userIsAuth) {
      dispatch(userAuthStatus(false))
      dispatch(setUserLogin(null))
      dispatch(setUserRole('guest'))
      localStorage.removeItem('userIsAuthID')
    }
    // закрывает модальное окно с логином
    !userIsAuth && dispatch(loginModalChange(!LoginModal))
  }

  const postModalHandler = () => dispatch(createPostModal())

  useEffect(() => {
    if (localStorage.getItem('userIsAuthID') && userRole === 'guest') {
      let id = localStorage.getItem('userIsAuthID')
      id && dispatch(initialAuth(id))
    } else dispatch(disableLoading())
  }, [userIsAuth]) // eslint-disable-line

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Box className={classes.titleWrap}>
            <Typography variant="h6" className={classes.title}>
              <Link to="/">Главная</Link>
            </Typography>
            <Typography variant="h6" className={classes.title}>
              <Link to="/news">Новости</Link>
            </Typography>
          </Box>
          <Box>
            {userRole === 'user' && <Button onClick={postModalHandler} variant="contained">Создать пост</Button>}
            {!loading && <Button onClick={loginHandler} color="inherit">{userIsAuth ? 'выйти' : 'войти'}</Button>}
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default withStyles(styles)(Header)