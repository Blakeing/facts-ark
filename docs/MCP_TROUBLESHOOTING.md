# Ark UI MCP Server Troubleshooting

## Expected Behavior

The Ark UI MCP server should expose 4 tools:

- `list_components` - Get all available Ark UI components
- `list_examples` - List component examples
- `get_example` - Get specific component code examples
- `styling_guide` - Get component styling guidelines

## Issue: "No tools, prompts, or resources"

If you see this message in Cursor's MCP settings, try these fixes:

### Fix 1: Restart MCP Server

1. In Cursor, go to **Settings** → **Cursor Settings** → **MCP & Integrations**
2. Find the **ark-ui** server
3. Toggle it OFF then ON again
4. Or click the refresh/restart icon if available

### Fix 2: Verify Configuration

Ensure your `.cursor/mcp.json` is correct:

```json
{
  "mcpServers": {
    "ark-ui": {
      "command": "npx",
      "args": ["-y", "@ark-ui/mcp"]
    }
  }
}
```

Note: It's `mcpServers` (not `servers`) for Cursor.

### Fix 3: Test MCP Server Manually

Run the server directly to verify it works:

```bash
npx -y @ark-ui/mcp
```

You should see MCP server initialization output.

### Fix 4: Clear NPX Cache

Sometimes npx caches can cause issues:

```bash
# Clear npx cache
rm -rf ~/.npm/_npx

# Try running again
npx -y @ark-ui/mcp
```

### Fix 5: Check Node.js Version

Ensure you have Node.js 18+ installed:

```bash
node --version  # Should be v18.0.0 or higher
```

### Fix 6: Restart Cursor

After making config changes:

1. Save all files
2. Completely quit Cursor (⌘Q on Mac)
3. Reopen Cursor
4. Check MCP settings again

### Fix 7: Check Logs

Look for errors in Cursor's developer console:

1. In Cursor: **Help** → **Toggle Developer Tools**
2. Look for errors related to MCP or ark-ui
3. Check the Console tab for error messages

## How to Use MCP Tools (Once Working)

### In Chat

When chatting with Cursor AI, you can reference Ark UI components:

```
@ark-ui Build me a combobox component following the closed component pattern
```

### Available Tools

Once connected, these tools become available to the AI:

**list_components**

```
Lists all Ark UI components for React, Vue, Solid, and Svelte
```

**list_examples**

```
Shows available examples for each component
```

**get_example**

```
Parameters:
- component: name of component (e.g., "checkbox", "date-picker")
- framework: "react", "vue", "solid", or "svelte"
- example: optional specific example name

Example: get_example(component="checkbox", framework="vue")
```

**styling_guide**

```
Parameters:
- component: name of component

Returns: Data attributes and CSS variables for styling
```

## Alternative: Use Without MCP

If MCP isn't working, you can still reference Ark UI manually:

### 1. Visit Ark UI Docs

Go to https://ark-ui.com/docs/components/[component-name]

### 2. Select Vue Framework

Use the framework selector (top right) to switch to Vue

### 3. Copy Examples

Copy the code examples and adapt them to your pattern

### 4. Follow Your Pattern

Use your established structure:

```
src/components/ui/[component]/
  ├── [Component].vue
  ├── [component].types.ts
  ├── [component].variants.ts
  ├── [Component].stories.ts
  └── index.ts
```

## Verification Commands

Test if the server is working:

```bash
# Test 1: Check if package exists
npm view @ark-ui/mcp

# Test 2: Try running with stdio
echo '{"jsonrpc":"2.0","id":1,"method":"tools/list"}' | npx -y @ark-ui/mcp

# Test 3: Check network access
curl https://registry.npmjs.org/@ark-ui/mcp
```

## Still Not Working?

If none of these work:

1. **File an issue**: Check the [Ark UI GitHub](https://github.com/chakra-ui/ark) for known issues
2. **Use manual approach**: Reference Ark UI docs directly without MCP
3. **Alternative MCP client**: Try the server in Claude Desktop or VS Code to see if it's Cursor-specific

## Working Without MCP

You can still build components efficiently:

```bash
# 1. Open Ark UI docs for the component
open https://ark-ui.com/docs/components/date-picker

# 2. Use AI with manual reference
# Paste the example code into chat and ask to convert it to your pattern

# 3. Follow existing component structure
# Reference your other components as templates
```

## Resources

- [Ark UI MCP Documentation](https://ark-ui.com/docs/ai/mcp-server)
- [Model Context Protocol Spec](https://modelcontextprotocol.io/)
- [Cursor MCP Settings](https://docs.cursor.com/advanced/mcp)
