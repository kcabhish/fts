// import { TranslateClient, TranslateTextCommand } from "@aws-sdk/client-translate"; // ES Modules import
const { TranslateClient, TranslateTextCommand } = require("@aws-sdk/client-translate"); // CommonJS import

const SOURCE_LANGUAGE_CODE = 'en';
const TARGET_LANGUAGE_CODE = 'es';

export async function translate(text, sourceCode = SOURCE_LANGUAGE_CODE, targetCode = TARGET_LANGUAGE_CODE) {
    if (sourceCode === targetCode) return text;
    const config = { region: 'us-east-1', maxRetries: 15 };
    const client = new TranslateClient(config);
    const input = {
        Text: text,
        SourceLanguageCode: sourceCode,
        TargetLanguageCode: targetCode,
        Settings: {
            Formality: "FORMAL" || "INFORMAL",
            Profanity: "MASK",
        },
    };
    const command = new TranslateTextCommand(input);
    const response = await client.send(command);
    return response.TranslatedText;
}
