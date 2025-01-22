from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('snake.html')

@app.route('/<mode>')
def game(mode):
    return render_template('snake.html', mode=mode)

if __name__ == '__main__':
    app.run(debug=True)