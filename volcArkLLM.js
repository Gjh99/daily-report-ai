
import axios from "axios";
import { BaseLLM } from "@langchain/core/language_models/llms";

export class VolcArkLLM extends BaseLLM {
    constructor(fields = {}) {
        super(fields);
        this.token = fields.token;
        this.model = fields.model || "";
        this.apiUrl = fields.apiUrl || "https://ark.cn-beijing.volces.com/api/v3/chat/completions";
    }
    _llmType() {
        return "volc-ark";
    }
    async _generate(prompts, options) {
        try {
            const prompt = prompts[0];
            const res = await axios.post(
                this.apiUrl,
                {
                    model: this.model,
                    messages: [{role: "user", content: prompt}],
                },
                {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${this.token}`
                }
                }
            );

            const content = res.data?.choices?.[0]?.message?.content ?? "[空响应]";

            return {
                generations: [
                    [
                        {
                            text: content,
                            generationInfo: {},
                        },
                    ],
                ],
                llmOutput: {
                    tokenUsage: res.data?.usage || {},
                },
            };
        } catch (err) {
            console.error("火山方舟请求出错：", err.response?.data || err.message);
            throw new Error("VolcArk LLM 调用失败");
        }
    }
}
