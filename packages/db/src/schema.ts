import { sqliteTable, text, integer, blob } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()).notNull()
});

export const groups = sqliteTable("groups", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  name: text("name").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()).notNull()
});

export const groupMembers = sqliteTable("group_members", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  groupId: text("group_id").notNull().references(() => groups.id, { onDelete: "cascade" }),
  userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  isAdmin: integer("is_admin", { mode: "boolean" }).default(false).notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()).notNull()
});

export const expenses = sqliteTable("expenses", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  groupId: text("group_id"),
  payerId: text("payer_id").notNull().references(() => users.id),
  amountCents: integer("amount_cents").notNull(),
  currency: text("currency").notNull().default("USD"),
  description: text("description").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()).notNull()
});

export const expenseShares = sqliteTable("expense_shares", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  expenseId: text("expense_id").notNull().references(() => expenses.id, { onDelete: "cascade" }),
  userId: text("user_id").notNull().references(() => users.id),
  amountCents: integer("amount_cents").notNull()
});

export const settlements = sqliteTable("settlements", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID())
});
