const canvas = new fabric.Canvas('c');
let isCalibrationMode = true;

// --- 1. DATA KONFIGURASI MULTI-TEMPLATE ---
// Data ini disalin dari konfigurasi Anda saat ini, termasuk kalibrasi terbaru.
const templateData = {
    // === KONFIGURASI UNTUK TEMPLATE PERTAMA (template.jpg) ===
    'template.jpg': {
        filePath: 'template.jpg',
        canvasSize: { width: 800, height: 1000 }, 
        showText: true, // Tampilkan teks Harga/Hero/Skin
        slots: {
            'main': { x: 69, y: 197.5, w: 385, h: 241.3, label: "MAIN KIRI", type: 'main' },
            'slot1': { x: 538.8, y: 196, w: 149.7, h: 240.5, label: "Kanan Besar", type: 'slot' },
            'slot2': { x: 531.6, y: 480, w: 83, h: 141, label: "Kanan Tengah 1", type: 'slot' },
            'slot3': { x: 643.6, y: 480, w: 83, h: 141, label: "Kanan Tengah 2", type: 'slot' },
            'b1': { x: 87.6, y: 654.4, w: 82, h: 141.5, label: "Bawah 1", type: 'slot' },
            'b2': { x: 198, y: 653.4, w: 82, h: 141.5, label: "Bawah 2", type: 'slot' },
            'b3': { x: 307.6, y: 652, w: 82, h: 141.5, label: "Bawah 3", type: 'slot' },
            'b4': { x: 420.3, y: 652.7, w: 82, h: 141.5, label: "Bawah 4", type: 'slot' },
            'b5': { x: 531.5, y: 652, w: 82, h: 141.5, label: "Bawah 5", type: 'slot' },
            'b6': { x: 641.76, y: 652, w: 82, h: 141.5, label: "Bawah 6", type: 'slot' }, 
            'iconL': { x: 92, y: 827, w: 50, h: 55, label: "Icon Kiri Bawah", type: 'slot' },
            'iconR': { x: 668, y: 828, w: 50, h: 55, label: "Icon Kanan Bawah", type: 'slot' }
        },
        pricePos: { left: 185, top: 495.5},
        heroPos: { left: 297, top: 830 },
        skinPos: { left: 499, top: 830 }
    },
    
    // === KONFIGURASI UNTUK TEMPLATE KEDUA (template_2.jpg) ===
    'template_2.jpg': {
        filePath: 'template_2.jpg',
        canvasSize: { width: 1080, height: 1350 },
        showText: false, // JANGAN tampilkan teks Harga/Hero/Skin
        slots: {
            // BARIS 1 (2 slot reguler)
            'r1_c1': { x: 50, y: 150, w: 470, h: 250, label: "Baris 1 Kolom 1", type: 'slot' }, 
            'r1_c2': { x: 560, y: 150, w: 470, h: 250, label: "Baris 1 Kolom 2", type: 'slot' },
            
            // BARIS MINI ATAS (2 baris x 6 slot, W=150, H=150)
            'mini1_c1': { x: 50, y: 430, w: 150, h: 150, label: "Mini R1 K1", type: 'slot' },
            'mini1_c2': { x: 210, y: 430, w: 150, h: 150, label: "Mini R1 K2", type: 'slot' },
            'mini1_c3': { x: 370, y: 430, w: 150, h: 150, label: "Mini R1 K3", type: 'slot' },
            'mini1_c4': { x: 530, y: 430, w: 150, h: 150, label: "Mini R1 K4", type: 'slot' },
            'mini1_c5': { x: 690, y: 430, w: 150, h: 150, label: "Mini R1 K5", type: 'slot' },
            'mini1_c6': { x: 850, y: 430, w: 150, h: 150, label: "Mini R1 K6", type: 'slot' },

            'mini2_c1': { x: 50, y: 600, w: 150, h: 150, label: "Mini R2 K1", type: 'slot' },
            'mini2_c2': { x: 210, y: 600, w: 150, h: 150, label: "Mini R2 K2", type: 'slot' },
            'mini2_c3': { x: 370, y: 600, w: 150, h: 150, label: "Mini R2 K3", type: 'slot' },
            'mini2_c4': { x: 530, y: 600, w: 150, h: 150, label: "Mini R2 K4", type: 'slot' },
            'mini2_c5': { x: 690, y: 600, w: 150, h: 150, label: "Mini R2 K5", type: 'slot' },
            'mini2_c6': { x: 850, y: 600, w: 150, h: 150, label: "Mini R2 K6", type: 'slot' },

            // BARIS REGULER BAWAH (3 baris x 6 slot, W=150, H=180)
            'r2_c1': { x: 50, y: 790, w: 150, h: 180, label: "R2 K1 (Reguler)", type: 'slot' },
            'r2_c2': { x: 210, y: 790, w: 150, h: 180, label: "R2 K2 (Reguler)", type: 'slot' },
            'r2_c3': { x: 370, y: 790, w: 150, h: 180, label: "R2 K3 (Reguler)", type: 'slot' },
            'r2_c4': { x: 530, y: 790, w: 150, h: 180, label: "R2 K4 (Reguler)", type: 'slot' },
            'r2_c5': { x: 690, y: 790, w: 150, h: 180, label: "R2 K5 (Reguler)", type: 'slot' },
            'r2_c6': { x: 850, y: 790, w: 150, h: 180, label: "R2 K6 (Reguler)", type: 'slot' },

            'r3_c1': { x: 50, y: 990, w: 150, h: 180, label: "R3 K1 (Reguler)", type: 'slot' },
            'r3_c2': { x: 210, y: 990, w: 150, h: 180, label: "R3 K2 (Reguler)", type: 'slot' },
            'r3_c3': { x: 370, y: 990, w: 150, h: 180, label: "R3 K3 (Reguler)", type: 'slot' },
            'r3_c4': { x: 530, y: 990, w: 150, h: 180, label: "R3 K4 (Reguler)", type: 'slot' },
            'r3_c5': { x: 690, y: 990, w: 150, h: 180, label: "R3 K5 (Reguler)", type: 'slot' },
            'r3_c6': { x: 850, y: 990, w: 150, h: 180, label: "R3 K6 (Reguler)", type: 'slot' },

            'r4_c1': { x: 50, y: 1190, w: 150, h: 180, label: "R4 K1 (Reguler)", type: 'slot' },
            'r4_c2': { x: 210, y: 1190, w: 150, h: 180, label: "R4 K2 (Reguler)", type: 'slot' },
            'r4_c3': { x: 370, y: 1190, w: 150, h: 180, label: "R4 K3 (Reguler)", type: 'slot' },
            'r4_c4': { x: 530, y: 1190, w: 150, h: 180, label: "R4 K4 (Reguler)", type: 'slot' },
            'r4_c5': { x: 690, y: 1190, w: 150, h: 180, label: "R4 K5 (Reguler)", type: 'slot' },
            'r4_c6': { x: 850, y: 1190, w: 150, h: 180, label: "R4 K6 (Reguler)", type: 'slot' }
        },
        pricePos: { left: 540, top: 40 }, 
        heroPos: { left: 200, top: 1300 },
        skinPos: { left: 800, top: 1300 }
    }
};

