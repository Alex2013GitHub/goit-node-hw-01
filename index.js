const { Command } = require("commander");
const contacts = require("./contacts");

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
      const allContacts = await contacts.listContacts();
      return console.table(allContacts);

    case "get":
      const oneContact = await contacts.getContactById();
      return console.log(oneContact);

    case "add":
      const newContacts = await contacts.addContact(name, email, phone);
      return console.log(newContacts);

    case "remove":
      const result = await contacts.removeContact(id);
      return console.log(result);

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
