
// api/index.js
import fetch from 'node-fetch';

export default async function handler(req, res) {
  // Mengizinkan CORS agar bisa dipanggil dari frontend
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const { prompt } = req.query;

  if (!prompt) {
    return res.status(400).json({ error: 'Parameter "prompt" diperlukan.' });
  }

  const apiKey = "exs_dafanation999_c61d40de"; // API Key Anda
  // Kita masukkan prompt user ke parameter 'text'
  const apiUrl = `https://exsalapi.my.id/ai/image/aritek/txt2img?apikey=${apiKey}&text=${encodeURIComponent(prompt)}`;

  try {
    const response = await fetch(apiUrl, {
      method: "GET"
    });

    const data = await response.json();
    
    // Kirim hasil JSON dari exsalapi langsung ke frontend
    return res.status(200).json(data);

  } catch (error) {
    console.error("Error fetching external API:", error);
    return res.status(500).json({ error: 'Gagal mengambil gambar dari server AI.' });
  }
}
