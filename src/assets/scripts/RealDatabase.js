export default class RealDatabase {
  static createLotObj(title, description, price, category, imgFiles, userID) {
    const obj = {
      title,
      description,
      price,
      category,
      imgFiles,
      dtCreate: (new Date()).toJSON(),
      userID,
      state: 10 // 10 for sell 70 winned 100 completed
      // after load to servere
      // lotID, after load to servere
      // imgURLs: imgURLsArray
    };
    return obj;
  }
}
