// Swap these with real backend calls later
export const api = {
  async generateLyrics(payload: { receiverName: string; gender: "male" | "female" | "other"; genre: string }) {
    // mock now; replace with fetch(`${import.meta.env.VITE_API}/api/lyrics`, {...})
    await new Promise((r) => setTimeout(r, 500));
    const { receiverName, genre } = payload;
    // tiny sample; backend will return real model output
    return `Happy birthday ${receiverName}, bright day\nJoy and light, come your way\n... (${genre} style)`;
  },
};
