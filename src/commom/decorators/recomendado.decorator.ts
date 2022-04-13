import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Recomendado = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const recomendado = request.recomendado;

    return data ? recomendado && recomendado[data] : recomendado;
  },
);