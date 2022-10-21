import { nanoid } from "nanoid";
import Button from "./Button";
function ContactList({ contactList, filterInputValue, onClick }) {
  let finalList = () => {
    const filterValue = filterInputValue;

    const filterArr = contactList
      .filter((contact) =>
        contact.name.toLowerCase().includes(filterValue.toLowerCase())
      )
      .map((contact) => (
        <li key={nanoid()}>
          {contact.name}: {contact.number}
          <Button
            label={"Delete"}
            type={"button"}
            onClick={() => onClick(contact.id)}
          />
        </li>
      ));

    return filterArr;
  };
  return (
    <div>
      <h2>Contacts</h2>
      {finalList()}
    </div>
  );
}
export default ContactList;
