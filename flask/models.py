from app import db

class RegisterData(db.Model):
    __tablename__ = 'Register'
    id = db.Column(db.Integer, primary_key=True)
    userName = db.Column(db.String(50))
    email = db.Column(db.String(50), unique=True)
    phone = db.Column(db.String(20))
    password = db.Column(db.String(500))
    cpass = db.Column(db.String(500))
    token = db.Column(db.String(200))

    def __repr__(self):
        return f'User with name {self.userName} is added'