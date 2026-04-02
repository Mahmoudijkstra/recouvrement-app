const express = require("express");

const actionsController = require("../controllers/actions.controller");
const { authenticate, managerOnly } = require("../middlewares/auth");
const { createActionSchema, updateActionSchema } = require("../validators/actionValidator");
const validate = require("../middlewares/validate");

const router = express.Router();

router.use(authenticate);

/**
 * @swagger
 * /actions:
 *   get:
 *     summary: Get all recovery actions
 *     tags: [Actions]
 *     responses:
 *       200:
 *         description: List of actions
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
 *                   example: All actions
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Action'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.get("/", actionsController.getAllActions);

/**
 * @swagger
 * /actions:
 *   post:
 *     summary: Record a new action
 *     tags: [Actions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateActionBody'
 *     responses:
 *       201:
 *         description: Action recorded
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
 *                   example: Action created
 *                 data:
 *                   $ref: '#/components/schemas/Action'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.post("/", validate(createActionSchema), actionsController.createAction);

/**
 * @swagger
 * /actions/{id}:
 *   get:
 *     summary: Get an action by ID
 *     tags: [Actions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Action details
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
 *                   example: Action found
 *                 data:
 *                   $ref: '#/components/schemas/Action'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.get("/:id", actionsController.getAction);

/**
 * @swagger
 * /actions/{id}:
 *   put:
 *     summary: Update an action
 *     tags: [Actions]
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
 *             $ref: '#/components/schemas/UpdateActionBody'
 *     responses:
 *       200:
 *         description: Action updated
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
 *                   example: Action updated
 *                 data:
 *                   $ref: '#/components/schemas/Action'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.put("/:id", validate(updateActionSchema), actionsController.updateAction);

/**
 * @swagger
 * /actions/{id}:
 *   delete:
 *     summary: Delete an action
 *     tags: [Actions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Action deleted
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
 *                   example: Action deleted
 *                 data:
 *                   type: object
 *                   nullable: true
 *                   example: null
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.delete("/:id", managerOnly, actionsController.deleteAction);

module.exports = router;
