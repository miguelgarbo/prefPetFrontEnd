FROM nginx:alpine

COPY dist/pref-pet-angular/browser /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf
COPY prefpet.conf /etc/nginx/conf.d/default.conf

COPY certs/fullchain.crt /etc/nginx/certs/fullchain.crt
COPY certs/wildcard.key /etc/nginx/certs/wildcard.key

EXPOSE 443

CMD ["nginx", "-g", "daemon off;"]