from flask import request, Response, json, Blueprint
from src import db, bcrypt
from src.models.user_model import User
from jwt import encode
import os


users = Blueprint("users", __name__)

@users.route('/signup', methods=["POST"])
def handle_signup():
    try:
        data = request.get_json()
        if not data:
            return Response(
                response=json.dumps({'status': "failed", "message": "Request body must be JSON"}),
                status=400,
                mimetype='application/json'
            )

        if all(key in data for key in ("username", "email", "password")):

            user = User.query.filter_by(email=data["email"]).first()

            if not user:
                user_obj = User(
                    username=data["username"],
                    email=data["email"],
                    password=bcrypt.generate_password_hash(data['password']).decode('utf-8')
                )

                db.session.add(user_obj)
                db.session.commit()

                payload = {
                    'username': user_obj.username,
                    'email': user_obj.email,
                }

                token = encode(payload, os.getenv('SECRET_KEY'), algorithm='HS256')

                return Response(
                    response=json.dumps({
                        'status': "success",
                        "message": "User Sign up Successful",
                        "token": token
                    }),
                    status=201,
                    mimetype='application/json'
                )

            else:
                return Response(
                    response=json.dumps({
                        'status': "failed",
                        "message": "User already exists kindly use sign in"
                    }),
                    status=409,
                    mimetype='application/json'
                )

        else:
            return Response(
                response=json.dumps({
                    'status': "failed",
                    "message": "User Parameters username, email, and password are required"
                }),
                status=400,
                mimetype='application/json'
            )

    except Exception as e:
        return Response(
            response=json.dumps({
                'status': "failed",
                "message": "Error Occurred",
                "error": str(e)
            }),
            status=500,
            mimetype='application/json'
        )

@users.route('/signin', methods = ["POST"])
def handle_login():
    try:
        data = request.json
        if "email" and "password" in data:

            user = User.query.filter_by(email = data["email"]).first()

            if user:

                if bcrypt.check_password_hash(user.password, data["password"]):

                    payload = {
                        'username': user.username,
                        'email': user.email,
                        }
                    token = encode(payload,os.getenv('SECRET_KEY'),algorithm='HS256')

                    return Response(
                            response=json.dumps({'status': "success",
                                                "message": "User Sign In Successful",
                                                "token": token}),
                            status=200,
                            mimetype='application/json'
                        )

                else:
                    return Response(
                        response=json.dumps({'status': "failed", "message": "User Password Mistmatched"}),
                        status=401,
                        mimetype='application/json'
                    )

            else:
                return Response(
                    response=json.dumps({'status': "failed", "message": "User Record doesn't exist, kindly register"}),
                    status=404,
                    mimetype='application/json'
                )
        else:

            return Response(
                response=json.dumps({'status': "failed", "message": "User Parameters Email and Password are required"}),
                status=400,
                mimetype='application/json'
            )

    except Exception as e:
        return Response(
                response=json.dumps({'status': "failed",
                                     "message": "Error Occured",
                                     "error": str(e)}),
                status=500,
                mimetype='application/json'
            )
