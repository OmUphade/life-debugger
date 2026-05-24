import db from "./database";

function randomBetween(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function runBehaviorQuery() {
  const lateCommits = randomBetween(3, 9);

  const focusScore = randomBetween(35, 85);

  const interruptions = randomBetween(8, 24);

  const meetingHours = randomBetween(4, 14);

  db.prepare(
    `
    DELETE FROM github
  `,
  ).run();

  db.prepare(
    `
    DELETE FROM discord
  `,
  ).run();

  db.prepare(
    `
    DELETE FROM calendar
  `,
  ).run();

  db.prepare(
    `
    INSERT INTO github VALUES
    ('2026-05-20', ?, ?)
  `,
  ).run(lateCommits, focusScore);

  db.prepare(
    `
    INSERT INTO discord VALUES
    ('2026-05-20', ?)
  `,
  ).run(interruptions);

  db.prepare(
    `
    INSERT INTO calendar VALUES
    ('2026-05-20', ?)
  `,
  ).run(meetingHours);

  const query = `
    SELECT
      github.late_commits,
      github.focus_score,
      discord.interruptions,
      calendar.meeting_hours

    FROM github

    JOIN discord
    ON github.date = discord.date

    JOIN calendar
    ON github.date = calendar.date
  `;

  const result = db.prepare(query).get();

  return result;
}
