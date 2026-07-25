import { describe, it, expect } from "vitest";
import { checkoutSchema } from "@/schemas/checkout";
import { contactSchema } from "@/schemas/contact";

describe("Validation Schemas (Zod)", () => {
  describe("Checkout Form Schema", () => {
    it("should validate a valid checkout form payload", () => {
      const validPayload = {
        firstName: "John",
        lastName: "Doe",
        country: "United States",
        streetAddress: "123 Main Street",
        townCity: "New York",
        province: "NY",
        zipCode: "10001",
        phone: "+1234567890",
        email: "john.doe@example.com",
        paymentMethod: "bank-transfer" as const,
      };

      const result = checkoutSchema.safeParse(validPayload);
      expect(result.success).toBe(true);
    });

    it("should fail validation if required fields are missing", () => {
      const invalidPayload = {
        firstName: "",
        lastName: "Doe",
        email: "invalid-email",
      };

      const result = checkoutSchema.safeParse(invalidPayload);
      expect(result.success).toBe(false);
    });
  });

  describe("Contact Form Schema", () => {
    it("should validate a valid contact form payload", () => {
      const validPayload = {
        name: "Jane Smith",
        email: "jane@example.com",
        subject: "Product Inquiry",
        message: "Hello, I would like to know if this table comes in walnut finish.",
      };

      const result = contactSchema.safeParse(validPayload);
      expect(result.success).toBe(true);
    });

    it("should fail if message is under 10 characters", () => {
      const invalidPayload = {
        name: "Jane Smith",
        email: "jane@example.com",
        subject: "Hi",
        message: "Short",
      };

      const result = contactSchema.safeParse(invalidPayload);
      expect(result.success).toBe(false);
    });
  });
});
