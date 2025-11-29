const canvas = new fabric.Canvas('c');
let const canvas = new fabric.Canvas('c');
let isCalibrationMode = true;

// --- DATABASE LOKAL DENGAN PATH 'skins/' ---
// 💡 PENTING: Anda harus mengisi array ini secara manual dengan nama file yang benar-benar ada di folder 'skins/' Anda.
const imageDatabase = [
    { name: "Aamon - Skin Starlight", url: "skins/aamon_starlight.jpg" },
    { name: "Fanny - Skin Special", url: "skins/fanny_special.jpg" },
    { name: "Grock - Skin Epic", url: "skins/grock_epic.jpg" },
    { name: "Lesley - Skin Legend", url: "skins/lesley_legend.jpg" },
    { name: "Miya - Skin M3", url: "skins/miya_m3.jpg" },
    { name: "Zilong - Skin Collector", url: "skins/zilong_collector.jpg" },
    { name: "Icon Gold Lane", url: "icons/gold.png" },
    { name: "Icon Exp Lane", url: "icons/exp.png" },
    // TAMBAHKAN SEMUA FILE SKIN ANDA DI SINI
];


// --- 1. DATA KONFIGURASI MULTI-TEMPLATE ---
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
        showText: false, 
        slots: {
            'r1_c1': { x: 50, y: 150, w: 470, h: 250, label: "Baris 1 Kolom 1", type: 'slot' }, 
            'r1_c2': { x: 560, y: 150, w: 470, h: 250, label: "Baris 1 Kolom 2", type: 'slot' },
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


// --- FUNGSI UNTUK RESPONSIVENESS ---

function resizeCanvasToWindow() {
    const canvasContainer = document.getElementById('canvasContainer');
    if (!canvasContainer) return;
    
    const containerWidth = canvasContainer.clientWidth * 0.95; 

    const templateName = document.getElementById('templateSelector').value;
    const currentConfig = templateData[templateName];
    
    const originalWidth = currentConfig.canvasSize.width;
    
    let scaleFactor = containerWidth / originalWidth;

    canvas.setZoom(scaleFactor);
    
    canvas.setDimensions({
        width: originalWidth * scaleFactor,
        height: currentConfig.canvasSize.height * scaleFactor
    });

    canvas.renderAll();
}

// --- FUNGSI UNTUK DATABASE & PENCARIAN BARU ---

function populateDatabaseSelect(data) {
    const dbSelect = document.getElementById('dbSelect');
    if (!dbSelect) return;

    // Kosongkan dan tambahkan placeholder
    dbSelect.innerHTML = '<option value="">-- Pilih dari Database --</option>';

    data.forEach(item => {
        let opt = document.createElement('option');
        opt.value = item.url;
        opt.innerHTML = item.name;
        dbSelect.appendChild(opt);
    });
}

function filterDatabaseSelect(e) {
    const searchTerm = e.target.value.toLowerCase();
    
    // Filter database berdasarkan nama
    const filteredData = imageDatabase.filter(item => 
        item.name.toLowerCase().includes(searchTerm)
    );
    
    // Panggil fungsi untuk mengisi ulang dropdown dengan hasil filter
    populateDatabaseSelect(filteredData);
}


// --- 2. FUNGSI UTAMA UNTUK MEMUAT TEMPLATE & SLOT ---

function loadTemplate(templateName) {
    canvas.clear();
    rects = {};
    contents = {};

    const config = templateData[templateName];
    if (!config) return;
    
    canvas.setWidth(config.canvasSize.width);
    canvas.setHeight(config.canvasSize.height);

    currentSlots = config.slots;
    
    // Muat Gambar Template Baru
    fabric.Image.fromURL(config.filePath, function(img) {
        const scaleX = config.canvasSize.width / img.width;
        const scaleY = config.canvasSize.height / img.height;
        
        canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), {
            scaleX: scaleX,
            scaleY: scaleY,
            crossOrigin: 'anonymous' // FIX: Mencegah Tainted Canvas
        });
        
        // Buat Ulang Kotak Merah dan Dropdown Slot
        const selector = document.getElementById('slotSelector');
        selector.innerHTML = '<option value="">-- Pilih Slot Target --</option>'; 

        for (let key in currentSlots) {
            const s = currentSlots[key];
            let opt = document.createElement('option');
            opt.value = key;
            opt.innerHTML = s.label;
            selector.appendChild(opt);
            
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

        // LOGIKA PENGENDALIAN TEKS
        if (priceText) canvas.remove(priceText);
        if (heroCountText) canvas.remove(heroCountText);
        if (skinCountText) canvas.remove(skinCountText);
        
        const template1Controls = document.getElementById('template1Controls');

        if (config.showText) {
            template1Controls.style.display = 'block';

            const currentPrice = document.getElementById('priceInput').value;
            const currentHeroCount = document.getElementById('heroCountInput').value;
            const currentSkinCount = document.getElementById('skinCountInput').value;

            priceText = new fabric.Text(currentPrice || "", { 
                left: config.pricePos.left, top: config.pricePos.top, fontSize: 40, fontFamily: 'Racesport', fill: 'white', fontWeight: 'bold', fontStyle: 'italic', selectable: false,
                textBaseline: 'middle' // FIX: Menghilangkan CanvasTextBaseline Warning
            });
            heroCountText = new fabric.Text(currentHeroCount || "0", { 
                left: config.heroPos.left, top: config.heroPos.top, fontSize: 30, fontFamily: 'Racesport', fill: 'white', fontWeight: 'bold', selectable: false,
                textBaseline: 'middle' // FIX: Menghilangkan CanvasTextBaseline Warning
            });
            skinCountText = new fabric.Text(currentSkinCount || "0", { 
                left: config.skinPos.left, top: config.skinPos.top, fontSize: 30, fontFamily: 'Racesport', fill: 'white', fontWeight: 'bold', selectable: false,
                textBaseline: 'middle' // FIX: Menghilangkan CanvasTextBaseline Warning
            });
            
            canvas.add(priceText, heroCountText, skinCountText);
        } else {
            template1Controls.style.display = 'none';
            priceText = null;
            heroCountText = null;
            skinCountText = null;
        }
        
        resizeCanvasToWindow(); 
        canvas.renderAll();
    }, { crossOrigin: 'anonymous' }); // FIX: Mencegah Tainted Canvas saat memuat background
}

