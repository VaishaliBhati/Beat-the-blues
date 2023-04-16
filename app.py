import sqlite3
from flask import Flask, render_template, request, url_for, flash, redirect
from werkzeug.exceptions import abort

# Opening the connection to database #
def get_db_connection():
    conn = sqlite3.connect('database.db')
    conn.row_factory = sqlite3.Row
    return conn

############# NEW CODE FOR FEELINGS TABLE #####################
# Function to read single feeling #
def get_feeling(feeling_id):
    conn = get_db_connection()
    feeling = conn.execute('SELECT * FROM feelings WHERE id = ?',
                        (feeling_id,)).fetchone()
    conn.close()
    if feeling is None:
        abort(404)
    return feeling

############# //NEW CODE FOR FEELINGS TABLE #####################


# Function to read single post #
def get_post(post_id):
    conn = get_db_connection()
    post = conn.execute('SELECT * FROM posts WHERE id = ?',
                        (post_id,)).fetchone()
    conn.close()
    if post is None:
        abort(404)
    return post

app = Flask(__name__)
#app.config['SECRET_KEY'] = 'VAI123***'

@app.route('/')
def index():
    conn = get_db_connection()
    #posts = conn.execute('SELECT * FROM posts').fetchall()
    feelings = conn.execute('SELECT * FROM feelings').fetchall()
    conn.close()
    #return render_template('index.html', posts=posts)
    return render_template('index.html', feelings=feelings)


#to specify that the part after the slash (/) is a positive integer (marked with the int converter) that you need to access in your view function.#
@app.route('/<int:post_id>')
def post(post_id):
    post = get_post(post_id)
    return render_template('post.html', post=post)

# To allow users to add new posts via html form online
@app.route('/create', methods=('GET', 'POST'))
def create():
    if request.method == 'POST':
        title = request.form['title']
        content = request.form['content']
        label = request.form['label']
        author = request.form['author']

        if not title:
            flash('Title is required!')
        else:
            conn = get_db_connection()
            conn.execute('INSERT INTO posts (label,title, content, author) VALUES (?, ?, ?, ?)',
                         (label, title, content,author))
            conn.commit()
            conn.close()
            return redirect(url_for('index'))

    return render_template('create.html')


# EDITING THE EXISTING POST

@app.route('/<int:id>/edit', methods=('GET', 'POST'))
def edit(id):
    post = get_post(id)

    if request.method == 'POST':
        title = request.form['title']
        content = request.form['content']

        if not title:
            flash('Title is required!')
        else:
            conn = get_db_connection()
            conn.execute('UPDATE posts SET title = ?, content = ?'
                         ' WHERE id = ?',
                         (title, content, id))
            conn.commit()
            conn.close()
            return redirect(url_for('index'))

    return render_template('edit.html', post=post)


# DELETE AN EXISTING POST
@app.route('/<int:id>/delete', methods=('POST',))
def delete(id):
    post = get_post(id)
    conn = get_db_connection()
    conn.execute('DELETE FROM posts WHERE id = ?', (id,))
    conn.commit()
    conn.close()
    flash('"{}" was successfully deleted!'.format(post['title']))
    return redirect(url_for('index'))