let currentSlots = {}; 
let rects = {};
let contents = {};
let priceText = null;
let heroCountText = null; 
let skinCountText = null; 

// --- 2. FUNGSI UTAMA UNTUK MEMUAT TEMPLATE & SLOT ---

function loadTemplate(templateName) {
    // 1. Bersihkan Canvas dari semua kotak (rects) dan konten gambar (contents)
    canvas.clear();
    rects = {};
    contents = {};

    const config = templateData[templateName];
    if (!config) return;
    
    // Sesuaikan ukuran canvas
    canvas.setWidth(config.canvasSize.width);
    canvas.setHeight(config.canvasSize.height);

    currentSlots = config.slots;
    
    // 2. Muat Gambar Template Baru
    fabric.Image.fromURL(config.filePath, function(img) {
        // Skala gambar agar sesuai dengan ukuran kanvas
        const scaleX = config.canvasSize.width / img.width;
        const scaleY = config.canvasSize.height / img.height;
        
        canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), {
            scaleX: scaleX,
            scaleY: scaleY,
            crossOrigin: 'anonymous' // ⭐️ FIX: Penting untuk mencegah Tainted Canvas
        });
        
        // 3. Buat Ulang Kotak Merah dan Dropdown
        const selector = document.getElementById('slotSelector');
        selector.innerHTML = '<option value="">-- Pilih Slot Target --</option>'; 

        for (let key in currentSlots) {
            const s = currentSlots[key];
            
            // Tambahkan semua slot ke Dropdown 
            let opt = document.createElement('option');
            opt.value = key;
            opt.innerHTML = s.label;
            selector.appendChild(opt);
            
            // Buat Kotak Merah (fabric.Rect)
            const rect = new fabric.Rect({
                left: s.x, top: s.y, width: s.w, height: s.h,
                fill: 'rgba(255,0,0,0.3)', stroke: 'red', strokeWidth: 2,
                selectable: isCalibrationMode, hasRotatingPoint: false, lockRotation: true,
                id: key, 
                visible: isCalibrationMode
            });
            rects[key] = rect;
            canvas.add(rect);
        }

        // 4. LOGIKA PENGENDALIAN TEKS (HARGA/HERO/SKIN)
        if (priceText) canvas.remove(priceText);
        if (heroCountText) canvas.remove(heroCountText);
        if (skinCountText) canvas.remove(skinCountText);
        
        const template1Controls = document.getElementById('template1Controls');

        if (config.showText) {
            template1Controls.style.display = 'block';

            const currentPrice = document.getElementById('priceInput').value;
            const currentHeroCount = document.getElementById('heroCountInput').value;
            const currentSkinCount = document.getElementById('skinCountInput').value;

            // Tambahkan textBaseline: 'middle' untuk menghilangkan warning di konsol
            priceText = new fabric.Text(currentPrice || "", { 
                left: config.pricePos.left, top: config.pricePos.top, fontSize: 40, fontFamily: 'Racesport', fill: 'white', fontWeight: 'bold', fontStyle: 'italic', selectable: false,
                textBaseline: 'middle' // ⭐️ FIX: Menghilangkan CanvasTextBaseline Warning
            });
            heroCountText = new fabric.Text(currentHeroCount || "0", { 
                left: config.heroPos.left, top: config.heroPos.top, fontSize: 30, fontFamily: 'Racesport', fill: 'white', fontWeight: 'bold', selectable: false,
                textBaseline: 'middle' // ⭐️ FIX
            });
            skinCountText = new fabric.Text(currentSkinCount || "0", { 
                left: config.skinPos.left, top: config.skinPos.top, fontSize: 30, fontFamily: 'Racesport', fill: 'white', fontWeight: 'bold', selectable: false,
                textBaseline: 'middle' // ⭐️ FIX
            });
            
            canvas.add(priceText, heroCountText, skinCountText);
        } else {
            template1Controls.style.display = 'none';
            priceText = null;
            heroCountText = null;
            skinCountText = null;
        }
        
        canvas.renderAll();
    });
}

