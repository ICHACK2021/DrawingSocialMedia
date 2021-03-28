from flask import json
from db import DBHandler
import time
import json
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
        else:
            foundUsername = db_handler.username_exists(args["username"])
            foundEmail = db_handler.email_exists(args["email"])
            if(foundUsername):
                status = 10
            elif(foundEmail):
                status = 11
            else:
                db_handler.add_new_user(
                    args['username'], args['password'], args['email'], request.data.decode("utf-8"))
        return jsonify({"status": status, "message": STATUS[status]})

    @app.route('/newpost', methods=['POST'])
    def post():
        args = request.args
        status = 0
        if 'username' not in args:
            status = 1
        else:
            db_handler.add_new_post(
                args["username"], request.data.decode("utf-8"), time.strftime('%Y-%m-%d %H:%M:%S'))

        return jsonify({"status": status, "message": STATUS[status]})

    @app.route('/getpost', methods=['POST'])
    def get():
        status = 0
        posts = list(map(post_to_json, db_handler.get_posts()))
        return {"status": status, "message": STATUS[status], "posts": posts}

    app.run()


def post_to_json(post):
    return {"id": post[0], "username": post[1], "picture": post[2], "date": post[3]}


if __name__ == '__main__':
    run()


"""
login status
0 : good
1 : no username
2 : no password
3 : username or password incorrect
"""
