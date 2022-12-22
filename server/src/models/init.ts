import Account from "./accounts.models";
import Users from "./users.models";
import Transaction from "./transaction.models";

const dbInit = async () => Promise.all([
  Account.sync({ force: true }),
  Transaction.sync({ force: true }),
  Users.sync({ force: true }),
])

export default dbInit;