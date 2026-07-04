# How to Add Your SportGrid Logo

The application is now set up to use your custom logo image. Here's how to add it:

## Option 1: Using Public Folder (Recommended)

1. Save your logo image as `logo.png` (or any format: .jpg, .svg, .webp)
2. Place it in the `public` folder:
   ```
   sportai/
   ├── public/
   │   ├── logo.png          ← Place your image here
   │   ├── index.html
   │   └── manifest.json
   ```

3. The logo will automatically appear in:
   - Navbar (top of every page)
   - Login page (main logo area)

## Option 2: Using Direct URL

If you have a logo hosted online, you can update the src attribute in:
- `src/components/Navbar.js` - Change `src="/logo.png"`
- `src/pages/Login.js` - Change `src="/logo.png"`

To your image URL: `src="https://your-url/logo.png"`

## Image Requirements

- **Format**: PNG, JPG, SVG, WebP (recommended: PNG with transparency)
- **Size**: 200x200px or larger (will scale automatically)
- **Logo Area**:
  - Navbar: 56x56px container
  - Login: 96x96px container

## If Logo Fails to Load

The code has a fallback - if the image fails to load, the app will:
- Hide the image element automatically
- Continue working without errors
- Show the text "SportGrid" instead

## Restart the Server

After adding your logo image:
1. Save the file to public folder
2. Browser should reload automatically
3. Your logo will appear in both Navbar and Login pages!

---

**Current Setup**: Ready for your custom logo at `/logo.png`
