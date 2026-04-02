const express = require("express");

const paymentsController = require("../controllers/payments.controller");
const { authenticate, managerOnly } = require("../middlewares/auth");
const { createPaymentSchema } = require("../validators/paymentValidator");
const validate = require("../middlewares/validate");

const router = express.Router();

router.use(authenticate);

/**
 * @swagger
 * /payments:
 *   get:
 *     summary: Get all payments
 *     tags: [Payments]
 *     responses:
 *       200:
 *         description: List of payments
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
 *                   example: All payments
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Payment'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.get("/", paymentsController.getAllPayments);

/**
 * @swagger
 * /payments:
 *   post:
 *     summary: Record a payment
 *     tags: [Payments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreatePaymentBody'
 *     responses:
 *       201:
 *         description: Payment created
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
 *                   example: Payment created
 *                 data:
 *                   $ref: '#/components/schemas/Payment'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.post("/", validate(createPaymentSchema), paymentsController.createPayment);

/**
 * @swagger
 * /payments/{id}:
 *   get:
 *     summary: Get a payment by ID
 *     tags: [Payments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Payment details
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
 *                   example: Payment found
 *                 data:
 *                   $ref: '#/components/schemas/Payment'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.get("/:id", paymentsController.getPayment);

/**
 * @swagger
 * /payments/{id}:
 *   delete:
 *     summary: Delete a payment
 *     tags: [Payments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Payment deleted
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
 *                   example: Payment deleted
 *                 data:
 *                   type: object
 *                   nullable: true
 *                   example: null
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.delete("/:id", managerOnly, paymentsController.deletePayment);

module.exports = router;
