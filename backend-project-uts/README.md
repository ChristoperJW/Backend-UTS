# Endpoint Masing-masing Anggota Dan Cara Kerjanya:

# Louise
1. 

2. 

3. 

4. 

5. PUT api/users/:id/change-password/
    Berfungsi untuk mengubah password user, berdasarkan id (memerlukan token)
    HEADER : 
    AUTHENTICATION --> Bearer "token" (Bearer spasi token)

    Request Body JSON : 

    {

        "old_password" : "...",

        "new_password" : "...",

        "confirm_new_password" : "...",

    }

6.  DELETE api/users/:id
    Berfungsi menghapus akun user, berdasarkan id (memerlukan token)
    HEADER : 
    AUTHENTICATION --> Bearer "token" (Bearer spasi token)

# Michael


# Angga


# Christoper : 
1.  POST api/auth/register

    Berfungsi untuk mendaftarkan akun baru.

    Request Body JSON : 

    {

        "email" : "...",

        "password" : "...",

        "confirm_password" : "...",

        "full_name" : "...",

    }

2.  POST api/auth/login

    Berfungsi untuk login dan mendapatkan token.

    Request Body JSON : 

    {

        "email" : "...",

        "password" : "...",

    }

3.  GET api/auth/me

    Berfungsi untuk mendapatkan informasi akun, berdasarkan token.

    HEADER : 
    AUTHENTICATION --> Bearer "token" (Bearer spasi token)

4.  GET api/users/:id

    Berfungsi untuk mendapatkan informasi akun, berdasarkan id.

5.  PUT api/users/:id

    Berfungsi mengubah email atau nama lengkap di akun, berdasarkan id (memerlukan token).

    HEADER : 
    AUTHENTICATION --> Bearer "token" (Bearer spasi token)

    Request Body JSON : 

    {

        "email" : "...", (akun baru)

        "full_name" : "...", (nama lengkap baru)

    }

6.  GET api/users?search=fullname (spasi memakai %20)

    Berfungsi untuk mencari data akun, berdasarkan nama user.

7.  GET api/users

    Berfungsi untuk menampilkan semua user yang telah mendaftar.

# Monica
1. GET api/feeds

   Berfungsi untuk menampilkan feeds, mengambil 3 postingan secara random.

2. POST /posts/:id/comments

   Berfungsi untuk melakukan comment berdasaarkan id postingan (memerlukan token).

   HEADER : 
   AUTHENTICATION --> Bearer "token" (Bearer spasi token)

   Request Body JSON : 

   {

       "comment" : "...",

   }

3. GET /posts/:id/comments

   Berfungsi untuk menampilkan comment berdasarkan id postingan (memerlukan token).

   HEADER : 
   AUTHENTICATION --> Bearer "token" (Bearer spasi token)

4. GET /comments

   Berfungsi untuk menampilkan comment secara keseluruhan.

5. DELETE /comments/:id

   Berfungsi untuk menghapus komentar berdasarkan id (memerlukan token).

   HEADER : 
   AUTHENTICATION --> Bearer "token" (Bearer spasi token)