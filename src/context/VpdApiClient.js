import axios from "axios";

export default class VpdApiClient {
  constructor(serverUrl) {
    this.baseUrl = 'vendor-performance-data';
  }

  async getCouplesJourney (vendorId) {
    return await axios.get(`${this.baseUrl}/couples-journey?id_empresa=${vendorId}`);
  }
}