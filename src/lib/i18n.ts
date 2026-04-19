// ── KREO i18n Translation System ─────────────────────────────────────────────
// Supports: English, Hindi, Spanish, French, Japanese, Arabic

export type LangCode = 'en' | 'hi' | 'es' | 'fr' | 'ja' | 'ar';

export interface Translations {
  // Nav / Global
  lang_label: string;
  dismiss: string;
  back: string;
  share: string;
  history: string;
  settings: string;
  logout: string;
  login: string;
  close: string;
  copy: string;
  copied: string;
  
  // Loading
  loading_calibrating: string;
  loading_restoring: string;
  loading_building: string;
  
  // Home Screen — Hero
  hero_tagline: string;
  hero_sub: string;
  hero_placeholder_1: string;
  hero_placeholder_2: string;
  hero_placeholder_3: string;
  hero_placeholder_4: string;
  hero_placeholder_5: string;
  hero_placeholder_6: string;
  
  // Home Screen — What you can do
  possibilities_title: string;

  // Home Screen — Synthesis Engine
  step_01_title: string;
  step_01_desc: string;
  step_02_title: string;
  step_02_desc: string;
  step_03_title: string;
  step_03_desc: string;
  
  // Home Screen — Top Nav
  nav_create: string;
  nav_history: string;
  nav_card: string;
  nav_pricing: string;
  
  // Artifact panel
  artifact_preview: string;
  artifact_code: string;
  artifact_live_edit: string;
  artifact_knobs: string;
  artifact_share: string;
  artifact_download: string;
  
  // Web Capture
  webcapture_title: string;
  webcapture_sub: string;
  webcapture_placeholder: string;
  webcapture_cta: string;
  
  // History
  history_title: string;
  history_empty: string;
  history_delete: string;
  
  // Share dialog
  share_title: string;
  share_sub: string;
  share_copy_link: string;
  share_close: string;
  
  // Scenarios
  scenario_1_t: string; scenario_1_s: string;
  scenario_2_t: string; scenario_2_s: string;
  scenario_3_t: string; scenario_3_s: string;
  scenario_4_t: string; scenario_4_s: string;
  scenario_5_t: string; scenario_5_s: string;
  scenario_6_t: string; scenario_6_s: string;
  
  // Auth
  auth_signin: string;
  auth_signup: string;
  auth_email: string;
  auth_password: string;
  auth_continue: string;
  auth_guest: string;
  
  // Footer
  footer_tagline: string;
}

export const LANGUAGES: { code: LangCode; label: string; nativeLabel: string; dir?: 'rtl' }[] = [
  { code: 'en', label: 'English', nativeLabel: 'English' },
  { code: 'hi', label: 'Hindi', nativeLabel: 'हिंदी' },
  { code: 'es', label: 'Spanish', nativeLabel: 'Español' },
  { code: 'fr', label: 'French', nativeLabel: 'Français' },
  { code: 'ja', label: 'Japanese', nativeLabel: '日本語' },
  { code: 'ar', label: 'Arabic', nativeLabel: 'العربية', dir: 'rtl' },
];

