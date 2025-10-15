# Toast Best Practices with Optimistic Updates

## TL;DR

| Operation Type    | Optimistic? | Recommended Toast   | Why                          |
| ----------------- | ----------- | ------------------- | ---------------------------- |
| **Toggle/Delete** | ✅ Yes      | `successToast` only | UI already updated instantly |
| **Create/Submit** | ❌ No       | `loadingToast`      | Need to wait for server      |
| **Edit (inline)** | ✅ Yes      | `successToast` only | UI already updated           |
| **Edit (form)**   | ❌ No       | `loadingToast`      | Form submission waits        |

---

## The Problem

**Optimistic updates** + **Loading toasts** = **UX mismatch** 🤨

```typescript
// ❌ BAD: Optimistic + loadingToast
{
  optimisticUpdate: (cache, id) => {
    // UI updates INSTANTLY ⚡
    cache.update(id, { completed: true })
  },
  loadingToast: {
    loading: 'Updating todo...',  // 😕 But UI already updated!
    success: 'Todo updated!',     // 😕 500ms later...
  }
}
```

**User sees:**

1. ✅ Todo checked instantly (optimistic)
2. 🔄 Toast: "Updating todo..." (confusing - it's already done!)
3. ✅ Toast: "Todo updated!" (500ms later)

---

## Solution Patterns

### Pattern 1: Optimistic Operations (Toggle, Delete, Quick Updates)

**Use `successToast` only** - No loading state needed

```typescript
// ✅ GOOD: Optimistic with instant confirmation
{
  mutationFn: async (id) => await api.toggle(id),
  optimisticUpdate: (cache, id) => {
    // UI updates INSTANTLY
    return cache.optimisticToggle(id)
  },
  successToast: {
    title: 'Todo updated!',      // ✅ Shows immediately
    description: 'Changes saved'  // Matches instant UI
  },
  errorToast: {
    title: 'Update failed',       // ❌ Only on rollback
    description: 'Changes reverted'
  },
  // No loadingToast! ⚠️
}
```

**User sees:**

1. ✅ Todo checked instantly + success toast appears
2. _(Silent success - no additional feedback needed)_
3. ❌ Error toast only if rollback happens

**Examples:**

- Toggle todo status
- Delete item
- Star/favorite
- Like/upvote

---

### Pattern 2: Non-Optimistic Operations (Forms, Creates)

**Use `loadingToast`** - Show async progression

```typescript
// ✅ GOOD: Form submission with loading feedback
{
  mutationFn: async (data) => await api.create(data),
  // No optimistic update - wait for server
  loadingToast: {
    loading: 'Creating todo...',  // ⏳ Shows immediately
    success: 'Todo created!',     // ✅ After server response
    error: 'Failed to create'     // ❌ On error
  }
}
```

**User sees:**

1. ⏳ Submit form → "Creating todo..." appears
2. _(Waits for server)_
3. ✅ "Todo created!" or ❌ "Failed to create"

**Examples:**

- Form submissions
- Creating new records
- File uploads
- Batch operations

---

### Pattern 3: Silent Optimistic (GitHub/Linear Style)

**No success toast** - Action is obvious from UI

```typescript
// ✅ GOOD: Silent optimistic (minimal interruption)
{
  mutationFn: async (id) => await api.toggle(id),
  optimisticUpdate: (cache, id) => {
    return cache.optimisticToggle(id)
  },
  errorToast: {
    title: 'Update failed',
    description: 'Changes reverted'
  },
  // No successToast!
  // No loadingToast!
}
```

**User sees:**

1. ✅ Todo checked instantly (no toast)
2. _(Silent - UI change is enough feedback)_
3. ❌ Error toast only if rollback happens

**When to use:**

- Obvious UI changes (checkboxes, toggles)
- Frequent actions (spam prevention)
- Minimal interruption desired

---

## Our Current State

### ❌ Need Fixing: Optimistic operations using `loadingToast`

**Files to update:**

1. **Toggle Todo** - `/src/features/toggle-todo/model/useToggleTodo.ts`
   - Has: `optimisticUpdate` + `loadingToast` ❌
   - Should: `optimisticUpdate` + `successToast` ✅

2. **Delete Todo** - `/src/features/delete-todo/model/useDeleteTodo.ts`
   - Has: `optimisticUpdate` + `loadingToast` ❌
   - Should: `optimisticUpdate` + `successToast` ✅

3. **Clear Completed** - `/src/features/clear-completed/model/useClearCompleted.ts`
   - Has: `optimisticUpdate` + `loadingToast` ❌
   - Should: `optimisticUpdate` + `successToast` ✅

4. **Edit Todo** - `/src/features/edit-todo/model/useEditTodo.ts`
   - Has: `optimisticUpdate` + `loadingToast` ❌
   - Should: Depends on edit type (inline vs modal)

### ✅ Already Correct: Non-optimistic operations

5. **Create Todo** - `/src/features/add-todo/model/useCreateTodo.ts`
   - Has: No `optimisticUpdate` + `loadingToast` ✅
   - Perfect! Form submission needs loading feedback

6. **Contact Form** - `/src/features/contact-form/model/useContactForm.ts`
   - Has: No `optimisticUpdate` + `loadingToast` ✅
   - Perfect! Form submission needs loading feedback

---

## Recommended Updates

### Option A: Silent Optimistic (Minimal) ⭐ Recommended

```typescript
// Toggle, Delete, Clear Completed
{
  optimisticUpdate: (cache, id) => { /* ... */ },
  errorToast: {
    title: 'Failed to update',
    description: 'Changes have been reverted'
  },
  // No successToast - UI change is enough
  // No loadingToast
}
```

**Pros:**

- Cleanest UX
- Minimal interruption
- Matches GitHub/Linear

### Option B: Instant Confirmation

```typescript
// Toggle, Delete, Clear Completed
{
  optimisticUpdate: (cache, id) => { /* ... */ },
  successToast: {
    title: 'Updated!',
    description: 'Changes saved'
  },
  errorToast: {
    title: 'Update failed',
    description: 'Changes reverted'
  },
  // No loadingToast
}
```

**Pros:**

- Explicit confirmation
- Good for critical actions
- Matches Trello

---

## Implementation Checklist

- [x] Document best practices
- [x] Update toggle-todo to silent optimistic (errorToast only)
- [x] Update delete-todo to silent optimistic (errorToast only)
- [x] Update clear-completed to silent optimistic (errorToast only)
- [x] Keep edit-todo with loadingToast (modal form submission)
- [x] Update test expectations for silent pattern
- [x] Test all operations
- [x] Remove old migration plan file

---

## References

- **GitHub**: Silent optimistic (no toast on success)
- **Linear**: Silent optimistic (no toast on success)
- **Trello**: Optimistic + instant success toast
- **Todoist**: No optimistic (loading toast)
- **vue-sonner docs**: https://vue-sonner.vercel.app/
