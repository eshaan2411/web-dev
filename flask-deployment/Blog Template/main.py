from flask import Flask, request
from flask.helpers import url_for
from flask.templating import render_template
import requests
from datetime import datetime

from werkzeug.utils import redirect

blogs = requests.get(url="https://api.npoint.io/e796814b8db1566f9c4f").json()
date = datetime.now().date()

app = Flask(__name__)

@app.route('/')
def home():
    home_image = url_for('static', filename='assets/img/star.jpg')
    return render_template('index.html', home_image = home_image, blogs=blogs, date=date)

@app.route('/home')
def home_page():
    home_image = url_for('static', filename='assets/img/star.jpg')
    return render_template('index.html', home_image = home_image, blogs=blogs, date=date)

@app.route('/about')
def about():
    about_image = url_for('static', filename='assets/img/about-bg.jpg')
    return render_template('about.html', about_image = about_image, blogs=blogs, date=date)

@app.route('/contact')
def contact():
    contact_image = url_for('static', filename = 'assets/img/contact-bg.jpg')
    return render_template('contact.html', contact_image = contact_image, blogs=blogs, date=date)

@app.route('/post/<int:num>')
def post(num):
    if num==1:
        image = "cactus.jpg"
    elif num==2:
        image = "bored.jpg"
    else:
        image = "food.jpg"
    image_url = url_for('static', filename=f"assets/img/{image}")

    return render_template('post.html', date=date, blogs = blogs, num=num, image_url = image_url)


@app.route('/contact/success', methods=["POST"])
def success():
    if request.method == "POST":
        name = request.form["name"]
        email = request.form["email"]
        phone = request.form["phone"]
        message = request.form["message"]
        contact_image = url_for('static', filename = 'assets/img/contact-bg.jpg')
        return render_template('contact.html', message="Successfully sent the contact details!!", contact_image = contact_image, blogs=blogs, date=date)
    else:
        return redirect(url_for('contact'))

if __name__ == "__main__":
    app.run(debug=True)