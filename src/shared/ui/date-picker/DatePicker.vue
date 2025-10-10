<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { useForwardPropsEmits } from '@ark-ui/vue'
import { DatePicker } from '@ark-ui/vue/date-picker'
import { Calendar, ChevronLeft, ChevronRight, X } from 'lucide-vue-next'
import { computed } from 'vue'
import { useOmitProps } from '@/shared/lib/useOmitProps'
import { datePickerVariants } from './date-picker.variants'
import type { DatePickerProps, DatePickerRootEmits } from './date-picker.types'

/**
 * A Date Picker component with calendar selection.
 *
 * Features:
 * - Calendar popup with month/year navigation
 * - Date range selection support
 * - Keyboard navigation
 * - Min/max date constraints
 * - Disabled dates
 * - Multiple month display
 * - Fully accessible
 *
 * @example
 * <DatePicker
 *   label="Select date"
 *   v-model="selectedDate"
 * />
 *
 * @example
 * // Date range
 * <DatePicker
 *   label="Select dates"
 *   :selection-mode="range"
 *   v-model="dateRange"
 * />
 */

const props = withDefaults(defineProps<DatePickerProps>(), {
  placeholder: 'Select date',
  showClear: true,
})

const emits = defineEmits<DatePickerRootEmits>()

// Filter out custom props before forwarding to Ark UI
const arkProps = useOmitProps(
  props,
  ['label', 'placeholder', 'showClear', 'helperText', 'error', 'class'] as const
)
const forwarded = useForwardPropsEmits(arkProps, emits)

const styles = computed(() => datePickerVariants())
</script>

