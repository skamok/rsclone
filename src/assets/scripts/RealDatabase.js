export default class RealDatabase {
  static createLotObj(title, description, price, category, imgFiles, userID) {
    const obj = {
      title,
      description,
      price,
      category,
      imgFiles,
      dtCreate: (new Date()).toJSON(),
      userID
      // after load to servere
      // lotID, after load to servere
      // imgURLs: imgURLsArray
    };
    return obj;
  }
}
