// Proxy simples para contornar CORS no GitHub Pages
export async function onRequestGet(context) {
  const { request } = context;
  const url = new URL(request.url);
  const target = url.searchParams.get("url");

  if (!target) {
    return new Response("Missing 'url' parameter", { status: 400 });
  }

  try {
    const resposta = await fetch(target);
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
