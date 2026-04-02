const clientsService = require("../services/clients.service");
const response = require("../utils/response");

const clientsController = {
  async getAllClients(req, res, next) {
    try {
      const clients = await clientsService.getAllClients();
      return response.success(res, clients, "All clients");
    } catch (err) {
      next(err);
    }
  },

  async getClient(req, res, next) {
    try {
      const dbClient = await clientsService.getClient(req.params.id);
      return response.success(res, dbClient, "Client found");
    } catch (err) {
      next(err);
    }
  },

  async createClient(req, res, next) {
    try {
      const dbClient = await clientsService.createClient(req.body);
      return response.success(res, dbClient, "Client created", 201);
    } catch (err) {
      next(err);
    }
  },

  async updateClient(req, res, next) {
    try {
      const updatedClient = await clientsService.updateClient(
        req.params.id,
        req.body,
      );
      return response.success(res, updatedClient, "Client updated", 200);
    } catch (err) {
      next(err);
    }
  },

  async deleteClient(req, res, next) {
    try {
      const dbClient = await clientsService.deleteClient(req.params.id);
      return response.success(res, dbClient, "Client deleted", 200);
    } catch (err) {
      next(err);
    }
  },
};

module.exports = clientsController;
