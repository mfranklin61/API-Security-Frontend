import { useState } from "react";

export default function APISecurityFrontend() {
  const [response, setResponse] = useState(null);
  const apiBaseUrl = "https://gtxuziiq8e.execute-api.us-east-2.amazonaws.com/Test";

  async function callAPI(endpoint, method = "GET", body = null, headers = {}) {
    setResponse("Loading...");
    try {
      const res = await fetch(`${apiBaseUrl}${endpoint}`, {
        method,
        headers: { "Content-Type": "application/json", ...headers },
        body: body ? JSON.stringify(body) : null,
      });
      const data = await res.json();
      setResponse(JSON.stringify(data, null, 2));
    } catch (error) {
      setResponse(`Error: ${error.message}`);
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-5">
      <h1 className="text-3xl font-bold text-gray-800">
        API Security Frontend
      </h1>
      <p className="text-gray-600 mb-5">
        Test Frontend Application for the APIs built for security practices
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600"
          onClick={() => callAPI("/public")}
        >
          Test Public API
        </button>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600"
          onClick={() =>
            callAPI("/protected", "GET", null, { "x-api-key": "YOUR_API_KEY" })
          }
        >
          Test Protected API
        </button>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600"
          onClick={() =>
            callAPI("/data", "POST", { username: "test", password: "1234" })
          }
        >
          Test Data API
        </button>
      </div>

      <div className="mt-5 w-full max-w-2xl bg-white p-4 rounded-lg shadow">
        <h2 className="text-lg font-semibold text-gray-800">Response:</h2>
        <pre className="text-sm text-gray-700 bg-gray-200 p-3 rounded overflow-auto h-48">
          {response || "Click a button to make a request"}
        </pre>
      </div>
    </div>
  );
}
