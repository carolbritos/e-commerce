import { HttpInterceptorFn } from "@angular/common/http";
import { tap } from "rxjs";
import { catchError } from "rxjs";
import { throwError } from "rxjs";

export const httpInterceptor: HttpInterceptorFn = (req, next) => {
  
    console.log('Interceptando Requisição: ', req.url);

    // Simulando a adição de um token JWT no cabeçalho da requisição

    const token = 'fake-token-jwt'; // Simulando um token JWT
    const novaReq = req.clone({
        setHeaders: {
            Authorization: `Bearer ${token}`,
        },
    });
    return next(novaReq).pipe(
        tap({
            next: (event) => console.log('Responde: ', event),
            error: (error) => console.error('Erro de Requisição: ', error),
        }),
        catchError((error) => {
            console.error('Error de Requisição Global:', error);
            if (error.status === 401) {
                console.error ('Error de autenticação do Usuário', error);
            }
            if (error.status === 500) {
                console.warn ('Erro interno do servidor!', error);
            }
            return throwError(() => error);

        }),
    );
};