import { app } from 'electron';
import { DatabaseSync } from 'node:sqlite';
import path from 'node:path';
import { randomUUID } from 'node:crypto';
import type { CampaignProject, CreateCampaignInput } from '../types/project';

interface CampaignRow {
  id: string;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
  last_opened_at: string;
}

let database: DatabaseSync | undefined;

function getDatabase() {
  if (!database)
    throw new Error('O banco de campanhas ainda não foi inicializado.');
  return database;
}

function toCampaign(row: CampaignRow): CampaignProject {
  return {
    id: row.id,
    name: row.name,
    description: row.description,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    lastOpenedAt: row.last_opened_at,
  };
}

export function initializeProjectStore() {
  const databasePath = path.join(app.getPath('userData'), 'gm-studio.sqlite');
  database = new DatabaseSync(databasePath);
  database.exec(`
    PRAGMA journal_mode = WAL;
    PRAGMA foreign_keys = ON;
    CREATE TABLE IF NOT EXISTS campaigns (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      description TEXT NOT NULL DEFAULT '',
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL,
      last_opened_at TEXT NOT NULL
    );
    CREATE INDEX IF NOT EXISTS campaigns_recently_opened
      ON campaigns(last_opened_at DESC);
  `);
}

export function listCampaigns(): CampaignProject[] {
  const rows = getDatabase()
    .prepare(`
    SELECT id, name, description, created_at, updated_at, last_opened_at
    FROM campaigns ORDER BY last_opened_at DESC, created_at DESC
  `)
    .all() as unknown as CampaignRow[];
  return rows.map(toCampaign);
}

export function createCampaign(input: CreateCampaignInput): CampaignProject {
  const name = typeof input?.name === 'string' ? input.name.trim() : '';
  const description =
    typeof input?.description === 'string' ? input.description.trim() : '';
  if (!name) throw new Error('Informe o nome da campanha.');
  if (name.length > 100)
    throw new Error('O nome da campanha deve ter até 100 caracteres.');
  if (description.length > 2000)
    throw new Error('A descrição deve ter até 2.000 caracteres.');

  const now = new Date().toISOString();
  const project: CampaignProject = {
    id: randomUUID(),
    name,
    description,
    createdAt: now,
    updatedAt: now,
    lastOpenedAt: now,
  };
  getDatabase()
    .prepare(`
    INSERT INTO campaigns (id, name, description, created_at, updated_at, last_opened_at)
    VALUES (?, ?, ?, ?, ?, ?)
  `)
    .run(project.id, project.name, project.description, now, now, now);
  return project;
}

export function openCampaign(id: string): CampaignProject {
  if (typeof id !== 'string' || !/^[0-9a-f-]{36}$/i.test(id))
    throw new Error('Identificador de campanha inválido.');
  const db = getDatabase();
  const row = db
    .prepare(`
    SELECT id, name, description, created_at, updated_at, last_opened_at
    FROM campaigns WHERE id = ?
  `)
    .get(id) as CampaignRow | undefined;
  if (!row) throw new Error('Esta campanha não está mais disponível.');

  const lastOpenedAt = new Date().toISOString();
  db.prepare('UPDATE campaigns SET last_opened_at = ? WHERE id = ?').run(
    lastOpenedAt,
    id,
  );
  return { ...toCampaign(row), lastOpenedAt };
}
