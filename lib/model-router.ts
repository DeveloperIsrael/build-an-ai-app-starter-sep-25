export interface RouterConfig {
    task: 'classification' | 'summarization' | 'reasoning';
    maxLatencyMs: number;
    priority: 'cost' | 'quality';
}

export function selectModel(config: RouterConfig): string {
    if (config.task === 'classification' && config.priority === "quality") {
        return "openai/gpt-5";

    } else if (config.task === 'classification' && config.priority === 'cost') {
        return "openai/gpt-5-mini";
    }

    if (config.task === 'summarization' && config.priority === 'quality') {
        return "openai/gpt-5";
    } else if (config.task === 'summarization' && config.priority === "cost") {
          return "openai/gpt-5-mini";
    }

    if (config.task === 'reasoning' && config.priority === 'quality') {
        return "openai/gpt-5";
    } else if (config.task === 'reasoning' && config.priority === 'cost') {
        return "openai/gpt-5-mini"
    }
    return 'openai/gpt-5-mini';
}