// --- 5. INIT PERTAMA KALI ---
document.addEventListener('DOMContentLoaded', () => {
    loadTemplate('template.jpg');
    
    document.getElementById('templateSelector').addEventListener('change', (e) => {
        loadTemplate(e.target.value);
    });

    document.getElementById('uploadMain').addEventListener('change', handleUploadMain); 
    document.getElementById('priceInput').addEventListener('input', handleUpdatePrice);
    document.getElementById('heroCountInput').addEventListener('input', handleUpdateHeroCount);
    document.getElementById('skinCountInput').addEventListener('input', handleUpdateSkinCount);
    document.getElementById('applyImageBtn').addEventListener('click', handleApplyImageToSlot);
    document.getElementById('clearSlotBtn').addEventListener('click', handleClearSlot);
    document.getElementById('downloadBtn').addEventListener('click', handleDownloadResult);
});


// --- 3. LOGIC KALIBRASI ---

window.toggleCalibrationMode = function() {
    const checkbox = document.getElementById('toggleCalibration');
    isCalibrationMode = checkbox.checked;

    for (let key in rects) {
        const r = rects[key];
        if (isCalibrationMode) {
            r.set({ visible: true, selectable: true, evented: true });
        } else {
            r.set({ visible: false, selectable: false, evented: false });
            
            if (currentSlots[key]) {
                currentSlots[key].x = r.left;
                currentSlots[key].y = r.top;
                currentSlots[key].w = r.width * r.scaleX;
                currentSlots[key].h = r.height * r.scaleY;
            }
        }
    }
    
    canvas.discardActiveObject();
    canvas.renderAll();
}

// --- 4. LOGIC UTAMA (PLACE IMAGE DENGAN SUDUT MEMBULAT) ---

