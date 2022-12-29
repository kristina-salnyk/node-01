const fs = require("fs").promises;
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const contactsPath = path.resolve("./db/contacts.json");

async function listContacts() {
  const data = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(data);
}

async function getContactById(contactId) {
  const contactList = await listContacts();
  return contactList.find((item) => item.id === contactId);
}

async function removeContact(contactId) {
  const contactList = await listContacts();
  const newContactList = contactList.filter((item) => item.id !== contactId);
  await fs.writeFile(contactsPath, JSON.stringify(newContactList), "utf-8");
  console.info(`Contact with id: ${contactId} was removed`);
}

async function addContact(name, email, phone) {
  const contactList = await listContacts();
  const newContact = { id: uuidv4(), name, email, phone };
  const newContactList = [...contactList, newContact];
  await fs.writeFile(contactsPath, JSON.stringify(newContactList), "utf-8");
  console.info(`New contact was added`);
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
