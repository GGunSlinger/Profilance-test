const styles = (theme) => ({
    container: {
      boxShadow: ' 0px 4px 30px rgba(0, 0, 0, 0.1)',
      borderRadius: '15px',
      backgroundColor: '#fff',
      padding: '40px 40px',
      display: 'flex',
      width: '600px',
      margin: '40px auto',
      cursor: 'pointer',
      [theme.breakpoints.down(860)]: {
        flexDirection: "column",
        alignItems: "center",
        width: '70vw',
      },
    },
    img: {
      width: '150px',
      height: '150px',
      [theme.breakpoints.down(660)]: {
        width: '150px',
        height: '150px',
      },
    },
    item_img: {
      width: '150px',
      paddingRight: "30px",
      [theme.breakpoints.down(660)]: {
        width: '150px',
        paddingRight: '0',
      },
    },
    header_text: {
      fontSize: 18,
      color: '#246497',
      textAlign: 'center',
    },
    item_text: {
      textAlign: 'justify',
      [theme.breakpoints.down(500)]: {
        textAlign: 'left',
      },
    },
    loader: {
      display: "flex",
      position: "absolute",
      justifyContent: "center",
      width: "100%",
      top: "50%",
    }
  })

  export default styles