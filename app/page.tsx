<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
    <title>مَد · منصة التوزيع اللوجستي</title>
    
    <!-- خطوط -->
    <link href="https://fonts.googleapis.com/css2?family=Tajawal:wght@200;300;400;500;700;900&display=swap" rel="stylesheet" />
    
    <!-- Leaflet CSS (للخرائط) -->
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
    
    <!-- Supabase JS -->
    <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
    
    <style>
        /* ===== نفس الأنماط السابقة مع تعديلات طفيفة ===== */
        *,
        *::before,
        *::after {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        :root {
            --bg: #07070a;
            --s1: #0f0f14;
            --s2: #17171e;
            --s3: #1f1f28;
            --s4: #27272f;
            --b1: rgba(255, 255, 255, .07);
            --b2: rgba(255, 255, 255, .04);
            --gold: #c8a84b;
            --gold2: #e0c870;
            --gold3: #f5e4a8;
            --goldx: rgba(200, 168, 75, .12);
            --green: #2ecc71;
            --greenx: rgba(46, 204, 113, .12);
            --red: #e74c3c;
            --blue: #3498db;
            --bluex: rgba(52, 152, 219, .12);
            --orange: #e67e22;
            --t1: #fff;
            --t2: rgba(255, 255, 255, .6);
            --t3: rgba(255, 255, 255, .3);
        }
        
        html,
        body {
            background: var(--bg);
            font-family: 'Tajawal', sans-serif;
            color: var(--t1);
            height: 100vh;
            overflow: hidden;
        }
        
        /* ===== تخطيط الصفحة ===== */
        .app-container {
            display: flex;
            flex-direction: column;
            height: 100vh;
        }
        
        /* ===== الهيدر ===== */
        .app-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 12px 20px;
            background: rgba(7, 7, 10, .92);
            backdrop-filter: blur(12px);
            border-bottom: 1px solid var(--b1);
            z-index: 1000;
            flex-shrink: 0;
        }
        
        .logo {
            font-size: 24px;
            font-weight: 900;
            background: linear-gradient(135deg, var(--gold), var(--gold2));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            letter-spacing: -1px;
        }
        
        .header-actions {
            display: flex;
            gap: 12px;
            align-items: center;
        }
        
        .live-badge {
            display: flex;
            align-items: center;
            gap: 6px;
            font-size: 10px;
            color: var(--green);
        }
        
        .live-dot {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: var(--green);
            animation: pulse 1.5s infinite;
        }
        
        @keyframes pulse {
            0%,
            100% {
                opacity: 1;
                transform: scale(1);
            }
            50% {
                opacity: .4;
                transform: scale(.8);
            }
        }
        
        /* ===== المحتوى الرئيسي (خريطة + قائمة جانبية) ===== */
        .main-content {
            display: flex;
            flex: 1;
            overflow: hidden;
        }
        
        /* ===== الخريطة ===== */
        #map {
            flex: 1;
            height: 100%;
            background: var(--s1);
            min-height: 0;
        }
        
        /* ===== القائمة الجانبية ===== */
        .side-panel {
            width: 340px;
            background: var(--s1);
            border-left: 1px solid var(--b1);
            display: flex;
            flex-direction: column;
            flex-shrink: 0;
            overflow: hidden;
        }
        
        .panel-tabs {
            display: flex;
            border-bottom: 1px solid var(--b1);
            flex-shrink: 0;
        }
        
        .panel-tab {
            flex: 1;
            padding: 12px;
            text-align: center;
            font-size: 12px;
            font-weight: 500;
            color: var(--t3);
            cursor: pointer;
            transition: all .2s;
            background: transparent;
            border: none;
            font-family: 'Tajawal', sans-serif;
        }
        
        .panel-tab.active {
            color: var(--gold);
            border-bottom: 2px solid var(--gold);
            background: var(--goldx);
        }
        
        .panel-content {
            flex: 1;
            overflow-y: auto;
            padding: 12px;
        }
        
        .panel-content::-webkit-scrollbar {
            width: 4px;
        }
        
        .panel-content::-webkit-scrollbar-thumb {
            background: var(--b1);
            border-radius: 4px;
        }
        
        /* ===== بطاقات العناصر في القائمة ===== */
        .list-item {
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 12px;
            border-radius: 12px;
            border: 1px solid var(--b2);
            margin-bottom: 8px;
            background: var(--s2);
            transition: all .2s;
            cursor: pointer;
        }
        
        .list-item:hover {
            background: var(--s3);
            border-color: var(--b1);
        }
        
        .item-icon {
            width: 36px;
            height: 36px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 12px;
            font-weight: 700;
            flex-shrink: 0;
        }
        
        .item-info {
            flex: 1;
            min-width: 0;
        }
        
        .item-name {
            font-size: 13px;
            font-weight: 600;
        }
        
        .item-sub {
            font-size: 10px;
            color: var(--t3);
            margin-top: 2px;
        }
        
        .item-status {
            font-size: 9px;
            padding: 3px 8px;
            border-radius: 20px;
            font-weight: 600;
            flex-shrink: 0;
        }
        
        /* ===== شريط التنقل السفلي ===== */
        .bottom-nav {
            display: flex;
            background: rgba(7, 7, 10, .95);
            backdrop-filter: blur(12px);
            border-top: 1px solid var(--b1);
            flex-shrink: 0;
            padding: 6px 0 env(safe-area-inset-bottom);
        }
        
        .nav-item {
            flex: 1;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 2px;
            padding: 6px 0;
            background: none;
            border: none;
            color: var(--t3);
            font-family: 'Tajawal', sans-serif;
            font-size: 9px;
            cursor: pointer;
            transition: all .2s;
        }
        
        .nav-item.active {
            color: var(--gold);
        }
        
        .nav-icon {
            font-size: 18px;
        }
        
        /* ===== شاشة التحميل ===== */
        #loading {
            position: fixed;
            inset: 0;
            background: var(--bg);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            z-index: 9999;
            transition: opacity .5s;
        }
        
        #loading.hidden {
            opacity: 0;
            pointer-events: none;
        }
        
        .loader-spinner {
            width: 40px;
            height: 40px;
            border: 3px solid var(--b1);
            border-top-color: var(--gold);
            border-radius: 50%;
            animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
            to {
                transform: rotate(360deg);
            }
        }
        
        /* ===== التجاوب مع الشاشات الصغيرة ===== */
        @media (max-width: 768px) {
            .side-panel {
                width: 100%;
                height: 45vh;
                border-left: none;
                border-top: 1px solid var(--b1);
            }
            .main-content {
                flex-direction: column-reverse;
            }
            #map {
                height: 55vh;
            }
        }
    </style>
