import { useState, useEffect, Fragment } from 'react';
import "./App.css";
import Papa from 'papaparse';
import artikel from './Artikel.csv';
import { PageButtons } from './components/Paginate/PagesHud';
import NewItem from './components/NewItem/NewItem';
import ItemsShow from './components/ItemsShow/ItemsShow';
import { useDispatch, useSelector } from 'react-redux';
import { action_Change_new, action_Set_headers, action_Set_items } from './Redux/actions';
import { DONE, ERROR } from './Redux/consts';
import Header from './components/Header/Header';
import { DetailedCard } from './components/CardItem/Card';

const App = () => {

  //REDUX
  const dispatch = useDispatch();
  
  //UPDATE
  useEffect (() => {
    Papa.parse(artikel, 
    {
      dynamicTyping: false,
      download: true,
      header: true,
      complete: function(results) {
        dispatch(action_Set_items({items:results.data,status:DONE}))
        dispatch( action_Set_headers(Object.keys(results.data[0])));
    },
    error: function(err) { dispatch(action_Set_items({status:ERROR})) }
    });
  }, []);



  //HANDLERS
  const handlerShowNew = ()=>dispatch(action_Change_new());

  
  return (
    <div className="app-container">
      
      <Header/>

      <div id="centralContainer">
        <ItemsShow/>
        <NewItem/>
        <DetailedCard/>
      </div>
      
      <div className="pages" >
            <div id='addingButtonShell'><h2 id='addingButton' onClick={handlerShowNew}>Add New</h2></div>
            
            <PageButtons/>
      </div>

    </div>
  );
};

export default App;