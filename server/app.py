# app.py
import os
from flask import Flask, jsonify, request, Response
from flask_cors import CORS, cross_origin
from flask_sqlalchemy import SQLAlchemy
from dataclasses import dataclass
from numbers import Number

project_dir = os.path.dirname(os.path.abspath(__file__))
database_file = "sqlite:///{}".format(os.path.join(project_dir, "productdatabase.db"))

app = Flask(__name__)
cors = CORS(app)

app.config['CORS_HEADERS'] = 'Content-Type'
app.config["SQLALCHEMY_DATABASE_URI"] = database_file

db = SQLAlchemy(app)


@dataclass
class Product(db.Model):
    id: int
    name: str
    description: str
    price: Number
    quantity: int

    __tablename__ = 'Products'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(80), unique=False, nullable=False, primary_key=False)
    description = db.Column(db.String(200), unique=False, nullable=True, primary_key=False)
    price = db.Column(db.Numeric, unique=False, nullable=False, primary_key=False)
    quantity = db.Column(db.Integer, unique=False, nullable=False, primary_key=False)


with app.app_context():
    db.create_all()


@app.route("/products", methods=["GET"])
@cross_origin()
def read_products():
    products = Product.query.all()
    return products


@app.route("/products", methods=["POST"])
@cross_origin()
def create_product():
    try:
        content = request.get_json(silent=True)

        product = Product(
            name=content["name"],
            description=content["description"],
            price=content["price"],
            quantity=content["quantity"],
        )
        db.session.add(product)
        db.session.commit()
        print("product")
        print(product.id)
        return Response(status=200)
    except Exception as e:
        print("Failed to add product")
        print(e)
        return Response(status=400)


@app.route("/products", methods=["PUT"])
@cross_origin()
def update_product():
    try:
        content = request.get_json(silent=True)

        product = Product.query.filter_by(id=content["id"]).first()
        product.name = content["name"]
        product.description = content["description"]
        product.price = content["price"]
        product.quantity = content["quantity"]
        db.session.commit()
        return Response(status=200)
    except Exception as e:
        print("Couldn't update product")
        print(e)
        return Response(status=400)


@app.route("/products", methods=["DELETE"])
@cross_origin()
def delete_product():
    try:
        content = request.get_json(silent=True)

        product = Product.query.filter_by(id=content["id"]).first()
        db.session.delete(product)
        db.session.commit()
        return Response(status=200)
    except Exception as e:
        print("Couldn't delete product")
        print(e)
        return Response(status=400)


@app.route("/products/search", methods=["GET"])
@cross_origin()
def search_products():
    try:
        products = Product.query.filter(Product.name.contains(request.args.get('query'))).all()
        return products
    except Exception as e:
        print("Couldn't search products")
        print(e)
        return Response(status=400)




if __name__ == "__main__":
    app.run()
