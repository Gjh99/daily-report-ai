import {VolcArkLLM} from "./volcArkLLM.js";
import OPENAI_API_KEY from "./env.js";
import {PromptTemplate} from "@langchain/core/prompts";
export async function generateReport(commits) {

    const volcLLM = new VolcArkLLM({
        token: OPENAI_API_KEY,
        model: "",
    })

    const prompt = new PromptTemplate({
        template: `你是一位高级的牛马前端工程师，Git 提交记录生成一段用于日报的简洁总结，突出关键进展：{input}`,
        inputVariables: ["input"],
    })

    const chain = prompt.pipe(volcLLM);

    console.log('commits===>', commits)

    const response = await chain.invoke({input: commits});

    console.log(`日报内容：${response}`)

    return response;
}
