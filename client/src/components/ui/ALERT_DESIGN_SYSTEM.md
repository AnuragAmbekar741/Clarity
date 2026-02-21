# Alert Component - Minimal & Refined Design System

A sophisticated, minimal alert component system designed for premium user experiences. Emphasizes restraint and elegance through subtle visual hierarchy, refined typography, and sophisticated color accents.

**Design Philosophy**: *Memorable through restraint, elegant through simplicity*

## Design Evolution

### Previous Design (Before Redesign)
- Heavy colored backgrounds (warning-muted bg with colored text)
- Full border treatments
- Visual heaviness that created noise
- Less sophisticated aesthetic

### Current Design (Minimalist Redesign)
- **Left accent border**: 1px colored bar on the left edge
- **Subtle backgrounds**: `bg-background/50` with `backdrop-blur-sm` for refinement
- **Minimal borders**: `border-border/50` for ghost-like appearance
- **Typography hierarchy**: Medium-weight title, small lighter description
- **Negative space**: Generous padding (px-4 py-3) and restrained spacing
- **Color sophistication**: Accent colors appear only in left border and icon, not dominating the entire alert

## Component Structure

Each alert follows a flex layout with semantic markup:

```tsx
<Alert variant="warning">          {/* Container with left accent bar */}
  <AlertTriangle className="w-4 h-4" />  {/* Icon inherits variant color */}
  <div>                              {/* Content wrapper for vertical stacking */}
    <AlertTitle>Action required</AlertTitle>
    <AlertDescription>Complete this setup step.</AlertDescription>
  </div>
</Alert>
```

### Key Features

1. **Left Accent Bar**: A 1px colored bar on the left side provides semantic information without visual noise
   - Uses CSS `before` pseudo-element
   - Transitions smoothly with variant changes
   - Color matches the alert severity

2. **Minimal Border**: Ghost-like border at `border/50` opacity
   - Creates subtle definition
   - Doesn't compete with content
   - Works seamlessly in light and dark modes

3. **Refined Background**: Slightly visible background with backdrop blur
   - `bg-background/50` provides depth
   - `backdrop-blur-sm` adds sophistication
   - Subtle visual separation from page

4. **Icon Integration**: Icons inherit the variant color
   - Always 4x4 (w-4 h-4) for consistency
   - Properly aligned with text via mt-1
   - Flex-shrink-0 prevents compression

5. **Typography Hierarchy**:
   - **Title**: Medium weight (font-medium), text-sm, tight leading
   - **Description**: Extra small (text-xs), reduced opacity (text-foreground/75), relaxed leading
   - Spacing optimized for readability and elegance

## Color Tokens

Color tokens are defined in `src/global.css` using OKLCH color space for perceptual uniformity. The redesigned alert system uses these colors more subtly through the left accent bar rather than dominating the entire alert background.

### Warning Colors
Used for alerts that require user action or awareness
```css
--warning: oklch(0.65 0.24 60.66);           /* Bright orange */
--warning-foreground: oklch(0.22 0.03 59.4); /* Dark orange text */
--warning-muted: oklch(0.96 0.08 75.67);     /* Light orange background */
```

### Success Colors
Used for confirmations and positive feedback
```css
--success: oklch(0.66 0.19 142.45);          /* Bright green */
--success-foreground: oklch(0.2 0.04 141.3); /* Dark green text */
--success-muted: oklch(0.96 0.06 147.78);    /* Light green background */
```

### Info Colors
Used for informational messages
```css
--info: oklch(0.65 0.2 261.33);              /* Bright blue */
--info-foreground: oklch(0.22 0.04 260.1);   /* Dark blue text */
--info-muted: oklch(0.96 0.08 265.78);       /* Light blue background */
```

Dark mode variants are automatically applied via `.dark` selector.

## Alert Component

