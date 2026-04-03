const swaggerJSDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Recouvra+ API",
      description: "API de gestion du recouvrement",
      version: "1.0.0",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          description: "Enter your JWT token",
        },
      },
      schemas: {
        // ── Entity schemas ──
        User: {
          type: "object",
          properties: {
            _id: { type: "string", example: "64f1a2b3c4d5e6f7a8b9c0d1" },
            first_name: { type: "string", example: "John" },
            last_name: { type: "string", example: "Doe" },
            email: { type: "string", example: "john@company.com" },
            role: { type: "string", example: "agent" },
            createdAt: {
              type: "string",
              format: "date-time",
              example: "2024-01-01T00:00:00.000Z",
            },
          },
        },
        Client: {
          type: "object",
          properties: {
            _id: { type: "string", example: "64f1a2b3c4d5e6f7a8b9c0d2" },
            first_name: { type: "string", example: "Jane" },
            last_name: { type: "string", example: "Smith" },
            email: { type: "string", example: "jane@client.com" },
            phone: { type: "string", example: "+1234567890" },
            address: { type: "string", example: "123 Business Rd" },
            status: { type: "string", example: "active" },
            assignedAgent: {
              type: "string",
              example: "64f1a2b3c4d5e6f7a8b9c0d1",
            },
            createdAt: {
              type: "string",
              format: "date-time",
              example: "2024-01-01T00:00:00.000Z",
            },
          },
        },
        Invoice: {
          type: "object",
          properties: {
            _id: { type: "string", example: "64f1a2b3c4d5e6f7a8b9c0d3" },
            client: { type: "string", example: "64f1a2b3c4d5e6f7a8b9c0d2" },
            amount: { type: "number", example: 1500.5 },
            dueDate: { type: "string", format: "date", example: "2024-12-31" },
            status: { type: "string", example: "pending" },
            createdAt: {
              type: "string",
              format: "date-time",
              example: "2024-01-01T00:00:00.000Z",
            },
          },
        },
        Payment: {
          type: "object",
          properties: {
            _id: { type: "string", example: "64f1a2b3c4d5e6f7a8b9c0d4" },
            invoice: { type: "string", example: "64f1a2b3c4d5e6f7a8b9c0d3" },
            amount: { type: "number", example: 1500.5 },
            paymentDate: {
              type: "string",
              format: "date-time",
              example: "2024-01-15T10:00:00.000Z",
            },
            createdAt: {
              type: "string",
              format: "date-time",
              example: "2024-01-01T00:00:00.000Z",
            },
          },
        },
        Action: {
          type: "object",
          properties: {
            _id: { type: "string", example: "64f1a2b3c4d5e6f7a8b9c0d5" },
            client: { type: "string", example: "64f1a2b3c4d5e6f7a8b9c0d2" },
            agent: { type: "string", example: "64f1a2b3c4d5e6f7a8b9c0d1" },
            type: { type: "string", example: "call" },
            notes: {
              type: "string",
              example: "Called client about overdue invoice",
            },
            actionDate: {
              type: "string",
              format: "date-time",
              example: "2024-01-10T14:30:00.000Z",
            },
            createdAt: {
              type: "string",
              format: "date-time",
              example: "2024-01-01T00:00:00.000Z",
            },
          },
        },

        // ── Request body schemas ──
        LoginBody: {
          type: "object",
          required: ["email", "password"],
          properties: {
            email: { type: "string", example: "john@company.com" },
            password: { type: "string", example: "password123" },
          },
        },
        RegisterBody: {
          type: "object",
          required: ["first_name", "last_name", "email", "password"],
          properties: {
            first_name: { type: "string", example: "John" },
            last_name: { type: "string", example: "Doe" },
            email: { type: "string", example: "john@company.com" },
            password: { type: "string", example: "password123" },
            confirm_password: { type: "string", example: "password123" },
            role: { type: "string", enum: ["agent", "manager", "admin"] },
          },
        },
        UpdateUserBody: {
          type: "object",
          properties: {
            first_name: { type: "string" },
            last_name: { type: "string" },
            email: { type: "string" },
            role: { type: "string" },
          },
        },
        CreateClientBody: {
          type: "object",
          required: ["first_name", "last_name", "email"],
          properties: {
            first_name: { type: "string" },
            last_name: { type: "string" },
            email: { type: "string" },
            phone: { type: "string" },
            address: { type: "string" },
            status: { type: "string", example: "active" },
          },
        },
        UpdateClientBody: {
          type: "object",
          properties: {
            first_name: { type: "string" },
            last_name: { type: "string" },
            email: { type: "string" },
            phone: { type: "string" },
            address: { type: "string" },
            status: { type: "string" },
          },
        },
        CreateInvoiceBody: {
          type: "object",
          required: ["client", "amount", "dueDate"],
          properties: {
            client: { type: "string" },
            amount: { type: "number" },
            dueDate: { type: "string", format: "date" },
            status: { type: "string", example: "pending" },
          },
        },
        UpdateInvoiceBody: {
          type: "object",
          properties: {
            client: { type: "string" },
            amount: { type: "number" },
            dueDate: { type: "string", format: "date" },
            status: { type: "string" },
          },
        },
        CreatePaymentBody: {
          type: "object",
          required: ["invoice", "amount"],
          properties: {
            invoice: { type: "string" },
            amount: { type: "number" },
            paymentDate: { type: "string", format: "date" },
          },
        },
        CreateActionBody: {
          type: "object",
          required: ["client", "type", "notes"],
          properties: {
            client: { type: "string" },
            agent: { type: "string" },
            type: { type: "string" },
            notes: { type: "string" },
            actionDate: { type: "string", format: "date" },
          },
        },
        UpdateActionBody: {
          type: "object",
          properties: {
            client: { type: "string" },
            agent: { type: "string" },
            type: { type: "string" },
            notes: { type: "string" },
            actionDate: { type: "string", format: "date" },
          },
        },

        // ── Error schema ──
        ErrorResponse: {
          type: "object",
          properties: {
            status: { type: "string", example: "error" },
            message: { type: "string", example: "Error message here" },
          },
        },
      },
      responses: {
        ServerError: {
          description: "Internal server error",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ErrorResponse" },
            },
          },
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./src/routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
