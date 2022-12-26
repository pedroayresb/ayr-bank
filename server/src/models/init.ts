import Account from "./accounts.models";
import Users from "./users.models";
import Transaction from "./transaction.models";

const dbInit = async () => Promise.all([
  await Account.sync({ force: true }),
  await Users.sync({ force: true }),
  await Transaction.sync({ force: true }),
])

export default dbInit;