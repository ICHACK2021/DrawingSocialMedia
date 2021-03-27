import sqlite3


class DBHandler:
    def __init__(self, db_name='database.db'):
        self.db_name = db_name

    def execute(self, command):
        with sqlite3.connect(self.db_name) as con:
            cursor = con.cursor()
            cursor.execute(command)
            return cursor.fetchall()

    def verify_user(self, username, password):

        out = self.execute(
            """
            SELECT ID FROM USERS
            WHERE USERNAME="%s"
            AND PASSWORD="%s";
            """
            % (username, password)
        )

        return not out == []

    def username_exists(self, username):
        out = self.execute(
            """
            SELECT ID FROM USERS
            WHERE USERNAME="%s";
            """
            % (username)
        )
        return not out == []

    def email_exists(self, email):
        out = self.execute(
            """
            SELECT ID FROM USERS
            WHERE EMAIL="%s";
            """
            % (email)
        )
        return not out == []

    def add_new_user(self, username, password, email, picture):
        out = self.execute(
            """
            INSERT INTO USERS (EMAIL, USERNAME, PASSWORD, PFP)
            VALUES ("%s", "%s", "%s", "%s");
            """
            % (email, username, password, profile_picture)
        )
        return

    def rev_friends(self, user1, user2):
        out = self.execute(
            """
            SELECT STATUS FROM FRIENDS
            WHERE USER1 = "%s" AND USER2 = "%s"
            """
            % (user2, user1)
        )
        return

    def add_friend(self, user1, user2):
        # if reverse order exists, set status to 1 (accepted)
        if (rev_friends):
            self.execute(
                """
                UPDATE FRIENDS 
                SET STATUS = 1
                WHERE USER1 = "%s" AND USER2 = "%s"
                """ % (user2, user1)
            )
        # else add new row with status 0 (pending)
        else:
            self.execute(
                """
                INSERT INTO FRIENDS
                VALUES ("%s", "%s", 0)
                """ % (user1, user2)
            )
        return

    def get_friends(self, user):
        friends = self.execute(
            """
            SELECT USER1 FROM FRIENDS
            WHERE STATUS = 1 AND USER2 = "%s"
            UNION
            SELECT USER2 FROM FRIENDS
            WHERE STATUS = 1 AND USER1 = "%s"
            """ % (user)
        )
        return friends

    def add_new_post(self, username, image, date):
        self.execute(
            """
            INSERT INTO POSTS (USERNAME, IMAGE, DATE)
            VALUES("%s", "%s", "%s")
            """ % (username, image, date)
        )
        return

    def get_posts(self, count, f=-1):
        count = len(self.execute("SELECT * from POSTS;"))

        if(f < 0):
            f = count

        self.execute(
            """
                SELECT * from POSTS
                ORDERED BY id DESC
                LIMIT %d, %d;
            """ % (f, count)
        )
        return

    def add_new_dm(self, sender, reciever, img):
        self.execute(
            """
            INSERT INTO DMS(SENDER, RECIEVER, IMG)
            VALUES("%s", "%s", "%s")
            """ % (sender, reciever, img)
        )
        return

    # def get_dms_between(user1, user2):
    #     self.execute(
    #         """
    #         SELECT SENDER, IMG
    #         FROM DMS
    #         WHERE USER1 =
    #         """
    #     )
