import flask
from flask import request, jsonify
from flask_cors import CORS
app = flask.Flask(__name__)
app.config["DEBUG"] = True

cors = CORS(app)

@app.route('/', methods=['GET', 'POST'])
def api_id():
    print(request)
    if 'id' in request.args:
        print(request.args['id'])

    return jsonify(1)

if __name__ == '__main__':
    app.run()