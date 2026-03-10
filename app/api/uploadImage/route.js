import axios from 'axios';

export async function POST(req) {
  try {
    const { imageBase64 } = await req.json();
    const formData = new FormData();
    formData.append('image', imageBase64);

    const response = await axios.post(
      `https://api.imgbb.com/1/upload?key=3d64b0e9dee39ca593b9da32467663ee`,
      formData,
      { headers: { 'Content-Type': 'multipart/form-data' } }
    );

    return new Response(JSON.stringify({ url: response.data.data.url }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(JSON.stringify({ message: 'Upload failed' }), { status: 500 });
  }
}
