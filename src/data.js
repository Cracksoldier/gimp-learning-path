const LEARNING_PATH = [
  {
    id: 'beginner',
    title: 'Beginner',
    level: 'beginner',
    description: 'Essential GIMP concepts for Photoshop users. Learn the new interface, tool names, and fundamental workflows that map directly from what you already know.',
    lessons: [
      {
        id: 'beginner-1', est: '20 min',
        title: 'Interface Overview & Workspace',
        psEquivalent: 'PS Workspace / Panels',
        description: 'GIMP uses a multi-window layout by default, but Single-Window Mode (Windows › Single-Window Mode) closely mirrors Photoshop\'s workspace. The Toolbox lives on the left, Tool Options below it, and Dockable Dialogs (Layers, Colors, etc.) on the right.',
        concepts: ['Single-Window Mode', 'Toolbox', 'Tool Options', 'Dockable Dialogs', 'Windows › Dockable Dialogs']
      },
      {
        id: 'beginner-2', est: '15 min',
        title: 'Essential Tool Equivalents',
        psEquivalent: 'PS Toolbox',
        description: 'Master the GIMP toolbox by mapping each Photoshop tool to its GIMP counterpart. Keyboard shortcuts differ — Move is still M, but Transform/Scale is Shift+T, and Quick Mask is Q instead of a panel button.',
        concepts: ['Move Tool (M)', 'Scale Tool (Shift+T)', 'Align Tool', 'Crop Tool (Shift+C)', 'Flip Tool']
      },
      {
        id: 'beginner-3', est: '15 min',
        title: 'Selection Tools: Marquee to Free Select',
        psEquivalent: 'Marquee, Lasso, Magic Wand',
        description: 'GIMP splits Photoshop\'s selection tools into more granular options. Rectangle Select (R) and Ellipse Select (E) cover the Marquee tools. Fuzzy Select (U) replaces Magic Wand. Free Select (F) is the Lasso. Select by Color handles color-range selections.',
        concepts: ['Rectangle Select (R)', 'Ellipse Select (E)', 'Fuzzy Select (U)', 'Free Select (F)', 'Select by Color']
      },
      {
        id: 'beginner-4', est: '15 min',
        title: 'Layers Panel & Basic Operations',
        psEquivalent: 'PS Layers Panel',
        description: 'The Layers dialog in GIMP (Windows › Dockable Dialogs › Layers) is functionally equivalent to Photoshop\'s Layers panel. Layer ordering, visibility toggling, opacity, and blend modes all work the same. Right-click for context options.',
        concepts: ['New Layer', 'Duplicate Layer', 'Flatten Image', 'Merge Down', 'Layer Visibility', 'Layer Opacity']
      },
      {
        id: 'beginner-5', est: '10 min',
        title: 'File Formats: XCF vs PSD, Export As',
        psEquivalent: 'Save / Save for Web',
        description: 'GIMP\'s native format is XCF (like PSD). Critically, saving a JPEG or PNG requires File › Export As — a common source of confusion. "File › Save" only writes XCF. "File › Overwrite" re-exports to the last used export path without a dialog.',
        concepts: ['XCF (native format)', 'File › Export As', 'File › Overwrite', 'JPEG export quality', 'PNG compression']
      },
      {
        id: 'beginner-6', est: '15 min',
        title: 'Painting Tools: Brush, Pencil, Eraser',
        psEquivalent: 'Brush / Pencil / Eraser',
        description: 'GIMP painting tools behave similarly to Photoshop. Paintbrush (P) gives soft anti-aliased strokes. Pencil (N) gives hard pixel-perfect edges. Brush dynamics and flow settings live in Tool Options, not a separate toolbar.',
        concepts: ['Paintbrush (P)', 'Pencil (N)', 'Eraser (Shift+E)', 'Tool Options', 'Opacity', 'Dynamics']
      },
      {
        id: 'beginner-7', est: '10 min',
        title: 'Color Tools: Foreground, Background & Picker',
        psEquivalent: 'PS Color Pickers / Swatches',
        description: 'GIMP\'s foreground/background swatches work identically to Photoshop (press X to swap, D for defaults). The Color Picker tool (O) samples canvas colors. Double-click either swatch to open the full color chooser with HTML hex input.',
        concepts: ['Foreground/Background swatches', 'Color Picker (O)', 'Swap colors (X)', 'Default colors (D)', 'HTML notation']
      },
      {
        id: 'beginner-8', est: '10 min',
        title: 'Undo History & Basic Shortcuts',
        psEquivalent: 'PS History Panel',
        description: 'GIMP uses linear undo with Ctrl+Z / Ctrl+Shift+Z. The full history stack is in Edit › Undo History. Unlike Photoshop, GIMP\'s history is not panel-based by default — but the Edit › Undo History window provides a clickable history list. Snapshots can be saved manually.',
        concepts: ['Ctrl+Z / Ctrl+Shift+Z', 'Edit › Undo History', 'Revert', 'Keyboard shortcut editor', 'Edit › Preferences › Interface']
      }
    ],
    challenges: [
      {
        id: 'beginner-c1', difficulty: 'Easy', est: '45 min',
        title: 'First Composite',
        description: 'Combine two photos into a single composition. Import both images, place each on its own layer, resize the canvas if needed, and position elements with the Move tool. Name every layer descriptively.',
        goal: 'A 1920×1080 XCF file with at least 3 named layers, exported as PNG.'
      },
      {
        id: 'beginner-c2', difficulty: 'Easy', est: '30 min',
        title: 'Selection & Cutout',
        description: 'Use Fuzzy Select or Free Select to cut a subject from a background and place it on a solid-color background. Practice growing and feathering the selection for a clean edge.',
        goal: 'Clean cutout with no fringing, subject on a new solid-color background layer.'
      },
      {
        id: 'beginner-c3', difficulty: 'Medium', est: '20 min',
        title: 'Format Conversion Workflow',
        description: 'Open an existing image, make at least one edit, then export it in three formats: save the XCF as your master, export a JPEG at 80% quality for web, and export a PNG for lossless archival.',
        goal: 'Three files saved: .xcf master, .jpg web copy, .png lossless copy.'
      },
      {
        id: 'beginner-c4', difficulty: 'Medium', est: '20 min',
        title: 'Perspective Correction',
        description: 'Correct keystoning/perspective distortion in an architectural photo using the Perspective tool (Shift+P). Drag the corner handles until vertical lines are truly vertical. Crop the blank triangular corners after transforming, then export as JPEG.',
        goal: 'Before/after showing corrected vertical and horizontal lines. No noticeable distortion remaining.'
      }
    ]
  },
  {
    id: 'intermediate',
    title: 'Intermediate',
    level: 'intermediate',
    description: 'Layer modes, color correction, paths, and non-destructive techniques that mirror your intermediate Photoshop workflows. This is where GIMP\'s vocabulary diverges most from Photoshop\'s.',
    lessons: [
      {
        id: 'intermediate-1', est: '20 min',
        title: 'Layer Blend Modes Deep Dive',
        psEquivalent: 'PS Blending Modes',
        description: 'GIMP\'s blend modes are named identically to Photoshop\'s for the most part (Multiply, Screen, Overlay, Soft Light, Hard Light, Color Dodge, Color Burn). The dropdown is in the Layers dialog. Legacy modes match older Photoshop behavior; new GEGL modes use linear light.',
        concepts: ['Multiply', 'Screen', 'Overlay', 'Soft Light', 'Hard Light', 'Color Dodge', 'Color Burn', 'Luminance']
      },
      {
        id: 'intermediate-2', est: '15 min',
        title: 'Layer Groups & Organization',
        psEquivalent: 'PS Layer Groups / Folder Layers',
        description: 'Group layers with Image › Group Layers or the layers dialog button. GIMP layer groups support their own blend mode and opacity — identical to Photoshop folder layers. Color-label layers for visual organization. Groups can be nested.',
        concepts: ['Layer Groups (Ctrl+G)', 'Group blend mode', 'Group opacity', 'Color labels', 'Nested groups', 'Collapse/expand']
      },
      {
        id: 'intermediate-3', est: '25 min',
        title: 'Curves & Levels Color Correction',
        psEquivalent: 'PS Curves / Levels Adjustments',
        description: 'Colors › Curves and Colors › Levels give full tonal control. GIMP\'s Curves dialog is nearly identical to Photoshop\'s — drag the diagonal line, add points, edit per-channel (R, G, B, A). Levels has a black/white/midpoint slider and auto-levels buttons.',
        concepts: ['Colors › Curves', 'Colors › Levels', 'Per-channel editing', 'Auto levels', 'Input/output ranges', 'Eyedropper sampling']
      },
      {
        id: 'intermediate-4', est: '20 min',
        title: 'Hue-Saturation & Color Balance',
        psEquivalent: 'PS Hue/Saturation, Color Balance',
        description: 'Colors › Hue-Saturation lets you adjust all colors or target a specific color range (like Photoshop\'s targeted adjustment). Colors › Color Balance adjusts shadows, midtones, and highlights independently. Colors › Colorize converts to monotone.',
        concepts: ['Colors › Hue-Saturation', 'Targeted color range', 'Colors › Color Balance', 'Shadow/Midtone/Highlight sliders', 'Colorize']
      },
      {
        id: 'intermediate-5', est: '30 min',
        title: 'Paths Tool & Bezier Curves',
        psEquivalent: 'PS Pen Tool',
        description: 'GIMP\'s Paths tool (B) is the direct equivalent of Photoshop\'s Pen tool. Click to add anchor points, drag to create curve handles. Paths can be stroked (Edit › Stroke Path), filled, or converted to selections (Selection › From Path). Save paths in the Paths dialog.',
        concepts: ['Paths tool (B)', 'Anchor points', 'Bezier handles', 'Edit › Stroke Path', 'Selection › From Path', 'Paths dialog']
      },
      {
        id: 'intermediate-6', est: '20 min',
        title: 'Text Tool & Typography',
        psEquivalent: 'PS Type Tool',
        description: 'The Text tool (T) creates a dedicated text layer. The on-canvas editor supports kerning, leading, and alignment. After deselecting, text remains editable — double-click to re-enter edit mode. For warped/transformed text, flatten the text layer first (right-click › Flatten).',
        concepts: ['Text tool (T)', 'Text layer', 'Font chooser', 'Kerning / Leading', 'Alignment', 'Flatten text layer']
      },
      {
        id: 'intermediate-7', est: '20 min',
        title: 'Filters & Filter Gallery',
        psEquivalent: 'PS Filter Gallery',
        description: 'GIMP\'s Filters menu organizes effects by category: Blur, Sharpen, Distorts, Light and Shadow, Artistic. Most filters open a live preview dialog. Re-apply the last filter with Filters › Repeat Last. Script-Fu Console lets you chain filter calls programmatically.',
        concepts: ['Filters › Blur › Gaussian Blur', 'Filters › Enhance › Unsharp Mask', 'Filters › Distorts', 'Filters › Repeat Last', 'Live preview dialog']
      },
      {
        id: 'intermediate-8', est: '25 min',
        title: 'Channels & Layer Masks',
        psEquivalent: 'PS Channels Panel / Layer Masks',
        description: 'GIMP manages transparency via the alpha channel on each layer (Image › Flatten removes alpha). Layer Masks work identically to Photoshop — add via Layers panel right-click › Add Layer Mask. The Channels dialog shows R/G/B/A channels and allows channel-to-selection operations.',
        concepts: ['Add Alpha Channel', 'Layer Mask (Add/Apply/Delete)', 'Channels dialog', 'Channel to Selection', 'Mask editing mode']
      },
      {
        id: 'intermediate-9', est: '30 min',
        title: 'Raw Photo Editing: darktable / RawTherapee → GIMP',
        psEquivalent: 'Adobe Camera Raw / Lightroom',
        description: 'GIMP has no native RAW support. The standard open-source workflow: use darktable or RawTherapee (both free) for RAW development — apply exposure, white balance, and noise reduction there — then export a 16-bit TIFF into GIMP for compositing and retouching. Color profile handoff (sRGB vs AdobeRGB) is the key technical detail to get right.',
        concepts: ['darktable', 'RawTherapee', 'Export 16-bit TIFF from RAW', 'Color profile handoff', 'GIMP as final compositing stage']
      },
      {
        id: 'intermediate-10', est: '20 min',
        title: 'Vector Workflow: When to Use Inkscape',
        psEquivalent: 'PS + Illustrator combined workflow',
        description: 'GIMP is a raster editor only. For logos, icons, and scalable graphics, Inkscape (the free Illustrator equivalent) handles vectors. Import SVG into GIMP via File › Open — it rasterizes at the current canvas DPI. Round-trip workflow: design paths in Inkscape, import rasterized result into GIMP for compositing.',
        concepts: ['GIMP vs Inkscape use cases', 'Import SVG (rasterizes at DPI)', 'Inkscape for paths/logos', 'Round-trip workflow', '.svg import settings']
      }
    ],
    challenges: [
      {
        id: 'intermediate-c1', difficulty: 'Medium', est: '1 hr',
        title: 'Cinematic Color Grade',
        description: 'Apply a cinematic color look to a photograph using only Curves and Hue-Saturation. Lift the black point, crush saturation in shadows, add warmth to highlights, and introduce a complementary color split (e.g. teal shadows + orange highlights).',
        goal: 'Before/after comparison showing a clear, intentional cinematic color grading effect.'
      },
      {
        id: 'intermediate-c2', difficulty: 'Medium', est: '1–2 hrs',
        title: 'Text Poster Design',
        description: 'Create a movie-poster-style typographic composition. Use layer groups to organize foreground/background/text elements. Apply at least two different blend modes and two distinct text treatments (e.g. large display headline + fine-print tagline).',
        goal: 'Single XCF with organized layer groups, exported as a 1080×1620 PNG.'
      },
      {
        id: 'intermediate-c3', difficulty: 'Hard', est: '1–2 hrs',
        title: 'Smooth Path Cutout',
        description: 'Use the Paths tool (not any automatic selection) to carefully trace and cut out a complex object — a glass, product shot, or architectural detail. Achieve cleaner edges than any magic wand or color-range tool could provide.',
        goal: 'Exported PNG with transparent background. The path must be saved in the XCF.'
      },
      {
        id: 'intermediate-c4', difficulty: 'Medium', est: '45 min',
        title: 'Multi-Image Blending',
        description: 'Blend two exposures (or two different textures/backgrounds) using layer masks and gradient masks to create a seamless transition. No hard edges visible at the blend boundary.',
        goal: 'Seamless blend with gradient mask applied, no visible hard edge, exported as PNG.'
      },
      {
        id: 'intermediate-c5', difficulty: 'Medium', est: '45 min',
        title: 'Double Exposure Effect',
        description: 'Create a double exposure by combining two images — a portrait and a landscape, or two portraits — using Screen blend mode. Adjust per-layer contrast (Curves) so both images contribute clearly to the blend. Add a solid-color background layer for the final look.',
        goal: 'Double exposure composite, both subjects clearly readable at 50% zoom, exported as PNG.'
      },
      {
        id: 'intermediate-c6', difficulty: 'Medium', est: '1 hr',
        title: 'GIF Animation',
        description: 'Create a 5-frame looping GIF animation in GIMP using the frame-as-layer system. Each layer = one frame. Encode the frame delay in the layer name, e.g. "Frame 1 (100ms)". Preview with Filters › Animation › Playback, then export via File › Export As .gif with looping enabled.',
        goal: 'Working animated .gif file, 5+ frames, smooth loop, file size under 2 MB.'
      }
    ]
  },
  {
    id: 'advanced',
    title: 'Advanced',
    level: 'advanced',
    description: 'Automation, batch processing, GEGL color science, and plugin workflows. This section covers territory that goes beyond Photoshop in some areas — particularly scripting and open color science.',
    lessons: [
      {
        id: 'advanced-1', est: '30 min',
        title: 'Script-Fu Basics',
        psEquivalent: 'PS Actions / Basic Scripting',
        description: 'Script-Fu is GIMP\'s built-in Scheme-based scripting language. The Script-Fu Console (Filters › Script-Fu › Console) allows live execution. Every GIMP operation has a Script-Fu binding — use the console to record and test operations before saving as a script.',
        concepts: ['Filters › Script-Fu › Console', 'gimp-file-load', 'gimp-image-flatten', 'car / cdr / let*', 'Basic Scheme syntax']
      },
      {
        id: 'advanced-2', est: '30 min',
        title: 'Batch Processing with Script-Fu',
        psEquivalent: 'PS Batch / File › Automate',
        description: 'Automate repetitive tasks across multiple files using Script-Fu. Write a loop that opens files from a directory, applies operations, saves, and closes. The Script-Fu Server mode allows external triggering. BIMP plugin provides a GUI for basic batch operations.',
        concepts: ['let* loop over file list', 'gimp-file-load', 'file-png-save', 'cadr / list operations', 'BIMP plugin']
      },
      {
        id: 'advanced-3', est: '25 min',
        title: 'GEGL Operations & Linear Light',
        psEquivalent: '32-bit / ProPhoto Workflow',
        description: 'GEGL (Generic Graphics Library) is GIMP\'s compositing engine. Linear light blending produces more physically accurate results for glows, exposures, and blur. Switch to 32-bit float precision via Image › Precision for linear light workflows.',
        concepts: ['Image › Precision › 32-bit float', 'Linear Light blend mode', 'GEGL Operations (Filters › GEGL Operations)', 'Colors › Exposure', 'Gamma vs Linear']
      },
      {
        id: 'advanced-4', est: '25 min',
        title: 'Python-Fu Plugin Basics',
        psEquivalent: 'PS ExtendScript / UXP',
        description: 'Python-Fu provides a Python interface to GIMP\'s PDB (Procedure Database). Access it via Filters › Script-Fu › Python-Fu Console. Python is more readable than Scheme for complex logic. GIMP 3.x uses Python 3; GIMP 2.x uses Python 2.',
        concepts: ['Filters › Python-Fu › Console', 'pdb.gimp_file_load()', 'gimp.image_list()', 'Python 3 (GIMP 3.x)', 'pdb.plug_in_unsharp_mask()']
      },
      {
        id: 'advanced-5', est: '20 min',
        title: 'Plugin Management & Installation',
        psEquivalent: 'PS Plugin Manager / Extension Manager',
        description: 'Install third-party GIMP plugins by placing them in the plug-ins directory (Edit › Preferences › Folders › Plug-ins). Essential plugins: G\'MIC (hundreds of effects), Resynthesizer (Content-Aware Fill equivalent), BIMP (batch image processor).',
        concepts: ['~/.config/GIMP/2.10/plug-ins/', 'G\'MIC (Filters › G\'MIC-Qt)', 'Resynthesizer / Heal Selection', 'BIMP batch processor', 'Plugin Manager (GIMP 3)']
      },
      {
        id: 'advanced-6', est: '20 min',
        title: 'QuickMask & Advanced Selection Refinement',
        psEquivalent: 'PS Select & Mask / Refine Edge',
        description: 'QuickMask mode (press Q) paints a red overlay representing your selection — paint with black to remove, white to add. Grow, Feather, Shrink, and Border operations (Select menu) refine selections precisely. Combine QuickMask with the Paintbrush for hair/fur edge work.',
        concepts: ['QuickMask (Q)', 'Paint selection with brushes', 'Select › Grow/Shrink/Feather', 'Select › Border', 'Select › Invert (Ctrl+I)']
      },
      {
        id: 'advanced-7', est: '25 min',
        title: 'Advanced Color Grading with GEGL',
        psEquivalent: 'PS Camera Raw / Lightroom',
        description: 'Use GEGL-based tools for high-quality color grading: Colors › Exposure for non-destructive exposure adjustment, Colors › Shadows-Highlights for tonal range control, and GEGL Operations › hue-chroma for perceptually uniform hue/saturation adjustments.',
        concepts: ['Colors › Exposure', 'Colors › Shadows-Highlights', 'GEGL › hue-chroma', 'Colors › Levels (with gamma)', 'Linear light workflow']
      },
      {
        id: 'advanced-8', est: '20 min',
        title: 'Smart Filters Equivalent: Non-Destructive Workflow',
        psEquivalent: 'PS Smart Objects / Smart Filters',
        description: 'GIMP 2.x lacks true non-destructive Smart Filters. The professional workaround: always duplicate the layer before applying a destructive filter (Ctrl+Shift+D), use layer groups to contain filtered versions, and use layer masks to control effect visibility. GIMP 3.x adds GEGL operation stacks as live effects.',
        concepts: ['Duplicate Layer (Ctrl+Shift+D)', 'Layer Group containment', 'Layer Mask on filtered layer', 'GIMP 3 live effects (GEGL stack)', 'Edit › Fade (gamma-based)']
      },
      {
        id: 'advanced-9', est: '25 min',
        title: 'GIMP 3.x Live Effects & Non-Destructive Pipeline',
        psEquivalent: 'PS Smart Filters (per-layer)',
        description: 'GIMP 3.0\'s key new workflow feature: non-destructive GEGL operation stacks per layer. Apply Gaussian Blur, Curves, or any GEGL operation as a live effect that can be re-edited or removed at any time. Effects are stored in the XCF but lost on flatten. This fundamentally replaces the duplicate-before-filter workaround of GIMP 2.x.',
        concepts: ['Layer Effects panel (GIMP 3)', 'Add GEGL op as live effect', 'Re-edit / remove effects', 'Effect order in stack', 'Saved in XCF, lost on flatten']
      },
      {
        id: 'advanced-10', est: '30 min',
        title: 'Content-Aware Move Equivalent',
        psEquivalent: 'PS Content-Aware Move Tool',
        description: 'GIMP has no direct Content-Aware Move tool. The manual workflow: (1) select the object with any selection tool, (2) copy it to a new layer (Edit › Copy › Paste as New Layer), (3) use Resynthesizer\'s Heal Selection on the original layer to fill the empty hole, (4) move the copy to its new position, (5) blend its edges with a feathered layer mask.',
        concepts: ['Copy to New Layer (Ctrl+Shift+V)', 'Resynthesizer: Script-Fu › Heal Selection', 'Fill source hole', 'Move copy to destination', 'Feathered mask for blending edges']
      }
    ],
    challenges: [
      {
        id: 'advanced-c1', difficulty: 'Hard', est: '1–2 hrs',
        title: 'Batch Resize Script',
        description: 'Write a Script-Fu script that loads every JPEG from a specified input folder, scales each image to 50% of its original dimensions, and saves the result to an "output" subfolder. Run it on a test folder with at least 5 images.',
        goal: 'A working .scm script file. All 5 test images processed and present in the output folder.'
      },
      {
        id: 'advanced-c2', difficulty: 'Hard', est: '1 hr',
        title: 'Content-Aware Fill with Resynthesizer',
        description: 'Install the Resynthesizer plugin. Select a prominent object in a photograph (a sign, a person, a power line), then use Script-Fu › Heal Selection to seamlessly remove it. The result should show no ghosting or visible artifacts.',
        goal: 'Before/after showing clean object removal. No obvious artifacts in the healed area.'
      },
      {
        id: 'advanced-c3', difficulty: 'Hard', est: '1 hr',
        title: 'Linear Light Composite',
        description: 'Create a light-ray or bloom/glow effect using GEGL Linear Light blend mode. Demonstrate that the same composite looks incorrect (too dark or too bright) when using standard gamma blending, versus physically correct under Linear Light.',
        goal: 'Side-by-side exported comparison: gamma blending vs. linear light blending of the same composite.'
      },
      {
        id: 'advanced-c4', difficulty: 'Hard', est: '1–2 hrs',
        title: 'Python-Fu Watermark Automation',
        description: 'Write a Python-Fu script that adds a semi-transparent copyright watermark text layer (positioned bottom-right, 10% opacity) to every image in a directory. The text should include the filename and current year.',
        goal: 'Working Python script demonstrated on a test folder. Watermark visible but not obtrusive.'
      },
      {
        id: 'advanced-c5', difficulty: 'Hard', est: '1–2 hrs',
        title: 'Recreate a PS Action as Script-Fu',
        description: 'Take a multi-step Photoshop action you used to rely on — for example: apply vignette + Levels adjustment + unsharp mask — and recreate it as a .scm Script-Fu script. The script should run the same pipeline on any open image from the Script-Fu console with a single command.',
        goal: 'A working .scm file. Running it in the Script-Fu console produces the same visual result as the original PS action.'
      }
    ]
  },
  {
    id: 'expert',
    title: 'Expert',
    level: 'expert',
    description: 'Professional production workflows, color management, custom resource creation, and complex compositing. These techniques represent the ceiling of GIMP capability and map to the most advanced Photoshop workflows.',
    lessons: [
      {
        id: 'expert-1', est: '35 min',
        title: 'ICC Color Management & Soft Proofing',
        psEquivalent: 'PS Color Settings / Proof Colors',
        description: 'Configure GIMP\'s color management under Edit › Color Management. Assign or convert ICC profiles with Image › Mode › Convert to Color Profile. Soft proof for print with View › Proof Colors — select a CMYK profile to simulate print gamut on screen.',
        concepts: ['Edit › Color Management', 'Assign / Convert ICC Profile', 'sRGB vs Adobe RGB vs ProPhoto', 'View › Proof Colors', 'Rendering Intent (Perceptual / Relative Colorimetric)']
      },
      {
        id: 'expert-2', est: '30 min',
        title: 'Custom Brush Creation',
        psEquivalent: 'PS Brush Presets / Define Brush',
        description: 'Create custom brushes from any grayscale image: Script-Fu defines it or use Brushes dialog. Static brushes are .gbr files; animated (multi-stroke) brushes use multiple layers and save as .gih. Control spacing, angle jitter, and size dynamics in Tool Options.',
        concepts: ['.gbr static brush format', '.gih animated brush format', 'Brushes dialog › Paste as Brush', 'Brush spacing & dynamics', 'Brush Pack folder (~/.config/GIMP/2.10/brushes/)']
      },
      {
        id: 'expert-3', est: '25 min',
        title: 'Custom Patterns & Seamless Tiles',
        psEquivalent: 'PS Pattern Overlay / Define Pattern',
        description: 'Create a seamless tile from any image using Filters › Map › Tile (or Script-Fu to define a pattern). Manage patterns in the Patterns dialog. Use Edit › Fill with Pattern for pattern fills. Filters › Map › Tileable Blur helps disguise seams for seamless textures.',
        concepts: ['Patterns dialog', 'Edit › Fill with Pattern', 'Script-Fu: gimp-pattern-get-pixels', 'Filters › Map › Tileable Blur', '.pat format']
      },
      {
        id: 'expert-4', est: '30 min',
        title: 'GIMP 3.x Architecture & New Features',
        psEquivalent: 'PS CC Update Cycles',
        description: 'GIMP 3.0 introduces a GTK4 UI, GEGL-based layer modes everywhere, a proper non-destructive effects stack (GEGL operations as live, re-editable effects on layers), Python 3 plugins, and an updated API. Understanding the architecture change is critical for writing future-proof scripts.',
        concepts: ['GTK4 UI', 'Non-destructive GEGL effects stack', 'Python 3 plugin API', 'GEGL layer modes in all bit depths', 'GIMP 3 PDB changes']
      },
      {
        id: 'expert-5', est: '40 min',
        title: 'Luminosity Masking & Complex Compositing',
        psEquivalent: 'PS Advanced Compositing / Luminosity Masks',
        description: 'Luminosity masks select pixels based on their brightness — bright luminosity masks protect highlights; dark masks protect shadows. Create them via the Channels dialog: copy the Value channel, use Curves to restrict the range, then load as selection. Essential for sky replacement and exposure blending.',
        concepts: ['Channels dialog → Value channel', 'Curves to shape luminosity mask', 'Load channel as selection', 'Blend exposures with luminosity mask', 'Refine mask with Curves/Levels']
      },
      {
        id: 'expert-6', est: '35 min',
        title: 'Frequency Separation Retouching',
        psEquivalent: 'PS Frequency Separation Action',
        description: 'Separate an image into texture (high frequency) and color/tone (low frequency) layers. Low frequency: duplicate layer → apply Gaussian Blur (radius ~6–10px). High frequency: duplicate original → Filters › Enhance › Grain Extract from the blurred layer. Edit each independently without disturbing the other.',
        concepts: ['Gaussian Blur (low-freq layer)', 'Filters › Enhance › Grain Extract', 'High/Low frequency layers', 'Heal tool on texture layer', 'Clone tool on tone layer']
      },
      {
        id: 'expert-7', est: '40 min',
        title: 'HDR & Tone Mapping',
        psEquivalent: 'PS HDR Pro / Merge to HDR Pro',
        description: 'Merge bracketed exposures in GIMP by aligning and blending them manually via luminosity masks or exposure masks. Apply tone mapping with Colors › Exposure + Colors › Curves on a 32-bit float image. GIMP 3.x adds improved HDR display and GEGL tone mapping operators (Mantiuk, Reinhard).',
        concepts: ['32-bit float precision', 'Manual exposure blending via masks', 'Colors › Exposure', 'GEGL tone-mapping operators', 'Export 16-bit TIFF for print']
      },
      {
        id: 'expert-8', est: '30 min',
        title: 'Production-Ready Export Workflows',
        psEquivalent: 'PS Export As / Save for Web',
        description: 'Professional multi-format export: web-optimized JPEG (strip metadata, sRGB, progressive), lossless PNG with ICC profile, print-ready TIFF (embedded CMYK profile, 16-bit), and layered PDF. Automate with Script-Fu or Python-Fu for consistent results across a project.',
        concepts: ['File › Export As JPEG (strip metadata)', 'File › Export As TIFF (16-bit + ICC)', 'File › Export As PDF', 'Script-Fu batch export loop', 'gimp-image-convert-precision for 16-bit']
      }
    ],
    challenges: [
      {
        id: 'expert-c1', difficulty: 'Expert', est: '2–3 hrs',
        title: 'Print-Ready CMYK Workflow',
        description: 'Set up a SWOP Coated v2 soft-proof profile in GIMP. Enable Proof Colors and identify out-of-gamut areas. Make selective color corrections using Hue-Saturation and Curves to bring the image into gamut. Export a print-ready TIFF with embedded ICC profile.',
        goal: 'TIFF file with embedded ICC profile. Document the corrections made to address out-of-gamut areas.'
      },
      {
        id: 'expert-c2', difficulty: 'Expert', est: '2 hrs',
        title: 'Professional Skin Retouch',
        description: 'Apply frequency separation retouching to a portrait. On the high-frequency texture layer, use the Heal tool to remove individual blemishes without affecting skin tone. On the low-frequency tone layer, use a large soft brush at 5–10% opacity to smooth uneven tones.',
        goal: 'Before/after showing retained skin texture with smoothed underlying tone. No plastic/smoothed-out look.'
      },
      {
        id: 'expert-c3', difficulty: 'Expert', est: '3–4 hrs',
        title: 'Full Production Composite',
        description: 'Create a complex composite using 5 or more source images. Required techniques: luminosity masking for a sky replacement, frequency separation on skin, dodge-and-burn on separate neutral gray layers, and a full color grade chain at the end.',
        goal: 'Fully organized XCF with named layer groups for each technique. Print-resolution PNG export (min 3000px wide).'
      },
      {
        id: 'expert-c4', difficulty: 'Expert', est: '3–4 hrs',
        title: 'Distributable Plugin Package',
        description: 'Write a complete GIMP plugin in Python-Fu or Script-Fu with a UI dialog (at least 2 configurable parameters). Register it under Filters › Your Name › Plugin Name. Package it with a README describing installation and usage.',
        goal: 'Installable plugin folder. Plugin appears in Filters menu, dialog works correctly, README complete.'
      }
    ]
  }
];
