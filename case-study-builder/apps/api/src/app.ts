import express from 'express';
import cors from 'cors';
import { storiesRoutes } from './routes/stories.routes';
import { StoryService, ApiError } from './services/story.service';

export function createApp(storyService: StoryService): express.Express {
  const app = express();
  app.use(cors());
  app.use(express.json({ limit: '64kb' }));

  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', service: 'csb-api' });
  });

  app.use('/api/stories', storiesRoutes(storyService));

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  app.use((err: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
    if (err instanceof ApiError) {
      res
        .status(err.status)
        .json({ error: { code: 'ERR_VALIDATION', message: err.message, retryable: false } });
      return;
    }
    const e = err as { status?: number; message?: string };
    const status = e.status && e.status >= 400 && e.status < 600 ? e.status : 500;
    const message = e.message || 'Lỗi hệ thống.';
    res.status(status).json({ error: { code: 'ERR_INTERNAL', message, retryable: status >= 500 } });
  });

  return app;
}
