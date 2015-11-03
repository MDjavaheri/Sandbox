/* Sample SQL tables for query practice that also teach you about recent gedolim, their origins, sefarim, and relationships 12 Av 5775, Achsanya DeOraita, 1-800-Flowers.com*/
CREATE TABLE recent_gedolim (id INTEGER PRIMARY KEY auto_increment, Shem TEXT, background TEXT, main_position_held TEXT);
INSERT INTO recent_gedolim 
	(Shem, background, main_position_held) 
	VALUES  
		("Rav Ovadia", "Iraqi", "Rishon LeTzion"),
		("Rav Mordechai Eliyahu", "Iraqi", "Rishon LeTzion"),
		("Chacham Yosef Chaim", "Iraqi", "Rosh Golat Ariel"),
		("Chacham Ben Tzion Abba Shaul", "Persian", "Rosh Yeshivat Porat Yosef"),
		("Rav Shalom MeshASh", "Moroccan", "Rav HaRoshi, Yerushalayim"),
		("Rav Shlomo Moshe Amar", "Moroccan", "Rishon LeTzion"),
		("Rav Eliyahu Bakhchi Doron", "Persian", "Rishon LeTzion"),
		("Rav Eliyahu Ben Chaim", "Persian", "Rosh Yeshivat R'' Yitzchak Elchanan"),
		("Rav Moshe HaLevi", "Syrian", "Ra''m, Yeshivat Kisseh Rachamim"),
		("Rav Yaakov Chaim Sofer", "Iraqi", NULL),
		("Rav Ezra Attiah", "Syrian", "Rosh Yeshivat Porat Yosef"),
		("Rav Yehudah Tzadka", "Iraqi", "Rosh Yeshivat Porat Yosef"),
		("Rav Hershel Schachter", "Ashkenazi", "Rosh Yeshivat R'' Yitzchak Elchanan"),
		("Rav Yitzchak Yosef", "Iraqi", "Rishon LeTzion"),
		("Rav Ben Tzion Meir Chai Uziel", "???", "Rishon LeTzion"),
		("Rav Yitzchak Nissim", "Iraqi", "Rishon LeTzion"),
		("Rav Chaim David HaLevi", "???", "Rav HaRoshi, Tel Aviv"),
		("Rav David Yosef", "Iraqi", "Rav Shechunah, Har Nof"),
		("Rav Mordechai Willig", "Ashkenazi", "Rosh Yeshivat R'' Yitzchak Elchanan"),
		("Rav Eliezer Yehudah Waldenberg", "Ashkenazi", "Rav, Beit Cholim Bikkur Cholim"),
		("Rav Yitzchak Kaduri", "Iraqi", "Mekubal"),
		("Rav Tzadka Chutzin", "Iraqi", "Rav Beit HaKenesset, ???"),
		("Rabbi Avraham Yeshaya Karelitz", "Ashkenazi", "None"),
		("Rav Yaakov Hillel", "Iraqi", "Rosh Mosdot Ahavat Shalom"),
		("Rav Moshe Tzadka", "Iraqi", "Rosh Yeshivat Porat Yosef"),
		("Rav Shalom Cohen", "Iraqi", "Rosh Yeshivat Porat Yosef"),
		("Rav Reuven Elbaz", "???", "Rosh Mosdot Ohr HaChaim"),
		("Rav Yisrael Abuchatzera", "Moroccan", "Mekubal"),
		("Rav Yosef Dov HaLevi Soloveitchic (The Rav)", "Ashkenazi", "Rosh Yeshivat R'' Yitzchak Elchanan"),
		("Rav Yisrael Meir Lau", "Ashkenazi", "Rav HaRoshi LeYisrael"),
		("Rav David Lau", "Ashkenazi", "Rav HaRoshi LeYisrael"),
		("Rav Shmuel HaLevi Vosner", "Ashkenazi", "Rosh Yeshivat Chachmei Lublin"),
		("Rav Yosef Dov HaLevi Soloveitchic (Beis HaLevi)", "Ashkenazi", "Rosh Yeshivat Etz Chaim"),
		("Rav Chaim HaLevi Soloveitchic", "Ashkenazi", "Rav HaIr Brisk"),
		("Rav Yisrael Meir Meir HaKohen Kagan", "Ashkenazi", "Rosh Yeshivat Radin"),
		("Rav Avraham Yitzchak HaKohen Kook", "Ashkenazi", "Rav HaRoshi LeYisrael"),
		("Rav Elchanan Wasserman", "Ashkenazi","Rosh Yeshivat Baranovitch"),
		("Rav Shimon Shkop", "Ashkenazi", "Rosh Yeshivat Shaar HaTorah"),
		("Rav Chaim Ozer Grodzinsky", "Ashkenazi","???"),
		("Rav Baruch Ber", "Ashkenazi", "Rosh Yeshivat Kamenetzk"),
		("Rav Yosef Shalom EliyAShiv", "Ashkenazi","Learning"),
		("Rav Chaim Kanievsky", "Ashkenazi", "Learning"),
		("Rav Yisroel Belsky", "Ashkenazi", "Rosh Yeshivat Torah VoDaas"),
		("Rav Moshe Feinstein", "Ashkenazi", "Rosh Yeshivat Mesivta Tiferet Yerushalyim"),
		("Rav David Feinstein", "Ashkenazi", "Rosh Yeshivat Mesivta Tiferet Yerushalyim"),
		("Rav Moshe Shternbuch", "Ashkenazi", "Ra'avad HaEidah haCharedit"),
		("Rav Chaim Pinchas Sheinberg", "Ashkenazi", "Rosh Yeshivat Torah Ore"),
		("Rav Shlomo Zalman Auerbach", "Ashkenazi", "Rosh Yeshivat Kol Torah"),
		("Rav Asher Weiss", "Ashkenazi", "Rosh Mosdot Minchat Asher");

