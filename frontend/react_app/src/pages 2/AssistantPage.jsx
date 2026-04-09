import { useState } from "react";

import { useAssistant } from "../hooks/useAssistant";

export default function AssistantPage() {
  const [query, setQuery] = useState("How can I improve wheat yield in low rainfall conditions?");
  const { loading, answer, sources, error, submitQuestion } = useAssistant();

  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-leaf-800">RAG AI Farming Assistant</h2>
      <form
        className="rounded-2xl border border-white/70 bg-white/80 p-5 shadow-panel"
        onSubmit={(event) => {
          event.preventDefault();
          submitQuestion(query);
        }}
      >
        <textarea
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          className="h-28 w-full rounded-xl border border-leaf-200 p-3 outline-none focus:border-leaf-500"
        />
        <button
          type="submit"
          className="mt-3 rounded-xl bg-leaf-700 px-4 py-2 font-medium text-white transition hover:bg-leaf-600"
          disabled={loading}
        >
          {loading ? "Thinking..." : "Ask Assistant"}
        </button>
      </form>
      {error ? <p className="rounded-xl bg-rose-100 p-4 text-rose-700">{error}</p> : null}
      {answer ? (
        <article className="rounded-2xl border border-white/70 bg-white/80 p-5 shadow-panel">
          <h3 className="mb-2 text-lg font-semibold">Answer</h3>
          <p className="leading-relaxed text-leaf-700">{answer}</p>
          <h4 className="mt-4 font-semibold">Sources</h4>
          <ul className="list-disc pl-6 text-sm text-leaf-700">
            {sources.map((source) => (
              <li key={source}>{source}</li>
            ))}
          </ul>
        </article>
      ) : null}
    </section>
  );
}
