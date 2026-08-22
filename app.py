from flask import Flask, render_template, request, jsonify
app = Flask(__name__)

ragas = {

    ("Calm","Evening","Relaxation"):
    {
        "name":"Raag Yaman",
        "reason":"A peaceful evening raga that creates calmness and relaxation."
    },

    ("Spiritual","Morning","Meditation"):
    {
        "name":"Raag Bhairav",
        "reason":"Traditionally performed in the morning and associated with devotion."
    },

    ("Happy","Afternoon","Practice"):
    {
        "name":"Raag Desh",
        "reason":"Bright and joyful raga suitable for daytime practice."
    },

    ("Calm","Night","Study"):
    {
        "name":"Raag Darbari",
        "reason":"Deep and soothing raga that helps concentration."
    }

}

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/learning")
def learning():
    return render_template("learning.html")

@app.route("/listening")
def listening():
    return render_template("listening.html")

    

@app.route("/recommend", methods=["POST"])
def recommend():

    mood = request.form["mood"]
    time = request.form["time"]
    purpose = request.form["purpose"]

    if mood == "Calm" and time == "Evening":
        raga = "Raag Yaman"
        reason = "Perfect for evening and creates peace."

    elif mood == "Spiritual" and time == "Morning":
        raga = "Raag Bhairav"
        reason = "Morning devotional raga."

    elif purpose == "Study":
        raga = "Raag Hamsadhwani"
        reason = "Instrumental version helps concentration."

    else:
        raga = "Raag Desh"
        reason = "A versatile raga suitable for most listeners."

    return render_template(
        "result.html",
        raga=raga,
        reason=reason
    )

@app.route("/heritage")
def heritage():
    return render_template("heritage.html")

@app.route("/study")
def study():
    return render_template("study.html")

@app.route("/survey", methods=["GET", "POST"])
def survey():

    if request.method == "POST":

        name = request.form["name"]
        rating = request.form["rating"]
        feedback = request.form["feedback"]

        return render_template(
            "thankyou.html",
            name=name,
            rating=rating
        )

    return render_template("survey.html")

@app.route("/about")
def about():
    return render_template("about.html")

@app.route("/chat", methods=["POST"])
def chat():

    message = request.json["message"].lower()

    if "yaman" in message:
        reply = "Raag Yaman is an evening raga known for peace and devotion."

    elif "study" in message:
        reply = "Raag Hamsadhwani is recommended for study and concentration."

    elif "bhairav" in message:
        reply = "Raag Bhairav is a morning devotional raga."

    else:
        reply = "Sorry, I don't know that yet. Ask about Yaman, Bhairav or Study."

    return jsonify({"reply": reply})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)