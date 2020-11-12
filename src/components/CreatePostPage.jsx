import React, { useState } from 'react';
import style from './css/modal.module.css'
import { Box, Button, TextField } from '@material-ui/core';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import {
    selectPostModal,
    createPostModal,
} from '../Reducers/loginReducer';
import { useDispatch, useSelector } from 'react-redux';


const CreatePost = () => {
    const open = useSelector(selectPostModal)
    const dispatch = useDispatch()
    const [postName, setPostName] = useState('');
    const [postText, setPostText] = useState('');
    const [error, setError] = useState(false);

    const handleClose = () => {
        dispatch(createPostModal())
    };
    
    const submitPost = event => {
        event.preventDefault();
        if (postName.length > 5 && postText.length > 5 && postName.length < 15 && postText.length < 200) {
            let data = {
                name: postName,
                approved: false,
                img: "https://255320.selcdn.ru/main/12345678910.jpg",
                post_text: postText,
                date: new Date().toLocaleDateString()
            }
            fetch('http://localhost:8080/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(data)
            })
                .then(() => handleClose())
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
                    <form onSubmit={submitPost}>
                        <div className={style.loginWrapper}>
                            <div className={style.post}>
                                <div className={style.loginInner}>

                                    <Box display="flex" justifyContent="center" mb="20px">
                                        Создать пост
                                    </Box>
                                    <div>
                                        <TextField
                                            required
                                            id="outlined-required"
                                            label="Название поста"
                                            autoFocus
                                            fullWidth
                                            onInput={e => setPostName(e.target.value)}
                                            variant="outlined"
                                        />
                                    </div>
                                    <Box mt="15px">
                                        <TextField
                                            id="outlined-multiline-static"
                                            label="Текст поста"
                                            multiline
                                            fullWidth
                                            onInput={e => setPostText(e.target.value)}
                                            rows={4}
                                            variant="outlined"
                                        />
                                    </Box>
                                    <Box display="flex" justifyContent="center" mt="15px">
                                        <Button variant="contained" color="primary" type="submit">Создать</Button>
                                    </Box>
                                    <Box display="flex" justifyContent="center">
                                        {error && <p style={{ color: "red", textAlign: 'center' }}>
                                            Длинна поста от 5 до 15 букв<br />
                                            Длинна текста от 5 до 200 букв
                                        </p>}
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

export default CreatePost