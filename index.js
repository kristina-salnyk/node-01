const { Command } = require("commander");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contacts");

const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      try {
        const data = await listContacts();
        console.table(data);
      } catch (error) {
        console.error(`Error while getting contact list: ${error}`);
      }
      break;
    case "get":
      try {
        const data = await getContactById(id);
        console.table(data);
      } catch (error) {
        console.error(`Error while getting contact: ${error}`);
      }
      break;
    case "add":
      try {
        await addContact(name, email, phone);
        console.info(`New contact was added`);
      } catch (error) {
        console.error(`Error while adding contact list: ${error}`);
      }
      break;
    case "remove":
      try {
        await removeContact(id);
        console.info(`Contact with id: ${contactId} was removed`);
      } catch (error) {
        console.error(`Error while removing contact: ${error}`);
      }
      break;
    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
