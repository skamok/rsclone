export default class User {
  constructor(email) {
    this.user = {
      email,
      lots: [],
      bids: [], // bid = { lot: id, bid: points }
      favorites: {
        lots: [], // lotID
        users: [] // userID
      }
    };
  }
}
