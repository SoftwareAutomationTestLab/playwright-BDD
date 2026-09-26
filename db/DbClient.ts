import Database from "better-sqlite3";

export class DbClient {
  private readonly db: Database.Database;

  constructor() {
    this.db = new Database(":memory:");
    this.db.exec(`
      CREATE TABLE orders (
        order_id INTEGER PRIMARY KEY,
        status TEXT NOT NULL
      );

      INSERT INTO orders(order_id, status)
      VALUES (1001, 'CREATED'), (1002, 'SHIPPED');
    `);
  }

  findOrder(orderId: number) {
    return this.db
      .prepare("SELECT * FROM orders WHERE order_id = ?")
      .get(orderId) as { order_id: number; status: string } | undefined;
  }

  close() {
    this.db.close();
  }
}