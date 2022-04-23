import { useState, useEffect, Fragment } from 'react';
import { nanoid } from "nanoid";
import "./App.css";
import dataa from "./mock-data.json";
import ReadOnlyRow from "./components/RowItem/ReadOnlyRow";
import EditableRow from "./components/EditableRow/EditableRow";
import Papa from 'papaparse';
import artikel from './Artikel.csv';
import { PageButtons } from './components/Paginate/PagesHud';
import NewItem from './components/NewItem/NewItem';
import ItemsShow from './components/ItemsShow/ItemsShow';
import { useDispatch } from 'react-redux';
import { action_Set_headers, action_Set_items } from './Redux/actions';
import { DONE, ERROR } from './Redux/consts';
import Header from './components/Header/Header';

const App = () => {
  
  const [data, setData] = useState([]);
  const [addShow, setAddShow] = useState(false)

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

  //DOWNLOAD CSV
  const DownloadNewCsv = () => {
    let csv = Papa.unparse(data);
    let blob = new Blob([csv], { type: "text/csv" });
    let url = window.URL.createObjectURL(blob);
    let a = document.createElement("a");
    a.href = url;
    a.download = "Artikel.csv";
    a.click();
  };

  
  return (
    <div className="app-container">

      <Header/>

      <div id="centralContainer">
        <ItemsShow/>
        <NewItem/>
      </div>
      
      <div className="pages" >
            <h2 id='addingButton' onClick={()=>setAddShow(!addShow)}>Add New</h2>
            
            <PageButtons/>

            <h2 id='addingButton' onClick={()=>DownloadNewCsv()}>Download</h2>
      </div>

    </div>
  );
};

export default App;