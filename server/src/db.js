const Database = require('better-sqlite3')

const dbPath = process.env.DATABASE_URL || './data.sqlite'
const db = new Database(dbPath)
db.pragma('journal_mode = WAL')
db.exec(`
CREATE TABLE IF NOT EXISTS registrations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  player_name TEXT NOT NULL,
  age_or_grade TEXT NOT NULL,
  guardian_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  emergency_contact TEXT NOT NULL,
  waiver INTEGER NOT NULL CHECK(waiver IN (0,1)),
  social_media TEXT,
  tiktok TEXT,
  instagram TEXT
);
CREATE INDEX IF NOT EXISTS idx_reg_email ON registrations(email);
`)

module.exports = {
  insertRegistration(data){
    const stmt = db.prepare(`
      INSERT INTO registrations
      (player_name, age_or_grade, guardian_name, email, phone, emergency_contact, waiver, social_media, tiktok, instagram)
      VALUES (@playerName, @ageOrGrade, @guardianName, @email, @phone, @emergencyContact, @waiver, @socialMedia, @tiktok, @instagram)
    `)
    const info = stmt.run({
      ...data,
      waiver: data.waiver ? 1 : 0
    })
    return info.lastInsertRowid
  }
}

