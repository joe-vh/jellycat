import pytest
import json
from app import app


def test_create_route():
    data = {'description': 'Test14', 'name': 'Test14', 'price': 14, 'quantity': 1}
    response = app.test_client().post('/products', data=json.dumps(data), headers={"Content-Type": "application/json"})
    assert response.status_code == 200


def test_read_route():
    response = app.test_client().get('/products')
    assert response.status_code == 200

    result = json.loads(response.data.decode('utf-8')).pop()
    assert result['description'] == 'Test14'
    assert result['name'] == 'Test14'
    assert float(result['price']) == 14
    assert result['quantity'] == 1


def test_update_route():
    response = app.test_client().get('/products')
    result = json.loads(response.data.decode('utf-8')).pop()

    response = app.test_client().put('/products', data=json.dumps(
        {'id': result['id'], 'description': 'New description', 'name': 'New name', 'quantity': 5, 'price': 5}
    ), headers={"Content-Type": "application/json"})

    assert response.status_code == 200

    response = app.test_client().get('/products')
    result = json.loads(response.data.decode('utf-8')).pop()

    assert result['description'] == 'New description'
    assert result['name'] == 'New name'
    assert float(result['price']) == 5
    assert result['quantity'] == 5


def test_delete_route():
    response = app.test_client().get('/products')
    result = json.loads(response.data.decode('utf-8')).pop()

    response = app.test_client().delete('/products', data=json.dumps({'id': result['id']}), headers={"Content-Type": "application/json"})

    assert response.status_code == 200
