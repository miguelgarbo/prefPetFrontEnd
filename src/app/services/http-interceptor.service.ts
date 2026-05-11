import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { getToken } from './keycloak.service';

export const meuhttpInterceptor: HttpInterceptorFn = (request, next) => {

  const router = inject(Router);

  if (request.url.includes('/realms/')) {
    return next(request);
  }

  const token = getToken();

  if (token) {

    console.log(token)
    request = request.clone({
      setHeaders: { Authorization: 'Bearer ' + token }
    });
  }

  return next(request).pipe(
    catchError((err: any) => {

      if (err instanceof HttpErrorResponse) {

        if (err.status === 401) {

          Swal.fire({
            icon: 'warning',
            title: 'Acesso negado',
            text: 'Você precisa estar autenticado.',
            confirmButtonText: 'Fazer login'
          }).then(() => {
            router.navigate(['/inicial']);
          });

        } else if (err.status === 403) {

          Swal.fire({
            icon: 'warning',
            title: 'Acesso negado',
            text: 'Sem permissão.'
          });

          router.navigate(['/inicial']);

        } else {
          console.error('HTTP error:', err);
        }

      }

      return throwError(() => err);
    })
  );
};