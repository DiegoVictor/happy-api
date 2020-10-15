import { Request, Response } from 'express';

import errorHandler from '../../src/errors/handler';

describe('Error Handler', () => {
  it('should be able to receive a Internal Server Error', async () => {
    const next = jest.fn();
    const response = {
      status: (status: any) => {
        return response;
      },
      json: () => {},
    };

    errorHandler(new Error(), {} as Request, response as Response, next);

    expect(next).not.toHaveBeenCalled();
    expect(response.status).toHaveBeenCalledWith(500);
    expect(response.json).toHaveBeenCalledWith({
      message: 'Internal Server Error',
    });
  });
});
