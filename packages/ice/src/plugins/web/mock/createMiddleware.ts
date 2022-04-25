import type { RequestHandler, Request } from 'express';
import { pathToRegexp } from 'path-to-regexp';
import bodyParser from 'body-parser';
import multer from 'multer';
import type { MockConfig } from './getConfigs';

export default function createMiddleware(
  mockConfigs: MockConfig[],
): RequestHandler {
  return (req, res, next) => {
    for (const mockConfig of mockConfigs) {
      const matched = isMatchedMockRequest(req, mockConfig);
      if (matched) {
        const { handler, method } = mockConfig;
        if (typeof handler === 'function') {
          if (method === 'GET') {
            handler(req, res, next);
          } else {
            bodyParser.json({ limit: '5mb', strict: false })(req, res, () => {
              bodyParser.urlencoded({ limit: '5mb', extended: true })(req, res, () => {
                multer().any()(req, res, () => {
                  handler(req, res, next);
                });
              });
            });
          }
        } else {
          res.status(200).json(handler);
        }
      }
    }

    next();
  };
}

function isMatchedMockRequest(req: Request, mockConfig: MockConfig) {
  if (req.method.toLocaleUpperCase() !== mockConfig.method) {
    return false;
  }
  const keys = [];
  const re = pathToRegexp(mockConfig.path, keys);
  return re.test(req.path);
}