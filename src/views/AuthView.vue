<script setup lang="ts">
import TabPanel from 'primevue/tabpanel'
import Card from 'primevue/card'
import { SignIn, SignUp } from '@clerk/vue'
import Tabs from 'primevue/tabs'
import TabList from 'primevue/tablist'
import Tab from 'primevue/tab'
</script>

<template>
  <div
    class="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-900 via-red-900 to-blue-900"
  >
    <Card class="w-full max-w-md">
      <template #title>
        <span class="text-2xl font-bold block text-center">Welcome to Wizard Auth</span>
      </template>
      <template #content>
        <Tabs value="0">
          <TabList>
            <Tab value="0">Sign Up</Tab>
            <Tab value="1">Sign In</Tab>
          </TabList>
          <TabPanels>
            <TabPanel value="0">
              <div class="flex flex-col items-center py-4">
                <SignUp redirectUrl="/" />
              </div>
            </TabPanel>
            <TabPanel value="1">
              <div class="flex flex-col items-center py-4">
                <SignIn redirectUrl="/" />
              </div>
            </TabPanel>
            <TabPanel value="2">
              <p class="m-0">
                At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis
                praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias
                excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui
                officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem
                rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est
                eligendi optio cumque nihil impedit quo minus.
              </p>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </template>
    </Card>
  </div>
</template>
