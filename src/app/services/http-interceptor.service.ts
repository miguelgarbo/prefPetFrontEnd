import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import Swal from 'sweetalert2';

export const meuhttpInterceptor: HttpInterceptorFn = (request, next) => {

  let router = inject(Router);
  let token = localStorage.getItem('token');
  
  console.log('entrou aqui 1');

  //parte importante que seta no header das requisições o token automaticamente
  if (token && !router.url.includes('/login')) {
    request = request.clone({
      setHeaders: { Authorization: 'Bearer ' + token },
    });
  }

  return next(request).pipe(
    catchError((err: any) => {
      if (err instanceof HttpErrorResponse) {
        console.log('entrou aqui 2');
        
        if (err.status === 401) {

          Swal.fire({
      icon: 'warning',
      title: 'Acesso negado',
      text: 'Você precisa estar autenticado para acessar esta página.',
      confirmButtonText: 'Fazer login',
      confirmButtonColor: '#3085d6',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      cancelButtonColor: '#d33'
    }).then((result) => {
      if (result.isConfirmed) {
          router.navigate(['/inicial']);
      }
    });

          // alert('401 - tratar aqui');
          router.navigate(['/inicial']);
        } else
        if (err.status === 403) {

//sweet alert
 Swal.fire({
      icon: 'warning',
      title: 'Acesso negado',
      text: 'Você não tem permissão para acessar esta página.',
      confirmButtonColor: '#3085d6',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      cancelButtonColor: '#d33'
    });
    
          // alert('403 - tratar aqui');
          router.navigate(['/inicial']);
        } else {
          console.error('HTTP error:', err);
        }

      } else {
        console.error('An error occurred:', err);
      }

      return throwError(() => err);
    })
  );
};