function placeImageInSlot(key, imgUrl) {
    if (!currentSlots[key] || isCalibrationMode) {
        alert("Matikan Mode Kalibrasi atau pilih slot yang valid.");
        return;
    }

    const s = currentSlots[key];

    fabric.Image.fromURL(imgUrl, function(img) {
        if (contents[key]) canvas.remove(contents[key]);

        const scaleX = s.w / img.width;
        const scaleY = s.h / img.height;
        
        img.set({
            left: s.x,
            top: s.y,
            scaleX: scaleX, 
            scaleY: scaleY,
            selectable: false, 
            evented: false,
        });

        // LOGIKA CLIPPATH (SUDUT MEMBULAT)
        const borderRadius = 10; 
        
        img.set({
            clipPath: new fabric.Rect({
                left: s.x,
                top: s.y,
                width: s.w,
                height: s.h,
                rx: borderRadius, 
                ry: borderRadius,
                absolutePositioned: true
            })
        });

        contents[key] = img;
        canvas.add(img);
        
        [priceText, heroCountText, skinCountText].forEach(textObj => {
            if (textObj) textObj.bringToFront();
        });
        
        canvas.renderAll();
    }, { crossOrigin: 'anonymous' }); // ⭐️ FIX: Penting untuk mencegah Tainted Canvas
}

// --- 5. EVENT HANDLERS ---
function handleUploadMain(e) {
    const mainKey = Object.keys(currentSlots).find(k => currentSlots[k].type === 'main');
    if (!mainKey) {
        alert("Fungsi 'Upload Foto Utama' hanya tersedia untuk Template Depan. Gunakan 'Pilih Slot Target' untuk Template Skin Belakang.");
        e.target.value = '';
        return;
    }
    
    const fileInput = e.target;
    const reader = new FileReader();
    reader.onload = function(event) {
        placeImageInSlot(mainKey, event.target.result);
    }
    if(fileInput.files[0]) reader.readAsDataURL(fileInput.files[0]);
    fileInput.value = '';
}

function handleApplyImageToSlot() {
    const slotKey = document.getElementById('slotSelector').value;
    const dbUrl = document.getElementById('dbSelect').value; 
    const manualInput = document.getElementById('uploadSlot');

    if (slotKey === "") {
        alert("Pilih Slot Target terlebih dahulu!");
        return;
    }

    if (manualInput.files && manualInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            placeImageInSlot(slotKey, e.target.result);
            manualInput.value = '';
        }
        reader.readAsDataURL(manualInput.files[0]);
    } else if (dbUrl) {
        placeImageInSlot(slotKey, dbUrl);
    } else {
         alert("Pilih sumber gambar terlebih dahulu (Database atau Upload Manual).");
    }
}

function handleClearSlot() {
    if(isCalibrationMode) {
        alert("Harap hilangkan centang 'Mode Kalibrasi' terlebih dahulu!");
        return;
    }
    const slotKey = document.getElementById('slotSelector').value;
    if (contents[slotKey]) {
        canvas.remove(contents[slotKey]);
        delete contents[slotKey];
        canvas.renderAll();
    }
}

function handleUpdatePrice(e) {
    if (priceText) priceText.set({ text: e.target.value });
    canvas.renderAll();
}

function handleUpdateHeroCount(e) {
    if (heroCountText) heroCountText.set({ text: e.target.value });
    canvas.renderAll();
}

function handleUpdateSkinCount(e) {
    if (skinCountText) skinCountText.set({ text: e.target.value });
    canvas.renderAll();
}

// --- 6. LOGIC DOWNLOAD HASIL AKHIR (Paling Stabil) ---

function handleDownloadResult() {
    // 1. Sembunyikan semua kotak kalibrasi (rects) agar tidak ikut terunduh
    for(let k in rects) rects[k].set({ visible: false });
    
    canvas.renderAll(); 

    // 2. Picu unduhan
    const link = document.createElement('a');
    link.download = 'Yelji-Result-' + new Date().getTime() + '.png'; 
    
    // Menggunakan setTimeout(..., 0) untuk memastikan rendering kotak tersembunyi selesai.
    setTimeout(() => {
        try {
            // Mengubah kanvas menjadi Data URL (PNG)
            link.href = canvas.toDataURL({ 
                format: 'png', 
                quality: 1.0 
            });
            link.click();
            console.log("Download berhasil dipicu.");
        } catch (e) {
            // Menangkap Uncaught SecurityError: Tainted canvases may not be exported.
            console.error("Gagal mengunduh. Cek error console untuk 'Tainted Canvas'!", e);
            alert("Gagal mengunduh. Pastikan semua gambar dimuat secara lokal. (Error: Tainted Canvas)");
        }

        // 3. Kembalikan kotak kalibrasi jika Mode Kalibrasi aktif
        if (isCalibrationMode) {
            for(let k in rects) rects[k].set({ visible: true });
            canvas.renderAll(); 
        }
    }, 0); 
}