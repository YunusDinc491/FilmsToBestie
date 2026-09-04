FilmsToBestie
Film ve dizilerini takip edebileceğin, izleme listesi oluşturup izlediklerine puan verebileceğin bir kütüphane uygulaması. OMDb entegrasyonu sayesinde harici bir film/dizi veritabanından arama yapıp tek tıkla kendi izlenecekler listene ekleyebilirsin.

Özellikler
Genel
Kullanıcı kayıt/giriş (JWT tabanlı kimlik doğrulama), admin ve normal kullanıcı rolleri
Anlık film arama (yazdıkça filtreleme)
Türkçe kategori sistemi 
Diziler ve Filmler için ayrı, filtrelenmiş sayfalar

İzleme Listesi
Ayrı bir İzlenecekler sayfası: henüz izlenmemiş filmler burada listelenir
En Son İzlediklerim sayfası: izlendi olarak işaretlenen filmler, kullanıcı puanıyla birlikte
İzlendi olarak işaretlerken 1-10 arası kişisel puan verilir
Kart üzerinde admin puanı ile kullanıcı puanının ortalaması bir rozet olarak gösterilir

Keşfet
OMDb API üzerinden film/dizi arama — herkes (giriş yapmamış kullanıcılar dahil) görebilir
Sonuçlar sayfalar hâlinde listelenir 
Giriş yapan kullanıcı, OMDb'den bulduğu bir filmi tek tıkla kendi izlenecekler listesine ekleyebilir — film otomatik olarak kütüphaneye kaydedilir, tekrar elle girmeye gerek kalmaz

Teknolojiler
Backend:
ASP.NET Core (.NET 8), Entity Framework Core
SQL Server (LocalDB)
JWT ile kimlik doğrulama, BCrypt ile şifre hashleme
OMDb API entegrasyonu

Frontend:
React + Vite
React Router