/*Sefarim Table*/

CREATE TABLE sefarim (id INTEGER PRIMARY KEY auto_increment, Shem TEXT, author_id INTEGER, volumes INTEGER, category TEXT);

INSERT INTO sefarim 
	(Shem, author_id, volumes, category) 
	VALUES 
		("Yabia Omer", 1, 10, "Shu''t"),
		("Yechaveh Daat", 1, 6, "Shu''t"),
		("Shu''t Chazon Ovadia", 1, 2, "Shu''t"),
		("Chazon Ovadia", 1, 20, "Halacha"),
		("Meor Yisrael", 1, 4, "Misc."),
		("Anaf Etz Avot", 1, 1, "Pirkei Avot"),
		("Taharat HaBayit", 1, 3, "Halacha"),
		("Halichot Olam", 1, 8, "Halacha"),
		("Darkei Taharah", 2, 1, "Halacha"),
		("Kitzur Shulchan Aruch", 2, 1, "Halacha"),
		("Ben Ish Chai", 3, 1, "Halacha"),
		("Rav Pealim", 3, 4, "Shu''t"),
		("Torah Lishmah", 3, 1, "Shu''t"),
		("Benayahu al hAShAS", 3, 3, "Gemara"),
		("Ben Yehoyada al HaShaS", 3, 4, "Gemara"),
		("Benayahu al HaTorah", 3, 1, "Parasha"),
		("Ben Yehoyada al HaTorah", 3, 1, "Parasha"),
		("Aderet Eliyahu", 3, 1, "Gemara"),
		("Od Yosef Chai Halachot", 3, 1, "Halacha"),
		("Od Yosef Chai DerAShot", 3, 1, "Parasha"),
		("Mekabtziel", 3, 1, "Halacha"),
		("Ohr LeTzion", 4, 4, "Shu''t"),
		("Ohr LeTzion: Chochmah uMussar", 4, 1, "Mussar//Machashava"),
		("Ohr LeTzion: Yevamot", 4, 1, "Gemara"),
		("Ohr LeTzion: Ketubot", 4, 2, "Gemara"),
		("Ohr LeTzion: Sheviit", 4, 1, "Halacha"),
		("Shemesh uMagen", 5, 4, "Shu''t"),
		("Shema Shlomo", 6, 8, "Shu''t"),
		("Kerem Shlomo", 6, 2, "Shu''t"),
		("Menuchat Ahavah", 9, 3, "Halacha"),
		("Birkat Hashen", 9, 5, "Halacha"),
		("Milveh Hashem", 9, 2, "Halacha"),
		("Tefillah LeMoshe", 9, 2, "Halacha"),
		("Kaf HaChaim", 10, 10, "Halacha"),
		("Kol Yaakov", 10, 1, "Halacha"),
		("Nefesh HaRav", 13, 1, "Divrei Haaracha"),
		("MiPninei HaRav", 13, 1, "Divrei Haaracha"),
		("Divrei HaRav", 13, 1, "Divrei Haaracha"),
		("Eretz HaTzvi", 13, 1, "Halacha"),
		("BeIkvei HaTzon", 13, 1, "Halacha"),
		("Ginat Egoz", 13, 1, "Halacha"),
		("Yalkut Yosef", 14, 50, "Halacha"),
		("Shulchan HaMaarechet", 14, 2, "Minhagim"),
		("Ein Yitzchak", 14, 3, "Klalim"),
		("Iggeret LeBen Torah", 14, 1, "Mussar//Machashava"),
		("Mishpitei Uziel", 15, 10, "Shu''t"),
		("Piskei Uziel", 15, NULL, "Halacha"),
		("Aseh Lecha Rav", 17, 10, "Shu''t"),
		("Mekor Chaim", 17, 2, "Shu''t"),
		("Torat HaMoadim", 18, 5, "Halacha"),
		("Halacha Berurah", 18, 18, "Halacha"),
		("Am Mordechai", 19, 4, "Halacha"),
		("Tzitz Eliezer", 20, 22, "Shu''t"),
		("Chazon Ish", 23, 6, "Halacha"),
		("Chazon Ish: Emunah uVitachon", 23, 1, "Mussar//Machashava"),
		("Vayashov HaYam", 24, 2, "Shu''t"),
		("Yachel Yisrael", 30, 6, "Pirkei Avot"),
		("Shevet HaLevi", 31, 11, "Shu''t"),
		("Mishnah Berurah", 35, 6, "Halacha"),
		("Shemirat HaLashon", 35, 1, "Halacha"),
		("Chafetz Chaim", 35, 1, "Halacha"),
		("Ahavat Chessed", 35, 1, "Halacha"),
		("Shem Olam", 35, 1, "Halacha"),
		("Kovetz Shiurim", 37, 2, "Gemara"),
		("Kovetz Hearot", 37, 1, "Gemara"),
		("Kovetz Maamarim", 37, 2, "Halacha"),
		("Shaarei Yosher", 38, 2, "Lumdus"),
		("Achiezer", 39, 2, "Shu''t"),
		("Birkat Shmuel", 40, 5, "Lumdus"),
		("Iggrot Moshe", 44, 9, "Shu''t"),
		("Dibrot Moshe", 44, 10, "Gemara"),
		("Teshuvot veHanhagot", 46, 7, "Shu''t"),
		("Moadim uZemanim", 46, 4, "Lumdus"),
		("Tabaat HaChoshen", 47, 5, "Lumdus"),
		("Mishmeret Chaim", 47, 3, "Lumdus"),
		("Minchat Shlomo", 48, 3, "Shu''t"),
		("Minchat Shlomo", 48, 10, "Gemara"),
		("Minchat Asher", 49, 7, "Parasha"),
		("Minchat Asher", 49, 15, "Gemara"),
		("Minchat Asher", 49, 2, "Shu''t");
