// AI Chat Application - JavaScript Version
// MindfulAI: Mental Health Support Chatbot

class MindfulAI {
    constructor() {
        this.baseUrl = 'http://127.0.0.1:11434';
        this.useOllama = false;
        this.crisisKeywords = [
            'bunuh diri', 'suicide', 'mengakhiri hidup', 'kill myself', 'self harm', 'melukai diri',
            'mati saja', 'lebih baik mati', 'tidak ada harapan', 'no hope', 'useless', 'tidak berguna',
            'ingin hilang', 'disappear', 'tidak ada gunanya hidup', 'life is worthless',
            'sakit hati', 'broken heart', 'putus asa', 'desperate', 'hopeless'
        ];
        
        this.init();
    }

    async init() {
        // Test if Ollama is available
        try {
            const response = await fetch(`${this.baseUrl}/api/tags`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
                signal: AbortSignal.timeout(3000)
            });
            
            if (response.ok) {
                const data = await response.json();
                if (data.models && data.models.length > 0) {
                    this.useOllama = true;
                    console.log('Ollama is available');
                }
            }
        } catch (error) {
            console.log('Ollama not available, using scripted responses');
            this.useOllama = false;
        }
    }

    // Crisis detection
    detectCrisis(userMessage) {
        const lower = userMessage.toLowerCase();
        
        for (const keyword of this.crisisKeywords) {
            if (lower.includes(keyword)) {
                return {
                    reply: 'Aku sangat menyesal kamu merasakan hal ini. Keselamatanmu adalah prioritas. Jika kamu berisiko menyakiti diri, segera hubungi 112/119 atau orang terdekat. Jika mau, ceritakan apa yang kamu rasakan—aku akan menemanimu dengan langkah yang aman.',
                    crisis: true,
                    emergency_contacts: {
                        '112': 'Nomor Darurat Nasional',
                        '119': 'Badan SAR Nasional',
                        '021-500-567': 'Layanan Darurat Jakarta',
                        '0800-1000-567': 'Layanan Darurat Gratis'
                    }
                };
            }
        }
        return null;
    }

    // Get scripted responses
    getScriptedResponse(userText) {
        const text = userText.toLowerCase();
        
        // Greeting & General Responses (prioritas tinggi)
        if (text.includes('halo') || text.includes('hai') || text.includes('hello') || text.includes('hi') || text.includes('apa kabar') || text.includes('selamat pagi') || text.includes('selamat siang') || text.includes('selamat malam')) {
            const responses = [
                'Halo! Senang bertemu denganmu. Aku MindfulAI, siap mendengarkan dan mendukungmu. Bagaimana perasaanmu hari ini?',
                'Hai! Terima kasih sudah menghubungi MindfulAI. Aku di sini untuk mendengarkan ceritamu. Ada yang ingin kamu bicarakan?',
                'Hello! Selamat datang di MindfulAI. Aku siap mendampingi perjalanan kesehatan mentalmu. Apa yang bisa aku bantu hari ini?',
                'Hai! Senang kamu ada di sini. Aku MindfulAI, teman yang siap mendengarkan. Bagaimana kabarmu?',
                'Halo! Terima kasih sudah mempercayai MindfulAI. Aku di sini untuk mendukungmu. Ada yang ingin kamu diskusikan?'
            ];
            return responses[Math.floor(Math.random() * responses.length)];
        }
        
        // Stress & Anxiety Responses
        if (text.includes('stres') || text.includes('stress') || text.includes('tekanan') || text.includes('beban') || text.includes('pusing')) {
            const responses = [
                'Terima kasih sudah berbagi perasaanmu. Stres memang bisa terasa berat. Coba tarik napas perlahan 4 hitungan, tahan 7, lalu buang 8. Latihan ini bisa membantu menenangkan pikiran. Apa yang membuatmu merasa stres hari ini?',
                'Stres adalah respons alami tubuh terhadap tekanan. Coba teknik 5-4-3-2-1: lihat 5 benda, dengar 4 suara, sentuh 3 benda, cium 2 aroma, rasakan 1 rasa. Ini bisa membantu fokus pada saat ini.',
                'Stres yang berlebihan bisa mempengaruhi kesehatan mental dan fisik. Coba buat daftar prioritas dan fokus pada satu hal dulu. Apa yang paling penting untuk diselesaikan hari ini?',
                'Saat merasa stres, coba lakukan aktivitas yang menenangkan seperti mendengarkan musik, berjalan-jalan, atau berbicara dengan teman. Apa yang biasanya membuatmu merasa lebih tenang?'
            ];
            return responses[Math.floor(Math.random() * responses.length)];
        }
        
        if (text.includes('cemas') || text.includes('anx') || text.includes('khawatir') || text.includes('gelisah') || text.includes('takut') || text.includes('panik')) {
            const responses = [
                'Kecemasan bisa terasa seperti gelombang yang datang dan pergi. Coba fokus pada hal yang bisa kamu kendalikan saat ini. Apa satu hal kecil yang ingin kamu lakukan hari ini? Kamu tidak sendirian.',
                'Kecemasan sering muncul dari pikiran tentang masa depan. Coba tuliskan kekhawatiranmu di jurnal, lalu buat rencana konkret untuk mengatasinya. Apa yang paling mengkhawatirkanmu?',
                'Saat cemas, coba teknik grounding: tekan jari-jari kaki ke lantai, rasakan tekstur kursi, dan fokus pada napas. Ini bisa membantu kembali ke saat ini.',
                'Kecemasan adalah perasaan yang wajar. Coba teknik 4-7-8 breathing: tarik napas 4 hitungan, tahan 7, buang 8. Lakukan 3-4 kali untuk menenangkan diri.'
            ];
            return responses[Math.floor(Math.random() * responses.length)];
        }
        
        // Sadness & Depression Responses
        if (text.includes('sedih') || text.includes('down') || text.includes('murung') || text.includes('galau') || text.includes('putus asa') || text.includes('tidak bersemangat')) {
            const responses = [
                'Perasaan sedih itu valid dan wajar. Kamu tidak sendirian dalam merasakan ini. Adakah orang yang bisa kamu hubungi untuk bercerita? Atau mau kita coba latihan menulis jurnal untuk mengurai perasaanmu?',
                'Sedih adalah bagian dari spektrum emosi manusia. Coba lakukan hal yang biasanya membuatmu bahagia, meski hanya sebentar. Apa yang dulu pernah membuatmu tersenyum?',
                'Saat sedih, tubuh membutuhkan istirahat dan perawatan. Coba beri diri sendiri izin untuk merasa sedih, lalu lakukan self-care sederhana. Apa yang bisa kamu lakukan untuk merawat diri?',
                'Perasaan sedih bisa terasa sangat berat. Coba lakukan aktivitas yang menyenangkan seperti menonton film favorit, membaca buku, atau berbicara dengan teman. Kamu tidak sendirian.'
            ];
            return responses[Math.floor(Math.random() * responses.length)];
        }
        
        // Anger & Frustration Responses
        if (text.includes('marah') || text.includes('kesal') || text.includes('jengkel') || text.includes('sebel') || text.includes('frustrasi') || text.includes('geram')) {
            const responses = [
                'Kemarahan adalah sinyal bahwa ada yang tidak beres. Coba tuliskan pemicunya di jurnal agar lebih jelas. Aku bisa bantu membuat kerangka pikirnya. Apa yang sebenarnya membuatmu marah?',
                'Marah itu wajar, tapi penting untuk mengekspresikannya dengan cara yang sehat. Coba hitung sampai 10, tarik napas dalam, atau tulis surat (tapi jangan kirim). Apa yang memicu kemarahanmu?',
                'Kemarahan sering muncul dari rasa tidak adil atau frustrasi. Coba identifikasi kebutuhan yang tidak terpenuhi. Apa yang sebenarnya kamu butuhkan saat ini?',
                'Saat marah, coba teknik STOP: Stop, Take a breath, Observe, Proceed. Ini bisa membantu mengendalikan emosi dengan lebih baik.'
            ];
            return responses[Math.floor(Math.random() * responses.length)];
        }
        
        // Positive Emotions & Gratitude Responses
        if (text.includes('bahagia') || text.includes('senang') || text.includes('happy') || text.includes('grateful') || text.includes('bersyukur') || text.includes('bangga')) {
            const responses = [
                'Senang sekali kamu merasa bahagia! Coba nikmati momen ini dan bagikan kebahagiaanmu dengan orang lain. Apa yang membuatmu merasa senang hari ini?',
                'Kebahagiaan adalah emosi yang indah. Coba tuliskan dalam jurnal atau ceritakan kepada teman. Ini bisa membantu mengingat momen bahagia di masa sulit.',
                'Saat bahagia, coba lakukan hal yang membuatmu merasa lebih baik lagi. Apa yang ingin kamu lakukan untuk merayakan perasaan positif ini?',
                'Perasaan bersyukur bisa meningkatkan kebahagiaan. Coba tulis 3 hal yang kamu syukuri hari ini, meski hal kecil sekalipun.'
            ];
            return responses[Math.floor(Math.random() * responses.length)];
        }
        
        // Loneliness & Isolation Responses
        if (text.includes('sendiri') || text.includes('kesepian') || text.includes('lonely') || text.includes('terisolasi') || text.includes('tidak punya teman')) {
            const responses = [
                'Kesepian bisa terasa sangat berat. Kamu tidak benar-benar sendirian—aku di sini untuk mendengarkan. Coba hubungi teman atau keluarga, atau ikuti komunitas online yang sesuai minatmu.',
                'Kesepian adalah perasaan yang valid. Coba lakukan aktivitas yang membuatmu merasa terhubung dengan diri sendiri, seperti menulis jurnal atau melakukan hobi.',
                'Saat merasa sendirian, ingat bahwa ada banyak orang yang peduli. Coba buat rencana untuk bertemu teman atau bergabung dengan kegiatan sosial.',
                'Kesepian bisa muncul saat kita merasa tidak terhubung. Coba lakukan aktivitas yang membuatmu merasa hidup: olahraga, musik, atau kreativitas.'
            ];
            return responses[Math.floor(Math.random() * responses.length)];
        }
        
        // Fatigue & Burnout Responses
        if (text.includes('lelah') || text.includes('capek') || text.includes('burnout') || text.includes('kelelahan') || text.includes('tidak bertenaga')) {
            const responses = [
                'Kelelahan mental itu nyata dan perlu diakui. Coba beri diri sendiri izin untuk istirahat. Apa yang bisa kamu lakukan untuk merawat diri hari ini?',
                'Burnout adalah tanda bahwa kamu perlu istirahat. Coba buat batasan yang jelas antara kerja dan istirahat. Apa yang bisa kamu kurangi atau delegasikan?',
                'Saat lelah, tubuh membutuhkan pemulihan. Coba lakukan aktivitas yang benar-benar menyenangkan, bukan yang menghabiskan energi. Apa yang membuatmu merasa segar?',
                'Kelelahan bisa menjadi sinyal bahwa kamu perlu istirahat. Coba lakukan hal yang benar-benar menyenangkan hari ini, meski hanya 30 menit.'
            ];
            return responses[Math.floor(Math.random() * responses.length)];
        }
        
        // Confusion & Uncertainty Responses
        if (text.includes('tidak tahu') || text.includes('bingung') || text.includes('confused') || text.includes('ragu') || text.includes('tidak yakin')) {
            const responses = [
                'Merasa bingung itu wajar, apalagi saat menghadapi situasi baru. Coba mulai dari hal yang paling kecil dan sederhana. Apa yang bisa kamu lakukan dalam 5 menit ke depan?',
                'Kebingungan bisa muncul saat ada terlalu banyak pilihan. Coba buat daftar pro dan kontra, atau minta pendapat orang yang kamu percaya. Apa yang membuatmu bingung?',
                'Saat bingung, coba kembali ke hal yang sudah kamu ketahui pasti. Apa yang sudah jelas dan tidak perlu diragukan?',
                'Kebingungan adalah bagian dari proses belajar. Coba buat daftar hal yang ingin kamu ketahui dan cari informasi step by step.'
            ];
            return responses[Math.floor(Math.random() * responses.length)];
        }
        
        // Sleep Issues Responses
        if (text.includes('tidur') || text.includes('sleep') || text.includes('insomnia') || text.includes('sulit tidur') || text.includes('mimpi buruk')) {
            const responses = [
                'Masalah tidur bisa sangat mempengaruhi kesehatan mental. Coba buat rutinitas tidur yang konsisten: matikan gadget 1 jam sebelum tidur, baca buku, atau lakukan relaksasi.',
                'Sulit tidur sering terkait dengan pikiran yang bergejolak. Coba teknik progressive muscle relaxation atau deep breathing. Apa yang biasanya mengganggu tidurmu?',
                'Kualitas tidur penting untuk kesehatan mental. Coba buat kamar tidur yang nyaman dan tenang. Hindari kafein di sore hari dan lakukan aktivitas yang menenangkan sebelum tidur.',
                'Sulit tidur bisa disebabkan oleh stres atau kecemasan. Coba teknik 4-7-8 breathing sebelum tidur: tarik napas 4 hitungan, tahan 7, buang 8.'
            ];
            return responses[Math.floor(Math.random() * responses.length)];
        }
        
        // Relationship Issues Responses
        if (text.includes('hubungan') || text.includes('relationship') || text.includes('teman') || text.includes('keluarga') || text.includes('pacaran') || text.includes('putus')) {
            const responses = [
                'Hubungan yang sehat membutuhkan komunikasi yang baik. Coba ungkapkan perasaanmu dengan "I feel" statement dan dengarkan perspektif orang lain.',
                'Konflik dalam hubungan itu wajar. Yang penting adalah bagaimana kita menyelesaikannya. Coba lihat dari sudut pandang yang berbeda dan cari solusi bersama.',
                'Hubungan yang toxic bisa mempengaruhi kesehatan mental. Penting untuk mengenali batasan dan tidak takut untuk menjauh jika diperlukan.',
                'Setiap hubungan memiliki tantangan. Coba komunikasikan dengan jujur dan terbuka tentang perasaanmu. Apa yang sebenarnya kamu butuhkan?'
            ];
            return responses[Math.floor(Math.random() * responses.length)];
        }
        
        // Work & Study Stress Responses
        if (text.includes('kerja') || text.includes('kuliah') || text.includes('belajar') || text.includes('tugas') || text.includes('deadline') || text.includes('ujian')) {
            const responses = [
                'Stres kerja atau kuliah bisa sangat berat. Coba buat daftar prioritas dan fokus pada satu tugas dulu. Jangan lupa untuk istirahat dan merawat diri.',
                'Work-life balance penting untuk kesehatan mental. Coba buat batasan yang jelas antara waktu kerja dan waktu pribadi. Apa yang bisa kamu lakukan untuk menyeimbangkan keduanya?',
                'Saat merasa overwhelmed dengan tugas, coba break down menjadi bagian-bagian kecil. Apa yang bisa kamu selesaikan dalam 30 menit ke depan?',
                'Tugas yang menumpuk bisa terasa sangat berat. Coba buat sistem prioritas: urgent, important, dan bisa ditunda. Apa yang paling mendesak?'
            ];
            return responses[Math.floor(Math.random() * responses.length)];
        }
        
        // Self-Care & Wellness Responses
        if (text.includes('self care') || text.includes('merawat diri') || text.includes('wellness') || text.includes('hobi') || text.includes('aktivitas') || text.includes('olahraga')) {
            const responses = [
                'Self-care bukan egois, tapi kebutuhan. Coba lakukan hal yang membuatmu bahagia setiap hari, meski hanya 15 menit. Apa yang ingin kamu lakukan untuk merawat diri?',
                'Self-care bisa berupa hal sederhana: mandi air hangat, membaca buku favorit, atau berjalan-jalan di alam. Apa yang membuatmu merasa tenang?',
                'Merawat diri adalah investasi untuk kesehatan mental jangka panjang. Coba buat rutinitas self-care yang konsisten dan sesuai dengan kebutuhanmu.',
                'Hobi dan aktivitas yang menyenangkan bisa menjadi bentuk self-care yang efektif. Apa yang dulu pernah membuatmu merasa bahagia?'
            ];
            return responses[Math.floor(Math.random() * responses.length)];
        }
        
        // Mindfulness & Meditation Responses
        if (text.includes('mindfulness') || text.includes('meditasi') || text.includes('meditation') || text.includes('relaksasi') || text.includes('napas') || text.includes('breathing')) {
            const responses = [
                'Mindfulness adalah tentang hadir sepenuhnya di saat ini. Coba mulai dengan latihan sederhana: fokus pada napas selama 5 menit setiap hari.',
                'Meditasi tidak harus duduk diam berjam-jam. Coba mindful walking atau mindful eating. Yang penting adalah kesadaran penuh pada apa yang sedang kamu lakukan.',
                'Mindfulness bisa membantu mengurangi stres dan kecemasan. Coba aplikasi seperti Headspace atau Calm untuk panduan meditasi pemula.',
                'Teknik pernapasan sederhana bisa membantu menenangkan pikiran. Coba 4-7-8 breathing: tarik 4, tahan 7, buang 8.'
            ];
            return responses[Math.floor(Math.random() * responses.length)];
        }
        
        // Thank you & Appreciation Responses
        if (text.includes('terima kasih') || text.includes('thanks') || text.includes('thank you') || text.includes('makasih')) {
            const responses = [
                'Sama-sama! Senang bisa membantu. Kamu sudah melakukan hal yang baik dengan mencari dukungan. Teruslah merawat kesehatan mentalmu.',
                'Terima kasih juga sudah mempercayai MindfulAI. Kamu tidak sendirian dalam perjalanan ini. Ada yang lain yang ingin kamu tanyakan?',
                'Sama-sama! Aku selalu di sini untuk mendukungmu. Jangan ragu untuk menghubungi lagi jika membutuhkan bantuan.',
                'Terima kasih sudah mempercayai MindfulAI. Kamu sudah melakukan langkah yang tepat dengan mencari dukungan.'
            ];
            return responses[Math.floor(Math.random() * responses.length)];
        }
        
        // General Questions & Help Responses
        if (text.includes('apa') || text.includes('bagaimana') || text.includes('kenapa') || text.includes('mengapa') || text.includes('bisa') || text.includes('tolong')) {
            const responses = [
                'Aku di sini untuk membantu dan mendengarkan. Bisa kamu ceritakan lebih detail tentang apa yang ingin kamu tanyakan?',
                'Pertanyaan yang bagus! Aku siap membantu. Coba jelaskan lebih lanjut agar aku bisa memberikan jawaban yang tepat.',
                'Aku siap mendukungmu. Bisa kamu beri tahu lebih spesifik apa yang ingin kamu diskusikan?',
                'Terima kasih atas pertanyaannya. Aku ingin membantu dengan sebaik mungkin. Bisa kamu jelaskan lebih detail?'
            ];
            return responses[Math.floor(Math.random() * responses.length)];
        }
        
        // Default empathetic response with variety
        const defaultResponses = [
            'Aku mendengarkan dan peduli dengan perasaanmu. Ceritakan lebih banyak agar aku bisa membantumu lebih tepat. Kamu tidak sendirian dalam perjalanan ini.',
            'Terima kasih sudah berbagi dengan MindfulAI. Aku di sini untuk mendukungmu. Ada yang ingin kamu diskusikan lebih lanjut?',
            'Aku mendengarkan ceritamu dengan penuh perhatian. Kamu sudah melakukan hal yang baik dengan mencari dukungan. Bagaimana aku bisa membantu lebih lanjut?',
            'Setiap perasaan yang kamu rasakan itu valid. Aku siap mendengarkan dan mendukungmu. Ada yang ingin kamu ungkapkan?',
            'Kamu tidak sendirian dalam menghadapi ini. Aku di sini untuk mendengarkan dan mendampingi. Ceritakan lebih banyak tentang apa yang kamu rasakan.',
            'Aku menghargai kepercayaanmu untuk berbagi. Aku siap mendengarkan dan mendukungmu. Ada yang ingin kamu bicarakan?',
            'Terima kasih sudah mempercayai MindfulAI. Aku di sini untuk mendengarkan ceritamu. Bagaimana kabarmu hari ini?',
            'Aku siap mendampingi perjalananmu. Ceritakan apa yang ada di pikiranmu, aku akan mendengarkan dengan penuh perhatian.',
            'Setiap langkah yang kamu ambil untuk kesehatan mental itu berharga. Aku di sini untuk mendukungmu. Ada yang ingin kamu diskusikan?',
            'Aku menghargai keberanianmu untuk mencari dukungan. Aku siap mendengarkan dan mendampingi. Bagaimana perasaanmu?'
        ];
        return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
    }

    // Try Ollama first, fallback to scripted responses
    async getOllamaResponse(userMessage, history = []) {
        if (!this.useOllama) {
            return null;
        }

        const systemPrompt = `Kamu adalah MindfulAI, asisten kesehatan mental yang empatik dan profesional. 

        KARAKTERISTIK:
        - Berbahasa Indonesia yang hangat dan mudah dipahami
        - Tidak menghakimi dan selalu mendukung
        - Bukan dokter atau psikolog (hindari diagnosis medis)
        - Fokus pada validasi perasaan dan dukungan emosional
        
        KEMAMPUAN:
        - Memberikan tips praktis untuk mengelola emosi
        - Mengajukan pertanyaan reflektif yang membantu self-awareness
        - Menyarankan teknik relaksasi dan mindfulness
        - Memberikan informasi tentang kapan mencari bantuan profesional
        
        TOPIK YANG BISA DIBANTU:
        - Stres dan kecemasan
        - Kesedihan dan depresi
        - Kemarahan dan frustrasi
        - Kelelahan dan burnout
        - Masalah tidur
        - Kesepian dan isolasi
        - Masalah hubungan
        - Self-care dan wellness
        - Mindfulness dan meditasi
        
        FORMAT JAWABAN:
        - 2-4 kalimat yang jelas dan actionable
        - Sertakan tips praktis yang bisa langsung diterapkan
        - Berikan pertanyaan reflektif untuk mendorong self-reflection
        - Tunjukkan empati dan validasi perasaan
        
        KRISIS:
        - Jika ada tanda bahaya diri, berikan nomor darurat dan dorong untuk mencari bantuan profesional
        - Jangan memberikan saran medis atau diagnosis`;

        const models = [
            'phi3:mini', 'llama2', 'qwen2.5:7b', 'mistral:7b', 'codellama:7b', 
            'llama2:7b', 'llama2:13b', 'neural-chat:7b', 'orca-mini:3b'
        ];

        // Build messages for Ollama
        const messages = [
            { role: 'system', content: systemPrompt }
        ];

        // Add history (last 10 messages)
        const hist = history.slice(-10);
        for (const h of hist) {
            if (h.role && h.content) {
                messages.push({
                    role: h.role === 'assistant' ? 'assistant' : 'user',
                    content: String(h.content)
                });
            }
        }
        messages.push({ role: 'user', content: userMessage });

        // Try each model
        for (const model of models) {
            try {
                const payload = {
                    model: model,
                    messages: messages,
                    stream: false,
                    options: {
                        temperature: 0.7,
                        top_p: 0.9,
                        repeat_penalty: 1.1
                    }
                };

                const response = await fetch(`${this.baseUrl}/api/chat`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload),
                    signal: AbortSignal.timeout(15000)
                });

                if (response.ok) {
                    const data = await response.json();
                    if (data.message && data.message.content) {
                        const reply = String(data.message.content);
                        if (reply !== '') {
                            return {
                                reply: reply,
                                provider: 'ollama',
                                model: model,
                                confidence: 'high',
                                suggestions: {
                                    tips_praktis: 'Coba teknik 4-7-8 breathing',
                                    aktivitas_selanjutnya: 'Tulis jurnal tentang perasaanmu',
                                    sumber_bantuan: 'Konsultasi dengan profesional jika diperlukan'
                                }
                            };
                        }
                    }
                }
            } catch (error) {
                console.log(`Model ${model} failed:`, error.message);
                continue;
            }
        }

        return null;
    }

    // Main chat method
    async chat(userMessage, history = []) {
        // Validate input
        if (!userMessage || typeof userMessage !== 'string' || userMessage.trim() === '') {
            throw new Error('Message is required');
        }

        const trimmedMessage = userMessage.trim();

        // Check for crisis first
        const crisisResponse = this.detectCrisis(trimmedMessage);
        if (crisisResponse) {
            return crisisResponse;
        }

        // Try Ollama first
        try {
            const ollamaResponse = await this.getOllamaResponse(trimmedMessage, history);
            if (ollamaResponse) {
                return ollamaResponse;
            }
        } catch (error) {
            console.log('Ollama failed, falling back to scripted responses');
        }

        // Fallback to scripted responses
        const reply = this.getScriptedResponse(trimmedMessage);
        const suggestions = {
            tips_praktis: 'Coba teknik relaksasi sederhana',
            aktivitas_selanjutnya: 'Tulis jurnal atau hubungi teman',
            sumber_bantuan: 'Konsultasi dengan profesional jika diperlukan'
        };

        return {
            reply: reply,
            provider: 'scripted',
            confidence: 'medium',
            suggestions: suggestions,
            additional_resources: {
                crisis_hotline: '112/119 - Nomor Darurat',
                mental_health_info: 'Informasi kesehatan mental',
                self_help_tools: 'Alat bantu mandiri'
            }
        };
    }
}

// Export for Node.js or browser
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MindfulAI;
} else if (typeof window !== 'undefined') {
    window.MindfulAI = MindfulAI;
}

// Example usage:
// const ai = new MindfulAI();
// ai.chat("Saya merasa stres hari ini").then(response => console.log(response));
