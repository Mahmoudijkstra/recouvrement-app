const express = require("express");

const invoicesController = require("../controllers/invoices.controller");
const { authenticate, managerOnly } = require("../middlewares/auth");
const { createInvoiceSchema, updateInvoiceSchema } = require("../validators/invoiceValidator");
const validate = require("../middlewares/validate");

const router = express.Router();

router.use(authenticate);

/**
 * @swagger
 * /invoices:
 *   get:
 *     summary: Get all invoices
 *     tags: [Invoices]
 *     responses:
 *       200:
 *         description: List of invoices
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
 *                   example: All invoices
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Invoice'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.get("/", invoicesController.getAllInvoices);

/**
 * @swagger
 * /invoices:
 *   post:
 *     summary: Create invoice
 *     tags: [Invoices]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateInvoiceBody'
 *     responses:
 *       201:
 *         description: Invoice created
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
 *                   example: Invoice created
 *                 data:
 *                   $ref: '#/components/schemas/Invoice'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.post("/", validate(createInvoiceSchema), invoicesController.createInvoice);

/**
 * @swagger
 * /invoices/{id}:
 *   get:
 *     summary: Get invoice by ID
 *     tags: [Invoices]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Invoice details
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
 *                   example: Invoice found
 *                 data:
 *                   $ref: '#/components/schemas/Invoice'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.get("/:id", invoicesController.getInvoice);

/**
 * @swagger
 * /invoices/{id}:
 *   put:
 *     summary: Update an invoice
 *     tags: [Invoices]
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
 *             $ref: '#/components/schemas/UpdateInvoiceBody'
 *     responses:
 *       200:
 *         description: Invoice updated
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
 *                   example: Invoice updated
 *                 data:
 *                   $ref: '#/components/schemas/Invoice'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.put("/:id", validate(updateInvoiceSchema), invoicesController.updateInvoice);

/**
 * @swagger
 * /invoices/{id}:
 *   delete:
 *     summary: Delete an invoice
 *     tags: [Invoices]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Invoice deleted
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
 *                   example: Invoice deleted
 *                 data:
 *                   type: object
 *                   nullable: true
 *                   example: null
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.delete("/:id", managerOnly, invoicesController.deleteInvoice);

module.exports = router;
