INSERT INTO USERS (ID, EMAIL, USERNAME, PASSWORD) VALUES (null, "fakeuser1@fake.com", "fakeuser1", "fakeuser1");
INSERT INTO USERS (ID, EMAIL, USERNAME, PASSWORD) VALUES (null, "fakeuser2@fake.com", "fakeuser2", "fakeuser2");
INSERT INTO USERS (ID, EMAIL, USERNAME, PASSWORD) VALUES (null, "fakeuser3@fake.com", "fakeuser3", "fakeuser3");

SELECT ID FROM USERS
WHERE USERNAME = "fakeuser1" AND PASSWORD = "fakeuser1";

SELECT ID FROM USERS
WHERE USERNAME = "fakeuser1";