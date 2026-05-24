import Database from "better-sqlite3";

const sqlite = new Database("behavior.db");

sqlite.exec(`
  CREATE TABLE IF NOT EXISTS github (
    date TEXT,
    late_commits INTEGER,
    focus_score INTEGER
  );

  CREATE TABLE IF NOT EXISTS discord (
    date TEXT,
    interruptions INTEGER
  );

  CREATE TABLE IF NOT EXISTS calendar (
    date TEXT,
    meeting_hours INTEGER
  );
`);

const githubCount = sqlite
  .prepare("SELECT COUNT(*) as count FROM github")
  .get() as { count: number };

if (githubCount.count === 0) {
  sqlite
    .prepare(
      `
      INSERT INTO github VALUES
      ('2026-05-20', 6, 42)
    `,
    )
    .run();

  sqlite
    .prepare(
      `
      INSERT INTO discord VALUES
      ('2026-05-20', 18)
    `,
    )
    .run();

  sqlite
    .prepare(
      `
      INSERT INTO calendar VALUES
      ('2026-05-20', 14)
    `,
    )
    .run();
}

export default sqlite;