export const TRANSLATIONS: Record<LangCode, Translations> = {
  // ── ENGLISH ──────────────────────────────────────────────────────────────────
  en: {
    lang_label: 'Language',
    dismiss: 'Dismiss',
    back: 'Back',
    share: 'Share',
    history: 'History',
    settings: 'Settings',
    logout: 'Log out',
    login: 'Log in',
    close: 'Close',
    copy: 'Copy',
    copied: 'Copied!',
    loading_calibrating: 'Calibrating Architectural Weight...',
    loading_restoring: 'Restoring Neural Manifest...',
    loading_building: 'Building your vision...',
    hero_tagline: 'Build your imagination.',
    hero_sub: 'Describe anything. KREO manifests it.',
    hero_placeholder_1: 'Create a project dashboard…',
    hero_placeholder_2: 'Design a high-end landing page…',
    hero_placeholder_3: 'Build a neumorphic widget…',
    hero_placeholder_4: 'Generate a stylish login card…',
    hero_placeholder_5: 'Make a minimal portfolio site…',
    hero_placeholder_6: 'Make an About Us page for Dhruv Gautam…',
    possibilities_title: 'What you can do with KREO',
    step_01_title: 'Your Idea',
    step_01_desc: 'Describe your goal in plain language or upload a source file.',
    step_02_title: 'Visual Design',
    step_02_desc: 'Our engine handles the visual structure and professional design details.',
    step_03_title: 'Final Build',
    step_03_desc: 'A functional, beautiful outcome is generated in seconds.',
    nav_create: 'Create',
    nav_history: 'History',
    nav_card: 'My Card',
    nav_pricing: 'Pricing',
    artifact_preview: 'Preview',
    artifact_code: 'Code',
    artifact_live_edit: 'Live Edit',
    artifact_knobs: 'Knobs',
    artifact_share: 'Share Manifest',
    artifact_download: 'Download',
    webcapture_title: 'Web Capture',
    webcapture_sub: 'Copy any website design',
    webcapture_placeholder: 'https://example.com',
    webcapture_cta: 'Capture Design',
    history_title: 'Neural Archive',
    history_empty: 'No manifestations yet.',
    history_delete: 'Delete',
    share_title: 'Share Manifest',
    share_sub: 'Anyone with this link can view the manifestation.',
    share_copy_link: 'Copy Link',
    share_close: 'Close Manifest',
    scenario_1_t: 'Meeting in 2 hours. No deck.', scenario_1_s: 'The idea is there. The visuals aren\'t.',
    scenario_2_t: 'Flowchart for a 40-page PDF.', scenario_2_s: 'The exam is tomorrow. You need it visual.',
    scenario_3_t: 'Startup needs a landing page.', scenario_3_s: 'No dev team? No problem.',
    scenario_4_t: 'Mockup in 10 minutes.', scenario_4_s: 'You promised. KREO delivers.',
    scenario_5_t: 'Scientific diagram check.', scenario_5_s: 'Complex reality, simple design.',
    scenario_6_t: 'Client pitch at noon.', scenario_6_s: 'Wow them before you start.',
    auth_signin: 'Sign in',
    auth_signup: 'Create account',
    auth_email: 'Email address',
    auth_password: 'Password',
    auth_continue: 'Continue',
    auth_guest: 'Continue as guest',
    footer_tagline: 'Neural Design Engine',
  },

  // ── HINDI ─────────────────────────────────────────────────────────────────────
  hi: {
    lang_label: 'भाषा',
    dismiss: 'बंद करें',
    back: 'वापस',
    share: 'साझा करें',
    history: 'इतिहास',
    settings: 'सेटिंग्स',
    logout: 'लॉग आउट',
    login: 'लॉग इन',
    close: 'बंद करें',
    copy: 'कॉपी करें',
    copied: 'कॉपी हो गया!',
    loading_calibrating: 'आर्किटेक्चरल वेट कैलिब्रेट हो रहा है...',
    loading_restoring: 'न्यूरल मैनिफेस्ट रिस्टोर हो रहा है...',
    loading_building: 'आपका विज़न बन रहा है...',
    hero_tagline: 'अपनी कल्पना बनाएं।',
    hero_sub: 'कुछ भी बताएं। KREO उसे साकार करता है।',
    hero_placeholder_1: 'एक प्रोजेक्ट डैशबोर्ड बनाएं…',
    hero_placeholder_2: 'एक हाई-एंड लैंडिंग पेज डिज़ाइन करें…',
    hero_placeholder_3: 'एक न्यूमॉर्फिक विजेट बनाएं…',
    hero_placeholder_4: 'एक स्टाइलिश लॉगिन कार्ड जेनरेट करें…',
    hero_placeholder_5: 'एक मिनिमल पोर्टफोलियो साइट बनाएं…',
    hero_placeholder_6: 'Dhruv Gautam के लिए About Us पेज बनाएं…',
    possibilities_title: 'KREO से क्या बना सकते हैं',
    step_01_title: 'आपका विचार',
    step_01_desc: 'अपना लक्ष्य सरल भाषा में बताएं या कोई फ़ाइल अपलोड करें।',
    step_02_title: 'विज़ुअल डिज़ाइन',
    step_02_desc: 'हमारा इंजन विज़ुअल स्ट्रक्चर और प्रोफेशनल डिज़ाइन संभालता है।',
    step_03_title: 'अंतिम निर्माण',
    step_03_desc: 'कुछ ही सेकंड में एक सुंदर और कार्यात्मक परिणाम तैयार होता है।',
    nav_create: 'बनाएं',
    nav_history: 'इतिहास',
    nav_card: 'मेरा कार्ड',
    nav_pricing: 'मूल्य निर्धारण',
    artifact_preview: 'प्रीव्यू',
    artifact_code: 'कोड',
    artifact_live_edit: 'लाइव एडिट',
    artifact_knobs: 'नॉब्स',
    artifact_share: 'मैनिफेस्ट साझा करें',
    artifact_download: 'डाउनलोड',
    webcapture_title: 'वेब कैप्चर',
    webcapture_sub: 'किसी भी वेबसाइट का डिज़ाइन कॉपी करें',
    webcapture_placeholder: 'https://example.com',
    webcapture_cta: 'डिज़ाइन कैप्चर करें',
    history_title: 'न्यूरल आर्काइव',
    history_empty: 'अभी तक कोई मैनिफेस्टेशन नहीं।',
    history_delete: 'हटाएं',
    share_title: 'मैनिफेस्ट साझा करें',
    share_sub: 'इस लिंक वाला कोई भी इसे देख सकता है।',
    share_copy_link: 'लिंक कॉपी करें',
    share_close: 'मैनिफेस्ट बंद करें',
    scenario_1_t: '2 घंटे में मीटिंग। डेक नहीं।', scenario_1_s: 'विचार तो है। विज़ुअल नहीं।',
    scenario_2_t: '40 पेज PDF का फ्लोचार्ट।', scenario_2_s: 'कल परीक्षा है। विज़ुअल चाहिए।',
    scenario_3_t: 'स्टार्टअप को लैंडिंग पेज चाहिए।', scenario_3_s: 'डेव टीम नहीं? कोई बात नहीं।',
    scenario_4_t: '10 मिनट में मॉकअप।', scenario_4_s: 'आपने वादा किया। KREO देगा।',
    scenario_5_t: 'वैज्ञानिक आरेख चाहिए।', scenario_5_s: 'जटिल वास्तविकता, सरल डिज़ाइन।',
    scenario_6_t: 'दोपहर में क्लाइंट पिच।', scenario_6_s: 'शुरू करने से पहले प्रभावित करें।',
    auth_signin: 'साइन इन करें',
    auth_signup: 'खाता बनाएं',
    auth_email: 'ईमेल पता',
    auth_password: 'पासवर्ड',
    auth_continue: 'जारी रखें',
    auth_guest: 'अतिथि के रूप में जारी रखें',
    footer_tagline: 'न्यूरल डिज़ाइन इंजन',
  },

  // ── SPANISH ───────────────────────────────────────────────────────────────────
  es: {
    lang_label: 'Idioma',
    dismiss: 'Cerrar',
    back: 'Volver',
    share: 'Compartir',
    history: 'Historial',
    settings: 'Configuración',
    logout: 'Cerrar sesión',
    login: 'Iniciar sesión',
    close: 'Cerrar',
    copy: 'Copiar',
    copied: '¡Copiado!',
    loading_calibrating: 'Calibrando peso arquitectónico...',
    loading_restoring: 'Restaurando manifiesto neural...',
    loading_building: 'Construyendo tu visión...',
    hero_tagline: 'Construye tu imaginación.',
    hero_sub: 'Describe cualquier cosa. KREO lo manifiesta.',
    hero_placeholder_1: 'Crea un panel de proyecto…',
    hero_placeholder_2: 'Diseña una landing page de alto nivel…',
    hero_placeholder_3: 'Construye un widget neumórfico…',
    hero_placeholder_4: 'Genera una tarjeta de login estilosa…',
    hero_placeholder_5: 'Crea un portafolio minimalista…',
    hero_placeholder_6: 'Crea una página "Sobre nosotros" para Dhruv Gautam…',
    possibilities_title: 'Qué puedes hacer con KREO',
    step_01_title: 'Tu idea',
    step_01_desc: 'Describe tu objetivo en lenguaje simple o sube un archivo fuente.',
    step_02_title: 'Diseño visual',
    step_02_desc: 'Nuestro motor se encarga de la estructura visual y los detalles de diseño.',
    step_03_title: 'Construcción final',
    step_03_desc: 'Un resultado funcional y hermoso se genera en segundos.',
    nav_create: 'Crear',
    nav_history: 'Historial',
    nav_card: 'Mi tarjeta',
    nav_pricing: 'Precios',
    artifact_preview: 'Vista previa',
    artifact_code: 'Código',
    artifact_live_edit: 'Edición en vivo',
    artifact_knobs: 'Controles',
    artifact_share: 'Compartir manifiesto',
    artifact_download: 'Descargar',
    webcapture_title: 'Captura web',
    webcapture_sub: 'Copia el diseño de cualquier sitio web',
    webcapture_placeholder: 'https://ejemplo.com',
    webcapture_cta: 'Capturar diseño',
    history_title: 'Archivo neural',
    history_empty: 'Sin manifestaciones aún.',
    history_delete: 'Eliminar',
    share_title: 'Compartir manifiesto',
    share_sub: 'Cualquiera con este enlace puede ver la manifestación.',
    share_copy_link: 'Copiar enlace',
    share_close: 'Cerrar manifiesto',
    scenario_1_t: 'Reunión en 2 horas. Sin presentación.', scenario_1_s: 'La idea está. Los visuales no.',
    scenario_2_t: 'Diagrama para un PDF de 40 páginas.', scenario_2_s: 'El examen es mañana. Necesitas un visual.',
    scenario_3_t: 'La startup necesita una landing page.', scenario_3_s: '¿Sin equipo de desarrollo? Sin problema.',
    scenario_4_t: 'Mockup en 10 minutos.', scenario_4_s: 'Lo prometiste. KREO lo entrega.',
    scenario_5_t: 'Diagrama científico.', scenario_5_s: 'Realidad compleja, diseño simple.',
    scenario_6_t: 'Pitch con cliente al mediodía.', scenario_6_s: 'Impresiona antes de empezar.',
    auth_signin: 'Iniciar sesión',
    auth_signup: 'Crear cuenta',
    auth_email: 'Correo electrónico',
    auth_password: 'Contraseña',
    auth_continue: 'Continuar',
    auth_guest: 'Continuar como invitado',
    footer_tagline: 'Motor de diseño neural',
  },

  // ── FRENCH ────────────────────────────────────────────────────────────────────
  fr: {
    lang_label: 'Langue',
    dismiss: 'Fermer',
    back: 'Retour',
    share: 'Partager',
    history: 'Historique',
    settings: 'Paramètres',
    logout: 'Déconnexion',
    login: 'Connexion',
    close: 'Fermer',
    copy: 'Copier',
    copied: 'Copié !',
    loading_calibrating: 'Calibration du poids architectural...',
    loading_restoring: 'Restauration du manifeste neural...',
    loading_building: 'Construction de votre vision...',
    hero_tagline: 'Construisez votre imagination.',
    hero_sub: 'Décrivez n\'importe quoi. KREO le manifeste.',
    hero_placeholder_1: 'Créer un tableau de bord de projet…',
    hero_placeholder_2: 'Concevoir une landing page haut de gamme…',
    hero_placeholder_3: 'Construire un widget néomorphique…',
    hero_placeholder_4: 'Générer une carte de connexion stylisée…',
    hero_placeholder_5: 'Créer un portfolio minimaliste…',
    hero_placeholder_6: 'Créer une page À propos pour Dhruv Gautam…',
    possibilities_title: 'Ce que vous pouvez faire avec KREO',
    step_01_title: 'Votre idée',
    step_01_desc: 'Décrivez votre objectif en langage simple ou téléchargez un fichier source.',
    step_02_title: 'Design visuel',
    step_02_desc: 'Notre moteur gère la structure visuelle et les détails de conception.',
    step_03_title: 'Rendu final',
    step_03_desc: 'Un résultat fonctionnel et beau est généré en quelques secondes.',
    nav_create: 'Créer',
    nav_history: 'Historique',
    nav_card: 'Ma carte',
    nav_pricing: 'Tarifs',
    artifact_preview: 'Aperçu',
    artifact_code: 'Code',
    artifact_live_edit: 'Édition en direct',
    artifact_knobs: 'Réglages',
    artifact_share: 'Partager le manifeste',
    artifact_download: 'Télécharger',
    webcapture_title: 'Capture web',
    webcapture_sub: 'Copiez le design de n\'importe quel site',
    webcapture_placeholder: 'https://exemple.com',
    webcapture_cta: 'Capturer le design',
    history_title: 'Archive neurale',
    history_empty: 'Aucune manifestation pour l\'instant.',
    history_delete: 'Supprimer',
    share_title: 'Partager le manifeste',
    share_sub: 'Toute personne ayant ce lien peut voir la manifestation.',
    share_copy_link: 'Copier le lien',
    share_close: 'Fermer le manifeste',
    scenario_1_t: 'Réunion dans 2 heures. Pas de présentation.', scenario_1_s: 'L\'idée est là. Les visuels non.',
    scenario_2_t: 'Organigramme pour un PDF de 40 pages.', scenario_2_s: 'L\'examen est demain. Visualisez.',
    scenario_3_t: 'La startup a besoin d\'une landing page.', scenario_3_s: 'Pas d\'équipe dev ? Aucun problème.',
    scenario_4_t: 'Maquette en 10 minutes.', scenario_4_s: 'Vous avez promis. KREO livre.',
    scenario_5_t: 'Schéma scientifique.', scenario_5_s: 'Réalité complexe, design simple.',
    scenario_6_t: 'Pitch client à midi.', scenario_6_s: 'Impressionnez avant de commencer.',
    auth_signin: 'Se connecter',
    auth_signup: 'Créer un compte',
    auth_email: 'Adresse e-mail',
    auth_password: 'Mot de passe',
    auth_continue: 'Continuer',
    auth_guest: 'Continuer en tant qu\'invité',
    footer_tagline: 'Moteur de design neural',
  },

  // ── JAPANESE ──────────────────────────────────────────────────────────────────
  ja: {
    lang_label: '言語',
    dismiss: '閉じる',
    back: '戻る',
    share: '共有',
    history: '履歴',
    settings: '設定',
    logout: 'ログアウト',
    login: 'ログイン',
    close: '閉じる',
    copy: 'コピー',
    copied: 'コピーしました！',
    loading_calibrating: 'アーキテクチャを計算中...',
    loading_restoring: 'ニューラルマニフェストを復元中...',
    loading_building: 'ビジョンを構築中...',
    hero_tagline: '想像を形にする。',
    hero_sub: 'なんでも説明してください。KREOが具現化します。',
    hero_placeholder_1: 'プロジェクトダッシュボードを作成…',
    hero_placeholder_2: 'ハイエンドなランディングページをデザイン…',
    hero_placeholder_3: 'ニューモーフィックなウィジェットを作成…',
    hero_placeholder_4: 'スタイリッシュなログインカードを生成…',
    hero_placeholder_5: 'ミニマルなポートフォリオサイトを作成…',
    hero_placeholder_6: 'Dhruv GautamのAbout Usページを作成…',
    possibilities_title: 'KREOでできること',
    step_01_title: 'あなたのアイデア',
    step_01_desc: '目標を自然な言葉で説明するか、ファイルをアップロードしてください。',
    step_02_title: 'ビジュアルデザイン',
    step_02_desc: 'エンジンがビジュアル構造とプロのデザインを担います。',
    step_03_title: '最終ビルド',
    step_03_desc: '数秒で美しく機能的な成果物が生成されます。',
    nav_create: '作成',
    nav_history: '履歴',
    nav_card: 'マイカード',
    nav_pricing: '料金',
    artifact_preview: 'プレビュー',
    artifact_code: 'コード',
    artifact_live_edit: 'ライブ編集',
    artifact_knobs: 'ノブ',
    artifact_share: 'マニフェストを共有',
    artifact_download: 'ダウンロード',
    webcapture_title: 'ウェブキャプチャ',
    webcapture_sub: 'どんなウェブサイトのデザインもコピー',
    webcapture_placeholder: 'https://example.com',
    webcapture_cta: 'デザインをキャプチャ',
    history_title: 'ニューラルアーカイブ',
    history_empty: 'まだマニフェストがありません。',
    history_delete: '削除',
    share_title: 'マニフェストを共有',
    share_sub: 'このリンクを持つ誰でも閲覧できます。',
    share_copy_link: 'リンクをコピー',
    share_close: 'マニフェストを閉じる',
    scenario_1_t: '2時間後にミーティング。資料なし。', scenario_1_s: 'アイデアはある。ビジュアルはない。',
    scenario_2_t: '40ページPDFのフローチャート。', scenario_2_s: '明日試験。ビジュアルが必要。',
    scenario_3_t: 'スタートアップにランディングページが必要。', scenario_3_s: '開発チームなし？問題なし。',
    scenario_4_t: '10分でモックアップ。', scenario_4_s: '約束した。KREOが届ける。',
    scenario_5_t: '科学的な図解が必要。', scenario_5_s: '複雑な現実、シンプルなデザイン。',
    scenario_6_t: '正午にクライアントピッチ。', scenario_6_s: '始まる前に感動させる。',
    auth_signin: 'サインイン',
    auth_signup: 'アカウント作成',
    auth_email: 'メールアドレス',
    auth_password: 'パスワード',
    auth_continue: '続ける',
    auth_guest: 'ゲストとして続ける',
    footer_tagline: 'ニューラルデザインエンジン',
  },

  // ── ARABIC ────────────────────────────────────────────────────────────────────
  ar: {
    lang_label: 'اللغة',
    dismiss: 'إغلاق',
    back: 'رجوع',
    share: 'مشاركة',
    history: 'السجل',
    settings: 'الإعدادات',
    logout: 'تسجيل الخروج',
    login: 'تسجيل الدخول',
    close: 'إغلاق',
    copy: 'نسخ',
    copied: 'تم النسخ!',
    loading_calibrating: 'جارٍ معايرة الوزن المعماري...',
    loading_restoring: 'جارٍ استعادة البيان العصبي...',
    loading_building: 'جارٍ بناء رؤيتك...',
    hero_tagline: 'ابنِ خيالك.',
    hero_sub: 'صف أي شيء. KREO يُجسّده.',
    hero_placeholder_1: 'أنشئ لوحة تحكم للمشروع…',
    hero_placeholder_2: 'صمّم صفحة هبوط راقية…',
    hero_placeholder_3: 'ابنِ أداة ذات تأثير عمقي…',
    hero_placeholder_4: 'أنشئ بطاقة تسجيل دخول أنيقة…',
    hero_placeholder_5: 'أنشئ موقع محفظة بسيطاً…',
    hero_placeholder_6: 'أنشئ صفحة "من نحن" لـ Dhruv Gautam…',
    possibilities_title: 'ماذا يمكنك أن تصنع مع KREO',
    step_01_title: 'فكرتك',
    step_01_desc: 'صف هدفك بلغة بسيطة أو ارفع ملفاً مصدرياً.',
    step_02_title: 'التصميم البصري',
    step_02_desc: 'محرّكنا يتولى البنية البصرية وتفاصيل التصميم الاحترافي.',
    step_03_title: 'البناء النهائي',
    step_03_desc: 'نتيجة وظيفية وجميلة تُنتج في ثوانٍ.',
    nav_create: 'إنشاء',
    nav_history: 'السجل',
    nav_card: 'بطاقتي',
    nav_pricing: 'الأسعار',
    artifact_preview: 'معاينة',
    artifact_code: 'الكود',
    artifact_live_edit: 'تعديل مباشر',
    artifact_knobs: 'ضبط',
    artifact_share: 'مشاركة البيان',
    artifact_download: 'تنزيل',
    webcapture_title: 'التقاط ويب',
    webcapture_sub: 'انسخ تصميم أي موقع',
    webcapture_placeholder: 'https://example.com',
    webcapture_cta: 'التقط التصميم',
    history_title: 'الأرشيف العصبي',
    history_empty: 'لا توجد مُجسَّدات بعد.',
    history_delete: 'حذف',
    share_title: 'مشاركة البيان',
    share_sub: 'يمكن لأي شخص لديه هذا الرابط رؤية المُجسَّد.',
    share_copy_link: 'نسخ الرابط',
    share_close: 'إغلاق البيان',
    scenario_1_t: 'اجتماع بعد ساعتين. بلا عرض.', scenario_1_s: 'الفكرة موجودة. البصريات لا.',
    scenario_2_t: 'مخطط انسيابي لـ 40 صفحة PDF.', scenario_2_s: 'الامتحان غداً. تحتاج بصريات.',
    scenario_3_t: 'الشركة الناشئة تحتاج صفحة هبوط.', scenario_3_s: 'لا فريق تطوير؟ لا مشكلة.',
    scenario_4_t: 'نموذج أولي في 10 دقائق.', scenario_4_s: 'وعدت. KREO يُسلّم.',
    scenario_5_t: 'رسم بياني علمي.', scenario_5_s: 'واقع معقد، تصميم بسيط.',
    scenario_6_t: 'عرض العميل عند الظهر.', scenario_6_s: 'أبهرهم قبل أن تبدأ.',
    auth_signin: 'تسجيل الدخول',
    auth_signup: 'إنشاء حساب',
    auth_email: 'البريد الإلكتروني',
    auth_password: 'كلمة المرور',
    auth_continue: 'متابعة',
    auth_guest: 'متابعة كضيف',
    footer_tagline: 'محرك التصميم العصبي',
  },
};
