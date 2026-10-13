import { createDatabase } from './db/database';
import { SessionRepository } from './repository/sessionRepository';
import { SanitizationService } from './services/sanitization.service';
import { WarningService } from './services/warning.service';
import { LlmService } from './services/llm.service';
import { StoryService } from './services/story.service';
import { createApp } from './app';
import { config } from './config';

const db = createDatabase(config.dbPath);
const repo = new SessionRepository(db);

// Entity blocklist — to chuc duy tri (docs/09 §5)
const blocklist = [
  { value: 'ABC Corporation', type: 'client_name' as const },
  { value: 'Toyota Motor', type: 'client_name' as const },
  { value: 'FPT Software', type: 'client_name' as const },
  { value: 'Project Phoenix', type: 'project_name' as const },
  { value: 'PRJ-2026-041', type: 'project_name' as const },
];

const sanitization = new SanitizationService(blocklist);
const warnings = new WarningService();
const llm = new LlmService();
const storyService = new StoryService(sanitization, warnings, llm, repo);
const app = createApp(storyService);

app.listen(config.port, () => {
  console.log(`csb-api listening on :${config.port}`);
});
