# Frontend Docker Standard

Create when `/frontend` exists:

```txt
frontend/Dockerfile
frontend/Dockerfile.prod
frontend/.dockerignore
```

Development container:

- Node LTS
- package manager detected from lockfile
- install dependencies
- bind dev server to `0.0.0.0`
- expose project dev port, usually `5173`
- support mounted source and hot reload

Production container:

- build static assets
- serve with nginx or another lightweight static server
- used for VPS/container platforms, not Vercel native deploy

Vercel should deploy from `/frontend` with the framework build command and output directory.

