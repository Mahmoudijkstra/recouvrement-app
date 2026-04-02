const AppError = require("../utils/appError");
const Client = require("../models/Client");

const clientsService = {
  async getAllClients() {
    return await Client.find();
  },

  async getClient(id) {
    const client = await Client.findById(id);
    if (!client) {
      throw new AppError("Client not found", 404);
    }
    return client;
  },

  async createClient(clientData) {
    return await Client.create(clientData);
  },

  async updateClient(id, newClientData) {
    const updatedClient = await Client.findByIdAndUpdate(id, newClientData, {
      new: true,
      runValidators: true
    });
    if (!updatedClient) {
      throw new AppError("Client not found", 404);
    }
    return updatedClient;
  },

  async deleteClient(id) {
    const client = await Client.findByIdAndDelete(id);
    if (!client) {
      throw new AppError("Client not found", 404);
    }
    return client;
  },
};

module.exports = clientsService;
