const clientsService = require("../../src/services/clients.service");
const Client = require("../../src/models/Client");
const AppError = require("../../src/utils/appError");

jest.mock("../../src/models/Client");

describe("clientsService", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getAllClients", () => {
    test("should return all clients", async () => {
      const mockClients = [
        { _id: "1", first_name: "Jane", email: "jane@test.com" },
      ];
      Client.find.mockResolvedValue(mockClients);

      const result = await clientsService.getAllClients();

      expect(Client.find).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockClients);
    });
  });

  describe("getClient", () => {
    test("should return a client by id", async () => {
      const mockClient = { _id: "1", first_name: "Jane" };
      Client.findById.mockResolvedValue(mockClient);

      const result = await clientsService.getClient("1");

      expect(result).toEqual(mockClient);
    });

    test("should throw AppError 404 when client not found", async () => {
      Client.findById.mockResolvedValue(null);

      await expect(clientsService.getClient("999")).rejects.toThrow("Client not found");
    });
  });

  describe("createClient", () => {
    test("should create and return a new client", async () => {
      const clientData = { first_name: "Jane", last_name: "Smith", email: "jane@test.com" };
      const mockCreated = { _id: "1", ...clientData };
      Client.create.mockResolvedValue(mockCreated);

      const result = await clientsService.createClient(clientData);

      expect(Client.create).toHaveBeenCalledWith(clientData);
      expect(result._id).toBe("1");
    });
  });

  describe("updateClient", () => {
    test("should update and return the client", async () => {
      const mockUpdated = { _id: "1", first_name: "Updated" };
      Client.findByIdAndUpdate.mockResolvedValue(mockUpdated);

      const result = await clientsService.updateClient("1", { first_name: "Updated" });

      expect(result.first_name).toBe("Updated");
    });

    test("should throw AppError 404 when client not found", async () => {
      Client.findByIdAndUpdate.mockResolvedValue(null);

      await expect(clientsService.updateClient("999", {})).rejects.toThrow("Client not found");
    });
  });

  describe("deleteClient", () => {
    test("should delete and return the client", async () => {
      const mockClient = { _id: "1", first_name: "Jane" };
      Client.findByIdAndDelete.mockResolvedValue(mockClient);

      const result = await clientsService.deleteClient("1");

      expect(result).toEqual(mockClient);
    });

    test("should throw AppError 404 when client not found", async () => {
      Client.findByIdAndDelete.mockResolvedValue(null);

      await expect(clientsService.deleteClient("999")).rejects.toThrow("Client not found");
    });
  });
});
