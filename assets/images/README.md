# Portfolio pictures

Upload your photos and CAD screenshots to this folder using GitHub's **Add file → Upload files**. Use simple names, such as `phone-prototype.jpg`, `phone-cad.png`, `vehicle-prototype.jpg`, and `vehicle-cad.png`.

Next, edit `assets/media.json` using GitHub's pencil button. In the matching project's entry, set `src` to the image path, for example:

```json
{ "kind": "photo", "src": "/assets/images/phone-prototype.jpg", "title": "Finished prototype", "caption": "Tracy 1.0 during face-tracking testing", "alt": "Completed two-axis phone mount on a desk" }
```

For CAD screenshots, use `"kind": "cad"`. Keep the title and caption accurate to the uploaded image. You can add more entries to either project; the gallery builds its thumbnail list automatically. Keep commas between entries and preserve valid JSON.

The `portrait` entry accepts the same image path and an `alt` description. Use a portrait crop for the homepage. Blank `src` values show the designed photo/CAD spaces, rather than broken images.

JPG, PNG, and WebP images work. Export CAD views as PNG images; native SOLIDWORKS or Onshape files cannot display as pictures in a browser. Export an assembly view and a component/detail view for each project. An interactive CAD embed can be added separately later.

Commit your uploaded images and the edited JSON. GitHub Pages republishes automatically. Refresh the page after publication.