</head>
<body>

    <!-- شاشة التحميل -->
    <div id="loading">
        <div class="loader-spinner"></div>
        <div style="margin-top:20px;font-size:14px;color:var(--t2)">جاري تحميل مَد ...</div>
    </div>

    <!-- التطبيق -->
    <div class="app-container">
        <!-- الهيدر -->
        <header class="app-header">
            <div class="logo">مَد</div>
            <div class="header-actions">
                <span class="live-badge">
                    <span class="live-dot"></span>
                    مباشر
                </span>
                <button onclick="logout()" style="background:none;border:1px solid var(--b1);color:var(--t3);padding:6px 14px;border-radius:20px;font-family:'Tajawal',sans-serif;font-size:11px;cursor:pointer">
                    خروج
                </button>
            </div>
        </header>

        <!-- المحتوى -->
        <div class="main-content">
            <!-- الخريطة -->
            <div id="map"></div>

            <!-- القائمة الجانبية -->
            <div class="side-panel">
                <div class="panel-tabs">
                    <button class="panel-tab active" data-tab="clients" onclick="switchTab('clients')">العملاء</button>
                    <button class="panel-tab" data-tab="suppliers" onclick="switchTab('suppliers')">الموردون</button>
                    <button class="panel-tab" data-tab="orders" onclick="switchTab('orders')">الطلبات</button>
                </div>
                <div class="panel-content" id="panelContent">
                    <div id="clientsList"></div>
                </div>
            </div>
        </div>

        <!-- شريط التنقل السفلي -->
        <nav class="bottom-nav">
            <button class="nav-item active" onclick="switchView('map')">
                <span class="nav-icon">🗺️</span>
                الخريطة
            </button>
            <button class="nav-item" onclick="switchView('orders')">
                <span class="nav-icon">📋</span>
                الطلبات
            </button>
            <button class="nav-item" onclick="switchView('analytics')">
                <span class="nav-icon">📊</span>
                التحليلات
            </button>
            <button class="nav-item" onclick="switchView('profile')">
                <span class="nav-icon">👤</span>
                حسابي
            </button>
        </nav>
    </div>

    <!-- Leaflet JS -->
    <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js">
    </script>

    <script>
        // ============================================================
        // 1. تهيئة Supabase
        // ============================================================
        // ⚠️ استبدل هذه القيم ببياناتك الحقيقية من Supabase
        const supabaseUrl = 'https://your-project.supabase.co';
        const supabaseKey = 'your-anon-key';
        const supabase = supabase.createClient(supabaseUrl, supabaseKey);

        // ============================================================
        // 2. إعداد الخريطة
        // ============================================================
        let map;
        let markersLayer = L.layerGroup();

        function initMap() {
            // مركز جازان
            const jazan = [16.889, 42.556];
            map = L.map('map', {
                center: jazan,
                zoom: 12,
                zoomControl: false,
            });

            // طبقة الخريطة من OpenStreetMap
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© OpenStreetMap',
                maxZoom: 19,
            }).addTo(map);

            // تحكم بالتكبير/التصغير في الزاوية
            L.control.zoom({
                position: 'bottomright'
            }).addTo(map);

            markersLayer.addTo(map);
        }

        // ============================================================
        // 3. عرض النقاط على الخريطة
        // ============================================================
        function updateMap(data, type) {
            markersLayer.clearLayers();

            // إحداثيات وهمية للعملاء والموردين (للتجربة)
            // في التطبيق الحقيقي، ستُجلب من قاعدة البيانات
            const defaultLocations = {
                clients: [
                    { name: 'مطعم الخليج', lat: 16.895, lng: 42.560, status: 'نشط' },
                    { name: 'بوفية روابي', lat: 16.880, lng: 42.545, status: 'نشط' },
                    { name: 'بقالة هنا', lat: 16.910, lng: 42.570, status: 'نشط' },
                ],
                suppliers: [
                    { name: 'ثلاجة الريان', lat: 16.900, lng: 42.540, status: 'متاح' },
                    { name: 'أبو سيف', lat: 16.885, lng: 42.555, status: 'متاح' },
                ]
            };

            const locations = data || defaultLocations[type] || [];

            locations.forEach(item => {
                const marker = L.circleMarker([item.lat, item.lng], {
                    radius: 10,
                    fillColor: type === 'clients' ? '#c8a84b' : '#2ecc71',
                    color: '#fff',
                    weight: 2,
                    opacity: 1,
                    fillOpacity: 0.8,
                }).addTo(markersLayer);

                // نافذة منبثقة عند النقر
                marker.bindPopup(`
                    <div style="font-family:'Tajawal',sans-serif;padding:4px;">
                        <strong>${item.name}</strong><br>
                        <span style="font-size:11px;color:#666;">${type === 'clients' ? 'عميل' : 'مورد'}</span><br>
                        <span style="font-size:10px;color:${item.status === 'نشط' ? '#2ecc71' : '#e67e22'}">● ${item.status}</span>
                    </div>
                `);
            });

            // تكبير الخريطة لتشمل جميع النقاط
            if (markersLayer.getLayers().length > 0) {
                const bounds = markersLayer.getBounds();
                map.fitBounds(bounds, { padding: [40, 40] });
            }
        }

        // ============================================================
        // 4. عرض القوائم في اللوحة الجانبية
        // ============================================================
        function renderList(data, type) {
            const container = document.getElementById('clientsList');
            // في التطبيق الحقيقي، نعرض البيانات من Supabase
            // حالياً نعرض بيانات وهمية للتجربة
            const items = data || [
                { name: 'مطعم الخليج', sub: 'الروابي · 0562515392', status: 'نشط', color: 'var(--gold)' },
                { name: 'بوفية روابي', sub: 'الروابي · 0535252445', status: 'نشط', color: 'var(--gold)' },
                { name: 'بقالة هنا', sub: 'العسيلة · 0552447590', status: 'نشط', color: 'var(--gold)' },
            ];

            container.innerHTML = items.map(item => `
                <div class="list-item">
                    <div class="item-icon" style="background:${item.color}22;color:${item.color}">
                        ${item.name.slice(0,2)}
                    </div>
                    <div class="item-info">
                        <div class="item-name">${item.name}</div>
                        <div class="item-sub">${item.sub}</div>
                    </div>
                    <div class="item-status" style="background:${item.color}22;color:${item.color}">
                        ${item.status}
                    </div>
                </div>
            `).join('');
        }

        // ============================================================
        // 5. التنقل بين التبويبات
        // ============================================================
        function switchTab(tab) {
            document.querySelectorAll('.panel-tab').forEach(t => t.classList.remove('active'));
            document.querySelector(`[data-tab="${tab}"]`).classList.add('active');

            // تحديث المحتوى حسب التبويب
            if (tab === 'clients') {
                renderList(null, 'clients');
                updateMap(null, 'clients');
            } else if (tab === 'suppliers') {
                renderList([{ name: 'ثلاجة الريان', sub: 'منتجات مبردة · 0565514062', status: 'متاح', color: 'var(--green)' },
                    { name: 'أبو سيف', sub: 'موزع خضار · 0508465736', status: 'متاح', color: 'var(--green)' }
                ], 'suppliers');
                updateMap(null, 'suppliers');
            } else if (tab === 'orders') {
                renderList([{ name: 'طلب #001', sub: 'مطعم الخليج · 1,200 ر', status: 'في الطريق',
                    color: 'var(--blue)' }], 'orders');
                // للطلبات، نظهر مسارات بدلاً من نقاط
                updateMap(null, 'clients'); // مؤقتاً
            }
        }

        // ============================================================
        // 6. التنقل بين الشاشات (السفلي)
        // ============================================================
        function switchView(view) {
            document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
            document.querySelector(`.nav-item[onclick*="${view}"]`).classList.add('active');

            // في المستقبل، نغير المحتوى حسب العرض
        }

        // ============================================================
        // 7. تسجيل الخروج
        // ============================================================
        function logout() {
            if (confirm('هل تريد تسجيل الخروج؟')) {
                // مسح الجلسة وإعادة التوجيه
                window.location.reload();
            }
        }

        // ============================================================
        // 8. بدء التطبيق
        // ============================================================
        async function initApp() {
            try {
                // إظهار شاشة التحميل
                document.getElementById('loading').classList.remove('hidden');

                // تهيئة الخريطة
                initMap();

                // تحميل البيانات الأولية (من Supabase في المستقبل)
                // حالياً نستخدم بيانات وهمية
                const clients = [
                    { name: 'مطعم الخليج', lat: 16.895, lng: 42.560, status: 'نشط' },
                    { name: 'بوفية روابي', lat: 16.880, lng: 42.545, status: 'نشط' },
                    { name: 'بقالة هنا', lat: 16.910, lng: 42.570, status: 'نشط' },
                ];

                // تحديث الخريطة والقائمة
                updateMap(clients, 'clients');
                renderList(clients, 'clients');

                // إخفاء شاشة التحميل
                setTimeout(() => {
                    document.getElementById('loading').classList.add('hidden');
                }, 500);

            } catch (error) {
                console.error('خطأ في التهيئة:', error);
                document.getElementById('loading').innerHTML = `
                    <div style="color:var(--red);text-align:center;">
                        <div style="font-size:24px;margin-bottom:12px;">⚠️</div>
                        <div>حدث خطأ في تحميل التطبيق</div>
                        <button onclick="location.reload()" style="margin-top:16px;padding:8px 24px;border:none;border-radius:12px;background:var(--gold);color:#000;font-family:'Tajawal',sans-serif;font-weight:700;cursor:pointer;">
                            إعادة المحاولة
                        </button>
                    </div>
                `;
            }
        }

        // عند تحميل الصفحة
        document.addEventListener('DOMContentLoaded', initApp);
    </script>

</body>
</html>
