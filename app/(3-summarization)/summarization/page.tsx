"use client";

import { MessageList } from "./message-list";
import { Button } from "@/components/ui/button";
import messages from "./messages.json";
import { useState } from "react";

import { generateSummary } from './actions'; // Import the action
import { SummaryCard } from './summary-card'; // Import the UI component

// Define the expected type based on the action's return type
type Summary = Awaited<ReturnType<typeof generateSummary>>;

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState<Summary | null>(null);
  const [error, setError] = useState<string | null>(null);
  return (
    <main className="mx-auto max-w-2xl pt-8">
      <div className="flex space-x-4 items-center mb-2">
        <h3 className="font-bold">Comments</h3>
        <Button
          variant={"secondary"}
          disabled={loading}
          onClick={async () => {
            setLoading(true);
            setSummary(null);
            setError(null);
            try {
              const result = await generateSummary(messages);
              setSummary(result);
            } catch (error) {
              console.error("Summarization failed:", error);
              setError("Failed to generate summary. Try again.");
            } finally {
              setLoading(false);
            }
          }}
        >
          {loading ? "Summarizing..." : "Summarize"}
        </Button>
      </div>
      {error && <p className="text-sm text-destructive mt-2">{error}</p>}
      {summary && <SummaryCard {...summary} />}
      <MessageList messages={messages} />
    </main>
  );
}
