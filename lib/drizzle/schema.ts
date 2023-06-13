import { InferModel } from "drizzle-orm";
import {
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const url = pgTable("url", {
  id: uuid("id").defaultRandom().primaryKey(),
  url: text("url").notNull(),
  shortUrl: text("short_url").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export type Url = InferModel<typeof url>;
