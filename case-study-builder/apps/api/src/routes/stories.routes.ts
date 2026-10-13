import { Router } from 'express';
import { StoryService } from '../services/story.service';

export function storiesRoutes(storyService: StoryService): Router {
  const router = Router();

  router.post('/generate', async (req, res, next) => {
    try {
      const response = await storyService.generate(req.body);
      res.json(response);
    } catch (err) {
      next(err);
    }
  });

  router.get('/:id', (req, res, next) => {
    try {
      const record = storyService.getById(req.params.id);
      if (!record) {
        res.status(404).json({
          error: { code: 'ERR_NOT_FOUND', message: 'Không tìm thấy phiên.', retryable: false },
        });
        return;
      }
      res.json(record);
    } catch (err) {
      next(err);
    }
  });

  return router;
}
