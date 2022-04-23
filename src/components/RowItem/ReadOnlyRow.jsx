import React from "react";

const ReadOnlyRow = ({ item, handleEditClick, handleDeleteClick }) => {
  return (
    <tr className="readRow">
      <td>{item.Artikelname}</td>
      <td>{item.Bein}</td>
      <td className="descriptionReadRow"> <p>{item.Beschreibung}</p> </td>
      <td>{item.Bildname}</td>
      <td>{item.Geschlecht}</td>
      <td>{item.Grammatur}</td>
      <td>{item.Hauptartikelnr}</td>
      <td>{item.Hersteller}</td>
      <td>{item.Herstellung}</td>
      <td>{item.Kragen}</td>
      <td>{item.Material}</td>
      <td>{item.Materialangaben}</td>
      <td>{item.Produktart}</td>
      <td>{item.Taschenart}</td>
      <td>{item.Ursprungsland}</td>
      <td>{item.Ärmel}</td>
      <td className="actionsRow">
        <button
          type="button"
          onClick={(event) => handleEditClick(event, item)}
        >
          Edit
        </button>
        <button type="button" onClick={() => handleDeleteClick(item.Hauptartikelnr)}>
          Delete
        </button>
      </td>
    </tr>
  );
};

export default ReadOnlyRow;
//owo-Ivanna estuvo aqui