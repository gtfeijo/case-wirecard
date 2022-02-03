import { app } from "./app";
import { createPayment } from "./endpoints/createPayment";
import { getPaymentById } from "./endpoints/getPaymentById";

app.get("/payment/:id", getPaymentById);

app.post("/payment", createPayment);
