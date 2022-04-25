import type { RequestHandler } from 'express';
import type { MockConfig } from './getConfigs';

function createMiddleware(
  { mockConfig }: { mockConfig: Record<string, MockConfig> },
): RequestHandler {
  return (req, res, next) => {
    const method = req.method.toLocaleUpperCase();
    const mockConfigKeys = Object.keys(mockConfig);
    for (const key of mockConfigKeys) {
      const config = mockConfig[key];
    }

    next();
  };
}

function isMatchMockRequest() {

}