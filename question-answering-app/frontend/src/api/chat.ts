export async function getAnswer(accessToken: string, question: string) {
  try {
    const response = await fetch(
      window.config.choreoApiUrl + "generate_answer",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ question: question }),
      }
    );

    if (response.ok) {
      const result = await response.json();
      return result.answer;
    } else if (response.status === 401) {
      return "Your session has expired. Please log in again.";
    } else {
      return "There was an error processing your request.";
    }
  } catch (error) {
    console.error("POST Error:", error, error.status);
    return "There was an error processing your request.";
  }
}

export async function getChatbotGreeting() {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      resolve("Hi there! What is your question about Choreo?");
    }, 500);
  });
}
