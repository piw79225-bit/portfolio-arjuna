import { GoogleGenAI } from "@google/genai";

export class LabAssistantService {
  /**
   * Mengobrol dengan Arjuna (AI Assistant).
   * @param userMessage Pesan dari pengguna.
   * @returns Respon dari model.
   */
  async chatWithArjuna(userMessage: string) {
    try {
      // Inisialisasi GoogleGenAI tepat sebelum melakukan panggilan API sesuai panduan.
      // Selalu gunakan process.env.API_KEY secara langsung.
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: userMessage,
        config: {
          systemInstruction: `
            Kamu adalah AI Assistant di "Laboratorium Teknologi ID" milik Arjuna.
            
            Profil Arjuna:
            - Status utama: Portofolio Inovasi Digital.
            - Fokus: Integrasi antara Kecerdasan Buatan (AI), Pendidikan Informatika, dan Strategi Media.
            - Kepribadian: Profesional, visioner, dan sangat teknis namun ramah (seperti asisten lab futuristik).
            
            Tugasmu:
            - Jelaskan bahwa situs ini adalah portofolio Arjuna yang menampilkan berbagai eksperimen teknis.
            - Jika ditanya tentang projek, hubungkan dengan kategori seperti AI, Education, atau Media.
            - Gunakan istilah laboratorium secara halus (misal: "data eksperimen", "modul edukasi", "arsip inovasi").
            - Jawab dalam Bahasa Indonesia yang elegan dan modern.
          `,
          temperature: 0.6,
        },
      });
      // Gunakan properti .text untuk mendapatkan output string.
      return response.text;
    } catch (error) {
      console.error("Gemini Error:", error);
      return "Koneksi ke server lab terputus. Mohon coba beberapa saat lagi.";
    }
  }
}

export const labAssistant = new LabAssistantService();