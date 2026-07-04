# SportGrid Logo Installation Guide

## Quick Setup Steps

### Step 1: Save Your Logo Image

Your SportGrit logo image needs to be saved in the public folder as **logo.png**

**Path:** `sportai/public/logo.png`

### Step 2: How to Save the Image

#### Option A: Using Windows File Explorer (Easiest)
1. Right-click on the SportGrit logo image you have
2. Select "Save image as..." or "Copy image"
3. Navigate to: `C:\Users\devaprasath\OneDrive\图片\assessment\sportai\public\`
4. Save it as `logo.png` (make sure file type is PNG)

#### Option B: Using Terminal
If you have the image file ready:
```powershell
# Copy from Downloads (adjust path as needed)
Copy-Item "C:\Users\devaprasath\Downloads\sportgrit-logo.png" "c:\Users\devaprasath\OneDrive\图片\assessment\sportai\public\logo.png"
```

### Step 3: Clean Up Old React Logos (Optional)

The old React logos in the public folder can be deleted:
```powershell
Remove-Item "c:\Users\devaprasath\OneDrive\图片\assessment\sportai\public\logo192.png"
Remove-Item "c:\Users\devaprasath\OneDrive\图片\assessment\sportai\public\logo512.png"
Remove-Item "c:\Users\devaprasath\OneDrive\图片\assessment\sportai\public\favicon.ico"
```

Or keep them, they won't be used anymore.

### Step 4: Verify Setup

Check your public folder should now contain:
```
public/
├── logo.png              ← Your SportGrid logo
├── index.html           ← Updated ✓
├── manifest.json        ← Updated ✓
├── robots.txt
└── logo192.png, logo512.png (can delete)
```

### Step 5: Restart the App

```powershell
cd 'c:\Users\devaprasath\OneDrive\图片\assessment\sportai'
npm start
```

## What Was Updated

✅ **index.html** - Updated title, favicon, and meta description
✅ **manifest.json** - Updated app name and icons to use SportGrid logo
✅ **Navbar.js** - Loads logo from `/logo.png`
✅ **Login.js** - Loads logo from `/logo.png`

## Result

Once you save the logo image:
- 🎯 Navbar will display your SportGrit logo
- 🎯 Login page will show your logo
- 🎯 Browser tab will show your logo as favicon
- 🎯 App manifest will use your branding

---

**File Location to Place Logo:**
```
c:\Users\devaprasath\OneDrive\图片\assessment\sportai\public\logo.png
```

Don't forget to restart the server after saving the image!
