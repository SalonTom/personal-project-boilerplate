import { Column, Entity, Index } from "typeorm";

@Index("user_pkey", ["id"], { unique: true })
@Entity("user", { schema: "public" })
export class User {
  @Column("integer", { primary: true, name: "id" })
  id: number;

  @Column("character varying", { name: "email", length: 255 })
  email: string;

  @Column("date", { name: "created_at", default: () => "CURRENT_TIMESTAMP" })
  createdAt: string;

  @Column("date", { name: "updated_at", default: () => "CURRENT_TIMESTAMP" })
  updatedAt: string;
}
