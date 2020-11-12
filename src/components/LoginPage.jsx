import React, { useState } from 'react';
import style from './css/login.module.css'
import { Box, Button, TextField } from '@material-ui/core';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import {
  selectLoginModal,
  loginModalChange,
  userAuthStatus,
  setUserLogin,
  setUserRole
} from '../Reducers/loginReducer';
import { useDispatch, useSelector } from 'react-redux';
import { users } from '../data/users'


const LoginPage = () => {
  const open = useSelector(selectLoginModal)
  const dispatch = useDispatch()
  const [accountName, setAccountName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleClose = () => {
    dispatch(loginModalChange())
  };

  const auth = event => {
    event.preventDefault();
    let result = users.find(e =>
      e.password.toLowerCase() === password.trim().toLowerCase() && e.login.toLowerCase() === accountName.trim().toLowerCase()
    )
    if (result) {
      setError(false)
      localStorage.setItem('userIsAuthID', result.id)
      dispatch(userAuthStatus(true))
      dispatch(setUserLogin(accountName))
      dispatch(setUserRole(result.role))
      dispatch(loginModalChange(!open))
    } else setError(true)
  }

  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={style.modal}
        open={open}
        disableAutoFocus={true}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <form onSubmit={auth}>
            <div className={style.loginWrapper}>
              <div className={style.login}>
                <div className={style.loginInner}>
                  <Box display="flex" justifyContent="center" mb="20px">
                    Login Form
                  </Box>
                  <div>
                    <TextField
                      required
                      id="outlined-required"
                      label="Required"
                      autoFocus={true}
                      value={accountName}
                      onInput={e => setAccountName(e.target.value)}
                      variant="outlined"
                    />
                  </div>
                  <Box mt="15px">
                    <TextField
                      required
                      id="outlined-password-input"
                      label="Password"
                      type="password"
                      onInput={e => setPassword(e.target.value)}
                      autoComplete="current-password"
                      variant="outlined"
                    />
                  </Box>
                  <Box display="flex" justifyContent="center" mt="15px">
                    <Button variant="contained" color="primary" type="submit">Войти</Button>
                  </Box>
                  <Box display="flex" justifyContent="center">
                    {error && <p style={{ color: "red" }}>Введен неверный <br /> логин или пароль</p>}
                  </Box>
                </div>
              </div>
            </div>
          </form>
        </Fade>
      </Modal>
    </>
  );
};

export default LoginPage