// --- 5. INIT PERTAMA KALI ---
document.addEventListener('DOMContentLoaded', () => {
    // Inisialisasi template pertama
    loadTemplate('template.jpg');
    
    // ⭐️ Inisialisasi Database dan Pencarian
    populateDatabaseSelect(imageDatabase);
    
    const dbSearchInput = document.getElementById('dbSearchInput');
    if (dbSearchInput) {
        dbSearchInput.addEventListener('input', filterDatabaseSelect);
    }

    const templateSelector = document.getElementById('templateSelector');
    if (templateSelector) templateSelector.addEventListener('change', (e) => {
        loadTemplate(e.target.value);
    });

    const uploadMain = document.getElementById('uploadMain');
    const priceInput = document.getElementById('priceInput');
    const heroCountInput = document.getElementById('heroCountInput');
    const skinCountInput = document.getElementById('skinCountInput');
    const applyImageBtn = document.getElementById('applyImageBtn');
    const clearSlotBtn = document.getElementById('clearSlotBtn');
    const downloadBtn = document.getElementById('downloadBtn');

    if (uploadMain) uploadMain.addEventListener('change', handleUploadMain); 
    if (priceInput) priceInput.addEventListener('input', handleUpdatePrice);
    if (heroCountInput) heroCountInput.addEventListener('input', handleUpdateHeroCount);
    if (skinCountInput) skinCountInput.addEventListener('input', handleUpdateSkinCount);
    if (applyImageBtn) applyImageBtn.addEventListener('click', handleApplyImageToSlot);
    if (clearSlotBtn) clearSlotBtn.addEventListener('click', handleClearSlot);
    if (downloadBtn) downloadBtn.addEventListener('click', handleDownloadResult);

    // Tambahkan event listener untuk resize window
    window.addEventListener('resize', () => {
        setTimeout(resizeCanvasToWindow, 100); 
    });
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
        
        // Pastikan teks selalu di depan gambar
        [priceText, heroCountText, skinCountText].forEach(textObj => {
            if (textObj) textObj.bringToFront();
        });
        
        canvas.renderAll();
    }, { crossOrigin: 'anonymous' }); // FIX: Mencegah Tainted Canvas
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
    const dbSelect = document.getElementById('dbSelect');
    const dbUrl = dbSelect ? dbSelect.value : ''; 
    const manualInput = document.getElementById('uploadSlot');

    if (slotKey === "") {
        alert("Pilih Slot Target terlebih dahulu!");
        return;
    }

    if (manualInput && manualInput.files && manualInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            placeImageInSlot(slotKey, e.target.result);
            manualInput.value = '';
            if (dbSelect) dbSelect.value = ''; // Reset db selection
        }
        reader.readAsDataURL(manualInput.files[0]);
    } else if (dbUrl) {
        placeImageInSlot(slotKey, dbUrl);
        if (manualInput) manualInput.value = ''; // Reset manual upload
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

// --- 6. LOGIC DOWNLOAD HASIL AKHIR (Robust) ---

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
