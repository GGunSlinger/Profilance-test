import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import MainPage from './components/MainPage';
import NewsPage from './components/NewsPage';
import Header from './components/Header';
import LoginPage from './components/LoginPage';
import CreatePost from './components/CreatePostPage';

function App() {
  return (
    <>
      <Route path="/" render={() => <Header />} />
      <Switch>
        <Route exact path="/" render={() => <MainPage />} />
        <Route path="/news" render={() => <NewsPage />} />
      </Switch>
      <LoginPage />
      <CreatePost />
    </>
  );
}

export default App;
