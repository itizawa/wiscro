CREATE TABLE IF NOT EXISTS timeline_items (
  id            TEXT PRIMARY KEY,
  source        TEXT NOT NULL,
  source_label  TEXT NOT NULL,
  title         TEXT NOT NULL,
  link          TEXT NOT NULL,
  description   TEXT NOT NULL DEFAULT '',
  thumbnail     TEXT,
  published_at  TIMESTAMPTZ NOT NULL,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_timeline_items_published_at
  ON timeline_items (published_at DESC);
