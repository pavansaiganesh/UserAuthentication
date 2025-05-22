from flask import request, jsonify
from models import RegisterData
from werkzeug.security import generate_password_hash, check_password_hash
import uuid

def connect_routes(app, db):
    @app.route('/registerUser', methods=['POST'])
    def register_user():
        user_data = request.get_json()
        
        if RegisterData.query.filter_by(email=user_data['email']).first():
            return jsonify({"message": "Email already exists"}), 400
        
        token = str(uuid.uuid4())
        
        hashed_password = generate_password_hash(user_data['password'])

        new_data = RegisterData(userName=user_data['userName'], email=user_data['email'], phone=user_data['phone'], password=hashed_password, cpass=hashed_password, token=token)

        db.session.add(new_data)
        db.session.commit()

        return jsonify({"message": "Registration Done", "token": token}), 201
    
    @app.route('/getUserData', methods=['POST'])
    def get_user_data():
        auth_token = request.json.get('auth')
        
        if not auth_token:
            return jsonify({"message": "Token is missing"}), 401
            
        # Find user's token in SQL Server
        user = RegisterData.query.filter_by(token=auth_token).first()
        
        if user:
            user_data = {
                "id": user.id,
                "userName": user.userName,
                "email": user.email,
                "phone": user.phone
            }
            return jsonify(user_data), 200
            
        return jsonify({"message": "Invalid token"}), 401
    
    @app.route('/userLogin', methods=['POST'])
    def checkLogin():
        login_data = request.get_json()
        
        user = RegisterData.query.filter_by(email=login_data['email']).first()
        
        if not user:
            return jsonify({"error": "User email not registered "}), 401
        
        if check_password_hash(user.password, login_data['password']):
            new_token = str(uuid.uuid4())
            user.token = new_token
            db.session.commit()
            
            return jsonify({"token": new_token}), 200
        
        else:
            return jsonify({"error": "Incorrect password"}), 401
    
    @app.route('/testing')
    def testing():
        return 'Hello Digga'