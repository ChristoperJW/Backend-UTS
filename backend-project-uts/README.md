# Endpoint yang bisa diakses (serta pembuatnya):

# Christoper : 
1.  POST api/auth/register/
    Berfungsi untuk mendaftarkan akun baru
    JSON : 
    {
        "email" : "...",
        "password" : "...",
        "confirm_password" : "...",
        "full_name" : "...",
    }

2.  POST api/auth/login/
    Berfungsi untuk login dan mendapatkan token
    JSON : 
    {
        "email" : "...",
        "password" : "...",
    }

3.  GET api/auth/me/
    Berfungsi untuk mendapatkan informasi akun, berdasarkan token
    HEADER : 
    AUTHENTICATION --> Bearer "token" (Bearer spasi token)

4.  GET api/users/:id/
    Berfungsi untuk mendapatkan informasi akun, berdasarkan id

5.  PUT api/users/:id/
    Berfungsi mengubah email atau nama lengkap di akun, berdasarkan id (memerlukan token)
    HEADER : 
    AUTHENTICATION --> Bearer "token" (Bearer spasi token)
    JSON : 
    {
        "email" : "...", (akun baru)
        "full_name" : "...", (nama lengkap baru)
    }

6.  GET api/users?search=fullname/ (spasi memakai %20)
    Berfungsi untuk mencari data akun, berdasarkan nama user

7.  PUT api/users/:id/change-password/
    Berfungsi untuk mengubah password user, berdasarkan id (memerlukan token)
    HEADER : 
    AUTHENTICATION --> Bearer "token" (Bearer spasi token)
    JSON : 
    {
        "old_password" : "...",
        "new_password" : "...",
        "confirm_new_password" : "...",
    }

8.  DELETE api/users/:id/
    Berfungsi menghapus akun user, berdasarkan id (memerlukan token)
    HEADER : 
    AUTHENTICATION --> Bearer "token" (Bearer spasi token)

9.  GET api/users/
    Berfungsi untuk menampilkan semua user yang telah mendaftar

# Louise





# Angga





# Michael





# Monica