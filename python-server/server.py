from flask import json
from db import DBHandler
import flask
from flask import request, jsonify
from flask_cors import CORS


STATUS = {0: "Sucess", 1: "No username",
          2: "No password", 3: "No email",
          4: "No Picture", 10: "Username exists",
          11: "Password exists",  100: "Incorrect username or password"}


def run():
    app = flask.Flask(__name__)
    app.config["DEBUG"] = True
    cors = CORS(app)
    db_handler = DBHandler()

    @app.route('/', methods=['POST'])
    def main():
        return jsonify("Nothing to see here")

    @app.route('/login', methods=['POST'])
    def login():
        args = request.args
        status = 0
        if 'username' not in args:
            status = 1
        elif 'password' not in args:
            status = 2
        else:
            found = db_handler.verify_user(args["username"], args["password"])
            if(not found):
                status = 100
        return jsonify({"status": status, "message": STATUS[status]})

    @app.route('/register', methods=['POST'])
    def register():
        args = request.args
        status = 0
        if 'username' not in args:
            status = 1
        elif 'password' not in args:
            status = 2
        elif 'email' not in args:
            status = 3
        elif 'picture' not in args:
            status = 4
        else:
            foundUsername = db_handler.username_exists(args["username"])
            foundEmail = db_handler.email_exists(args["email"])
            if(foundUsername):
                status = 10
            elif(foundEmail):
                status = 11
            else:
                return jsonify("good")
        return jsonify({"status": status, "message": STATUS[status]})

    app.run()


if __name__ == '__main__':
    run()


"""
login status
0 : good
1 : no username
2 : no password
3 : username or password incorrect
"""
