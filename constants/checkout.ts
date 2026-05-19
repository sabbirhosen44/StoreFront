import { FormFieldConfig } from "@/types/checkout";

export const BILLING_FIELDS: FormFieldConfig[] = [
    { name: "companyName", label: "Company Name (Optional)" },
    { name: "streetAddress", label: "Street Address", required: true },
    { name: "townCity", label: "Town / City", required: true },
    { name: "zipCode", label: "ZIP Code", required: true },
    { name: "phone", label: "Phone", type: "tel", required: true },
    { name: "email", label: "Email Address", type: "email", required: true },
];