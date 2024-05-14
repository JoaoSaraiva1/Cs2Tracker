import { Hono } from "hono";

export const testRoute = new Hono().get("/", (c) => c.json({ expenses: [] }));
