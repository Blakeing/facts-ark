<!--
  About Page

  Provides information about the Facts Ark application, including:
  - Technology stack
  - Features and capabilities
  - Theming system
  - Interactive examples

  This page showcases the responsive sidebar and modern tech stack
  used throughout the application.
-->
<template>
  <div class="p-6 space-y-6 animate-fade-in">
    <div>
      <h1 class="text-3xl font-bold tracking-tight text-foreground">About Facts Ark</h1>
      <p class="mt-2 text-muted-foreground">Learn more about this demo application.</p>
    </div>

    <div class="rounded-lg border border-border bg-card p-6 text-card-foreground shadow-sm">
      <h2 class="text-xl font-semibold text-foreground">Responsive Sidebar Component</h2>
      <p class="mt-3 text-muted-foreground">
        This demo showcases a fully responsive sidebar built with:
      </p>
      <ul class="mt-4 space-y-2 text-foreground">
        <li class="flex items-start gap-2">
          <span class="text-success">✓</span>
          <span><strong>Ark UI Vue</strong> - Headless UI components for collapsible navigation</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="text-success">✓</span>
          <span><strong>Tailwind CSS v4</strong> - Modern utility-first styling</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="text-success">✓</span>
          <span><strong>Lucide Icons</strong> - Beautiful, consistent icon set</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="text-success">✓</span>
          <span><strong>Vue 3 Composition API</strong> - Modern reactive framework</span>
        </li>
      </ul>
    </div>

    <div class="rounded-lg border border-border bg-card p-6 text-card-foreground shadow-sm">
      <h2 class="text-xl font-semibold text-foreground">Features</h2>
      <div class="mt-4 grid gap-4 md:grid-cols-2">
        <div>
          <h3 class="font-medium text-foreground">📱 Mobile Responsive</h3>
          <p class="mt-1 text-sm text-muted-foreground">
            Automatically switches to a drawer on mobile devices with smooth animations.
          </p>
        </div>
        <div>
          <h3 class="font-medium text-foreground">🎨 Customizable</h3>
          <p class="mt-1 text-sm text-muted-foreground">
            Easily customize colors, spacing, and behavior with Tailwind utilities.
          </p>
        </div>
        <div>
          <h3 class="font-medium text-foreground">🔽 Collapsible Sections</h3>
          <p class="mt-1 text-sm text-muted-foreground">
            Support for nested navigation with smooth expand/collapse animations.
          </p>
        </div>
        <div>
          <h3 class="font-medium text-foreground">♿ Accessible</h3>
          <p class="mt-1 text-sm text-muted-foreground">
            Built on Ark UI's accessible primitives with proper ARIA attributes.
          </p>
        </div>
      </div>
    </div>

    <div class="rounded-lg border border-border bg-card p-6 text-card-foreground shadow-sm">
      <h2 class="text-xl font-semibold text-foreground">Theming</h2>
      <p class="mt-3 text-muted-foreground">
        This project uses shadcn/ui's theming conventions with CSS variables and the oklch color format.
        All colors are defined as CSS variables that automatically adapt to light and dark modes.
      </p>
      <div class="mt-4 grid gap-2 text-sm">
        <div class="flex items-center gap-2">
          <div class="h-4 w-4 rounded-sm bg-background border"></div>
          <code class="text-xs">background</code>
        </div>
        <div class="flex items-center gap-2">
          <div class="h-4 w-4 rounded-sm bg-primary"></div>
          <code class="text-xs">primary</code>
        </div>
        <div class="flex items-center gap-2">
          <div class="h-4 w-4 rounded-sm bg-secondary"></div>
          <code class="text-xs">secondary</code>
        </div>
        <div class="flex items-center gap-2">
          <div class="h-4 w-4 rounded-sm bg-muted"></div>
          <code class="text-xs">muted</code>
        </div>
        <div class="flex items-center gap-2">
          <div class="h-4 w-4 rounded-sm bg-accent"></div>
          <code class="text-xs">accent</code>
        </div>
      </div>
    </div>

    <div class="rounded-lg border border-border bg-card p-6 text-card-foreground shadow-sm">
      <h2 class="text-xl font-semibold text-foreground">Try It Out</h2>
      <p class="mt-3 text-muted-foreground">
        Resize your browser window or test on a mobile device to see the responsive behavior in action.
        The sidebar automatically adapts to different screen sizes and provides an optimal user experience
        across all devices. Try pressing <kbd class="rounded border bg-muted px-1.5 py-0.5 text-xs font-mono">Cmd/Ctrl + B</kbd> to toggle the sidebar!
      </p>
    </div>
  </div>
</template>
