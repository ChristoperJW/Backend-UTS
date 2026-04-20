POST /auth/register
request body:
{

    "email": "isi",

    "full_name": "isi",

    "password": "isi",

    "confirm_password": "isi"

}

POST /auth/login

request body:

{

    "email": "isi",

    "password": "isi"
    
}

(jangan lupa insert token)


POST /posts

request body:

{

    "caption": "isi",

    "media": "isi",

}

Sistem kerja Feeds = mengambil 3 postingan secara random yang ada di dalam database.
Semua kode monic gapake token karena hanya mengambil feeds secara umum dan setiap akun kan bisa komen