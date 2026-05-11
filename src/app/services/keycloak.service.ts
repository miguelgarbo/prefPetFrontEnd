import Keycloak from 'keycloak-js';
import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

const keycloak = new Keycloak({
  url: 'https://back.local.prefpet.com.br:8444',
  realm: 'prefpet',
  clientId: 'prefpet'
});


export function initKeycloak(platformId: Object) {
  return () => {
    if (isPlatformBrowser(platformId)) {
      return keycloak.init({
        onLoad: 'check-sso',
        pkceMethod: 'S256',
        checkLoginIframe: false,
        redirectUri: window.location.origin
      });
    }
    return Promise.resolve(true);
  };
}

// Funções utilitárias para usar nos componentes
export function login() {
  return keycloak.login();
}

export function logout() {
  return keycloak.logout();
}

export function getToken() {

  return keycloak.token;
}

export function getUser() {

    console.log(keycloak.tokenParsed)

  return keycloak.tokenParsed;
}

export function getRoles(): string[] {
  return keycloak.tokenParsed?.realm_access?.roles || [];
}

export function hasRole(role: string): boolean {
  return getRoles().includes(role);
}

export function isLoggedIn(): boolean {
  return !!keycloak.token;
}

export default keycloak;