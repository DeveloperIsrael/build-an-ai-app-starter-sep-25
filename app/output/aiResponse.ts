export function AiResponseError(error: Error) {
    console.error('❌ Extraction failed:', error.message);
    console.log('\n💡 Common issues:');
    console.log('  - Check your .env.local file has valid API keys');
    console.log('  - Verify essay.txt exists at app/(1-extraction)/essay.txt');
    console.log('  - Ensure you have internet connectivity for API calls');
    process.exit(1);
} 

export function AiResponse(text: string){
    console.log('\n--- AI Response ---');
    console.log(text);
    console.log('------------');
}