<template>
  <DatePicker.Root v-bind="forwarded" :class="[styles.root(), props.class]">
    <!-- Label -->
    <DatePicker.Label v-if="props.label" :class="styles.label()">
      {{ props.label }}
    </DatePicker.Label>

    <!-- Control with input and trigger -->
    <DatePicker.Control :class="styles.control()">
      <DatePicker.Input :placeholder="props.placeholder" :class="styles.input()" />
      <DatePicker.Trigger :class="styles.trigger()">
        <Calendar class="size-4" />
      </DatePicker.Trigger>
      <DatePicker.ClearTrigger v-if="props.showClear" :class="styles.clearTrigger()">
        <X class="size-3" />
      </DatePicker.ClearTrigger>
    </DatePicker.Control>

    <!-- Calendar popup -->
    <Teleport to="body">
      <DatePicker.Positioner :class="styles.positioner()">
        <DatePicker.Content :class="styles.content()">
          <!-- Day view -->
          <DatePicker.View view="day">
            <DatePicker.Context v-slot="api">
              <DatePicker.ViewControl :class="styles.viewControl()">
                <DatePicker.PrevTrigger :class="styles.prevTrigger()">
                  <ChevronLeft class="size-4" />
                </DatePicker.PrevTrigger>
                <DatePicker.ViewTrigger :class="styles.viewTrigger()">
                  <DatePicker.RangeText :class="styles.rangeText()" />
                </DatePicker.ViewTrigger>
                <DatePicker.NextTrigger :class="styles.nextTrigger()">
                  <ChevronRight class="size-4" />
                </DatePicker.NextTrigger>
              </DatePicker.ViewControl>

              <DatePicker.Table :class="styles.table()">
                <DatePicker.TableHead :class="styles.tableHead()">
                  <DatePicker.TableRow :class="styles.tableRow()">
                    <DatePicker.TableHeader
                      v-for="(weekDay, id) in api.weekDays"
                      :key="id"
                      :class="styles.tableHeader()"
                    >
                      {{ weekDay.short }}
                    </DatePicker.TableHeader>
                  </DatePicker.TableRow>
                </DatePicker.TableHead>
                <DatePicker.TableBody :class="styles.tableBody()">
                  <DatePicker.TableRow
                    v-for="(week, id) in api.weeks"
                    :key="id"
                    :class="styles.tableRow()"
                  >
                    <DatePicker.TableCell
                      v-for="(day, dayId) in week"
                      :key="dayId"
                      :value="day"
                      :class="styles.tableCell()"
                    >
                      <DatePicker.TableCellTrigger :class="styles.tableCellTrigger()">
                        {{ day.day }}
                      </DatePicker.TableCellTrigger>
                    </DatePicker.TableCell>
                  </DatePicker.TableRow>
                </DatePicker.TableBody>
              </DatePicker.Table>
            </DatePicker.Context>
          </DatePicker.View>

          <!-- Month view -->
          <DatePicker.View view="month">
            <DatePicker.Context v-slot="api">
              <DatePicker.ViewControl :class="styles.viewControl()">
                <DatePicker.PrevTrigger :class="styles.prevTrigger()">
                  <ChevronLeft class="size-4" />
                </DatePicker.PrevTrigger>
                <DatePicker.ViewTrigger :class="styles.viewTrigger()">
                  <DatePicker.RangeText :class="styles.rangeText()" />
                </DatePicker.ViewTrigger>
                <DatePicker.NextTrigger :class="styles.nextTrigger()">
                  <ChevronRight class="size-4" />
                </DatePicker.NextTrigger>
              </DatePicker.ViewControl>

              <DatePicker.Table :class="styles.table()">
                <DatePicker.TableBody :class="styles.tableBody()">
                  <DatePicker.TableRow
                    v-for="(months, id) in api.getMonthsGrid({ columns: 4, format: 'short' })"
                    :key="id"
                    :class="styles.tableRow()"
                  >
                    <DatePicker.TableCell
                      v-for="(month, monthId) in months"
                      :key="monthId"
                      :value="month.value"
                      :class="styles.tableCell()"
                    >
                      <DatePicker.TableCellTrigger :class="styles.tableCellTrigger()">
                        {{ month.label }}
                      </DatePicker.TableCellTrigger>
                    </DatePicker.TableCell>
                  </DatePicker.TableRow>
                </DatePicker.TableBody>
              </DatePicker.Table>
            </DatePicker.Context>
          </DatePicker.View>

          <!-- Year view -->
          <DatePicker.View view="year">
            <DatePicker.Context v-slot="api">
              <DatePicker.ViewControl :class="styles.viewControl()">
                <DatePicker.PrevTrigger :class="styles.prevTrigger()">
                  <ChevronLeft class="size-4" />
                </DatePicker.PrevTrigger>
                <DatePicker.ViewTrigger :class="styles.viewTrigger()">
                  <DatePicker.RangeText :class="styles.rangeText()" />
                </DatePicker.ViewTrigger>
                <DatePicker.NextTrigger :class="styles.nextTrigger()">
                  <ChevronRight class="size-4" />
                </DatePicker.NextTrigger>
              </DatePicker.ViewControl>

              <DatePicker.Table :class="styles.table()">
                <DatePicker.TableBody :class="styles.tableBody()">
                  <DatePicker.TableRow
                    v-for="(years, id) in api.getYearsGrid({ columns: 4 })"
                    :key="id"
                    :class="styles.tableRow()">
                    <DatePicker.TableCell
                      v-for="(year, yearId) in years"
                      :key="yearId"
                      :value="year.value"
                      :class="styles.tableCell()"
                    >
                      <DatePicker.TableCellTrigger :class="styles.tableCellTrigger()">
                        {{ year.label }}
                      </DatePicker.TableCellTrigger>
                    </DatePicker.TableCell>
                  </DatePicker.TableRow>
                </DatePicker.TableBody>
              </DatePicker.Table>
            </DatePicker.Context>
          </DatePicker.View>
        </DatePicker.Content>
      </DatePicker.Positioner>
    </Teleport>

    <!-- Helper text or error message -->
    <p
      v-if="props.helperText || props.error"
      :class="[
        'text-xs mt-2',
        props.error ? 'text-destructive' : 'text-muted-foreground',
      ]"
    >
      {{ props.error || props.helperText }}
    </p>
  </DatePicker.Root>
</template>

