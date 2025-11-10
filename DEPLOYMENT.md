# מדריך פריסה לאתר אגודת הסטודנטים

## פריסה ל-Azure Static Web Apps (מומלץ)

### שלב 1: הכנת הפרויקט
1. וודא שכל קבצי הסביבה מוגדרים ב-Azure Portal
2. וודא שה-migration של Supabase רץ בהצלחה

### שלב 2: יצירת Static Web App ב-Azure
```bash
# התקנת Azure CLI (אם לא מותקן)
npm install -g @azure/static-web-apps-cli

# התחברות ל-Azure
az login

# יצירת Static Web App
az staticwebapp create \
  --name student-union-website \
  --resource-group <your-resource-group> \
  --source <your-github-repo> \
  --location "centralus" \
  --branch main \
  --app-location "/frontend" \
  --output-location "dist"
```

### שלב 3: הגדרת משתני סביבה
ב-Azure Portal:
1. עבור ל-Static Web App שיצרת
2. לחץ על "Configuration"
3. הוסף את משתני הסביבה:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`

### שלב 4: Deployment אוטומטי
Azure יקים אוטומטית GitHub Action שידאג ל-deployment בכל push.

---

## פריסה ל-Azure App Service

### שלב 1: בנייה לוקלית
```bash
cd frontend
npm install
npm run build
```

### שלב 2: יצירת App Service
```bash
# יצירת App Service Plan
az appservice plan create \
  --name student-union-plan \
  --resource-group <your-resource-group> \
  --sku B1 \
  --is-linux

# יצירת Web App
az webapp create \
  --name student-union-app \
  --resource-group <your-resource-group> \
  --plan student-union-plan \
  --runtime "NODE|18-lts"
```

### שלב 3: הגדרת App Settings
```bash
az webapp config appsettings set \
  --name student-union-app \
  --resource-group <your-resource-group> \
  --settings \
    VITE_SUPABASE_URL=<your-supabase-url> \
    VITE_SUPABASE_ANON_KEY=<your-supabase-key>
```

### שלב 4: Deploy
```bash
# Deploy מקובץ ZIP
cd frontend/dist
zip -r ../dist.zip .
az webapp deployment source config-zip \
  --name student-union-app \
  --resource-group <your-resource-group> \
  --src ../dist.zip
```

---

## פריסה ל-Netlify (אלטרנטיבה)

### שלב 1: התקנת Netlify CLI
```bash
npm install -g netlify-cli
```

### שלב 2: Build והעלאה
```bash
cd frontend
npm run build
netlify deploy --prod --dir=dist
```

### שלב 3: הגדרת Environment Variables
בממשק הניהול של Netlify:
1. עבור ל-"Site settings"
2. לחץ על "Build & deploy" > "Environment"
3. הוסף משתנים:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`

---

## פריסה ל-Vercel (אלטרנטיבה)

### שלב 1: התקנת Vercel CLI
```bash
npm install -g vercel
```

### שלב 2: Deploy
```bash
cd frontend
vercel --prod
```

### שלב 3: הגדרת Environment Variables
בממשק הניהול של Vercel:
1. עבור ל-"Settings" > "Environment Variables"
2. הוסף משתנים:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`

---

## בדיקות לאחר Deployment

### 1. בדיקות תפקוד בסיסיות
- [ ] הדף הראשי נטען כראוי
- [ ] הניווט עובד בין כל הדפים
- [ ] ההתחברות וההרשמה עובדים
- [ ] נגישות - פאנל הנגישות פועל
- [ ] יצירת קשר - הפאנל נפתח ועובד

### 2. בדיקות רספונסיביות
- [ ] מובייל (320px-767px)
- [ ] טאבלט (768px-1023px)
- [ ] שולחן עבודה (1024px+)

### 3. בדיקות ביצועים
```bash
# הרץ Lighthouse audit
npx lighthouse <your-deployment-url> --view
```

### 4. בדיקות אבטחה
- [ ] HTTPS מופעל
- [ ] Headers אבטחה מוגדרים
- [ ] Supabase RLS פעיל

---

## Troubleshooting נפוץ

### בעיה: עמוד 404 ב-refresh
**פתרון**: וודא שקובץ `_redirects` או `staticwebapp.config.json` קיים ומוגדר נכון.

### בעיה: משתני סביבה לא זמינים
**פתרון**: וודא שהמשתנים מתחילים ב-`VITE_` ומוגדרים בפלטפורמת ה-deployment.

### בעיה: Supabase לא מחובר
**פתרון**: בדוק שה-URL וה-Key נכונים במשתני הסביבה.

---

## תחזוקה מתמשכת

### עדכון התוכן
כל תוכן הניתן לעריכה נמצא ב-Supabase. ניתן לערוך דרך:
1. Supabase Dashboard
2. SQL Editor
3. או לבנות ממשק ניהול מותאם אישית

### Monitoring
מומלץ להגדיר:
- Azure Application Insights
- Sentry לניטור שגיאות
- Google Analytics לניתוח תעבורה

---

## עדכונים עתידיים

### תכונות מתוכננות
- [ ] ממשק ניהול תוכן (CMS)
- [ ] מערכת הודעות בזמן אמת
- [ ] אינטגרציה עם לוח שנה
- [ ] מערכת תשלומים לחנות

---

לשאלות נוספות: info@studentunion.ac.il
