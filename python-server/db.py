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
