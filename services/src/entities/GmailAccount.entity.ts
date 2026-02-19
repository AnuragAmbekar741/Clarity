import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
  Unique,
} from "typeorm";

@Unique(["userId", "googleEmail"])
@Entity("gmail_accounts")
export class GmailAccount {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Index()
  @Column({ type: "varchar" })
  userId!: string;

  @Column({ type: "varchar", length: 255 })
  googleEmail!: string;

  @Index()
  @Column({ type: "varchar" })
  googleAccountId!: string;

  @Column({ type: "text" })
  scope!: string;

  @Column({ type: "text" })
  accessToken!: string;

  @Column({ type: "text", nullable: true })
  refreshToken?: string;

  @Column({ type: "timestamp" })
  expiresAt!: Date;

  @Column({ type: "boolean", default: false })
  isDefault!: boolean;

  @CreateDateColumn({ type: "timestamp" })
  createdAt!: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updatedAt!: Date;
}
