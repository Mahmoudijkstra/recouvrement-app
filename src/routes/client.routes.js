const express = require("express");

const clientsController = require("../controllers/clients.controller");
const { authenticate, managerOnly } = require("../middlewares/auth");
const { createClientSchema, updateClientSchema } = require("../validators/clientValidator");
const validate = require("../middlewares/validate");

const router = express.Router();

router.use(authenticate);

/**
 * @swagger
 * /clients:
 *   get:
 *     summary: Get all clients
 *     tags: [Clients]
 *     responses:
 *       200:
 *         description: List of clients
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
 *                   example: All clients
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Client'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.get("/", clientsController.getAllClients);

/**
 * @swagger
 * /clients:
 *   post:
 *     summary: Create a new client
 *     tags: [Clients]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateClientBody'
 *     responses:
 *       201:
 *         description: Client created
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
 *                   example: Client created
 *                 data:
 *                   $ref: '#/components/schemas/Client'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.post("/", validate(createClientSchema), clientsController.createClient);

/**
 * @swagger
 * /clients/{id}:
 *   get:
 *     summary: Get a client by ID
 *     tags: [Clients]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Client details
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
 *                   example: Client found
 *                 data:
 *                   $ref: '#/components/schemas/Client'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.get("/:id", clientsController.getClient);

/**
 * @swagger
 * /clients/{id}:
 *   put:
 *     summary: Update client details
 *     tags: [Clients]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateClientBody'
 *     responses:
 *       200:
 *         description: Client updated
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
 *                   example: Client updated
 *                 data:
 *                   $ref: '#/components/schemas/Client'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.put("/:id", validate(updateClientSchema), clientsController.updateClient);

/**
 * @swagger
 * /clients/{id}:
 *   delete:
 *     summary: Delete a client
 *     tags: [Clients]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Client deleted
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
 *                   example: Client deleted
 *                 data:
 *                   type: object
 *                   nullable: true
 *                   example: null
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.delete("/:id", managerOnly, clientsController.deleteClient);

module.exports = router;
