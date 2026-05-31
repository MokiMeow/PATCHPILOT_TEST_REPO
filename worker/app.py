"""Background worker. Imports flask + requests (reachable); leaves others unused."""
import flask
import requests

app = flask.Flask(__name__)


@app.route("/health")
def health():
    upstream = requests.get("https://api.acme.internal/ping", timeout=5)
    return {"ok": upstream.status_code == 200}
