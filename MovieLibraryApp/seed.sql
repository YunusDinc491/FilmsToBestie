-- Bu script, MovieLibraryDb veritabanindaki Movies tablosunu doldurur.
-- Kullanim: once "dotnet ef database update" ile semayi olustur, sonra bu scripti calistir.
-- sqlcmd -S "(localdb)\MSSQLLocalDB" -d MovieLibraryDb -i seed.sql

SET IDENTITY_INSERT Movies ON;

INSERT INTO Movies (Id, Title, Description, Genres, ReleaseYear, PosterUrl, Rating, IsSeries, ImdbId)
VALUES
(4, N'Yıldızlararası', N'', N'Bilim Kurgu', 2015, N'https://localhost:7206/images/11cfc7c2-5884-4544-8420-a39ddccbea15.jpg', 0, 0, NULL),
(6, N'Avatar', N'', N'Sci-Fi', 2010, N'https://localhost:7206/images/361efd80-fa7d-4311-b9ea-15f7e17b526f.jpg', 0, 0, NULL),
(7, N'How I Met Your Mother', N'', N'Comedy', 2012, N'https://localhost:7206/images/c5d77304-1db8-4c16-8ad0-155c4160b0e9.jpg', 0, 1, NULL),
(8, N'F.R.I.E.N.D.S', N'', N'Comedy', 2013, N'https://localhost:7206/images/7b102088-23a7-4816-8991-cc18db1443ae.jpg', 8, 1, NULL),
(9, N'Spider-Man Brand New Day', N'', N'Fantastik,Bilim Kurgu', 2026, N'https://localhost:7206/images/7499cdaf-381b-4078-ad4f-36ba0907281f.jpg', 10, 0, NULL);

SET IDENTITY_INSERT Movies OFF;

SET IDENTITY_INSERT Users ON;

INSERT INTO Users (Id, Username, Email, PasswordHash, Role)
VALUES
(2, N'baharecem', N'ynsdinc333@gmail.com.tr', N'$2a$11$69HIDEfKnxTC1kYO6chKjurflm0Uo5pj2LW/vP7xxzuVZXEung/t6', N'User'),
(3, N'deneme1', N'deneme@gmail.com', N'$2a$11$gpq1mpkV96jNyeB8wFTNAeWTOUutLIuQn3e11jWDk1oVOSoG0ryKq', N'User'),
(4, N'deneme11', N'deneme@dnm.com', N'$2a$11$yX3zUZZ3/rGABAYCQxJVKOlFhbApp2YnWCXRshgX6c6NuTYqf6FUC', N'User'),
(5, N'yunusdinc', N'ynsdinc333@gmail.com', N'$2a$11$Hcqfk3WOTsZ.CCWq1qqdau8AlTjcEYlEhpvdNuA8w5BFN/jRl.h3G', N'Admin'),
(6, N'baharecem1', N'bhs@gmail.com', N'$2a$11$bHDp5lABj0.SeQKDh7RgPu9lVrl3CxSwzs3ifVFw6HnPIKJulh2aq', N'User'),
(7, N'deneme2', N'd@gmail.com', N'$2a$11$Bu3j4LB5FJzZ2CofHzplSeCj4wEx4SizWTF1v0tWCgpGDQdpohHyy', N'User');

SET IDENTITY_INSERT Users OFF;

SET IDENTITY_INSERT WatchListItems ON;

INSERT INTO WatchListItems (Id, UserId, MovieId, AddedAt, IsWatched, WatchedAt, UserRating)
VALUES
(7, 7, 7, '2026-09-04 21:01:57.7304515', 1, '2026-05-09 00:00:00.0000000', 6),
(8, 7, 8, '2026-09-04 21:20:32.9950649', 1, '2026-09-04 21:20:41.2477155', 5);

SET IDENTITY_INSERT WatchListItems OFF;