/*Gedolim plus number of sefarim*/
SELECT recent_gedolim.Shem, recent_gedolim.background, recent_gedolim.main_position_held, sum(sefarim.volumes) FROM recent_gedolim left outer join sefarim on recent_gedolim.id = sefarim.author_id GROUP BY recent_gedolim.id;
/*Gedolim Backgrounds*/
SELECT DISTINCT background FROM recent_gedolim;

/*Ashkenazi Gedolim*/
SELECT * FROM recent_gedolim WHERE background = "Ashkenazi" order by background desc;

/*Sepharadi Gedolim*/
SELECT * FROM recent_gedolim WHERE background != "Ashkenazi" order by background desc;

/*Roshei Yeshiva*/
SELECT * FROM recent_gedolim WHERE main_position_held LIKE "%Rosh Yeshiva%";

/*Rishon LeTzions*/
SELECT * FROM recent_gedolim WHERE main_position_held = "Rishon LeTzion";

SELECT sefarim.Shem AS Sefer, recent_gedolim.Shem AS Author, sefarim.volumes AS Volumes, sefarim.category AS Category FROM sefarim left outer join recent_gedolim on recent_gedolim.id = sefarim.author_id;

SELECT DISTINCT category FROM sefarim;

/*Unfinished, considering revising implementation*/
CREATE TABLE relationships (id INTEGER PRIMARY KEY AUTOINCREMENT, id1 INTEGER, id2 INTEGER, relationship TEXT);

INSERT INTO relationships (id1, relationship, id2) VALUES (1, 2, "Colleague");
INSERT INTO relationships (id1, relationship, id2)  VALUES (1, "Chavruta", 4);
INSERT INTO relationships (id1, relationship, id2)  VALUES (1, "Colleague", 5);
INSERT INTO relationships (id1, relationship, id2)  VALUES (1, "Colleague", 6);
INSERT INTO relationships (id1, relationship, id2)  VALUES (1, "Rebbe", 7);
INSERT INTO relationships (id1, relationship, id2)  VALUES (1, "Co-Dayan", 39);
INSERT INTO relationships (id1, relationship, id2)  VALUES (1, "Father", 14);
INSERT INTO relationships (id1, relationship, id2)  VALUES (1, "Father", 17);
INSERT INTO relationships (id1, relationship, id2)  VALUES (1, "Colleague", 25);
INSERT INTO relationships (id1, relationship, id2)  VALUES (1, "Bar Plugta", 19);
INSERT INTO relationships (id1, relationship, id2)  VALUES (1, "Colleague", 16);
INSERT INTO relationships (id1, relationship, id2)  VALUES (1, "Colleague", 15);
INSERT INTO relationships (id1, relationship, id2)  VALUES (22, "Rebbe", 13);

/*
SELECT gadol1.Shem, gadol2.Shem, relationships.relationship FROM relationships join recent_gedolim AS gadol1 join recent_gedolim AS gadol2 on relationships.id1 = gadol1.Shem and relationships.id2 = gadol2.Shem;*/


