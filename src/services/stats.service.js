const Client = require("../models/Client");
const Invoice = require("../models/Invoice");
const Action = require("../models/Action");

const statsService = {
  async getOverview() {
    const totalClients = await Client.countDocuments();
    const totalInvoices = await Invoice.countDocuments();

    const pendingInvoicesAggr = await Invoice.aggregate([
      { $match: { status: "pending" } },
      { $group: { _id: null, totalAmount: { $sum: "$amount" } } }
    ]);
    const totalUnpaidAmount = pendingInvoicesAggr[0]?.totalAmount || 0;

    const paidInvoicesAggr = await Invoice.aggregate([
      { $match: { status: "paid" } },
      { $group: { _id: null, totalAmount: { $sum: "$amount" } } }
    ]);
    const totalPaidAmount = paidInvoicesAggr[0]?.totalAmount || 0;

    return {
      totalClients,
      totalInvoices,
      totalUnpaidAmount,
      totalPaidAmount
    };
  },

  async getInvoicesStats() {
    const defaultStats = await Invoice.aggregate([
      { $group: { _id: "$status", count: { $sum: 1 }, totalAmount: { $sum: "$amount" } } }
    ]);
    return defaultStats;
  },

  async getAgentsStats() {
    // Number of actions taken by each agent
    const actionStats = await Action.aggregate([
      { $group: { _id: "$agent", totalActions: { $sum: 1 } } },
      { $lookup: { from: "users", localField: "_id", foreignField: "_id", as: "agent" } },
      { $unwind: "$agent" },
      { $project: { "agent.first_name": 1, "agent.last_name": 1, "agent.email": 1, totalActions: 1 } }
    ]);
    return actionStats;
  },

  async getClientsStats() {
    // TODO: Needs to be updated by mahmoud
    // Top 10 clients with highest outstanding debt
    // Don't forget to update later to add limit and skip dynamically
    const clientStats = await Invoice.aggregate([
      { $match: { status: "pending" } },
      { $group: { _id: "$client", totalOwed: { $sum: "$amount" } } },
      { $sort: { totalOwed: -1 } },
      { $limit: 10 },
      { $lookup: { from: "clients", localField: "_id", foreignField: "_id", as: "client" } },
      { $unwind: "$client" },
      { $project: { "client.first_name": 1, "client.last_name": 1, "client.email": 1, totalOwed: 1 } }
    ]);
    return clientStats;
  }
};

module.exports = statsService;
