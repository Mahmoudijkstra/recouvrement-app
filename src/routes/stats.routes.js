const express = require("express");

const statsController = require("../controllers/stats.controller");
const { authenticate, managerOnly } = require("../middlewares/auth");

const router = express.Router();

router.use(authenticate, managerOnly);

/**
 * @swagger
 * /stats/overview:
 *   get:
 *     summary: Total outstanding debt, invoices
 *     tags: [Statistics]
 *     responses:
 *       200:
 *         description: Global KPIs
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Stats generated
 *                 data:
 *                   type: object
 *                   properties:
 *                     totalClients:
 *                       type: number
 *                     totalInvoices:
 *                       type: number
 *                     totalUnpaidAmount:
 *                       type: number
 *                     totalPaidAmount:
 *                       type: number
 *                   example:
 *                     totalClients: 15
 *                     totalInvoices: 45
 *                     totalUnpaidAmount: 50000
 *                     totalPaidAmount: 15000
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.get("/overview", statsController.getOverview);

/**
 * @swagger
 * /stats/invoices:
 *   get:
 *     summary: Invoice breakdown by status
 *     tags: [Statistics]
 *     responses:
 *       200:
 *         description: Invoices stats
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Invoice stats generated
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       count:
 *                         type: number
 *                       totalAmount:
 *                         type: number
 *                   example:
 *                     - _id: "pending"
 *                       count: 20
 *                       totalAmount: 50000
 *                     - _id: "paid"
 *                       count: 25
 *                       totalAmount: 15000
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.get("/invoices", statsController.getInvoicesStats);

/**
 * @swagger
 * /stats/agents:
 *   get:
 *     summary: Performance per agent
 *     tags: [Statistics]
 *     responses:
 *       200:
 *         description: Agents stats
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Agent stats generated
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       totalActions:
 *                         type: number
 *                       agent:
 *                         type: object
 *                         properties:
 *                           first_name:
 *                             type: string
 *                           last_name:
 *                             type: string
 *                           email:
 *                             type: string
 *                   example:
 *                     - _id: "64f1a2b3c4d5e6f7a8b9c0d1"
 *                       totalActions: 12
 *                       agent:
 *                         first_name: "John"
 *                         last_name: "Doe"
 *                         email: "john@company.com"
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.get("/agents", statsController.getAgentsStats);

/**
 * @swagger
 * /stats/clients:
 *   get:
 *     summary: Top debtors by outstanding amount
 *     tags: [Statistics]
 *     responses:
 *       200:
 *         description: Top debtor clients stats
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Clients stats generated
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       totalOwed:
 *                         type: number
 *                       client:
 *                         type: object
 *                         properties:
 *                           first_name:
 *                             type: string
 *                           last_name:
 *                             type: string
 *                           email:
 *                             type: string
 *                   example:
 *                     - _id: "64f1a2b3c4d5e6f7a8b9c0d2"
 *                       totalOwed: 35000
 *                       client:
 *                         first_name: "Jane"
 *                         last_name: "Smith"
 *                         email: "jane@company.com"
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.get("/clients", statsController.getClientsStats);

module.exports = router;
