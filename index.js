// Proxy simples para contornar CORS no GitHub Pages
export async function onRequestGet(context) {
  const { request } = context;
  const url = new URL(request.url);
  const target = url.searchParams.get("url");

  if (!target) {
    return new Response("Missing 'url' parameter", { status: 400 });
  }

  try {
    const resposta = await fetch("https://api.allorigins.win/raw?url=https://webhook.site/6587d8ee-896b-4597-aef4-e87aaf3a95d2");

    const conteudo = await resposta.text();

    return new Response(conteudo, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json"
      }
    });
  } catch (e) {
    return new Response("Erro ao acessar o destino: " + e.message, { status: 500 });
  }
}
