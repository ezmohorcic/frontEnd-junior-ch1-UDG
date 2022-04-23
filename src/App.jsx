import { useState, useEffect, Fragment } from 'react';
import { nanoid } from "nanoid";
import "./App.css";
import dataa from "./mock-data.json";
import ReadOnlyRow from "./components/RowItem/ReadOnlyRow";
import EditableRow from "./components/EditableRow";
import Papa from 'papaparse';
import artikel from './Artikel.csv';
import { PageButtons } from './components/Paginate/PagesHud';
import NewItem from './components/NewItem/NewItem';
import ItemsShow from './components/ItemsShow/ItemsShow';

const App = () => {
  const headers = ["Artikelname", "Bein", "Bildname", "Geschlecht", "Grammatur", "Hauptartikelnr", "Hersteller", "Herstellung", "Kragen", "Material", "Materialangaben", "Produktart", "Taschenart", "Ursprungsland", "Ärmel", "Beschreibung"];
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  //const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const [addShow, setAddShow] = useState(false)

  //const indexOfLastPost = currentPage * postsPerPage;
  //const indexOfFirstPost = indexOfLastPost - postsPerPage;
  //const currentPosts = data.slice(indexOfFirstPost, indexOfLastPost);
  
  useEffect (() => {
    Papa.parse(artikel, {
      dynamicTyping: false,
      download: true,
      header: true,
      complete: function(results) {
        setData(results.data);
        setLoading(false);
        headers = Object.keys(results.data[0]);
    },
      error: function(err) {
        setError(true);
      }
    });
  }, []);

  const DownloadNewCsv = () => {
    let csv = Papa.unparse(data);
    let blob = new Blob([csv], { type: "text/csv" });
    let url = window.URL.createObjectURL(blob);
    let a = document.createElement("a");
    a.href = url;
    a.download = "Artikel.csv";
    a.click();
  };

  
  const [contacts, setContacts] = useState(dataa);
  const [addFormData, setAddFormData] = useState({});
  const [editFormData, setEditFormData] = useState({});
  const [editContactId, setEditContactId] = useState(null);

  const handleAddFormChange = (event) => {
    event.preventDefault();
    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;
    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue;
    setAddFormData(newFormData);
  };

  const handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
  };

  const handleAddFormSubmit = (event) => {
    event.preventDefault();
    const newRow = headers.reduce((obj, header) => {
      obj[header] = addFormData[header];
      return obj;
    }, {});
    setData([...data, newRow]);
  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const newData = [...data];

    const index = data.findIndex((e) => e.Hauptartikelnr === editContactId);
    if(index === -1) alert("Contact not found");

    newData[index] = editFormData;

    setData(newData);
    setEditContactId(null);
  };

  const handleEditClick = (event, e) => {
    event.preventDefault();
    setEditContactId(e.Hauptartikelnr);
    const formValues = headers.reduce((obj, header) => {
      obj[header] = e[header];
      return obj;
    }, {});

    setEditFormData(formValues);
  };

  const handleCancelClick = () => {
    setEditContactId(null);
  };

  const handleDeleteClick = (id) => {
    const newData = [...data];

    const index = data.findIndex((e) => e.Hauptartikelnr === id);

    newData.splice(index, 1);

    setData(newData);
  };

  let Search = (e) => {
    e.preventDefault();
    let search = searchInput;
    let newData = data.filter(function(item) {
      return Object.keys(item).some(function(key) {
        return String(item[key]).toLowerCase().includes(search);
      });
    });
    setData(newData);
    setSearchInput("");
  };
  const [searchInput, setSearchInput] = useState("");
  const handleSearchChange = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };
  
  return (
    <div className="app-container">

      <div className="SearchCont">
        <input type="text" placeholder="Search" id='searchInput' onChange={(e) => handleSearchChange(e)}/>
        <button id='search_button' type="submit" onClick={(e) => Search(e)}>search</button>
      </div>

      <div id="centralContainer">
        <ItemsShow/>
        <NewItem addShow={addShow} headers={headers} setAddShow={setAddShow} handleAddFormSubmit={handleAddFormSubmit} handleAddFormChange={handleAddFormChange}/>
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