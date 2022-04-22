import React from "react";

const EditableRow = ({
  editFormData,
  handleEditFormChange,
  handleCancelClick,
}) => {
  return (
    <tr className="editableRow">
      <td className="editableCell">
        <textarea
          type="text"
          /* required="required" */
          placeholder="Artikelname"
          name="Artikelname"
          value={editFormData.Artikelname}
          onChange={handleEditFormChange}
        ></textarea>
      </td>
      <td className="editableCell">
        <textarea
          type="text"
          /* required="required" */
          placeholder="Bein"
          name="Bein"
          value={editFormData.Bein}
          onChange={handleEditFormChange}
        ></textarea>
      </td>
      <td className="BeschreibungCell">
        <textarea
          type="text"
          /* required="required" */
          placeholder="Beschreibung"
          id="BeschreibungEdit"
          name="Beschreibung"
          value={editFormData.Beschreibung}
          onChange={handleEditFormChange}
        ></textarea>
      </td>
      <td className="editableCell">
        <textarea
          type="text"
          /* required="required" */
          placeholder="Bildname"
          name="Bildname"
          value={editFormData.Bildname}
          onChange={handleEditFormChange}
        ></textarea>
      </td>
      <td className="editableCell">
        <textarea
          type="text"
          /* required="required" */
          placeholder="Geschlecht"
          name="Geschlecht"
          value={editFormData.Geschlecht}
          onChange={handleEditFormChange}
        ></textarea>
      </td>
      <td className="editableCell">
        <textarea
          type="text"
          /* required="required" */
          placeholder="Grammatur"
          name="Grammatur"
          value={editFormData.Grammatur}
          onChange={handleEditFormChange}
        ></textarea>
      </td>
      <td className="editableCell">
        <textarea
          type="text"
          /* required="required" */
          placeholder="Hauptartikelnr"
          name="Hauptartikelnr"
          value={editFormData.Hauptartikelnr}
          onChange={handleEditFormChange}
        ></textarea>
      </td>
      <td className="editableCell">
        <textarea
          type="text"
          /* required="required" */
          placeholder="Hersteller"
          name="Hersteller"
          value={editFormData.Hersteller}
          onChange={handleEditFormChange}
        ></textarea>
      </td>
      <td className="editableCell">
        <textarea
          type="text"
          /* required="required" */
          placeholder="Herstellung"
          name="Herstellung"
          value={editFormData.Herstellung}
          onChange={handleEditFormChange}
        ></textarea>
      </td>
      <td className="editableCell">
        <textarea
          type="text"
          /* required="required" */
          placeholder="Kragen"
          name="Kragen"
          value={editFormData.Kragen}
          onChange={handleEditFormChange}
        ></textarea>
      </td>
      <td className="editableCell">
        <textarea
          type="text"
          /* required="required" */
          placeholder="Material"
          name="Material"
          value={editFormData.Material}
          onChange={handleEditFormChange}
        ></textarea>
      </td>
      <td className="editableCell">
        <textarea
          type="text"
          /* required="required" */
          placeholder="Materialangaben"
          name="Materialangaben"
          value={editFormData.Materialangaben}
          onChange={handleEditFormChange}
        ></textarea>
      </td>
      <td className="editableCell">
        <textarea
          type="text"
          /* required="required" */
          placeholder="Produktart"
          name="Produktart"
          value={editFormData.Produktart}
          onChange={handleEditFormChange}
        ></textarea>
      </td>
      <td className="editableCell">
        <textarea
          type="text"
          /* required="required" */
          placeholder="Taschenart"
          name="Taschenart"
          value={editFormData.Taschenart}
          onChange={handleEditFormChange}
        ></textarea>
      </td>
      <td className="editableCell">
        <textarea
          type="text"
          /* required="required" */
          placeholder="Ursprungsland"
          name="Ursprungsland"
          value={editFormData.Ursprungsland}
          onChange={handleEditFormChange}
        ></textarea>
      </td>
      <td className="editableCell">
        <textarea
          type="text"
          /* required="required" */
          placeholder="Ärmel"
          name="Ärmel"
          value={editFormData.Ärmel}
          onChange={handleEditFormChange}
        ></textarea>
      </td>
      <td className="actionsEditRow">
        <button type="submit">Save</button>
        <button type="button" onClick={handleCancelClick}>
          Cancel
        </button>
      </td>
    </tr>
  );
};
export default EditableRow;
