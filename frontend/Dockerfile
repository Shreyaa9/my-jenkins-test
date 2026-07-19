FROM nginx:alpine
# Hamein index.html ko nginx ke default directory mein copy karna hoga
COPY index.html /usr/share/nginx/html/index.html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]