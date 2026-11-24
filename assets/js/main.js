/* ============================================================
   SURESH NAMDEO CHAWRE — main.js v3.0
   Mobile Menu | Sticky Header | Language Switcher (EN/MR/HI) |
   Scroll Reveal | Counter | Lightbox | WhatsApp Builder |
   Admin Modal | Bulk Quote Modal | Float Dock | QR Preview
   UPDATED: Wholesale Supply | Full i18n | WA Inquire Buttons
   ============================================================ */

(function () {
  'use strict';

  const $ = (s, ctx = document) => ctx.querySelector(s);
  const $$ = (s, ctx = document) => [...ctx.querySelectorAll(s)];

  /* ---- STICKY HEADER ---- */
  const header = $('#main-header');
  if (header) {
    window.addEventListener('scroll', () => {
      header.style.boxShadow = window.scrollY > 60
        ? '0 4px 24px rgba(0,0,0,.14)'
        : '0 2px 20px rgba(0,0,0,.07)';
    }, { passive: true });
  }

  /* ---- MOBILE MENU ---- */
  const hamburger = $('#hamburger');
  const mobileNav = $('#mobile-nav');
  const mobileClose = $('#mobile-close');
  const closeMobile = () => {
    hamburger && hamburger.classList.remove('open');
    mobileNav && mobileNav.classList.remove('open');
    document.body.style.overflow = '';
  };
  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      mobileNav.classList.toggle('open');
      document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
    });
    mobileClose && mobileClose.addEventListener('click', closeMobile);
    mobileNav.addEventListener('click', e => { if (e.target === mobileNav) closeMobile(); });
  }

  /* Mobile sub-menu toggles */
  $$('.mobile-nav-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const sub = btn.nextElementSibling;
      if (!sub) return;
      const open = sub.style.display === 'block';
      sub.style.display = open ? 'none' : 'block';
      btn.classList.toggle('open', !open);
      const arrow = btn.querySelector('.nav-arrow');
      if (arrow) arrow.textContent = open ? '▾' : '▴';
    });
  });

  /* ---- ACTIVE NAV LINK ---- */
  const page = window.location.pathname.split('/').pop() || 'index.html';
  $$('nav .nav-link, nav .nav-dropdown-menu a').forEach(link => {
    const href = (link.getAttribute('href') || '').replace('./', '');
    if (href === page || (page === '' && href === 'index.html')) {
      link.classList.add('active');
      const parentDropdown = link.closest('.nav-dropdown');
      if (parentDropdown) {
        const parentLink = parentDropdown.querySelector(':scope > .nav-link');
        if (parentLink) parentLink.classList.add('active');
      }
    }
  });

  /* ---- LANGUAGE SWITCHER — EN / मराठी / हिंदी ---- */
  const langBtn = $('#lang-btn');
  const langDropdown = $('#lang-dropdown');
  let currentLang = localStorage.getItem('snc-lang') || 'en';

  /* ================================================================
     COMPREHENSIVE TRANSLATION MAP v3.0
     English | मराठी (Marathi) | हिंदी (Hindi)
     Business focus: Chandrapur and nearby Maharashtra districts
     ================================================================ */
  const T = {
    en: {
      /* Top bar */
      'tb-welcome': 'Welcome to Suresh Namdeo Chawre',
      'tb-location': 'APMC Market, Ram Nagar, Chandrapur',
      /* Nav */
      'nav-home': 'Home',
      'nav-about': 'About Us ▾',
      'nav-history': 'History',
      'nav-vm': 'Vision & Mission',
      'nav-team': 'Our Team',
      'nav-products': 'Product Category',
      'nav-wholesale': 'Wholesale Supply',
      'nav-gallery': 'Gallery',
      'nav-contact': 'Contact Us',
      'nav-wa-manager': 'WhatsApp Manager',
      'nav-ledger': 'Account Ledger',
      /* Header buttons */
      'btn-call': 'Call Now',
      'btn-quote': 'Bulk Quote',
      'btn-admin': 'Admin',
      /* Hero */
      'hero-eyebrow': '🌿 APMC Chandrapur — Established 1999',
      'hero-h1-line1': 'Trusted Wholesale',
      'hero-h1-accent': 'Vegetables',
      'hero-h1-line2': 'Merchant & Commission Agent',
      'hero-lead': "Snag It Now, Before It's Gone For Good! — Trusted Aadhathiya and wholesale vegetable supplier serving Chandrapur city, APMC Ram Nagar, Ballarpur, Bhadravati, Warora, Rajura and all of Vidarbha.",
      'hero-cta1': '🥦 Explore Products',
      'hero-cta2': '💬 Request Bulk Quote',
      'hero-badge1': '25+ Years Experience',
      'hero-badge2': 'QR Traceability',
      'hero-badge3': 'Chandrapur Leader',
      /* Stats */
      'stat-label1': 'Years of Experience',
      'stat-label2': 'Farmers Partnered',
      'stat-label3': 'Domestic Markets',
      'stat-label4': 'QR Traceable Batches',
      /* About */
      'about-label': 'About Us',
      'about-title': 'Cornerstone of Agricultural Ecosystem in Chandrapur',
      'about-p1': 'We take pride in being the cornerstone of the agricultural ecosystem in Chandrapur, Maharashtra — backed by 25+ years of experience as a trusted wholesale vegetable merchant and licensed Commission Agent (Aadhathiya) at APMC Ram Nagar.',
      'about-p2': 'Operating from Block 15-16, Krushi Bazar Samiti, Datala Road, Ramnagar, Chandrapur, we serve local farmers, retailers, hotels, and institutional buyers with consistent, high-quality vegetable supplies under M/S Parag Sureshrao Chaware (HUF).',
      /* Services */
      'services-label': 'Our Services',
      'services-title': 'What We Do',
      'service-1-title': 'Transparent Auctioning & Fair Pricing',
      'service-1-desc': 'Licensed APMC Commission Agent (Aadhathiya) conducting fair, transparent daily auctions — protecting both farmer income and buyer value at Chandrapur mandi.',
      'service-2-title': 'Rigorous Quality Control',
      'service-2-desc': 'Multi-level grading and inspection at every auction ensures only fresh, pesticide-screened, Grade-A vegetables reach our buyers.',
      'service-3-title': 'End-to-End Responsibility',
      'service-3-desc': 'From farm procurement to dispatch — we manage the complete supply chain, ensuring timely delivery across Chandrapur city and nearby districts.',
      'service-4-title': 'QR Code Traceability',
      'service-4-desc': 'Every batch carries a unique QR code linking to farm origin, harvest date, farmer details and pesticide test results — full transparency at a scan.',
      /* Products */
      'products-label': 'Fresh From The Mandi',
      'products-title': 'Our Product Range',
      'products-subtitle': 'Fresh, quality-graded vegetables sourced daily from Chandrapur and Vidarbha farmers at APMC Ram Nagar',
      'prod-tomato': 'Fresh Tomatoes',
      'prod-onion-red': 'Red Onions',
      'prod-onion-white': 'White Onions',
      'prod-potato': 'Potatoes',
      'prod-chili': 'Green Chilies',
      'prod-garlic': 'Garlic',
      'prod-ginger': 'Ginger',
      'prod-leafy': 'Leafy & Seasonal Vegetables',
      'prod-gap': 'GAP / Pesticide-Free Produce',
      'prod-btn-inquire': '💬 Inquire Rate on WhatsApp',
      /* Wholesale Supply page */
      'wholesale-label': '🏪 DISTRIBUTION NETWORK',
      'wholesale-title': 'Serving Chandrapur & Surrounding Districts',
      'wholesale-subtitle': 'Daily fresh vegetable supply to retailers, hotels, institutions & mandi buyers across Chandrapur and Vidarbha',
      'wholesale-local-title': 'Local Chandrapur Supply',
      'wholesale-regional-title': 'Regional Vidarbha Network',
      /* Pillars */
      'pillar-quality-title': 'Rigorous Quality Control',
      'pillar-quality-desc': 'Multi-level grading at every APMC auction — only fresh, Grade-A vegetables dispatched.',
      'pillar-qr-title': 'QR Code Traceability',
      'pillar-qr-desc': 'Every batch linked to farm origin, harvest date, and pesticide test via QR scan.',
      'pillar-fair-title': 'Fair & Transparent Pricing',
      'pillar-fair-desc': 'Licensed APMC Aadhathiya — fair mandi-rate auctions for farmers and buyers alike.',
      'pillar-fresh-title': 'Farm-to-Market Freshness',
      'pillar-fresh-desc': 'Same-day sourcing from local farmers and immediate dispatch — maximum freshness guaranteed.',
      'pillar-reliable-title': 'Year-Round Reliable Supply',
      'pillar-reliable-desc': '25+ years of uninterrupted operations — 365 days, every season, every harvest.',
      /* Gallery */
      'gallery-label': 'Our Gallery',
      'gallery-title': 'From The Mandi Floor',
      /* Contact */
      'contact-label': 'Get In Touch',
      'contact-title': 'Contact Us',
      /* Footer */
      'footer-tagline': 'Cornerstone of Chandrapur\'s agricultural ecosystem — connecting farmers, buyers, and the city with 25+ years of trusted wholesale vegetable supply.',
      'footer-links-title': 'Quick Links',
      'footer-contact-title': 'Get In Touch',
      'brand-tagline': 'WHOLESALE VEGETABLES • CHANDRAPUR',
      'footer-copyright': '© 2026 M/S Parag Sureshrao Chaware (HUF) | Suresh Namdeorao Chaware Wholesale Vegetables Merchant. All Rights Reserved.',
    },

    mr: {
      /* शीर्ष पट्टी */
      'tb-welcome': 'सुरेश नामदेव चव्हरे यांच्या व्यवसायात आपले स्वागत आहे',
      'tb-location': 'कृषी उत्पन्न बाजार समिती, राम नगर, चंद्रपूर',
      /* नेव्हिगेशन */
      'nav-home': 'मुख्यपृष्ठ',
      'nav-about': 'आमच्याबद्दल ▾',
      'nav-history': 'इतिहास',
      'nav-vm': 'दृष्टी व ध्येय',
      'nav-team': 'आमची टीम',
      'nav-products': 'उत्पादन श्रेणी',
      'nav-wholesale': 'घाऊक पुरवठा',
      'nav-gallery': 'दालन',
      'nav-contact': 'संपर्क करा',
      'nav-wa-manager': 'व्हॉट्सअॅप मॅनेजर',
      'nav-ledger': 'खातेवही (लेजर)',
      /* बटणे */
      'btn-call': 'आता कॉल करा',
      'btn-quote': 'घाऊक दर मागवा',
      'btn-admin': 'प्रशासक',
      /* हीरो */
      'hero-eyebrow': '🌿 कृषी उत्पन्न बाजार समिती, चंद्रपूर — स्थापना १९९९',
      'hero-h1-line1': 'विश्वासू घाऊक',
      'hero-h1-accent': 'भाजीपाला',
      'hero-h1-line2': 'व्यापारी व परवानाधारक आडत व्यापारी',
      'hero-lead': 'आताच मिळवा, उशीर होण्यापूर्वी! — चंद्रपूर शहर, कृषी उत्पन्न बाजार समिती राम नगर, बल्लारपूर, भद्रावती, वरोरा, राजुरा आणि संपूर्ण विदर्भातील विश्वासू घाऊक भाजीपाला व्यापारी व परवानाधारक आढती.',
      'hero-cta1': '🥦 उत्पादने पाहा',
      'hero-cta2': '💬 घाऊक दर मागवा',
      'hero-badge1': '२५+ वर्षांचा अनुभव',
      'hero-badge2': 'क्यूआर ट्रेसेबिलिटी',
      'hero-badge3': 'चंद्रपूरचे अग्रणी व्यापारी',
      /* आकडे */
      'stat-label1': 'वर्षांचा अनुभव',
      'stat-label2': 'शेतकरी भागीदार',
      'stat-label3': 'स्थानिक बाजारपेठा',
      'stat-label4': 'क्यूआर ट्रेस केलेले बॅच',
      /* आमच्याबद्दल */
      'about-label': 'आमच्याबद्दल',
      'about-title': 'चंद्रपूरच्या कृषी परिसंस्थेचा मजबूत आधारस्तंभ',
      'about-p1': 'महाराष्ट्राच्या चंद्रपूरमधील कृषी परिसंस्थेचा आधारस्तंभ म्हणून आम्हाला अभिमान आहे. कृषी उत्पन्न बाजार समिती राम नगर येथे परवानाधारक आढती (कमिशन एजंट) म्हणून आमचा २५+ वर्षांचा विश्वासू अनुभव आहे.',
      'about-p2': 'ब्लॉक १५-१६, कृषी बाजार समिती, दातला रोड, राम नगर, चंद्रपूर येथून आम्ही स्थानिक शेतकरी, किरकोळ विक्रेते, हॉटेल व संस्थांना उच्च दर्जाचा भाजीपाला नियमितपणे पुरवतो — एम/एस पराग सुरेशराव चवरे (HUF) अंतर्गत.',
      /* सेवा */
      'services-label': 'आमच्या सेवा',
      'services-title': 'आम्ही काय करतो',
      'service-1-title': 'पारदर्शक लिलाव व न्याय्य भाव',
      'service-1-desc': 'परवानाधारक APMC आढती म्हणून दररोजचे पारदर्शक लिलाव — शेतकऱ्यांचे उत्पन्न व खरेदीदाराचे हित दोन्ही सांभाळणे.',
      'service-2-title': 'कठोर गुणवत्ता नियंत्रण',
      'service-2-desc': 'प्रत्येक लिलावात बहुस्तरीय ग्रेडिंग व तपासणी — फक्त ताजा, कीटकनाशकमुक्त, ग्रेड-A भाजीपाला खरेदीदारांपर्यंत पोहोचतो.',
      'service-3-title': 'संपूर्ण जबाबदारी',
      'service-3-desc': 'शेतावरून खरेदी ते वितरण — आम्ही संपूर्ण पुरवठा साखळी व्यवस्थापित करतो; चंद्रपूर शहर व जवळच्या जिल्ह्यांत वेळेवर डिलिव्हरी.',
      'service-4-title': 'क्यूआर कोड ट्रेसेबिलिटी',
      'service-4-desc': 'प्रत्येक बॅचला शेताची माहिती, कापणी दिनांक, शेतकरी तपशील व कीटकनाशक चाचणी निकाल जोडलेले क्यूआर कोड — एका स्कॅनमध्ये पूर्ण पारदर्शकता.',
      /* उत्पादने */
      'products-label': 'मंडईतून थेट ताजे',
      'products-title': 'आमची उत्पादन श्रेणी',
      'products-subtitle': 'कृषी उत्पन्न बाजार समिती राम नगर येथे चंद्रपूर व विदर्भातील शेतकऱ्यांकडून दररोज ताजा, दर्जेदार भाजीपाला',
      'prod-tomato': 'ताजे टमाटर',
      'prod-onion-red': 'लाल कांदा',
      'prod-onion-white': 'पांढरा कांदा',
      'prod-potato': 'बटाटा',
      'prod-chili': 'हिरवी मिरची',
      'prod-garlic': 'लसूण',
      'prod-ginger': 'आले',
      'prod-leafy': 'पालेभाज्या व हंगामी भाज्या',
      'prod-gap': 'GAP / कीटकनाशकमुक्त शेतमाल',
      'prod-btn-inquire': '💬 व्हॉट्सअॅपवर दर विचारा',
      /* घाऊक पुरवठा */
      'wholesale-label': '🏪 वितरण जाळे',
      'wholesale-title': 'चंद्रपूर व आसपासच्या जिल्ह्यांना सेवा',
      'wholesale-subtitle': 'चंद्रपूर शहर व जवळच्या तालुक्यांतील किरकोळ विक्रेते, हॉटेल, संस्था व मंडई खरेदीदारांना दररोज ताज्या भाजीपाल्याचा पुरवठा',
      'wholesale-local-title': 'चंद्रपूर शहर पुरवठा',
      'wholesale-regional-title': 'विदर्भ प्रादेशिक जाळे',
      /* स्तंभ */
      'pillar-quality-title': 'कठोर गुणवत्ता नियंत्रण',
      'pillar-quality-desc': 'प्रत्येक APMC लिलावात बहुस्तरीय ग्रेडिंग — फक्त ताजा, ग्रेड-A भाजीपाला पुरवठा.',
      'pillar-qr-title': 'क्यूआर कोड ट्रेसेबिलिटी',
      'pillar-qr-desc': 'प्रत्येक बॅच शेत, कापणी दिनांक व कीटकनाशक चाचणी माहितीशी क्यूआर स्कॅनद्वारे जोडलेले.',
      'pillar-fair-title': 'न्याय्य व पारदर्शक भाव',
      'pillar-fair-desc': 'परवानाधारक APMC आढती — शेतकरी व खरेदीदार दोघांसाठी न्याय्य मंडई दराचे लिलाव.',
      'pillar-fresh-title': 'शेतावरून मंडईत थेट',
      'pillar-fresh-desc': 'स्थानिक शेतकऱ्यांकडून त्याच दिवशी खरेदी व तत्काळ वितरण — ताजेपणा सुनिश्चित.',
      'pillar-reliable-title': 'वर्षभर विश्वासार्ह पुरवठा',
      'pillar-reliable-desc': '२५+ वर्षांचे अखंड कार्य — ३६५ दिवस, प्रत्येक हंगाम, प्रत्येक पीक.',
      /* दालन */
      'gallery-label': 'आमचे दालन',
      'gallery-title': 'मंडईतून थेट',
      /* संपर्क */
      'contact-label': 'संपर्क साधा',
      'contact-title': 'आमच्याशी संपर्क करा',
      /* पाद लेख */
      'footer-tagline': 'चंद्रपूरच्या कृषी परिसंस्थेचा आधारस्तंभ — शेतकरी, खरेदीदार आणि शहर यांना जोडणे. २५+ वर्षांच्या विश्वासार्ह घाऊक भाजीपाला पुरवठ्याचा अनुभव.',
      'footer-links-title': 'द्रुत दुवे',
      'footer-contact-title': 'संपर्क साधा',
      'brand-tagline': 'घाऊक भाजीपाला • चंद्रपूर',
      'footer-copyright': '© २०२६ एम/एस पराग सुरेशराव चवरे (HUF) | सुरेश नामदेवराव चवरे घाऊक भाजीपाला व्यापारी. सर्व हक्क राखीव.',
    },

    hi: {
      /* शीर्ष पट्टी */
      'tb-welcome': 'सुरेश नामदेव चव्हरे के व्यवसाय में आपका स्वागत है',
      'tb-location': 'कृषि उपज मंडी समिति, राम नगर, चंद्रपुर',
      /* नेवीगेशन */
      'nav-home': 'मुख्य पृष्ठ',
      'nav-about': 'हमारे बारे में ▾',
      'nav-history': 'इतिहास',
      'nav-vm': 'दृष्टि और मिशन',
      'nav-team': 'हमारी टीम',
      'nav-products': 'उत्पाद श्रेणी',
      'nav-wholesale': 'थोक आपूर्ति',
      'nav-gallery': 'गैलरी',
      'nav-contact': 'संपर्क करें',
      'nav-wa-manager': 'व्हाट्सएप मैनेजर',
      'nav-ledger': 'खाता बही (लेज़र)',
      /* बटन */
      'btn-call': 'अभी कॉल करें',
      'btn-quote': 'थोक दर माँगें',
      'btn-admin': 'प्रशासक',
      /* हीरो */
      'hero-eyebrow': '🌿 कृषि उपज मंडी समिति, चंद्रपुर — स्थापना १९९९',
      'hero-h1-line1': 'विश्वसनीय थोक',
      'hero-h1-accent': 'सब्जी',
      'hero-h1-line2': 'व्यापारी और आढ़तिया',
      'hero-lead': 'अभी ले जाएं, देर न हो जाए! — चंद्रपुर शहर, कृषि उपज मंडी समिति राम नगर, बल्लारपुर, भद्रावती, वरोरा, राजुरा और पूरे विदर्भ में विश्वसनीय थोक सब्जी व्यापारी और लाइसेंसधारी आढ़तिया।',
      'hero-cta1': '🥦 उत्पाद देखें',
      'hero-cta2': '💬 थोक दर माँगें',
      'hero-badge1': '२५+ वर्षों का अनुभव',
      'hero-badge2': 'QR ट्रेसेबिलिटी',
      'hero-badge3': 'चंद्रपुर के अग्रणी व्यापारी',
      /* आँकड़े */
      'stat-label1': 'वर्षों का अनुभव',
      'stat-label2': 'किसान साझेदार',
      'stat-label3': 'घरेलू बाज़ार',
      'stat-label4': 'QR ट्रेस्ड बैच',
      /* हमारे बारे में */
      'about-label': 'हमारे बारे में',
      'about-title': 'चंद्रपुर की कृषि पारिस्थितिकी का मजबूत आधारस्तंभ',
      'about-p1': 'हमें महाराष्ट्र के चंद्रपुर की कृषि पारिस्थितिकी का आधारस्तंभ होने पर गर्व है। कृषि उपज मंडी समिति राम नगर में लाइसेंसधारी आढ़तिया (कमीशन एजेंट) के रूप में हमारा २५+ वर्षों का विश्वसनीय अनुभव है।',
      'about-p2': 'ब्लॉक १५-१६, कृषि बाजार समिति, दातला रोड, राम नगर, चंद्रपुर से हम स्थानीय किसानों, खुदरा विक्रेताओं, होटलों और संस्थागत खरीदारों को उच्च गुणवत्ता की सब्जियाँ नियमित रूप से प्रदान करते हैं — एम/एस पराग सुरेशराव चवरे (HUF) के अंतर्गत।',
      /* सेवाएँ */
      'services-label': 'हमारी सेवाएँ',
      'services-title': 'हम क्या करते हैं',
      'service-1-title': 'पारदर्शी नीलामी और उचित मूल्य',
      'service-1-desc': 'लाइसेंसधारी APMC आढ़तिया के रूप में प्रतिदिन पारदर्शी नीलामी — किसानों की आय और खरीदारों के हित दोनों की रक्षा।',
      'service-2-title': 'कड़ी गुणवत्ता जाँच',
      'service-2-desc': 'हर नीलामी में बहुस्तरीय ग्रेडिंग और निरीक्षण — केवल ताज़ी, कीटनाशकमुक्त, ग्रेड-A सब्जियाँ खरीदारों तक पहुँचती हैं।',
      'service-3-title': 'संपूर्ण जिम्मेदारी',
      'service-3-desc': 'खेत से खरीद से वितरण तक — हम पूरी आपूर्ति श्रृंखला संभालते हैं; चंद्रपुर शहर और पड़ोसी जिलों में समय पर डिलीवरी।',
      'service-4-title': 'QR कोड ट्रेसेबिलिटी',
      'service-4-desc': 'हर बैच पर खेत की जानकारी, कटाई तिथि, किसान का विवरण और कीटनाशक परीक्षण परिणाम से जुड़ा QR कोड — एक स्कैन में पूरी पारदर्शिता।',
      /* उत्पाद */
      'products-label': 'मंडी से सीधे ताज़ा',
      'products-title': 'हमारी उत्पाद श्रेणी',
      'products-subtitle': 'कृषि उपज मंडी समिति राम नगर में चंद्रपुर और विदर्भ के किसानों से रोज़ाना ताज़ी, उत्कृष्ट सब्जियाँ',
      'prod-tomato': 'ताज़ा टमाटर',
      'prod-onion-red': 'लाल प्याज',
      'prod-onion-white': 'सफ़ेद प्याज',
      'prod-potato': 'आलू',
      'prod-chili': 'हरी मिर्च',
      'prod-garlic': 'लहसुन',
      'prod-ginger': 'अदरक',
      'prod-leafy': 'पत्तेदार और मौसमी सब्जियाँ',
      'prod-gap': 'GAP / कीटनाशकमुक्त उपज',
      'prod-btn-inquire': '💬 व्हाट्सएप पर दर पूछें',
      /* थोक आपूर्ति */
      'wholesale-label': '🏪 वितरण नेटवर्क',
      'wholesale-title': 'चंद्रपुर और आसपास के जिलों की सेवा',
      'wholesale-subtitle': 'चंद्रपुर शहर और पास के तालुकों के खुदरा व्यापारी, होटल, संस्थाएं और मंडी खरीदारों को प्रतिदिन ताज़ी सब्जियों की आपूर्ति',
      'wholesale-local-title': 'स्थानीय चंद्रपुर आपूर्ति',
      'wholesale-regional-title': 'विदर्भ क्षेत्रीय नेटवर्क',
      /* स्तंभ */
      'pillar-quality-title': 'कड़ी गुणवत्ता जाँच',
      'pillar-quality-desc': 'हर APMC नीलामी में बहुस्तरीय ग्रेडिंग — केवल ताज़ी, ग्रेड-A सब्जियाँ भेजी जाती हैं।',
      'pillar-qr-title': 'QR कोड ट्रेसेबिलिटी',
      'pillar-qr-desc': 'हर बैच खेत, कटाई तिथि और कीटनाशक परीक्षण से QR स्कैन के माध्यम से जुड़ा हुआ।',
      'pillar-fair-title': 'उचित और पारदर्शी मूल्य',
      'pillar-fair-desc': 'लाइसेंसधारी APMC आढ़तिया — किसानों और खरीदारों दोनों के लिए उचित मंडी दर की नीलामी।',
      'pillar-fresh-title': 'खेत से मंडी तक ताज़गी',
      'pillar-fresh-desc': 'स्थानीय किसानों से उसी दिन खरीद और तत्काल वितरण — अधिकतम ताज़गी सुनिश्चित।',
      'pillar-reliable-title': 'वर्षभर विश्वसनीय आपूर्ति',
      'pillar-reliable-desc': '२५+ वर्षों का निरंतर संचालन — ३६५ दिन, हर मौसम, हर फसल।',
      /* गैलरी */
      'gallery-label': 'हमारी गैलरी',
      'gallery-title': 'मंडी से सीधे',
      /* संपर्क */
      'contact-label': 'संपर्क करें',
      'contact-title': 'हमसे संपर्क करें',
      /* पादलेख */
      'footer-tagline': 'चंद्रपुर की कृषि पारिस्थितिकी का आधारस्तंभ — किसानों, खरीदारों और शहर को जोड़ना। २५+ वर्षों की विश्वसनीय थोक सब्जी आपूर्ति का अनुभव।',
      'footer-links-title': 'त्वरित लिंक',
      'footer-contact-title': 'संपर्क करें',
      'brand-tagline': 'थोक सब्ज़ियाँ • चंद्रपुर',
      'footer-copyright': '© २०२६ एम/एस पराग सुरेशराव चवरे (HUF) | सुरेश नामदेवराव चवरे थोक सब्जी व्यापारी। सर्वाधिकार सुरक्षित।',
    }
  };

  /* JSON dictionaries are the maintained translation source. The inline map remains
     as a local-file fallback so language switching still works without a web server. */
  const dictionaryReady = Promise.all(['en', 'mr', 'hi'].map(async lang => {
    try {
      const response = await fetch(`./assets/i18n/${lang}.json`, { cache: 'no-cache' });
      if (response.ok) Object.assign(T[lang], await response.json());
    } catch (_) { /* file:// pages use the inline fallback above */ }
  }));

  function applyLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('snc-lang', lang);
    const map = T[lang] || T.en;
    Object.entries(map).forEach(([key, val]) => {
      $$(`[data-i18n="${key}"]`).forEach(el => {
        el.textContent = val;
      });
      /* Also update placeholder attributes */
      $$(`[data-i18n-placeholder="${key}"]`).forEach(el => {
        el.setAttribute('placeholder', val);
      });
    });
    document.documentElement.lang = lang === 'mr' ? 'mr' : lang === 'hi' ? 'hi' : 'en';
    $$('#lang-dropdown a').forEach(a => {
      a.classList.toggle('active-lang', a.dataset.lang === lang);
    });
    const labels = { en: '🌐 English', mr: '🌐 मराठी', hi: '🌐 हिंदी' };
    const lb = $('#lang-btn .lang-label');
    if (lb) lb.textContent = labels[lang] || labels.en;
  }

  if (langBtn && langDropdown) {
    langBtn.addEventListener('click', e => {
      e.stopPropagation();
      langDropdown.classList.toggle('open');
    });
    document.addEventListener('click', () => langDropdown.classList.remove('open'));
    $$('#lang-dropdown a').forEach(a => {
      a.addEventListener('click', e => {
        e.preventDefault();
        langDropdown.classList.remove('open');
        dictionaryReady.then(() => applyLanguage(a.dataset.lang));
      });
    });
    if (currentLang !== 'en') dictionaryReady.then(() => applyLanguage(currentLang));
  }

  /* ---- SCROLL REVEAL ---- */
  const revealEls = $$('.reveal, .reveal-left, .reveal-right');
  if ('IntersectionObserver' in window) {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(el => obs.observe(el));
  } else { revealEls.forEach(el => el.classList.add('visible')); }

  /* ---- ANIMATED COUNTERS ---- */
  function animateCount(el) {
    const target = parseInt(el.dataset.target, 10);
    const suffix = el.dataset.suffix || '';
    const prefix = el.dataset.prefix || '';
    const dur = 1800;
    let current = 0;
    const step = target / (dur / 16);
    const timer = setInterval(() => {
      current += step;
      if (current >= target) { current = target; clearInterval(timer); }
      el.textContent = prefix + Math.floor(current) + suffix;
    }, 16);
  }
  if ('IntersectionObserver' in window) {
    const co = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { animateCount(e.target); co.unobserve(e.target); } });
    }, { threshold: 0.4 });
    $$('.stat-num[data-target]').forEach(c => co.observe(c));
  }

  /* ---- SCROLL TO TOP ---- */
  const scrollTopBtn = $('#scroll-top');
  if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
      scrollTopBtn.classList.toggle('show', window.scrollY > 400);
    }, { passive: true });
    scrollTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  /* ---- ADMIN MODAL ---- */
  const adminModal = $('#admin-modal');
  $$('.open-admin').forEach(b => b.addEventListener('click', e => { e.preventDefault(); adminModal?.classList.add('open'); }));
  $$('.admin-modal-close').forEach(b => b.addEventListener('click', () => adminModal?.classList.remove('open')));
  adminModal?.addEventListener('click', e => { if (e.target === adminModal) adminModal.classList.remove('open'); });
  $('#admin-form')?.addEventListener('submit', e => {
    e.preventDefault();
    const btn = e.target.querySelector('button[type=submit]');
    btn.textContent = 'Authenticating…';
    setTimeout(() => { btn.textContent = 'Sign In'; alert('Admin panel under development.\nContact: paragchaware@gmail.com'); }, 1300);
  });

  /* ---- BULK QUOTE MODAL ---- */
  const quoteModal = $('#quote-modal');
  $$('.open-quote').forEach(b => b.addEventListener('click', e => {
    e.preventDefault();
    const rawProduct = b.dataset.product || 'mixed seasonal vegetables';
    const product = currentLang === 'mr'
      ? (({ 'mixed seasonal vegetables': 'मिश्र हंगामी भाज्या' })[rawProduct] || rawProduct)
      : currentLang === 'hi'
        ? (({ 'mixed seasonal vegetables': 'मिश्रित मौसमी सब्ज़ियाँ' })[rawProduct] || rawProduct)
        : rawProduct;
    const message = {
      en: `Namaste, I would like a bulk quote for ${product}. Please share today's mandi rate, available quantity, and supply details for Chandrapur.`,
      mr: `नमस्कार, मला ${product} साठी घाऊक दरपत्रक हवे आहे. आजचा मंडई भाव, उपलब्ध प्रमाण आणि चंद्रपूरमधील पुरवठ्याची माहिती कळवा.`,
      hi: `नमस्ते, मुझे ${product} के लिए थोक भाव चाहिए। आज का मंडी भाव, उपलब्ध मात्रा और चंद्रपुर में आपूर्ति की जानकारी बताइए।`
    }[currentLang] || `Namaste, I would like a bulk quote for ${product}. Please share today's mandi rate and available quantity for Chandrapur.`;
    window.open(`https://wa.me/919552233488?text=${encodeURIComponent(message)}`, '_blank', 'noopener');
  }));
  $$('.quote-modal-close').forEach(b => b.addEventListener('click', () => quoteModal?.classList.remove('open')));
  quoteModal?.addEventListener('click', e => { if (e.target === quoteModal) quoteModal.classList.remove('open'); });

  /* ---- INQUIRE RATE (product cards) ---- */
  $$('.inquire-rate-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      const product = btn.dataset.product || '';
      const names = {
        en: product,
        mr: ({ Tomatoes: 'टोमॅटो', 'Red Onions': 'लाल कांदे', 'White Onions': 'पांढरे कांदे', Onions: 'कांदे', Potatoes: 'बटाटे', 'Green Chilies': 'हिरव्या मिरच्या', Garlic: 'लसूण', Ginger: 'आले', 'Leafy & Seasonal Vegetables': 'पालेभाज्या व हंगामी भाज्या', 'GAP Certified Produce': 'GAP प्रमाणित भाजीपाला', 'GAP / Pesticide-Tested Produce': 'GAP व कीटकनाशक तपासणी केलेला शेतमाल', 'GAP Produce': 'GAP प्रमाणित शेतमाल' })[product] || product,
        hi: ({ Tomatoes: 'टमाटर', 'Red Onions': 'लाल प्याज़', 'White Onions': 'सफ़ेद प्याज़', Onions: 'प्याज़', Potatoes: 'आलू', 'Green Chilies': 'हरी मिर्च', Garlic: 'लहसुन', Ginger: 'अदरक', 'Leafy & Seasonal Vegetables': 'पत्तेदार और मौसमी सब्ज़ियाँ', 'GAP Certified Produce': 'GAP प्रमाणित सब्ज़ियाँ', 'GAP / Pesticide-Tested Produce': 'GAP और कीटनाशक जाँच वाली उपज', 'GAP Produce': 'GAP प्रमाणित उपज' })[product] || product
      };
      const prompts = {
        en: `Namaste, please share today's mandi rate and available bulk quantity for ${names.en} at APMC Chandrapur.`,
        mr: `नमस्कार, कृषी उत्पन्न बाजार समिती चंद्रपूर येथील ${names.mr}चा आजचा मंडई भाव आणि उपलब्ध घाऊक प्रमाण कळवा.`,
        hi: `नमस्ते, कृषि उपज मंडी समिति चंद्रपुर में ${names.hi} का आज का मंडी भाव और उपलब्ध थोक मात्रा बताइए।`
      };
      window.open(`https://wa.me/919552233488?text=${encodeURIComponent(prompts[currentLang] || prompts.en)}`, '_blank', 'noopener');
    });
  });

  /* ---- WHATSAPP BUILDERS ---- */
  function buildWAText(form) {
    const v = n => form.querySelector(`[name=${n}]`)?.value || '';
    const products = [...form.querySelectorAll('[name=products]:checked')].map(c => c.value).join(', ');
    return `🌿 *Wholesale Inquiry — Suresh Namdeo Chawre*\n\n` +
      `👤 *Name/Business:* ${v('name')}\n` +
      `📱 *Phone:* ${v('phone')}\n` +
      `📧 *Email:* ${v('email')}\n` +
      `📋 *Inquiry Type:* ${v('inquiry_type')}\n` +
      `🥦 *Products:* ${products || 'Not specified'}\n` +
      `📦 *Quantity:* ${v('quantity')}\n` +
      `💬 *Message:* ${v('message')}\n\n` +
      `Sent via paragsureshraochaware.co.in`;
  }

  $('#wa-send-btn')?.addEventListener('click', e => {
    e.preventDefault();
    const form = $('#wa-inquiry-form');
    if (form) window.open(`https://wa.me/919552233488?text=${encodeURIComponent(buildWAText(form))}`, '_blank');
  });

  $('#quote-wa-btn')?.addEventListener('click', e => {
    e.preventDefault();
    const form = $('#quote-form');
    const v = n => form?.querySelector(`[name=${n}]`)?.value || '';
    const text = `🌿 *Bulk Quote — Suresh Namdeo Chawre*\n\n👤 *Name:* ${v('name')}\n📱 *Phone:* ${v('phone')}\n🥦 *Product:* ${v('product')}\n📦 *Quantity:* ${v('quantity')}\n💬 *Note:* ${v('message')}\n\nSent via paragsureshraochaware.co.in`;
    window.open(`https://wa.me/919552233488?text=${encodeURIComponent(text)}`, '_blank');
  });

  /* ---- FILTER TABS ---- */
  $$('.filter-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      $$('.filter-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const filter = tab.dataset.filter;
      $$('[data-category]').forEach(item => {
        const show = filter === 'all' || item.dataset.category === filter;
        item.style.display = show ? '' : 'none';
        if (show) item.style.animation = 'fadeIn .35s ease';
      });
    });
  });

  /* ---- LIGHTBOX ---- */
  const lightbox = $('#lightbox');
  const lbImg = $('#lb-img');
  let lbItems = [], lbIndex = 0;

  function showLb() {
    if (!lbItems.length) return;
    const it = lbItems[lbIndex];
    if (lbImg) lbImg.src = it.src;
    const c = $('#lb-counter'); if (c) c.textContent = `${lbIndex+1} / ${lbItems.length}`;
    const cap = $('#lb-caption'); if (cap) cap.textContent = it.caption || '';
  }
  function openLb(items, idx) { lbItems = items; lbIndex = idx; showLb(); lightbox?.classList.add('open'); document.body.style.overflow = 'hidden'; }
  function closeLb() { lightbox?.classList.remove('open'); document.body.style.overflow = ''; }

  $('#lb-close')?.addEventListener('click', closeLb);
  $('#lb-prev')?.addEventListener('click', () => { lbIndex = (lbIndex-1+lbItems.length)%lbItems.length; showLb(); });
  $('#lb-next')?.addEventListener('click', () => { lbIndex = (lbIndex+1)%lbItems.length; showLb(); });
  lightbox?.addEventListener('click', e => { if (e.target === lightbox) closeLb(); });

  document.addEventListener('keydown', e => {
    if (!lightbox?.classList.contains('open')) return;
    if (e.key === 'Escape') closeLb();
    if (e.key === 'ArrowLeft') { lbIndex=(lbIndex-1+lbItems.length)%lbItems.length; showLb(); }
    if (e.key === 'ArrowRight') { lbIndex=(lbIndex+1)%lbItems.length; showLb(); }
  });

  // Attach to gallery items
  const galleryItems = $$('.gallery-item[data-src]');
  if (galleryItems.length) {
    const items = galleryItems.map(el => ({ src: el.dataset.src, caption: el.dataset.caption || '' }));
    galleryItems.forEach((el, i) => el.addEventListener('click', () => openLb(items, i)));
  }

  /* ---- ESC closes all modals ---- */
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      $$('#admin-modal.open, #quote-modal.open').forEach(el => el.classList.remove('open'));
      document.body.style.overflow = '';
    }
  });

  /* ---- QR BATCH PREVIEW ---- */
  $$('.qr-preview-trigger').forEach(btn => {
    btn.addEventListener('click', () => {
      const copyByLang = {
        en: { title: 'QR Batch Record', subtitle: 'Sample Traceability Record — SNC Chandrapur', close: 'Close Preview', rows: [['Batch ID','SNC-2026-TOM-0415'],['Product','Premium Tomatoes'],['Farm Origin','Vidarbha, Maharashtra'],['Farmer','Ramesh Bhosale, Chandrapur'],['Harvest Date','14-Nov-2026'],['Pesticide Test','✅ Clear — Residue Free'],['Grade','Grade A — Wholesale Quality'],['Dispatch','APMC Chandrapur → Ramnagar Market'],['Agent','Suresh Namdeo Chawre, APMC Chandrapur']] },
        mr: { title: 'क्यूआर बॅच नोंद', subtitle: 'नमुना मागोवा नोंद — SNC चंद्रपूर', close: 'पूर्वदृश्य बंद करा', rows: [['बॅच क्रमांक','SNC-2026-TOM-0415'],['उत्पादन','दर्जेदार टोमॅटो'],['शेताचा उगम','विदर्भ, महाराष्ट्र'],['शेतकरी','रमेश भोसले, चंद्रपूर'],['कापणी दिनांक','१४-नोव्हेंबर-२०२६'],['कीटकनाशक चाचणी','✅ योग्य — अवशेषमुक्त'],['प्रतवारी','अ-श्रेणी — घाऊक पुरवठ्यासाठी'],['वितरण','कृषी उत्पन्न बाजार समिती चंद्रपूर → रामनगर बाजार'],['आडत व्यापारी / कमीशन एजंट','सुरेश नामदेव चव्हरे, कृषी उत्पन्न बाजार समिती चंद्रपूर']] },
        hi: { title: 'क्यूआर बैच रिकॉर्ड', subtitle: 'नमूना ट्रेसबिलिटी रिकॉर्ड — SNC चंद्रपुर', close: 'पूर्वावलोकन बंद करें', rows: [['बैच आईडी','SNC-2026-TOM-0415'],['उत्पाद','प्रीमियम टमाटर'],['खेत का स्रोत','विदर्भ, महाराष्ट्र'],['किसान','रमेश भोसले, चंद्रपुर'],['कटाई की तारीख','१४-नवंबर-२०२६'],['कीटनाशक जाँच','✅ साफ़ — अवशेष मुक्त'],['श्रेणी','ग्रेड A — थोक आपूर्ति'],['भेजाव','कृषि उपज मंडी समिति चंद्रपुर → रामनगर मंडी'],['आढ़त व्यापारी / कमीशन एजेंट','सुरेश नामदेव चव्हरे, कृषि उपज मंडी समिति चंद्रपुर']] }
      };
      const copy = copyByLang[currentLang] || copyByLang.en;
      const overlay = document.createElement('div');
      overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,.85);z-index:30000;display:flex;align-items:center;justify-content:center;padding:1rem;';
      overlay.innerHTML = `
        <div style="background:#fff;border-radius:20px;padding:2.25rem;max-width:420px;width:100%;font-family:inherit;position:relative;">
          <button onclick="this.closest('[style]').remove()" style="position:absolute;top:1rem;right:1rem;background:#f1f5f9;border:none;border-radius:50%;width:30px;height:30px;cursor:pointer;font-size:.9rem;">✕</button>
          <div style="text-align:center;margin-bottom:1.4rem;">
            <div style="font-size:3.5rem;margin-bottom:.4rem;">📱</div>
            <h3 style="font-size:1.2rem;font-weight:800;color:#052e16;margin-bottom:.3rem;">${copy.title}</h3>
            <p style="font-size:.82rem;color:#64748b;">${copy.subtitle}</p>
          </div>
          <table style="width:100%;font-size:.85rem;border-collapse:collapse;">
            ${copy.rows.map(([k,v],i)=>`<tr style="background:${i%2?'#f8fafc':'#fff'}"><td style="padding:.45rem .6rem;color:#64748b;font-weight:600;">${k}</td><td style="padding:.45rem .6rem;font-weight:600;color:#0f172a;">${v}</td></tr>`).join('')}
          </table>
          <button onclick="this.closest('[style]').remove()" style="margin-top:1.25rem;width:100%;padding:.75rem;background:linear-gradient(135deg,#16a34a,#15803d);color:#fff;border:none;border-radius:50px;font-size:.93rem;font-weight:700;cursor:pointer;">${copy.close}</button>
        </div>`;
      document.body.appendChild(overlay);
      overlay.addEventListener('click', e => { if (e.target === overlay) overlay.remove(); });
    });
  });

  console.log('🌿 SNC Website v2.0 Loaded | Lang:', currentLang);
})();
