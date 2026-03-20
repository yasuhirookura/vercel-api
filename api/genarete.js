export default async function handler(req, res) {
try {
const { input } = req.body;

const response = await fetch("https://api.openai.com/v1/chat/completions", {
method: "POST",
headers: {
"Content-Type": "application/json",
"Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
},
body: JSON.stringify({
model: "gpt-4o-mini",
messages: [
{
role: "user",
content: `整体院のLPキャッチコピーを3案作ってください。
以下の条件をもとに、短めで訴求力のある日本語コピーを3つ作ってください。
出力は必ず改行区切りの3行だけにしてください。

${input}`
}
]
})
});

const data = await response.json();
res.status(200).json(data);
} catch (error) {
res.status(500).json({ error: error.message });
}
}