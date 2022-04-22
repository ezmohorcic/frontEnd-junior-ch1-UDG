import { useState, useEffect, Fragment } from 'react';
import { nanoid } from "nanoid";
import "./App.css";
import dataa from "./mock-data.json";
import ReadOnlyRow from "./components/ReadOnlyRow";
import EditableRow from "./components/EditableRow";
import Papa from 'papaparse';
import artikel from './Artikel.csv';

const App = () => {
  const headers = ["Artikelname", "Bein", "Bildname", "Geschlecht", "Grammatur", "Hauptartikelnr", "Hersteller", "Herstellung", "Kragen", "Material", "Materialangaben", "Produktart", "Taschenart", "Ursprungsland", "Ärmel", "Beschreibung"];
  const newInputType =["normalNewWidth", "normalNewWidth","normalNewWidth","normalNewWidth","normalNewWidth","normalNewWidth","normalNewWidth","normalNewWidth","normalNewWidth","normalNewWidth","normalNewWidth","normalNewWidth","normalNewWidth","normalNewWidth","normalNewWidth","bigNewWidth"] 
  const [data, setData] = useState([]);

  // pagination
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const [addShow, setAddShow] = useState(false)

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = data.slice(indexOfFirstPost, indexOfLastPost);

  useEffect(() => {
    Papa.parse(artikel, {
      download: true,
      header: true,
      complete: function(results) {
        setData(results.data);
        setLoading(false);
        console.log(results.data);
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
  const [addFormData, setAddFormData] = useState({
    fullName: "",
    address: "",
    phoneNumber: "",
    email: "",
  });

  const [editFormData, setEditFormData] = useState({
    fullName: "",
    address: "",
    phoneNumber: "",
    email: "",
  });

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

    const newContact = {
      id: nanoid(),
      fullName: addFormData.fullName,
      address: addFormData.address,
      phoneNumber: addFormData.phoneNumber,
      email: addFormData.email,
    };

    const newContacts = [...contacts, newContact];
    setContacts(newContacts);
  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();
    
    console.log("editFormData: ", editFormData);
    const editedContact = {

      Artikelname: editFormData.Artikelname,
      Bein: editFormData.Bein,
      Beschreibung: editFormData.Beschreibung,
      Bildname: editFormData.Bildname,
      Geschlecht: editFormData.Geschlecht,
      Grammatur: editFormData.Grammatur,
      Hauptartikelnr: editFormData.Hauptartikelnr,
      Hersteller: editFormData.Hersteller,
      Herstellung: editFormData.Herstellung,
      Kragen: editFormData.Kragen,
      Material: editFormData.Material,
      Materialangaben: editFormData.Materialangaben,
      Produktart: editFormData.Produktart,
      Taschenart: editFormData.Taschenart,
      Ursprungsland: editFormData.Ursprungsland,
      Ärmel: editFormData.Ärmel,
    };

    const newData = [...data];

    const index = data.findIndex((e) => e.Hauptartikelnr === editContactId);
    if(index === -1) alert("Contact not found");

    newData[index] = editedContact;

    console.log("newData", newData);

    setData(newData);
    setEditContactId(null);
  };

  const handleEditClick = (event, e) => {
    event.preventDefault();
    setEditContactId(e.Hauptartikelnr);

    const formValues = {
      Artikelname: e.Artikelname,
      Bein: e.Bein,
      Beschreibung: e.Beschreibung,
      Bildname: e.Bildname,
      Geschlecht: e.Geschlecht,
      Grammatur: e.Grammatur,
      Hauptartikelnr: e.Hauptartikelnr,
      Hersteller: e.Hersteller,
      Herstellung: e.Herstellung,
      Kragen: e.Kragen,
      Material: e.Material,
      Materialangaben: e.Materialangaben,
      Produktart: e.Produktart,
      Taschenart: e.Taschenart,
      Ursprungsland: e.Ursprungsland,
      Ärmel: e.Ärmel,
    };

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
  
  return (
    <div className="app-container">
      <div id="centralContainer">
        <form onSubmit={handleEditFormSubmit} className="table_form">
          <table>
            <thead>
              <tr>
                <th>Artikelname</th>
                <th>Bein</th>
                <th>Beschreibung</th>
                <th>Bildname</th>
                <th>Geschlecht</th>
                <th>Grammatur</th>
                <th>Hauptartikelnr</th>
                <th>Hersteller</th>
                <th>Herstellung</th>
                <th>Kragen</th>
                <th>Material</th>
                <th>Materialangaben</th>
                <th>Produktart</th>
                <th>Taschenart</th>
                <th>Ursprungsland</th>
                <th>Ärmel</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ?<tr><td colSpan="14">Loading...</td></tr> 
              :
              error ?<tr><td colSpan="14">Error!</td></tr> 
              :
              currentPosts.map((item, index) => {
                return (
                  <Fragment>
                    {editContactId === item.Hauptartikelnr ? (
                      <EditableRow
                        editFormData={editFormData}
                        handleEditFormChange={handleEditFormChange}
                        handleCancelClick={handleCancelClick}
                      />
                    ) : (
                      <ReadOnlyRow
                        index={index}
                        item={item}
                        handleEditClick={handleEditClick}
                        handleDeleteClick={handleDeleteClick}
                      />
                    )}
                  </Fragment>
                );
              })}
            </tbody>
          </table>
        </form>

        
        <form onSubmit={handleAddFormSubmit} className={addShow ? "add" : "addBelow"} >
          <div id='addOut' onClick={()=>setAddShow(!addShow)}> <p>X</p> </div>
          <div id='addCard'>
            {
              headers.map((e,i) => {
                return (
                i !== 15 ? <input className={'addNewInput '+ newInputType[i]} type={e} name={e} placeholder={e} onChange={handleAddFormChange} />
                :
                <textarea className={'addNewInput '+ newInputType[i]} type={e} name={e} placeholder={e} onChange={handleAddFormChange} />
              )})
            }     
            <button id='addSubmit' type="submit">Add</button> 
          </div> 
         
        </form>
      </div>



      
      <div className="pages" >
            <h2 id='addingButton' onClick={()=>setAddShow(!addShow)}>Add New</h2>
            
            <ul id='pagesUl'>
            {
                [...Array(Math.ceil(data.length/postsPerPage)).keys()].map((page, index) => {
                  return (
                    index < 10 ?
                        <li className={'pageLi'+(currentPage===page+1 ? " pageCurrentLi" : "")} key={index} onClick={() => setCurrentPage(page + 1)}>
                          {page + 1}
                        </li>
                      :
                      null
                  );
                })
              }
            </ul>

            <h2 id='addingButton' onClick={()=>DownloadNewCsv()}>Download</h2>
      </div>
    </div>
  );
};

export default App;