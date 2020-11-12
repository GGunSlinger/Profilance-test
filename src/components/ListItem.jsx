import { Box, Button } from '@material-ui/core';
import React from 'react';
import styles from './css/ListItemStyles'
import { withStyles } from '@material-ui/core/styles';
import {
    deletePost,
    approvePost,
  } from '../Reducers/loginReducer';
import { useDispatch } from 'react-redux';

const ListItem = ({ img, name, post_text, date, classes, userRole, id, approved }) => {

    const dispatch = useDispatch()

    const approveCurrentPost = () => {
        dispatch(approvePost(name, img, post_text, date, id))
    }

    const deleteCurrentPost = () => {
        dispatch(deletePost(id))
    }

    return (
        <Box className={classes.container}>
            <Box className={classes.item_img}>
                <Box>
                    <img className={classes.img} src={img} alt='' />
                </Box>
                <p className={classes.header_text}>{name}</p>
                <p className={classes.header_text}>{date}</p>
            </Box>
            <Box mt="-5px" width="100%">
                <Box height="80%">
                    <p className={classes.item_text}>{post_text}</p>
                </Box>
                {userRole === 'admin' && <Box display='flex'>
                    {!approved &&<Box mr="50px">
                        <Button onClick={approveCurrentPost} variant="contained">
                            Одобрить
                        </Button>
                    </Box>}
                    <Box>
                        <Button onClick={deleteCurrentPost} variant="contained" color='primary'>
                            удалить
                        </Button>
                    </Box>
                </Box>}
            </Box>
        </Box>
    )
}

export default withStyles(styles)(ListItem)