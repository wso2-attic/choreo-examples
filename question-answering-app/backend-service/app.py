import logging
import os

import openai
from flask import request, Flask

from answer_generator import answer_query_with_context
from constants import OPENAI_API_TYPE, AZURE_OPENAI_API_VERSION, OPENAI_API_KEY, OPENAI_API_BASE

openai.api_key = OPENAI_API_KEY
openai.api_base = OPENAI_API_BASE
openai.api_type = OPENAI_API_TYPE
openai.api_version = AZURE_OPENAI_API_VERSION

app = Flask(__name__)


@app.route('/generate_answer', methods=['POST'])
def generate_answer():
    try:
        json_body = request.json
        question = json_body.get('question')

    except Exception as e:
        logging.error("Request is not properly formatted: " + str(e), exc_info=True)
        return "Request is not properly formatted.", 400

    try:
        answer = answer_query_with_context(question)

        return {
            'answer': answer
        }
    except Exception as e:
        logging.error("Error generating answer: " + str(e), exc_info=True)
        return "There was an error generating the answer", 500


if __name__ == '__main__':
    app.run()
