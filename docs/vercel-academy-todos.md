# Vercel AI SDK Academy — Todos, Challenges & Sidequests

All actionable tasks from the [Vercel AI SDK Academy](https://vercel.com/academy/ai-sdk), organized by lesson.

---

## Section 1 — Foundations

### Lesson 1: Introduction to LLMs

- [ ] **Reflection:** Explore the OpenAI Tokenizer Tool, analyze how text gets tokenized, and consider how it impacts prompt design

---

### Lesson 2: Prompting Fundamentals

- [ ] **Exercise 1:** Few-shot prompting in AI SDK Playground — categorize feedback with labeled examples, then remove examples and compare results
- [ ] **Exercise 2:** Chain-of-thought in Playground — test multi-step reasoning, then rephrase without CoT and compare
- [ ] **Exercise 3:** Structured output in Playground — apply JSON schema (category, sentiment, priority) to analyze feedback
- [ ] **Reflection Challenge:** Pick a feature idea → choose best prompting technique (Zero-Shot, Few-Shot, CoT) and justify

---

### Lesson 3: AI SDK Dev Setup

- [ ] Clone starter repo, install deps, configure Vercel AI Gateway (OIDC or API key), run `pnpm tsx env-check.ts`

---

### Lesson 4: Data Extraction *(partially done)*

- [ ] Run `pnpm extraction` — verify AI correctly extracts names from `essay.txt`
- [ ] **Challenge 1:** Modify prompt to summarize the essay in 50 words
- [ ] **Challenge 2:** Swap model from `gpt-5-mini` to `gpt-5` and compare quality

**Side Quest — Extraction Expert:**

> Master different extraction patterns by building specialized prompts for various data types.
>
> **Challenge:** Build a universal extractor that can handle multiple data types in a single prompt. How would you structure the output to clearly separate different types of extracted data?

- [ ] Implement company extraction, concept categorization, and quote extraction with attribution (structured JSON)

**Side Quest — Advanced Prompt Engineering:**

> Apply advanced prompting techniques to dramatically improve extraction accuracy and format consistency.
>
> **Challenge:** Create a 'smart name extractor' that not only finds names but also infers relationships between people mentioned. Can you extract a social/professional network from the text?

- [ ] Few-shot extraction examples
- [ ] Consistency testing function (run same prompt N times)

**Side Quest — Streaming Extraction Pipeline:**

> Process massive documents chunk-by-chunk using streaming APIs and map/reduce summarization.
>
> **Challenge:** Add resumable processing so crashes resume from the last completed chunk.

- [ ] Process large docs by chunking (~4000 tokens/chunk) and merging results

---

### Lesson 5: Model Types and Performance *(partially done — `model-comparision.ts` exists)*

- [ ] **TODO 1:** Implement `testFastModel()` — test `gpt-5-mini` on complex problem, record time
- [ ] **TODO 2:** Implement `testReasoningModel()` — test `gpt-5.2` on same input, record time
- [ ] **TODO 3:** Implement comparison analysis — display timing differences and observations
- [ ] Run `pnpm tsx model-comparison.ts`

**Side Quest — Model Router:**

> Demonstrate ≥40% blended cost savings across the supplied evaluation suite without lowering accuracy beyond 5%.
>
> **Challenge:** Create a route at `app/api/model-router/stats` that returns JSON visualization data for routing decisions over the last 100 calls.

- [ ] Implement `lib/model-router.ts` with `selectModel()` function accepting task type, latency constraints, cost/quality priority → returns provider/model string

---

## Section 2 — Invisible AI

### Lesson 6: Introduction to Invisible AI *(partially done)*

- [ ] **Step 1:** Implement plain text extraction in `app/(2-invisible-ai)/test-structured.ts` — `generateText` for names extraction
- [ ] **Step 2:** Implement structured extraction with `Output.object()` + Zod schema (title, date, time, location, attendees)
- [ ] **Step 3:** Run `pnpm invisible-ai:compare` and observe the difference
- [ ] Implement `smartFormFill` in `invisible-ai-demo.ts` — Zod schema for calendar event, extract from natural language

**Optional Challenge — Email Triage:**
- [ ] Implement `smartEmailTriage` with schema for (category, priority, suggestedResponse)
- [ ] Decide on `.optional()` vs `.nullable()` for fields
- [ ] Test via `pnpm invisible-ai:demo`

---

### Lesson 7: Text Classification

- [ ] **Step 1:** Define Zod schema with `z.enum` for 5 categories: `billing`, `product_issues`, `enterprise_sales`, `account_issues`, `product_feedback` in `app/(2-classification)/classification.ts`
- [ ] **Step 2:** Run `pnpm classification`
- [ ] **Step 3 — Iteration 1:** Add `urgency` field (low/medium/high)
- [ ] **Step 4 — Iteration 2:** Switch to multilanguage dataset, add `language` field, use `.describe()` for full language names

**Side Quest — Multi-Label Classification:**

> Real-world support requests often belong to multiple categories simultaneously.
>
> **Challenge:** How does the model's accuracy change with multi-label classification? Does it tend to assign too many or too few categories? How might you optimize the prompt for better multi-label results?

- [ ] Transform single enum into array allowing multiple categories per ticket

**Side Quest — Real-time Moderation API:**

> Build a streaming moderation pipeline that classifies, scores, and routes messages at enterprise scale.
>
> **Challenge:** Add Redis caching for repeated messages and implement rate limiting middleware.

- [ ] Build `app/api/moderation/route.ts` with severity levels (safe/warning/critical), category detection (spam/violence/pii/other), and confidence scoring

---

### Lesson 8: Automatic Summarization

- [ ] **Step 1:** Create `app/(3-summarization)/summarization/actions.ts` — Zod schema (headline, context, discussionPoints, takeaways) + `generateSummary` using `Output.object()`
- [ ] **Step 2:** Wire up `page.tsx` — import action and SummaryCard, add state, onClick handler, conditional render
- [ ] **Step 3:** Test at `localhost:3000/summarization`
- [ ] **Step 4:** Enhance schema with `.describe()` (max 5 words headline, max 2 sentences context)

**Side Quest — Scale to 1000+ Comments:**

> Explore techniques for handling larger datasets when your simple Server Action isn't enough.
>
> **Challenge:** How would you handle incremental updates? If new comments arrive while processing, how do you update the summary without re-processing everything? Consider caching strategies and differential updates.

- [ ] Chunk into groups of 15–20
- [ ] MapReduce pattern with parallel processing
- [ ] Concurrency control with `p-limit` (max 5)
- [ ] Optional selective summarization by importance

---

### Lesson 9: Structured Data Extraction

- [ ] **Step 1:** Create `app/(4-extraction)/extraction/schemas.ts` — Zod schema (title, startTime nullable, endTime nullable, attendees nullable, location nullable, date required)
- [ ] **Step 2:** Create `app/(4-extraction)/extraction/actions.ts` — `extractAppointment` using `Output.object()`
- [ ] **Step 3:** Wire up `app/(4-extraction)/extraction/page.tsx` — state, handleSubmit, pass to CalendarAppointment component
- [ ] **Step 4:** Enhance schema with `.describe()` for time format (HH:MM 24h), date format (YYYY-MM-DD), endTime default (1-hour duration)
- [ ] Test with: `"Meeting with Guillermo Rauch about Next Conf Keynote Practice tomorrow at 2pm at Vercel HQ"`

**Side Quest — Advanced Date/Time Parsing:**

> Date and time values from AI models need special handling for reliable use in applications.
>
> **Challenge:** How could you handle recurring appointments? Design a schema extension that captures frequency (daily, weekly, monthly) and end conditions.

- [ ] Use `date-fns` for ISO format, relative dates, HH:MM validation

**Side Quest — Extraction Validation Pipeline:**

> Validator achieves ≥99% accuracy on benchmark dataset with audit logs for failures.
>
> **Challenge:** Support plug-in rule engines so downstream teams can extend validations without code changes.

- [ ] Create `lib/extraction-validator.ts` with staged validation (Zod syntax → business rules → external API → confidence scoring)

---

### Lesson 10: UI with v0

- [ ] Generate CalendarAppointment card component at v0.app using detailed prompt
- [ ] Generate SummaryCard component; install shadcn deps and lucide-react
- [ ] Create `components/SummaryCard.tsx`, update imports in summarization page
- [ ] Test at `localhost:3000/summarization`

---

## Section 3 — Conversational AI

### Lesson 11: Basic Chatbot

- [ ] **Step 1:** Create `app/api/chat/route.ts` — extract messages, `streamText` with `gpt-5-mini`, `toUIMessageStreamResponse()`
- [ ] **Step 2:** Build `app/(5-chatbot)/chat/page.tsx` — `useChat` hook, message display, input form, error handling
- [ ] **Step 3:** Test scenarios (code generation, markdown, conversation history, scrolling)

**Side Quest — Conversation Memory:**

> Augment the basic chatbot with long-term memory backed by a vector store and summarization refresh.
>
> **Challenge:** Support multiple personas with isolated memory stores and configurable decay rates.

- [ ] `registerMemory()` with embeddings
- [ ] `retrieveMemories()` via vector DB similarity search

---

### Lesson 12: AI Elements

- [ ] Install: `pnpm dlx ai-elements@latest`
- [ ] **Step 1:** Import Conversation, Message, PromptInput components
- [ ] **Step 2:** Replace `<div>` message display with Message/MessageContent components
- [ ] **Step 3:** Wrap in Conversation/ConversationContent, add ConversationEmptyState, verify auto-scroll
- [ ] **Step 4:** Replace form with PromptInput/PromptInputTextarea/PromptInputSubmit; add loading state
- [ ] **Step 5:** Import MessageResponse, wrap assistant messages, verify markdown and code highlighting

---

### Lesson 13: System Prompts

- [ ] **Experiment 1:** Add system prompt in `route.ts`, ask "What is Next.js?"
- [ ] **Experiment 2:** Replace with riddle-bot persona, observe behavior
- [ ] **Experiment 3:** Replace with Steve Jobs 1984 persona, test with "What is Next.js?"
- [ ] **Experiment 4:** Build TechCorp support assistant — test password reset, pricing, off-topic
- [ ] Draft a system prompt for a chatbot serving your own use case (2–3 sentences)

---

### Lesson 14: Tool Use

- [ ] **Step 1:** Create `app/api/chat/tools.ts` — `getWeather` tool with description, Zod schema (city: string), execute calling Open-Meteo API
- [ ] **Step 2:** Register tool in `route.ts` via `tools: { getWeather }`
- [ ] **Step 3:** Handle `"tool-getWeather"` parts in chat page with switch statement (raw JSON first)
- [ ] **Step 4:** Replace raw JSON with Tool/ToolHeader/ToolContent/ToolInput/ToolOutput components
- [ ] **Step 5:** Test "What's the weather in San Francisco?"

**Side Quest — Complex Tool Schema:**

> Building more sophisticated tools requires careful parameter design and validation.
>
> **Challenge:** How well does the AI handle dependent fields? For example, if a return date must be after a departure date, can the AI consistently provide valid parameter combinations?

- [ ] Design flight booking tool (origin/destination/dates, passengers array, cabin preferences)

**Side Quest — Production Error Handling:**

> Make your tools resilient with proper error handling, validation, and debugging strategies.
>
> **Challenge:** How would you handle partial failures? For example, if you're fetching weather for multiple cities and one fails, should the entire tool call fail or return partial results?

- [ ] Timeout with `AbortSignal.timeout()`
- [ ] Retry with exponential backoff
- [ ] Input validation whitelist
- [ ] Caching

---

### Lesson 15: Multi-Step & Generative UI

- [ ] **Step 1:** Add `stopWhen: stepCountIs(5)` to `streamText()` in route
- [ ] Test: single city, two cities, compare 3 cities
- [ ] **Step 2 — TODO:** In chat page `case "tool-getWeather"`, render `<Weather weatherData={part.output} />` when `part.state === "output-available" && part.output`
- [ ] Test with "What's the weather in Tokyo?" → verify styled weather cards

**Side Quest — Dynamic Component Mapper:**

> Demonstrate automatic UI component selection for at least 3 different tool types with full TypeScript type safety.
>
> **Challenge:** Add a fallback component that intelligently renders unknown tool outputs based on their data structure.

- [ ] Create `lib/component-registry.ts` — generic registry mapping tool types to React components

---

### Lesson 16: Conclusion

Pick one from each tier and implement:

**Quick Win (1–2 hours):**
- [ ] Classify into a support workflow
- [ ] Deploy the summarization action
- [ ] Apply extraction to a form

**Medium Project (1–2 days):**
- [ ] Support bot with tools
- [ ] Docs assistant with system prompts
- [ ] Upgrade chat UI with AI Elements

**Ambitious Goal (1 week):**
- [ ] Multi-step automation with conditional tool chaining
- [ ] RAG system
- [ ] Custom generative UI components
