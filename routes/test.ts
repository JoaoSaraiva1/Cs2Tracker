import { Hono } from "hono";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";

const itemSchema = z.object({
  id: z.number().int().positive(),
  name: z.string().min(1, "Name is required"),
});

type item = z.infer<typeof itemSchema>;

type value = {
  id: number;
  value: number;
  date: Date;
};

const items: item[] = [];

export const testRoute = new Hono()
  .get("/", (c) => c.json({ items }))
  .post("/", zValidator("json", itemSchema), (c) => {
    try {
      const data = c.req.valid("json");
      console.log("🚀 ~ .post ~ data:", data);

      items.push(data);

      console.log("🚀 ~ .post ~ items:", items);
      return c.json({ data });
    } catch (error) {
      console.error("Error:", error);
      c.status(400);
      return c.json({ error: "Bad Request" });
    }
  })
  .delete("/", zValidator("json", itemSchema), (c) => {
    try {
      const data = c.req.valid("json");
      console.log("🚀 ~ .delete ~ data:", data);

      items.splice(data.id, 1);

      console.log("🚀 ~ .delete ~ items:", items);
      return c.json({ data });
    } catch (error) {
      console.error("Error:", error);
      c.status(400);
      return c.json({ error: "Bad Request" });
    }
  });
