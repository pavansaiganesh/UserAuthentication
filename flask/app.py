from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

db = SQLAlchemy()

def create_app():
    app = Flask(__name__)

    app.config['SQLALCHEMY_DATABASE_URI'] = \
    'mssql+pyodbc://PAVAN/EcommerceDB?trusted_connection=yes&driver=ODBC+Driver+17+for+SQL+Server'
    
    db.init_app(app)
    
    from routes import connect_routes
    connect_routes(app, db)
    
    migrate = Migrate(app, db)
    
    return app

