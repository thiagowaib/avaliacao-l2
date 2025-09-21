import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from "@nestjs/common";

@Injectable()
export class ApiKeyGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const apiKey = request.headers['apikey'];
    if(apiKey === 'avaliacao-l2') {
      return true;
    } else {
      throw new ForbiddenException('API Key inválida ou ausente');
    }
    /**
     * Implementação de uma Chave de API *bem* não-segura.
     * Feito dessa forma apenas para exemplificar o mecanismo
     */
  }
}
