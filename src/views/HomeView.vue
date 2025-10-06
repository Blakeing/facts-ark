<script setup lang="ts">
import { cn } from '@/lib/utils'

const secondaryNavigation = [
  { name: 'Overview', href: '#', current: true },
  { name: 'Activity', href: '#', current: false },
  { name: 'Settings', href: '#', current: false },
  { name: 'Collaborators', href: '#', current: false },
  { name: 'Notifications', href: '#', current: false },
]

const stats = [
  { name: 'Number of deploys', value: '405' },
  { name: 'Average deploy time', value: '3.65', unit: 'mins' },
  { name: 'Number of servers', value: '3' },
  { name: 'Success rate', value: '98.5%' },
]

const statuses = {
  Completed: 'text-green-500 bg-green-500/10',
  Error: 'text-rose-500 bg-rose-500/10',
}

const activityItems = [
  {
    user: {
      name: 'Michael Foster',
      imageUrl:
        'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    commit: '2d89f0c8',
    branch: 'main',
    status: 'Completed',
    duration: '25s',
    date: '45 minutes ago',
    dateTime: '2023-01-23T11:00',
  },
  {
    user: {
      name: 'Lindsay Walton',
      imageUrl:
        'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    commit: '249df660',
    branch: 'main',
    status: 'Completed',
    duration: '1m 32s',
    date: '3 hours ago',
    dateTime: '2023-01-23T09:00',
  },
  {
    user: {
      name: 'Courtney Henry',
      imageUrl:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    commit: '11464223',
    branch: 'main',
    status: 'Error',
    duration: '1m 4s',
    date: '12 hours ago',
    dateTime: '2023-01-23T00:00',
  },
  {
    user: {
      name: 'Courtney Henry',
      imageUrl:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    commit: 'dad28e95',
    branch: 'main',
    status: 'Completed',
    duration: '2m 15s',
    date: '2 days ago',
    dateTime: '2023-01-21T13:00',
  },
  {
    user: {
      name: 'Michael Foster',
      imageUrl:
        'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    commit: '624bc94c',
    branch: 'main',
    status: 'Completed',
    duration: '1m 12s',
    date: '5 days ago',
    dateTime: '2023-01-18T12:34',
  },
  {
    user: {
      name: 'Courtney Henry',
      imageUrl:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    commit: 'e111f80e',
    branch: 'main',
    status: 'Completed',
    duration: '1m 56s',
    date: '1 week ago',
    dateTime: '2023-01-16T15:54',
  },
  {
    user: {
      name: 'Michael Foster',
      imageUrl:
        'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    commit: '5e136005',
    branch: 'main',
    status: 'Completed',
    duration: '3m 45s',
    date: '1 week ago',
    dateTime: '2023-01-16T11:31',
  },
  {
    user: {
      name: 'Whitney Francis',
      imageUrl:
        'https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    commit: '5c1fd07f',
    branch: 'main',
    status: 'Completed',
    duration: '37s',
    date: '2 weeks ago',
    dateTime: '2023-01-09T08:45',
  },
]
</script>

<template>
  <div>
    <!-- Secondary navigation -->
    <nav class="flex overflow-x-auto border-b border-gray-200 py-4">
      <ul
        role="list"
        class="flex min-w-full flex-none gap-x-6 px-4 text-sm font-semibold leading-6 text-gray-500 sm:px-6 lg:px-8"
      >
        <li v-for="item in secondaryNavigation" :key="item.name">
          <a
            :href="item.href"
            :class="cn(
              'text-gray-500',
              item.current && 'text-indigo-600'
            )"
          >
            {{ item.name }}
          </a>
        </li>
      </ul>
    </nav>

    <!-- Heading -->
    <div
      class="flex flex-col items-start justify-between gap-x-8 gap-y-4 bg-gray-50 px-4 py-4 sm:flex-row sm:items-center sm:px-6 lg:px-8"
    >
      <div>
        <div class="flex items-center gap-x-3">
          <div class="flex-none rounded-full bg-green-500/10 p-1 text-green-500">
            <div class="size-2 rounded-full bg-current" />
          </div>
          <h1 class="flex gap-x-3 text-base leading-7">
            <span class="font-semibold text-gray-900">Facts Ark</span>
            <span class="text-gray-400">/</span>
            <span class="font-semibold text-gray-900">api-deployment</span>
          </h1>
        </div>
        <p class="mt-2 text-xs leading-6 text-gray-500">Deploys from GitHub via main branch</p>
      </div>
      <div
        class="order-first flex-none rounded-full bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-500 ring-1 ring-indigo-200 ring-inset sm:order-none"
      >
        Production
      </div>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-1 bg-gray-50 sm:grid-cols-2 lg:grid-cols-4">
      <div
        v-for="(stat, statIdx) in stats"
        :key="stat.name"
        :class="cn(
          'border-t border-gray-200/50 px-4 py-6 sm:px-6 lg:px-8',
          statIdx % 2 === 1 && 'sm:border-l',
          statIdx === 2 && 'lg:border-l'
        )"
      >
        <p class="text-sm font-medium leading-6 text-gray-500">{{ stat.name }}</p>
        <p class="mt-2 flex items-baseline gap-x-2">
          <span class="text-4xl font-semibold tracking-tight text-gray-900">{{ stat.value }}</span>
          <span v-if="stat.unit" class="text-sm text-gray-500">{{ stat.unit }}</span>
        </p>
      </div>
    </div>

    <!-- Activity list -->
    <div class="border-t border-gray-200 pt-11">
      <h2 class="px-4 text-base font-semibold leading-7 text-gray-900 sm:px-6 lg:px-8">Latest activity</h2>
      <table class="mt-6 w-full whitespace-nowrap text-left">
        <colgroup>
          <col class="w-full sm:w-4/12" />
          <col class="lg:w-4/12" />
          <col class="lg:w-2/12" />
          <col class="lg:w-1/12" />
          <col class="lg:w-1/12" />
        </colgroup>
        <thead class="border-b border-gray-200 text-sm leading-6 text-gray-900">
          <tr>
            <th scope="col" class="py-2 pl-4 pr-8 font-semibold sm:pl-6 lg:pl-8">User</th>
            <th scope="col" class="hidden py-2 pl-0 pr-8 font-semibold sm:table-cell">Commit</th>
            <th scope="col" class="py-2 pl-0 pr-4 text-right font-semibold sm:pr-8 sm:text-left lg:pr-20">
              Status
            </th>
            <th scope="col" class="hidden py-2 pl-0 pr-8 font-semibold md:table-cell lg:pr-20">Duration</th>
            <th scope="col" class="hidden py-2 pl-0 pr-4 text-right font-semibold sm:table-cell sm:pr-6 lg:pr-8">
              Deployed at
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100">
          <tr v-for="item in activityItems" :key="item.commit">
            <td class="py-4 pl-4 pr-8 sm:pl-6 lg:pl-8">
              <div class="flex items-center gap-x-4">
                <img
                  :src="item.user.imageUrl"
                  alt=""
                  class="size-8 rounded-full bg-gray-100 outline -outline-offset-1 outline-black/5"
                />
                <div class="truncate text-sm font-medium leading-6 text-gray-900">{{ item.user.name }}</div>
              </div>
            </td>
            <td class="hidden py-4 pl-0 pr-4 sm:table-cell sm:pr-8">
              <div class="flex gap-x-3">
                <div class="font-mono text-sm leading-6 text-gray-500">{{ item.commit }}</div>
                <span
                  class="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-gray-300 ring-inset"
                  >{{ item.branch }}</span
                >
              </div>
            </td>
            <td class="py-4 pl-0 pr-4 text-sm leading-6 sm:pr-8 lg:pr-20">
              <div class="flex items-center justify-end gap-x-2 sm:justify-start">
                <time class="text-gray-500 sm:hidden" :datetime="item.dateTime">{{ item.date }}</time>
                <div :class="cn(
                  'flex-none rounded-full p-1',
                  statuses[item.status as keyof typeof statuses]
                )">
                  <div class="size-1.5 rounded-full bg-current" />
                </div>
                <div class="hidden text-gray-900 sm:block">{{ item.status }}</div>
              </div>
            </td>
            <td class="hidden py-4 pl-0 pr-8 text-sm leading-6 text-gray-500 md:table-cell lg:pr-20">
              {{ item.duration }}
            </td>
            <td class="hidden py-4 pl-0 pr-4 text-right text-sm leading-6 text-gray-500 sm:table-cell sm:pr-6 lg:pr-8">
              <time :datetime="item.dateTime">{{ item.date }}</time>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
