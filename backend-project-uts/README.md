# Endpoint Masing-masing Anggota Dan Cara Kerjanya:

# Louise
1. POST /users/:id/follow
    Berfungsi untuk melakukan follow terhadap akun seseorang, berdasarkan id(akun yang ingin difollow). Memerlukan token
    HEADER: 
    AUTHENTIFICATION --> Bearer "token" (Bearer spasi token)

2. POST /users/:id/unfollow
    Berfungsi untuk melakukan unfollow terhadap akun seseorang, berdasarkan id(akun yang ingin diunfollow). Memerlukan token
    HEADER:
    AUTHENTIFICATION --> Bearer "token" (Bearer spasi token)

3. GET /users/:id/followers
    Berfungsi untuk memeriksa siapa saja pengikut di akun yang dicek idnya.
    HEADER: 
    AUTHENTIFICATION --> Bearer "token" (Bearer spasi token)

4. GET /users/:id/following
    Berfungsi untuk memeriksa siapa saja yang diikuti di akun yang dicek idnya.
    HEADER: 
    AUTHENTIFICATION --> Bearer "token" (Bearer spasi token)

5.  PUT api/users/:id/change-password/
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
1. GET api/posts
    Berfungsi melihat semua postingan yang telah di upload users.   

2. GET api/posts/:id
    Berfungsi melihat salah satu postingan dengan memasukkan id postingan
    
3. POST api/posts/:id
    Berfungsi untuk mengupload postingan.
    HEADER : 
    AUTHENTICATION --> Bearer "token" (Bearer spasi token)

    Request Body JSON :

    {

        "caption" : "..."

        "media" " "...

    }

4. DELETE api/posts/:id
    Berfungsi untuk menghapus postingan yang dibuat user
    HEADER : 
    AUTHENTICATION --> Bearer "token" (Bearer spasi token)

5. POST api/posts/:id/like
    Berfungsi untuk memberi like pada postingan.
    HEADER : 
    AUTHENTICATION --> Bearer "token" (Bearer spasi token)

6. DELETE api/posts/:id/like
    Berfungsi untuk menghapus like pada postingan ( unlike ).
    HEADER : 
    AUTHENTICATION --> Bearer "token" (Bearer spasi token)

# Angga

1. GET api/conversations
   Berfungsi untuk menampilkan daftar semua ruangan obrolan pengguna yang sedang login beserta nama dan email partisipan (memerlukan token).
   HEADER :
   AUTHENTICATION --> Bearer "token" (Bearer spasi token)

2. POST api/conversations
   Berfungsi untuk membuat ruangan obrolan baru atau mencari ruangan yang sudah ada dengan user lain (memerlukan token).
   HEADER :
   AUTHENTICATION --> Bearer "token" (Bearer spasi token)
   Request Body JSON :
   {
   "receiverId" : "...",
   }

3. GET api/conversations/:id/messages
   Berfungsi untuk menarik riwayat pesan di dalam satu ruangan obrolan spesifik berdasarkan ID ruangan (memerlukan token).
   HEADER :
   AUTHENTICATION --> Bearer "token" (Bearer spasi token)

4. POST api/conversations/messages
   Berfungsi untuk mengirim pesan baru ke dalam suatu ruangan obrolan (memerlukan token).
   HEADER :
   AUTHENTICATION --> Bearer "token" (Bearer spasi token)
   Request Body JSON :
   {
   "conversationId" : "...",
   "text" : "...",
   }

5. DELETE api/conversations/messages/:messageId
   Berfungsi untuk menghapus satu pesan spesifik berdasarkan ID pesan. Hanya bisa dilakukan oleh pengirim pesan tersebut (memerlukan token).
   HEADER :
   AUTHENTICATION --> Bearer "token" (Bearer spasi token)

6. DELETE api/conversations/:id
   Berfungsi untuk menghapus seluruh ruangan obrolan beserta semua riwayat pesan yang ada di dalamnya secara permanen atau Cascade Delete (memerlukan token).
   HEADER :
   AUTHENTICATION --> Bearer "token" (Bearer spasi token)

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

1.  GET api/feeds

    Berfungsi untuk menampilkan feeds, mengambil 3 postingan secara random.

2.  POST /posts/:id/comments

    Berfungsi untuk melakukan comment berdasaarkan id postingan (memerlukan token).

    HEADER :
    AUTHENTICATION --> Bearer "token" (Bearer spasi token)

    Request Body JSON :

    {

        "comment" : "...",

    }

3.  GET /posts/:id/comments

    Berfungsi untuk menampilkan comment berdasarkan id postingan (memerlukan token).

    HEADER :
    AUTHENTICATION --> Bearer "token" (Bearer spasi token)

4.  GET /comments

    Berfungsi untuk menampilkan comment secara keseluruhan.

5.  DELETE /comments/:id

    Berfungsi untuk menghapus komentar berdasarkan id (memerlukan token).

    HEADER :
    AUTHENTICATION --> Bearer "token" (Bearer spasi token)
