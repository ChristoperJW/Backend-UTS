## Dari Monica
Bisa langsung get karena udh pake seed, kalau mau tes jalanin "npm run seed" baru "npm run dev". Localhost: 5000. Nama database: Postify

Endpoint yang dibuat disini:
- GET /feeds
- POST /posts/:id/comments
- GET /posts/:id/comments
- GET /comments
- DELETE /comments/:id
- POST /posts
- GET /posts

1. Kalau mau POST /post, isi body wajib

{

  "username": "isi",

  "post": "isi",

  "caption": "isi"

}

2. Kalau mau POST /posts/:id/comments, isi body wajib

{

  "comment": "isi",

}