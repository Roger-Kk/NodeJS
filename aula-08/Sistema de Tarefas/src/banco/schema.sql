-- Estrutura do banco. Este arquivo VAI para o Git (é código).
-- O arquivo .db NÃO vai (é dado).
--
-- IF NOT EXISTS: rodar este schema de novo não quebra nada.

CREATE TABLE IF NOT EXISTS tarefas (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  titulo      TEXT    NOT NULL,
  concluida   INTEGER NOT NULL DEFAULT 0,   -- SQLite não tem boolean: 0 = false, 1 = true
  prioridade  TEXT    NOT NULL DEFAULT 'media',
  criada_em   TEXT    NOT NULL,             -- datas ficam como TEXT no formato ISO
  atualizada_em TEXT
);

-- Um índice acelera buscas na coluna indicada.
-- Sem ele, o banco lê a tabela inteira para filtrar por prioridade.
CREATE INDEX IF NOT EXISTS idx_tarefas_concluida ON tarefas (concluida);
CREATE INDEX IF NOT EXISTS idx_tarefas_prioridade ON tarefas (prioridade);
