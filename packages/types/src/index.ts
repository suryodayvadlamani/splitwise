export type UUID = string & { readonly __brand: unique symbol };

export interface UserSummary {
  id: UUID;
  name: string;
  email: string;
}

export interface GroupSummary {
  id: UUID;
  name: string;
  memberCount: number;
}

export interface Expense {
  id: UUID;
  groupId: UUID | null;
  payerId: UUID;
  amountCents: number;
  currency: string;
  description: string;
  createdAt: string;
}

export interface ShareSplit {
  userId: UUID;
  amountCents: number;
}

export interface SettlementInstruction {
  fromUserId: UUID;
  toUserId: UUID;
  amountCents: number;
}
