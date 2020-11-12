import React from 'react';
import { useSelector } from 'react-redux';
import { selectUserLogin } from '../Reducers/loginReducer';

function MainPage() {

  const user = useSelector(selectUserLogin)

  console.log(user)

  return (
    <div>
        <h1 style={{color: "#000", textAlign: 'center'}}>{user ? `Привет, ${user}` : 'Привет, Гость'}</h1>
    </div>
  );
}

export default MainPage;