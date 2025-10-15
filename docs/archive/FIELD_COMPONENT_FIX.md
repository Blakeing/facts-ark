# Field Component Enhancement

## Problem

The `Field` component only supported props for `helperText` and `errorText`, which prevented dynamic content and broke `v-model` bindings when using complex slot structures.

## Solution

Updated `Field.vue` to support **both props and slots** for helper and error text, providing maximum flexibility while maintaining backward compatibility.

## Changes Made

### 1. Updated Field Component (`src/shared/ui/field/Field.vue`)

**Before:**

```vue
<Field.HelperText v-if="props.helperText && !props.invalid">
  {{ props.helperText }}
</Field.HelperText>

<Field.ErrorText v-if="props.errorText && props.invalid">
  {{ props.errorText }}
</Field.ErrorText>
```

**After:**

```vue
<!-- Helper Text: Use slot if provided, otherwise use prop -->
<Field.HelperText v-if="(slots.helperText || props.helperText) && !props.invalid">
  <slot name="helperText">{{ props.helperText }}</slot>
</Field.HelperText>

<!-- Error Text: Use slot if provided, otherwise use prop -->
<Field.ErrorText v-if="(slots.errorText || props.errorText) && props.invalid">
  <slot name="errorText">{{ props.errorText }}</slot>
</Field.ErrorText>
```

**Key additions:**

- Added `useSlots()` to detect slot usage
- Check for both slots and props
- Fallback to props if slots not provided

### 2. Updated Form to Use Slots (`src/features/add-todo/ui/AddTodoForm.vue`)

**Consistent pattern:**

```vue
<Field label="Title" required :invalid="!isValid && title.length > 0">
  <Input
    v-model="title"
    placeholder="What needs to be done?"
    :disabled="isPending"
    maxlength="200"
    required
  />
  <template #helperText>
    <span>{{ title.length }}/200 characters</span>
  </template>
  <template #errorText>
    <span>Title must be between 1 and 200 characters</span>
  </template>
</Field>
```

## Usage Examples

### Example 1: Using Props (Simple)

```vue
<Field
  label="Email"
  helperText="We'll never share your email"
  invalid
  errorText="Email is required"
>
  <Input type="email" v-model="email" />
</Field>
```

### Example 2: Using Slots (Dynamic Content)

```vue
<Field label="Password" :invalid="hasError">
  <Input type="password" v-model="password" />
  <template #helperText>
    <span>{{ password.length }}/50 characters</span>
  </template>
  <template #errorText>
    <span v-if="tooShort">Must be at least 8 characters</span>
    <span v-else>Password is required</span>
  </template>
</Field>
```

### Example 3: Mixed (Prop + Slot)

```vue
<Field label="Username" helperText="Choose wisely">
  <Input v-model="username" />
  <!-- Uses prop for helper, no slot needed -->
  <template #errorText>
    <span>{{ usernameError }}</span>
  </template>
</Field>
```

## Benefits

### ✅ Flexibility

- Use props for simple static text
- Use slots for dynamic, reactive content
- Mix and match as needed

### ✅ Consistency

- All forms use the same Field component
- No custom div wrappers needed
- Maintains design system integrity

### ✅ Reactivity

- Character counters work properly
- Dynamic error messages
- Full `v-model` support maintained

### ✅ Backward Compatible

- Existing code with props still works
- No breaking changes
- Gradual migration path

## Testing

Test both patterns work:

1. **With Props:**

   ```vue
   <Field label="Test" helperText="Static help">
     <Input v-model="value" />
   </Field>
   ```

2. **With Slots:**

   ```vue
   <Field label="Test">
     <Input v-model="value" />
     <template #helperText>{{ value.length }} chars</template>
   </Field>
   ```

3. **Verify:**
   - Input value updates reactively
   - Character counters update
   - Validation states work
   - Error messages show/hide correctly

## Files Modified

- ✅ `src/shared/ui/field/Field.vue` - Added slot support
- ✅ `src/features/add-todo/ui/AddTodoForm.vue` - Use slots for dynamic content
- ✅ Zero linter errors
- ✅ Type-safe

## Next Steps

Consider applying this pattern to other form-based features:

- Search inputs
- Settings forms
- User profile forms
- Any component using Field

---

**Status:** ✅ Complete and working
**Approach:** Slots + Props (flexible, backward compatible)
**Impact:** Better developer experience, consistent patterns
