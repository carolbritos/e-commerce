import { HttpInterceptorFn } from "@angular/common/http";
import { tap } from "rxjs";
import { catchError } from "rxjs";
import { throwError } from "rxjs";
import { inject } from "@angular/core";
import { AuthFacade } from "../facades/auth.facades";
import { Router } from "@angular/router";

export const httpInterceptor: HttpInterceptorFn = (req, next) => {
  
    console.log('Requisição: ', req.url);


    const authFacade = inject(AuthFacade);
    const router = inject(Router);
    const token = authFacade.obterToken();

    const novaReq = token ?
    req.clone({
        setHeaders: {
            Authorization: `Bearer ${token}`,
        },
    }):req;
    return next(novaReq).pipe(
        tap({
            next: (event) => console.log('Responde: ', event),
            error: (error) => console.error('Erro de Requisição: ', error),
        }),
        catchError((error) => {

            console.error('Error de Requisição Global:', error);

            if (error.status === 401) {

                console.error ('Error de autenticação do Usuário', error);
                authFacade.sair();
                router.navigateByUrl('/login');

            }

            if (error.status === 500) {

                console.warn ('Erro interno do servidor!', error);
            }

            if(error.status === 403){
                console.warn('Acesso Proibido, Usuário sem Permissão');
                router.navigateByUrl('/produto');
            }

            return throwError(() => error);

        }),
    );
};