from flask import request, Response, json, Blueprint

tests = Blueprint("test", __name__)

@tests.route('/', methods = ["GET", "POST"])
def handle_test():
    return Response(
        status=200,
        response=json.dumps({'status': "success"}),
        mimetype='application/json'
    )
