import openai
import pinecone
import tiktoken

from constants import PINECONE_INDEX_NAME, PINECONE_API_KEY, PINECONE_ENVIRONMENT, EMBEDDING_MODEL, CHAT_MODEL, \
    ENCODING, SEPARATOR, MAX_SECTION_LEN

pinecone.init(api_key=PINECONE_API_KEY, environment=PINECONE_ENVIRONMENT)


def get_embedding(text):
    result = openai.Embedding.create(
        engine=EMBEDDING_MODEL,
        input=text
    )

    return result["data"][0]["embedding"]


def fetch_document_sections(query, limit=5):
    """
    Find the query embedding for the supplied query, and compare it against all of the pre-calculated document embeddings
    to find the most relevant sections.
    """

    index = pinecone.Index(PINECONE_INDEX_NAME)
    query_embedding = get_embedding(query)
    documents = index.query(
        top_k=limit,
        include_metadata=True,
        vector=query_embedding
    )
    return documents["matches"]


def construct_prompt(question) -> str:
    """
    Fetch relevant document sections and construct a prompt to answer the question using the LLM.
    """
    most_relevant_document_sections = fetch_document_sections(question)

    chosen_sections = []
    chosen_sections_len = 0

    encoding = tiktoken.get_encoding(ENCODING)

    for document_section in most_relevant_document_sections:
        content = document_section["metadata"]["content"].replace("\n", " ")
        chosen_sections_len += len(encoding.encode(content + SEPARATOR))
        if chosen_sections_len > MAX_SECTION_LEN:
            break

        chosen_section = SEPARATOR + content
        chosen_sections.append(chosen_section)

    header = "Answer the question as truthfully and descriptively as possible using the provided context, " \
             "and if the answer is not contained within the text below, say \"Sorry, I didn't understand the " \
             "question. If it is about Choreo, could you please rephrase it and try again?\". "

    return header + "".join(chosen_sections) + "\n\n Q: " + question + "\n A:"


def answer_query_with_context(query):
    """
    Answer the query using the LLM.
    """
    prompt = construct_prompt(query)
    response = openai.ChatCompletion.create(
        engine=CHAT_MODEL,
        messages=[{"role": "system", "content": prompt}]
    )
    return response["choices"][0]["message"]["content"].strip(" \n")
