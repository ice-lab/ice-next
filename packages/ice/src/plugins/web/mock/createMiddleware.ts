import type { RequestHandler, Request } from 'express';
import { pathToRegexp } from 'path-to-regexp';
import type { Key } from 'path-to-regexp';
import bodyParser from 'body-parser';
import multer from 'multer';
import type { MockConfig } from './getConfigs';

export default function createMiddleware(
  context: { mockConfigs: MockConfig[] },
): RequestHandler {
  return (req, res, next) => {
    for (const mockConfig of context.mockConfigs) {
      const { match, keys } = matchPath(req, mockConfig);
      if (match) {
        const { handler, method } = mockConfig;
        // params
        const params: Record<string, any> = {};
        for (let i = 1; i < match.length; i += 1) {
          const key = keys[i - 1];
          const prop = key.name;
          const val = decodeParam(match[i]);
          if (val !== undefined) {
            params[prop] = val;
          }
        }
        req.params = params;
        // handler
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

function matchPath(req: Request, mockConfig: MockConfig): { match: RegExpExecArray | null; keys: Key[] } {
  const keys = [];
  if (req.method.toLocaleUpperCase() !== mockConfig.method) {
    return {
      match: null,
      keys,
    };
  }

  const re = pathToRegexp(mockConfig.path, keys);
  return {
    match: re.exec(req.path),
    keys,
  };
}

function decodeParam(val: any) {
  if (typeof val !== 'string' || val.length === 0) {
    return val;
  }
  try {
    return decodeURIComponent(val);
  } catch (err) {
    if (err instanceof URIError) {
      err.message = `Failed to decode param ' ${val} '`;
      (err as any).status = 400;
      (err as any).statusCode = 400;
    }
    throw err;
  }
}