### Basic Usage
```tsx
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, CheckCircle } from "lucide-react"

export function MyAlert() {
  return (
    <Alert variant="warning">
      <AlertCircle className="w-4 h-4" />
      <div>
        <AlertTitle>Gmail account required</AlertTitle>
        <AlertDescription>
          This application requires a Gmail account to function.
        </AlertDescription>
      </div>
    </Alert>
  )
}
```

**Key Features:**
- **Left accent border** (1px colored bar) provides semantic status without visual noise
- **Minimal styling** with subtle background and ghost border for refined appearance
- **Optimal icon-text alignment** via `mt-1` on icons and flex layout
- **Wrap content** in a `<div>` to stack title and description vertically

### Variants & Icons

#### Default (Neutral Information)
```tsx
<Alert variant="default">
  <Info className="w-4 h-4" />
  <div>
    <AlertTitle>Information</AlertTitle>
    <AlertDescription>Here's some helpful information.</AlertDescription>
  </div>
</Alert>
```
- **Icon**: `Info` from lucide-react - subtle and neutral
- **Left bar**: Muted foreground color
- **Use case**: General information, non-critical updates

#### Destructive (Errors & Critical Issues)
```tsx
<Alert variant="destructive">
  <AlertCircle className="w-4 h-4" />
  <div>
    <AlertTitle>Error occurred</AlertTitle>
    <AlertDescription>Something went wrong. Please try again.</AlertDescription>
  </div>
</Alert>
```
- **Icon**: `AlertCircle` from lucide-react - clear and direct
- **Left bar**: Red/destructive color
- **Use case**: Errors, failed operations, critical issues

#### Warning (Actions Required)
```tsx
<Alert variant="warning">
  <AlertCircle className="w-4 h-4" />
  <div>
    <AlertTitle>Action required</AlertTitle>
    <AlertDescription>Please complete this setup step.</AlertDescription>
  </div>
</Alert>
```
- **Icon**: `AlertCircle` - consistent with destructive but color-coded orange
- **Left bar**: Warning/orange color
- **Use case**: Required actions, pending setup, important notices

#### Success (Confirmations)
```tsx
<Alert variant="success">
  <CheckCircle className="w-4 h-4" />
  <div>
    <AlertTitle>Success!</AlertTitle>
    <AlertDescription>Your changes have been saved.</AlertDescription>
  </div>
</Alert>
```
- **Icon**: `CheckCircle` from lucide-react - positive and affirming
- **Left bar**: Green/success color
- **Use case**: Successful operations, confirmations, completed actions

## Using Alert Colors in Custom Components

You can reference the CSS variables directly in your Tailwind classes:

```tsx
// Background with muted colors
<div className="bg-warning-muted dark:bg-warning-muted/10 border border-warning/30 rounded-lg p-4">
  <p className="text-warning-foreground font-semibold">Warning message</p>
</div>

// Text colors
<p className="text-success-foreground font-medium">Success!</p>

// Borders
<div className="border-2 border-info">Content</div>
```

## Design Principles

1. **Semantic Colors**: Use colors to communicate status, not randomly
   - `warning` = action needed, not an error
   - `success` = positive confirmation
   - `info` = helpful information
   - `destructive` = error or irreversible action

2. **Contrast & Accessibility**: All color combinations meet WCAG AA standards (4.5:1 minimum contrast)

3. **Dark Mode**: Colors automatically adjust for dark mode while maintaining perception uniformity

4. **Consistency**: Always use the defined color tokens, never hardcode colors

## Implementation Details

- **OKLCH Color Space**: Provides perceptual uniformity across lightness levels
- **Three-tier System**: Each status has a primary color, foreground text color, and muted background
- **Icon Integration**: Icons automatically inherit color from the alert variant
- **Responsive**: Works seamlessly across light and dark themes

## Future Extensibility

The system is designed to be extended. To add new status types:

1. Add new CSS variables to both `:root` and `.dark` selectors in `global.css`
2. Add new variant to the `alertVariants` CVA in `alert.tsx`
3. Document the new variant here

Example:
```css
--critical: oklch(...);
--critical-foreground: oklch(...);
--critical-muted: oklch(...);
```
