import { Hono } from "hono";
import { logger } from "hono/logger";
import { prettyJSON } from "hono/pretty-json";
import { cors } from "hono/cors";
import { z } from "zod";
import "dotenv/config";
import { db } from "./db";
import { users, expenses, expenseShares } from "@db/schema";

const app = new Hono();

app.use("*", logger());
app.use("*", prettyJSON());
app.use("*", cors());

app.get("/health", (c) => c.json({ ok: true }));

app.get("/users", async (c) => {
  const list = await db.select().from(users).limit(50);
  return c.json(list);
});

app.post("/users", async (c) => {
  const body = await c.req.json();
  const schema = z.object({ name: z.string().min(1), email: z.string().email() });
  const data = schema.parse(body);
  const [created] = await db
    .insert(users)
    .values({ name: data.name, email: data.email })
    .returning();
  return c.json(created, 201);
});

app.get("/expenses", async (c) => {
  const list = await db.select().from(expenses).limit(50);
  return c.json(list);
});

app.post("/expenses", async (c) => {
  const body = await c.req.json();
  const schema = z.object({
    groupId: z.string().uuid().nullable().optional(),
    payerId: z.string().uuid(),
    amountCents: z.number().int().positive(),
    currency: z.string().min(1),
    description: z.string().min(1),
    shares: z.array(z.object({ userId: z.string().uuid(), amountCents: z.number().int().nonnegative() })).min(1)
  });
  const data = schema.parse(body);

  const [created] = await db.insert(expenses).values({
    groupId: data.groupId ?? null,
    payerId: data.payerId,
    amountCents: data.amountCents,
    currency: data.currency,
    description: data.description
  }).returning();

  if (data.shares?.length) {
    await db.insert(expenseShares).values(
      data.shares.map((s) => ({ expenseId: created.id, userId: s.userId, amountCents: s.amountCents }))
    );
  }
  return c.json(created, 201);
});

const port = Number(process.env.PORT || 3001);
export default {
  port,
  fetch: app.fetch
};
